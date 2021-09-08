import React,{ FC, useEffect } from "react";
import { ViewerProps } from "./interface";
import * as Cesium from "cesium"
import "cesium/Source/Widgets/widgets.css"



const Viewer = ({
    onViewerMounted,
    widgetOption
}:ViewerProps) =>
{
    useEffect(() => {
        (window as any).CESIUM_BASE_URL = window.location.origin
        const viewer = new Cesium.Viewer("cesium-viewer-container", {
            animation: widgetOption?.clock ? true : false,
            timeline: widgetOption?.timeline ? true : false,
            fullscreenButton: widgetOption?.fullscreen ? true : false,
            projectionPicker: widgetOption?.toolbar ? true : false,
            navigationHelpButton: widgetOption?.toolbar ? true : false,
            sceneModePicker: widgetOption?.toolbar ? true : false,
            geocoder: widgetOption?.toolbar ? true : false,
            baseLayerPicker: widgetOption?.toolbar ? true : false,
            homeButton: widgetOption?.toolbar ? true : false,

        })
        const s = (viewer.scene as any)
        s._creditContainer.style.display = "none"
        if (onViewerMounted) { onViewerMounted(viewer) }

        (window as any).viewer = viewer
        
    }, [])
    return(
        <div id="cesium-viewer-container" style={{height: '100%',width: '100%'}}></div>
    )
}

export default Viewer