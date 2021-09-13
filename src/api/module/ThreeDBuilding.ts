import axios from 'axios';

export const getServiceList = async ( ) => {
    const resp = await axios.get("https://3dtiles.nlsc.gov.tw/tiles3d/Service")
    return resp
}
