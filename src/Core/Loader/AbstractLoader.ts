import { Entity, Viewer } from "cesium";

class AbstractLoader {
    data: any
    viewer: Viewer
    constructor( data: any, viewer: Viewer) {
        this.viewer = viewer
        this.data = data
    }
    // load() {
    //     return this.viewer.entities.add( new Entity() )
    // }
}

export default AbstractLoader