import decompressLZF from './decompress-lzf';

/**
  * @author Filipe Caixeta / http://filipecaixeta.com.br
  * @author Sergey Alexandrov
  *
  * Description: A THREE loader for PCD files.
  *
  * Based on the example THREE.PCDLoader written by Filipe Caixeta.
  *
  * Changes:
  *
  *   - added support for compressed binary files
  *   - significantly improved header parsing time
  *   - added support for RGBA color field
  *   - removed support for normals field
  *
  */

function PCDLoader (manager) {
  this.manager = (manager !== undefined) ? manager : THREE.DefaultLoadingManager;
  this.loader = new THREE.XHRLoader(this.manager);
  this.loader.setResponseType('arraybuffer');
  this.littleEndian = true;
}

PCDLoader.prototype.load = function load (url, onLoad, onProgress, onError) {
  var scope = this;
  this.loader.load(url, function (data) {
    onLoad(scope.parse(data, url));
  }, onProgress, onError);
};

PCDLoader.prototype.parse = function parse (data) {
  var header = this.parseHeader(data);
  var offset = header.offset;

  var position = false;
  if (offset.x !== undefined && offset.y !== undefined && offset.z !== undefined) {
    position = new Float32Array(header.points * 3);
  }

  var color = false;
  var color_offset;
  if (offset.rgb !== undefined || offset.rgba !== undefined) {
    color = new Float32Array(header.points * 3);
    color_offset = offset.rgb === undefined ? offset.rgba : offset.rgb;
  }

  if (header.data === 'ascii') {
    var charArrayView = new Uint8Array(data);
    var dataString = '';
    for (var j = header.headerLen; j < data.byteLength; j++) {
      dataString += String.fromCharCode(charArrayView[j]);
    }

    var lines = dataString.split('\n');
    var i3 = 0;
    for (var i = 0; i < lines.length; i++, i3 += 3) {
      var line = lines[i].split(' ');
      if (position !== false) {
        position[i3 + 0] = parseFloat(line[offset.x]);
        position[i3 + 1] = parseFloat(line[offset.y]);
        position[i3 + 2] = parseFloat(line[offset.z]);
      }
      if (color !== false) {
        var c;
        if (offset.rgba !== undefined) {
          c = new Uint32Array([parseInt(line[offset.rgba])]);
        } else if (offset.rgb !== undefined) {
          c = new Float32Array([parseFloat(line[offset.rgb])]);
        }
        var dataview = new Uint8Array(c.buffer, 0);
        color[i3 + 2] = dataview[0] / 255.0;
        color[i3 + 1] = dataview[1] / 255.0;
        color[i3 + 0] = dataview[2] / 255.0;
      }
    }
  } else if (header.data === 'binary') {
    var row = 0;
    var dataArrayView = new DataView(data, header.headerLen);
    for (var p = 0; p < header.points; row += header.rowSize, p++) {
      if (position !== false) {
        position[p * 3 + 0] = dataArrayView.getFloat32(row + offset.x, this.littleEndian);
        position[p * 3 + 1] = dataArrayView.getFloat32(row + offset.y, this.littleEndian);
        position[p * 3 + 2] = dataArrayView.getFloat32(row + offset.z, this.littleEndian);
      }
      if (color !== false) {
        color[p * 3 + 2] = dataArrayView.getUint8(row + color_offset + 0) / 255.0;
        color[p * 3 + 1] = dataArrayView.getUint8(row + color_offset + 1) / 255.0;
        color[p * 3 + 0] = dataArrayView.getUint8(row + color_offset + 2) / 255.0;
      }
    }
  } else if (header.data === 'binary_compressed') {
    var sizes = new Uint32Array(data.slice(header.headerLen, header.headerLen + 8));
    var compressedSize = sizes[0];
    var decompressedSize = sizes[1];
    var decompressed = decompressLZF(new Uint8Array(data, header.headerLen + 8, compressedSize), decompressedSize);
    dataArrayView = new DataView(decompressed.buffer);
    for (p = 0; p < header.points; p++) {
      if (position !== false) {
        position[p * 3 + 0] = dataArrayView.getFloat32(offset.x + p * 4, this.littleEndian);
        position[p * 3 + 1] = dataArrayView.getFloat32(offset.y + p * 4, this.littleEndian);
        position[p * 3 + 2] = dataArrayView.getFloat32(offset.z + p * 4, this.littleEndian);
      }
      if (color !== false) {
        color[p * 3 + 2] = dataArrayView.getUint8(color_offset + p * 4 + 0) / 255.0;
        color[p * 3 + 1] = dataArrayView.getUint8(color_offset + p * 4 + 1) / 255.0;
        color[p * 3 + 0] = dataArrayView.getUint8(color_offset + p * 4 + 2) / 255.0;
      }
    }
  }

  var geometry = new THREE.BufferGeometry();
  if (position !== false) {
    geometry.addAttribute('position', new THREE.BufferAttribute(position, 3));
  }
  if (color !== false) {
    geometry.addAttribute('color', new THREE.BufferAttribute(color, 3));
  }

  var material = new THREE.PointsMaterial({
    size: 0.005,
    vertexColors: !(color === false)
  });
  if (color === false) {
    material.color.setHex(Math.random() * 0xffffff);
  }

  var mesh = new THREE.Points(geometry, material);
  mesh.header = header;

  return mesh;
};

