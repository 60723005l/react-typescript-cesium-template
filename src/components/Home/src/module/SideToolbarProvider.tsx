import React, { useState } from "react"
import { ISideToolbarItem, barItemName } from "../interface"
import SideToolbarList from "./SideToolbarList"
import SideToolbarListContext from "./SideToolbarListContext"

interface Props {
    children: React.ReactNode
}

const SideToolbarProvider = ({ children }: Props) =>
{
    // const [active, setActive] = useState<SideToolbarItem>(SideToolbarList[0]);
    const [activeItem, setActiveItem] = useState<ISideToolbarItem>(SideToolbarList[0])
    const handleSetActiveItem = (name: barItemName) =>
    {
        const targetItem = SideToolbarList.find( item => item.name === name )
        // console.log(targetItem)
        setActiveItem( targetItem === undefined? SideToolbarList[0]: targetItem )
    }
    return(
        <SideToolbarListContext.Provider value={{
            list: SideToolbarList,
            activeItem: activeItem,
            setActiveItem: (name) => handleSetActiveItem(name)
        }}>
                {children}
        </SideToolbarListContext.Provider> 
    )
}

export default SideToolbarProvider