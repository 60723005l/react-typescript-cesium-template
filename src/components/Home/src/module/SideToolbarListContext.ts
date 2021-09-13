import React, { createContext } from "react"
import SideToolbarList from "./SideToolbarList"
import { barItemName, ISideToolbarContext } from "../interface"
import { ILayer } from "../../../../Core/LayerController/Layer"




const SideToolbarListContext = createContext<ISideToolbarContext>({
    list: SideToolbarList,
    activeItem: SideToolbarList[0],
    setActiveItem: ( name: barItemName ) => {""},
    layerList: [],
    setLayerList: ( value: Array<ILayer>) => {""}
})

export default SideToolbarListContext

