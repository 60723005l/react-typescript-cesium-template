import React,{ useEffect } from "react";
import { ViewerProps } from "./interface";
import Core from "../../Core"
import "cesium/Source/Widgets/widgets.css"

const Viewer = ({
    onViewerMounted,
    widgetOption
}:ViewerProps) =>
{
    useEffect(() => {
        (window as any).CESIUM_BASE_URL = window.location.origin
        const options = {
            animation: widgetOption?.clock ? true : false,
            timeline: widgetOption?.timeline ? true : false,
            fullscreenButton: widgetOption?.fullscreen ? true : false,
            projectionPicker: widgetOption?.toolbar ? true : false,
            navigationHelpButton: widgetOption?.toolbar ? true : false,
            sceneModePicker: widgetOption?.toolbar ? true : false,
            geocoder: widgetOption?.toolbar ? true : false,
            baseLayerPicker: widgetOption?.toolbar ? true : false,
            homeButton: widgetOption?.toolbar ? true : false,

        }
        const viewer = Core.createViewer( "cesium-viewer-container", options );

        (viewer.scene as any)._creditContainer.style.display = "none"
        if (onViewerMounted) { onViewerMounted(viewer) }

        (window as any).viewer = viewer
        
    }, [])
    return(
        <div id="cesium-viewer-container" style={{height: '100%',width: '100%'}}></div>
    )
}

export default Viewer