import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { ILayer } from "../../../../Core/LayerController/Layer";

export type barItemName =  "layer" | "about"

export interface ISideToolbarActionPayload {
    type: string;
    params: any;
}

export interface ISideToolbarItem {
    name: barItemName;
    icon: OverridableComponent<SvgIconTypeMap>;
    children: React.ElementType,
    props: any,
    action: ( arg: ISideToolbarActionPayload ) => void;
}


export interface ISideToolbarContext {
    list: Array<ISideToolbarItem>;
    activeItem: ISideToolbarItem;
    setActiveItem: ( name: barItemName ) => void
    layerList: Array<ILayer>
    setLayerList: ( value: Array<ILayer> ) => void

}
