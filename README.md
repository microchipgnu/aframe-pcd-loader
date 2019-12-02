## aframe-pcd_loader-component

[![Version](http://img.shields.io/npm/v/aframe-pcd_loader-component.svg?style=flat-square)](https://npmjs.org/package/aframe-pcd_loader-component)
[![License](http://img.shields.io/npm/l/aframe-pcd_loader-component.svg?style=flat-square)](https://npmjs.org/package/aframe-pcd_loader-component)

This component loads Point Cloud Data files (*.pcd) into an a-frame scene.

For [A-Frame](https://aframe.io).

### API

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-pcd_loader-component@1.0.0/dist/aframe-pcd_loader-component.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity pcd_loader="model_url: bunny.pcd"></a-entity>
  </a-scene>
</body>
```

#### npm

Install via npm:

```bash
npm install aframe-pcd_loader-component
```

Then require and use.

```js
require('aframe');
require('aframe-pcd_loader-component');
```
