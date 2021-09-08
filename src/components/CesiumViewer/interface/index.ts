import Cesium from "cesium";

export interface WidgetOption {
    timeline: boolean;
    clock: boolean;
    fullscreen: boolean;
    toolbar: boolean;
}

export interface ViewerProps {
    widgetOption?: WidgetOption;
    onViewerMounted?: (viewer: Cesium.Viewer) => void
}