import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

export type barItemName =  "layer" | "about"

export interface ISideToolbarActionPayload {
    type: string;
    params: any;
}

export interface ISideToolbarItem {
    name: barItemName;
    icon: OverridableComponent<SvgIconTypeMap>;
    action: ( arg: ISideToolbarActionPayload ) => void;
}


export interface ISideToolbarContext {
    list: Array<ISideToolbarItem>;
    activeItem: ISideToolbarItem;
    setActiveItem: ( name: barItemName ) => void
}
