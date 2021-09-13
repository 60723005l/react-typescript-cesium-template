import { Viewer, Event } from "cesium"

type callbackType = ( viewer: Viewer) => void

class ViewerTask {
    viewer: Viewer | null
    event: Event
    private _taskStack: Array<callbackType>
    constructor() {
        this.viewer = null
        this.event = new Event()
        this._taskStack = []
    }
    private isViewerSettled() {
        return this.viewer instanceof Viewer
    }
    private removeAllEvents() {
        this._taskStack.forEach( task => {
            this.event.removeEventListener( task )
        })
        this._taskStack = []
    }
    public setViewer( viewer: Viewer ) {
        this.viewer = viewer
        this.event.raiseEvent( viewer )
        this.removeAllEvents()
        return viewer
    }
    public execute( callback: ( viewer: Viewer) => void ) {
        this.event.addEventListener( callback )
        this._taskStack.push(callback)
        if ( this.isViewerSettled() ) {
            this.event.raiseEvent( this.viewer )
            this.removeAllEvents()
        }
        
    }
}

export default ViewerTask