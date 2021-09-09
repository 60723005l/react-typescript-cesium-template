import React, { createContext } from "react"
import SideToolbarList from "./SideToolbarList"
import { barItemName, ISideToolbarContext } from "../interface"




const SideToolbarListContext = createContext<ISideToolbarContext>({
    list: SideToolbarList,
    activeItem: SideToolbarList[0],
    setActiveItem: ( name: barItemName ) => {""}
})

export default SideToolbarListContext

