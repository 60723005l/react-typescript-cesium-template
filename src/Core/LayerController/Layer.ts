import { uuidv4 } from "../../utilities"
import { GeoJsonDataSource, Entity, KmlDataSource, CustomDataSource, Cesium3DTileset, Viewer, Event } from "cesium";
import createLoader from "../Loader";

export interface ILayer {
    id?: string
    name: string
    group?: string
    type: string | "3DTILE"
    loading?: boolean | false
    show?: boolean
    data?: any
}

export type LayerType = string | "3DTILE" | "GEOJSON" | "KML" | "KMZ"

class Layer {
    id: string
    name: string
    group: string
    type: LayerType
    loading: boolean
    private _show: boolean
    data: any
    viewer: Viewer | null
    mapEntity: Entity | GeoJsonDataSource | KmlDataSource | CustomDataSource | Cesium3DTileset | null
    onLoading: Event

    constructor( option: ILayer ) {
        this.id = option.id || uuidv4()
        this.name = option.name
        this.group = option.group || "其他"
        this.type = option.type
        this.loading = option.loading || false
        this._show = option.show || false
        this.data = option.data
        this.mapEntity = null
        this.viewer = null
        this.onLoading = new Event()
    }
    
    public get show() : boolean {
        return this._show
        // if ( this.mapEntity === null ) {
        //     return false
        // } else {
        //     return this.mapEntity.show
        // }
    }
    
    public set show( val : boolean ) {
        if ( this.mapEntity === null ) {
            console.warn( `mapEntity is null, load layer to map first` )
        } else {
            this.mapEntity.show = val
        }
        this._show = val
    }
    
    public get info() : ILayer {
        return {
            ...this,
            show: this._show
        }
    }

    loadToMap( viewer: Viewer) {
        if ( this.viewer === null ) {
            this.viewer = viewer
            const loader = createLoader( this.type, this.data, viewer )
            this.mapEntity = loader.load()
            // this.loading = true
            this.mapEntity.loadProgress.addEventListener((numberOfPendingRequests: number ) =>{
                if( numberOfPendingRequests === 0) {
                    this.loading = false
                    this.onLoading.raiseEvent(false)
                    return 
                } else if ( !this.loading ) {
                    this.loading = true
                    this.onLoading.raiseEvent(true)
                }
                
            })
            return this.mapEntity
        } else {
            console.warn(`layer: ${this.name} has already added to map`)
        }
        
    }

    removeFromMap() {
        if ( this.viewer === null ) {
            console.warn(`layer: ${this.name} not in map`)
        } else {
            switch( this.type ) {
                case "3DTILE":
                    this.loading = false
                    this.viewer.scene.primitives.remove(this.mapEntity)
                    break
                default:
                    this.viewer = null
                    console.warn(`you shouldn't see this msg, write the fucking code`)
            }
        }
    }
    
}

export default Layer