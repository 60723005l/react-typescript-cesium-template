import { ISideToolbarItem } from "../interface"
import Layers from "@material-ui/icons/Layers"
import InfoIcon from '@material-ui/icons/Info';

const SideToolbarList: Array<ISideToolbarItem> = [
    {
        name: "layer",
        icon: Layers,
        action: () => {""}
    },
    {
        name: "about",
        icon: InfoIcon,
        action: () => {""}
    }
]
export default SideToolbarList