PCDLoader.prototype.parseHeader = function parseHeader (binaryData) {
  var headerText = '';
  var charArray = new Uint8Array(binaryData);
  var i = 0;
  var max = charArray.length;
  while (i < max && headerText.search(/[\r\n]DATA\s(\S*)\s/i) === -1) {
    headerText += String.fromCharCode(charArray[i++]);
  }
  var result1 = headerText.search(/[\r\n]DATA\s(\S*)\s/i);
  var result2 = /[\r\n]DATA\s(\S*)\s/i.exec(headerText.substr(result1 - 1));

  var header = {};
  header.data = result2[1];
  header.headerLen = result2[0].length + result1;
  header.str = headerText.substr(0, header.headerLen);

  // Remove comments
  header.str = header.str.replace(/\#.*/gi, '');
  header.version = /VERSION (.*)/i.exec(header.str);
  if (header.version !== null) {
    header.version = parseFloat(header.version[1]);
  }
  header.fields = /FIELDS (.*)/i.exec(header.str);
  if (header.fields !== null) {
    header.fields = header.fields[1].split(' ');
  }
  header.size = /SIZE (.*)/i.exec(header.str);
  if (header.size !== null) {
    header.size = header.size[1].split(' ').map(function (x) {
      return parseInt(x, 10);
    });
  }
  header.type = /TYPE (.*)/i.exec(header.str);
  if (header.type !== null) {
    header.type = header.type[1].split(' ');
  }
  header.count = /COUNT (.*)/i.exec(header.str);
  if (header.count !== null) {
    header.count = header.count[1].split(' ').map(function (x) {
      return parseInt(x, 10);
    });
  }
  header.width = /WIDTH (.*)/i.exec(header.str);
  if (header.width !== null) {
    header.width = parseInt(header.width[1]);
  }
  header.height = /HEIGHT (.*)/i.exec(header.str);
  if (header.height !== null) {
    header.height = parseInt(header.height[1]);
  }
  header.viewpoint = /VIEWPOINT (.*)/i.exec(header.str);
  if (header.viewpoint !== null) {
    header.viewpoint = header.viewpoint[1];
  }
  header.points = /POINTS (.*)/i.exec(header.str);
  if (header.points !== null) {
    header.points = parseInt(header.points[1], 10);
  }
  if (header.points === null) {
    header.points = header.width * header.height;
  }
  if (header.count === null) {
    header.count = [];
    for (i = 0; i < header.fields; i++) {
      header.count.push(1);
    }
  }
  header.offset = {};
  var sizeSum = 0;
  for (var j = 0; j < header.fields.length; j++) {
    if (header.data === 'ascii') {
      header.offset[header.fields[j]] = j;
    } else if (header.data === 'binary') {
      header.offset[header.fields[j]] = sizeSum;
      sizeSum += header.size[j];
    } else if (header.data === 'binary_compressed') {
      header.offset[header.fields[j]] = sizeSum;
      sizeSum += header.size[j] * header.points;
    }
  }
  // For binary only
  header.rowSize = sizeSum;
  return header;
};

THREE.EventDispatcher.constructor.prototype.apply(PCDLoader.prototype);

export default PCDLoader;
