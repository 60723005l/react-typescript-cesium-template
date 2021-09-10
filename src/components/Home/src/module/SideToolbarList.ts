import { ISideToolbarItem } from "../interface"
import Layers from "@material-ui/icons/Layers"
import InfoIcon from '@material-ui/icons/Info';
import { Layer } from "../../../MapWidget";
import About from "../../About";

const SideToolbarList: Array<ISideToolbarItem> = [
    {
        name: "layer",
        icon: Layers,
        children: Layer,
        props: { 
            values:[
                {
                    id:0,
                    name: "layer1",
                    type: "string",
                    show: true,
                    group: "group1",
                },
                {
                    id:1,
                    name: "layer2",
                    type: "string",
                    show: true,
                    group: "group1",
                },
                {
                    id:2,
                    name: "layer3",
                    type: "string",
                    show: true,
                    group: "group2",
                },
            ]
        },
        action: () => {""}
    },
    {
        name: "about",
        icon: InfoIcon,
        children: About,
        props: {},
        action: () => {""}
    }
]
export default SideToolbarList