import { Viewer } from "cesium";

export type createViewerType = ( id: string, options: any ) => Viewer

const createViewer: createViewerType = ( id, options ) =>
{
    return new Viewer( id, options)
}

export default createViewer