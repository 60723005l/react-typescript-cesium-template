import JulianDate from "cesium/Source/Core/JulianDate";
import * as Cesium from "cesium"
import Viewer from "cesium/Source/Widgets/Viewer/Viewer";
import Scene from "cesium/Source/Scene/Scene";

  class EathSpin {
      viewer: Viewer;
      constructor(viewer: Viewer) {
        this.viewer = viewer
        this.handleSpin = this.handleSpin.bind(this)
      }
      start(): void {
        this.viewer.scene.postUpdate.addEventListener(this.handleSpin)
      }
      stop(): void {
        this.viewer.scene.postUpdate.removeEventListener(this.handleSpin)
      }
      handleSpin(scene: Scene, time: JulianDate): void {
        if (scene.mode !== Cesium.SceneMode.SCENE3D) { return }
        
          const icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(time)
          if (Cesium.defined(icrfToFixed)) {
            const camera = this.viewer.camera
            const offset = Cesium.Cartesian3.clone(camera.position)
            const transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed)
            camera.lookAtTransform(transform, offset)
          }
      }
  }


export default EathSpin