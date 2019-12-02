/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

import PCDLoader from './src/pcd-loader';

/**
 * PCD Loader component for A-Frame.
 */
AFRAME.registerComponent('pcd_loader', {
  schema: {
    modelUrl: {type: 'string', default: 'model.pcd'},
    log: {type: 'boolean', default: false}
  },

  /**
   * Set if component needs multiple instancing.
   */
  multiple: false,

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    var el = this.el;
    var loader = new PCDLoader();

    const modelUrl = this.data.modelUrl || 'model.pcd';
    const log = this.data.log || false;

    loader.load(
      modelUrl,
      (mesh) => {
        el.setObject3D('mesh', mesh);
      },
      (xhr) => {
        if (log)
          console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.log(error);
      }
    );
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) { },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () { },

  /**
   * Called on each scene tick.
   */
  // tick: function (t) { },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function () { },

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function () { },

  /**
   * Event handlers that automatically get attached or detached based on scene state.
   */
  events: {
    // click: function (evt) { }
  }
});
