import * as Cesium from "cesium"
import ViewerTask from "./Viewer/ViewerTask"
import createViewer from "./Viewer/createViewer"
import LayerController from "./LayerController"

class Core {
    viewerTask: ViewerTask
    layerController: LayerController
    constructor() {
        this.viewerTask = new ViewerTask()
        this.layerController = new LayerController()
    }
    createViewer( id: string, options: any ) {
        const viewer = createViewer( id, options)
        this.viewerTask.setViewer( viewer )
        return viewer
    }
}

export default new Core()