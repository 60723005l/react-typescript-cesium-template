import { Cesium3DTileset, Viewer } from "cesium";
import AbstractLoader from "./AbstractLoader";

class ThreeDTileLoader extends AbstractLoader {
    constructor( data: any, viewer: Viewer) {
        super(data, viewer)
    }
    load(): Cesium3DTileset {
        return this.viewer.scene.primitives.add(new Cesium3DTileset({
            url : this.data.url
       }));
    }
}

export default ThreeDTileLoader