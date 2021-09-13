import React, { useState } from "react"
import { ILayer } from "../../../../Core/LayerController/Layer"
import { ISideToolbarItem, barItemName } from "../interface"
import SideToolbarList from "./SideToolbarList"
import SideToolbarListContext from "./SideToolbarListContext"

interface Props {
    children: React.ReactNode
}

const SideToolbarProvider = ({ children }: Props) =>
{
    const [activeItem, setActiveItem] = useState<ISideToolbarItem>(SideToolbarList[0])
    const [layerList, setLayerList] = useState<Array<ILayer>>( [{name: 'empty', type: "undefined", group:"", show: true}] )

    const handleSetActiveItem = (name: barItemName) =>
    {
        const targetItem = SideToolbarList.find( item => item.name === name )
        setActiveItem( targetItem === undefined? SideToolbarList[0]: targetItem )
    }
    const handleSetLayerList = ( value: Array<ILayer>) => {
        setLayerList(value)
    }

    return(
        <SideToolbarListContext.Provider value={{
            list: SideToolbarList,
            activeItem: activeItem,
            setActiveItem: (name) => handleSetActiveItem(name),
            layerList: layerList,
            setLayerList: ( value ) => handleSetLayerList(value)
        }}>
                {children}
        </SideToolbarListContext.Provider> 
    )
}

export default SideToolbarProvider