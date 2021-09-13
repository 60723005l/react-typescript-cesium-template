import ThreeDTileLoader from "./ThreeDTileLoader";
import { LayerType } from "../LayerController/Layer";
import { Viewer } from "cesium";

const createLoader = ( type: LayerType, data: any, viewer: Viewer ) =>
{
    switch( type ) {
        case "3DTILE":
            return new ThreeDTileLoader( data, viewer );
        default:
            throw new Error(`type: ${type} not match with any loaders`) 
    }
}

export default createLoader
