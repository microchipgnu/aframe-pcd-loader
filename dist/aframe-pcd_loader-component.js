(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_pcd_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/pcd-loader */ \"./src/pcd-loader.js\");\n/* global AFRAME */\nif (typeof AFRAME === 'undefined') {\n  throw new Error('Component attempted to register before AFRAME was available.');\n}\n\n\n/**\n * PCD Loader component for A-Frame.\n */\n\nAFRAME.registerComponent('pcd_loader', {\n  schema: {\n    modelUrl: {\n      type: 'string',\n      default: 'model.pcd'\n    },\n    log: {\n      type: 'boolean',\n      default: false\n    }\n  },\n\n  /**\n   * Set if component needs multiple instancing.\n   */\n  multiple: false,\n\n  /**\n   * Called once when component is attached. Generally for initial setup.\n   */\n  init: function () {\n    var el = this.el;\n    var loader = new _src_pcd_loader__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    const modelUrl = this.data.modelUrl || 'model.pcd';\n    const log = this.data.log || false;\n    loader.load(modelUrl, mesh => {\n      el.setObject3D('mesh', mesh);\n    }, xhr => {\n      if (log) console.log(xhr.loaded / xhr.total * 100 + '% loaded');\n    }, error => {\n      console.log(error);\n    });\n  },\n\n  /**\n   * Called when component is attached and when component data changes.\n   * Generally modifies the entity based on the data.\n   */\n  update: function (oldData) {},\n\n  /**\n   * Called when a component is removed (e.g., via removeAttribute).\n   * Generally undoes all modifications to the entity.\n   */\n  remove: function () {},\n\n  /**\n   * Called on each scene tick.\n   */\n  // tick: function (t) { },\n\n  /**\n   * Called when entity pauses.\n   * Use to stop or remove any dynamic or background behavior such as events.\n   */\n  pause: function () {},\n\n  /**\n   * Called when entity resumes.\n   * Use to continue or add any dynamic or background behavior such as events.\n   */\n  play: function () {},\n\n  /**\n   * Event handlers that automatically get attached or detached based on scene state.\n   */\n  events: {// click: function (evt) { }\n  }\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./src/decompress-lzf.js":
/*!*******************************!*\
  !*** ./src/decompress-lzf.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction decompressLZF(inData, outLength) {\n  var inLength = inData.length;\n  var outData = new Uint8Array(outLength);\n  var inPtr = 0;\n  var outPtr = 0;\n  var ctrl;\n  var len;\n  var ref;\n\n  do {\n    ctrl = inData[inPtr++];\n\n    if (ctrl < 1 << 5) {\n      ctrl++;\n      if (outPtr + ctrl > outLength) throw new Error('Output buffer is not large enough');\n      if (inPtr + ctrl > inLength) throw new Error('Invalid compressed data');\n\n      do {\n        outData[outPtr++] = inData[inPtr++];\n      } while (--ctrl);\n    } else {\n      len = ctrl >> 5;\n      ref = outPtr - ((ctrl & 0x1f) << 8) - 1;\n      if (inPtr >= inLength) throw new Error('Invalid compressed data');\n\n      if (len === 7) {\n        len += inData[inPtr++];\n        if (inPtr >= inLength) throw new Error('Invalid compressed data');\n      }\n\n      ref -= inData[inPtr++];\n      if (outPtr + len + 2 > outLength) throw new Error('Output buffer is not large enough');\n      if (ref < 0) throw new Error('Invalid compressed data');\n      if (ref >= outPtr) throw new Error('Invalid compressed data');\n\n      do {\n        outData[outPtr++] = outData[ref++];\n      } while (--len + 2);\n    }\n  } while (inPtr < inLength);\n\n  return outData;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (decompressLZF);\n\n//# sourceURL=webpack:///./src/decompress-lzf.js?");

/***/ }),

