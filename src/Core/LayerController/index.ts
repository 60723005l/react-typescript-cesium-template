import { AssociativeArray, GeoJsonDataSource, Entity, KmlDataSource, CustomDataSource, Cesium3DTileset, Event } from "cesium";
import { omit } from "lodash";

export interface ILayerState {
    id: number;
    name: string;
    type: string;
    show: boolean;
    group: string;
}

export interface ILayerItem {
    id: number;
    name: string;
    type: string;
    show: boolean;
    group: string;
    mapEntity: Entity | GeoJsonDataSource | KmlDataSource | CustomDataSource | Cesium3DTileset
}

class LayerController {
    public state: Array<ILayerState>
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
    private refreshState() {
        this.state = this._hashMap.values.map( (layer: ILayerItem) => {
            const state = omit( layer, "mapEntity" )
            return state
        })
    }
    add( layer: ILayerItem ) {
        this._hashMap.set( layer.id, layer )
        this.refreshState()
        this.onAdd.raiseEvent( this.getById( layer.id ) )
        this.onChange.raiseEvent( this.getById( layer.id ) )
        return layer
    }
    getById( id: number | string ) {
        return this._hashMap.get( id )
    }
    contains( layer: ILayerItem ) {
        return this._hashMap.contains( layer.id )
    }
    containsById( id: number | string ) {
        return this._hashMap.contains( id )
    }
    remove( layer: ILayerItem ) {
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