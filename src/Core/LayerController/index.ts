import { AssociativeArray, GeoJsonDataSource, Entity, KmlDataSource, CustomDataSource, Cesium3DTileset, Event } from "cesium";
import { omit } from "lodash";
import Layer, { ILayer } from "./Layer";

// export interface ILayerState {
//     id: number | string;
//     name: string;
//     type: string;
//     show: boolean;
//     group: string;
// }

// export interface ILayerEntityItem {
//     id: number;
//     name: string;
//     type: string;
//     show: boolean;
//     group: string;
//     mapEntity: Entity | GeoJsonDataSource | KmlDataSource | CustomDataSource | Cesium3DTileset
// }

class LayerController {
    public state: Array<ILayer>
    public onAdd: Event
    public onRemove: Event
    public onChange: Event
    private _hashMap: AssociativeArray
    constructor() {
        this.state = []
        this.onAdd = new Event()
        this.onRemove = new Event()
        this.onChange = new Event()
        this._hashMap = new AssociativeArray()
    }
    
    refreshState() {
        this.state = this._hashMap.values.map( (layer: Layer) => {
            // const state = omit( layer, "mapEntity" )
            return layer.info
        })
    }
    
    add( layer: Layer ) {
        this._hashMap.set( layer.id, layer )
        this.refreshState()
        this.onAdd.raiseEvent( this.getById( layer.id ) )
        this.onChange.raiseEvent( this.getById( layer.id ) )
        return layer
    }
    getById( id: number | string ): Layer {
        return this._hashMap.get( id )
    }
    contains( layer: Layer ) {
        return this._hashMap.contains( layer.id )
    }
    containsById( id: number | string ) {
        return this._hashMap.contains( id )
    }
    remove( layer: Layer ) {
        this._hashMap.remove( layer.id )
        this.refreshState()
        this.onRemove.raiseEvent( this.getById( layer.id ) )
        this.onChange.raiseEvent( this.getById( layer.id ) )
    }
    removeById( id: number | string ) {
        this._hashMap.remove( id )
        this.refreshState()
        this.onRemove.raiseEvent( this.getById( id ) )
        this.onChange.raiseEvent( this.getById( id ) )
    }
    removeAll() {
        this._hashMap.removeAll()
        this.refreshState()
        this.onRemove.raiseEvent()
        this.onChange.raiseEvent()
    }
}

export default LayerController