/***/ "./src/pcd-loader.js":
/*!***************************!*\
  !*** ./src/pcd-loader.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _decompress_lzf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decompress-lzf */ \"./src/decompress-lzf.js\");\n\n/**\r\n  * @author Filipe Caixeta / http://filipecaixeta.com.br\r\n  * @author Sergey Alexandrov\r\n  *\r\n  * Description: A THREE loader for PCD files.\r\n  *\r\n  * Based on the example THREE.PCDLoader written by Filipe Caixeta.\r\n  *\r\n  * Changes:\r\n  *\r\n  *   - added support for compressed binary files\r\n  *   - significantly improved header parsing time\r\n  *   - added support for RGBA color field\r\n  *   - removed support for normals field\r\n  *\r\n  */\n\nfunction PCDLoader(manager) {\n  this.manager = manager !== undefined ? manager : THREE.DefaultLoadingManager;\n  this.loader = new THREE.XHRLoader(this.manager);\n  this.loader.setResponseType('arraybuffer');\n  this.littleEndian = true;\n}\n\nPCDLoader.prototype.load = function load(url, onLoad, onProgress, onError) {\n  var scope = this;\n  this.loader.load(url, function (data) {\n    onLoad(scope.parse(data, url));\n  }, onProgress, onError);\n};\n\nPCDLoader.prototype.parse = function parse(data) {\n  var header = this.parseHeader(data);\n  var offset = header.offset;\n  var position = false;\n\n  if (offset.x !== undefined && offset.y !== undefined && offset.z !== undefined) {\n    position = new Float32Array(header.points * 3);\n  }\n\n  var color = false;\n  var color_offset;\n\n  if (offset.rgb !== undefined || offset.rgba !== undefined) {\n    color = new Float32Array(header.points * 3);\n    color_offset = offset.rgb === undefined ? offset.rgba : offset.rgb;\n  }\n\n  if (header.data === 'ascii') {\n    var charArrayView = new Uint8Array(data);\n    var dataString = '';\n\n    for (var j = header.headerLen; j < data.byteLength; j++) {\n      dataString += String.fromCharCode(charArrayView[j]);\n    }\n\n    var lines = dataString.split('\\n');\n    var i3 = 0;\n\n    for (var i = 0; i < lines.length; i++, i3 += 3) {\n      var line = lines[i].split(' ');\n\n      if (position !== false) {\n        position[i3 + 0] = parseFloat(line[offset.x]);\n        position[i3 + 1] = parseFloat(line[offset.y]);\n        position[i3 + 2] = parseFloat(line[offset.z]);\n      }\n\n      if (color !== false) {\n        var c;\n\n        if (offset.rgba !== undefined) {\n          c = new Uint32Array([parseInt(line[offset.rgba])]);\n        } else if (offset.rgb !== undefined) {\n          c = new Float32Array([parseFloat(line[offset.rgb])]);\n        }\n\n        var dataview = new Uint8Array(c.buffer, 0);\n        color[i3 + 2] = dataview[0] / 255.0;\n        color[i3 + 1] = dataview[1] / 255.0;\n        color[i3 + 0] = dataview[2] / 255.0;\n      }\n    }\n  } else if (header.data === 'binary') {\n    var row = 0;\n    var dataArrayView = new DataView(data, header.headerLen);\n\n    for (var p = 0; p < header.points; row += header.rowSize, p++) {\n      if (position !== false) {\n        position[p * 3 + 0] = dataArrayView.getFloat32(row + offset.x, this.littleEndian);\n        position[p * 3 + 1] = dataArrayView.getFloat32(row + offset.y, this.littleEndian);\n        position[p * 3 + 2] = dataArrayView.getFloat32(row + offset.z, this.littleEndian);\n      }\n\n      if (color !== false) {\n        color[p * 3 + 2] = dataArrayView.getUint8(row + color_offset + 0) / 255.0;\n        color[p * 3 + 1] = dataArrayView.getUint8(row + color_offset + 1) / 255.0;\n        color[p * 3 + 0] = dataArrayView.getUint8(row + color_offset + 2) / 255.0;\n      }\n    }\n  } else if (header.data === 'binary_compressed') {\n    var sizes = new Uint32Array(data.slice(header.headerLen, header.headerLen + 8));\n    var compressedSize = sizes[0];\n    var decompressedSize = sizes[1];\n    var decompressed = Object(_decompress_lzf__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(new Uint8Array(data, header.headerLen + 8, compressedSize), decompressedSize);\n    dataArrayView = new DataView(decompressed.buffer);\n\n    for (p = 0; p < header.points; p++) {\n      if (position !== false) {\n        position[p * 3 + 0] = dataArrayView.getFloat32(offset.x + p * 4, this.littleEndian);\n        position[p * 3 + 1] = dataArrayView.getFloat32(offset.y + p * 4, this.littleEndian);\n        position[p * 3 + 2] = dataArrayView.getFloat32(offset.z + p * 4, this.littleEndian);\n      }\n\n      if (color !== false) {\n        color[p * 3 + 2] = dataArrayView.getUint8(color_offset + p * 4 + 0) / 255.0;\n        color[p * 3 + 1] = dataArrayView.getUint8(color_offset + p * 4 + 1) / 255.0;\n        color[p * 3 + 0] = dataArrayView.getUint8(color_offset + p * 4 + 2) / 255.0;\n      }\n    }\n  }\n\n  var geometry = new THREE.BufferGeometry();\n\n  if (position !== false) {\n    geometry.addAttribute('position', new THREE.BufferAttribute(position, 3));\n  }\n\n  if (color !== false) {\n    geometry.addAttribute('color', new THREE.BufferAttribute(color, 3));\n  }\n\n  var material = new THREE.PointsMaterial({\n    size: 0.005,\n    vertexColors: !(color === false)\n  });\n\n  if (color === false) {\n    material.color.setHex(Math.random() * 0xffffff);\n  }\n\n  var mesh = new THREE.Points(geometry, material);\n  mesh.header = header;\n  return mesh;\n};\n\nPCDLoader.prototype.parseHeader = function parseHeader(binaryData) {\n  var headerText = '';\n  var charArray = new Uint8Array(binaryData);\n  var i = 0;\n  var max = charArray.length;\n\n  while (i < max && headerText.search(/[\\r\\n]DATA\\s(\\S*)\\s/i) === -1) {\n    headerText += String.fromCharCode(charArray[i++]);\n  }\n\n  var result1 = headerText.search(/[\\r\\n]DATA\\s(\\S*)\\s/i);\n  var result2 = /[\\r\\n]DATA\\s(\\S*)\\s/i.exec(headerText.substr(result1 - 1));\n  var header = {};\n  header.data = result2[1];\n  header.headerLen = result2[0].length + result1;\n  header.str = headerText.substr(0, header.headerLen); // Remove comments\n\n  header.str = header.str.replace(/\\#.*/gi, '');\n  header.version = /VERSION (.*)/i.exec(header.str);\n\n  if (header.version !== null) {\n    header.version = parseFloat(header.version[1]);\n  }\n\n  header.fields = /FIELDS (.*)/i.exec(header.str);\n\n  if (header.fields !== null) {\n    header.fields = header.fields[1].split(' ');\n  }\n\n  header.size = /SIZE (.*)/i.exec(header.str);\n\n  if (header.size !== null) {\n    header.size = header.size[1].split(' ').map(function (x) {\n      return parseInt(x, 10);\n    });\n  }\n\n  header.type = /TYPE (.*)/i.exec(header.str);\n\n  if (header.type !== null) {\n    header.type = header.type[1].split(' ');\n  }\n\n  header.count = /COUNT (.*)/i.exec(header.str);\n\n  if (header.count !== null) {\n    header.count = header.count[1].split(' ').map(function (x) {\n      return parseInt(x, 10);\n    });\n  }\n\n  header.width = /WIDTH (.*)/i.exec(header.str);\n\n  if (header.width !== null) {\n    header.width = parseInt(header.width[1]);\n  }\n\n  header.height = /HEIGHT (.*)/i.exec(header.str);\n\n  if (header.height !== null) {\n    header.height = parseInt(header.height[1]);\n  }\n\n  header.viewpoint = /VIEWPOINT (.*)/i.exec(header.str);\n\n  if (header.viewpoint !== null) {\n    header.viewpoint = header.viewpoint[1];\n  }\n\n  header.points = /POINTS (.*)/i.exec(header.str);\n\n  if (header.points !== null) {\n    header.points = parseInt(header.points[1], 10);\n  }\n\n  if (header.points === null) {\n    header.points = header.width * header.height;\n  }\n\n  if (header.count === null) {\n    header.count = [];\n\n    for (i = 0; i < header.fields; i++) {\n      header.count.push(1);\n    }\n  }\n\n  header.offset = {};\n  var sizeSum = 0;\n\n  for (var j = 0; j < header.fields.length; j++) {\n    if (header.data === 'ascii') {\n      header.offset[header.fields[j]] = j;\n    } else if (header.data === 'binary') {\n      header.offset[header.fields[j]] = sizeSum;\n      sizeSum += header.size[j];\n    } else if (header.data === 'binary_compressed') {\n      header.offset[header.fields[j]] = sizeSum;\n      sizeSum += header.size[j] * header.points;\n    }\n  } // For binary only\n\n\n  header.rowSize = sizeSum;\n  return header;\n};\n\nTHREE.EventDispatcher.constructor.prototype.apply(PCDLoader.prototype);\n/* harmony default export */ __webpack_exports__[\"default\"] = (PCDLoader);\n\n//# sourceURL=webpack:///./src/pcd-loader.js?");

/***/ })

/******/ });
});