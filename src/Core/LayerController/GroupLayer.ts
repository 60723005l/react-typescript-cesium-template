import Layer, { ILayer } from "./Layer";
import { AssociativeArray, Event, Viewer } from "cesium";
import { uuidv4 } from "../../utilities"



export interface IGroupLayer {
    id?: string
    name: string
    group?: string
    type?: string
    show?: boolean
    data?: any
}

class GroupLayer {
    id: string
    name: string
    group: string
    private _show: boolean
    type: string
    data: any
    viewer: Viewer | null

    public onAdd: Event
    public onRemove: Event
    public onChange: Event
    private _hashMap: AssociativeArray

    constructor( option: IGroupLayer ) {
        this.id = option.id || uuidv4()
        this.name = option.name
        this.group = option.group || "其他"
        this.type = option.type || ""
        this._show = option.show || false
        this.data = option.data
        this.viewer = null

        this.onAdd = new Event()
        this.onRemove = new Event()
        this.onChange = new Event()
        this._hashMap = new AssociativeArray()
    }
    
    public get show() : boolean {
        return this._show
    }
    
    public set show(val : boolean) {
        this._show = val
        this._hashMap.values.forEach( (layer: Layer) =>{
            layer.show = val
        })
    }

    loadToMap( viewer: Viewer) {
        this.viewer = viewer
        this._hashMap.values.forEach( (layer: Layer) =>{
            layer.loadToMap(viewer)
        })
    }

    removeFromMap() {
        this._hashMap.values.forEach( (layer: Layer) =>{
            layer.removeFromMap()
        })
    }
    
    
    add( layer: Layer ) {
        this._hashMap.set( layer.id, layer )
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
        this.onRemove.raiseEvent( this.getById( layer.id ) )
        this.onChange.raiseEvent( this.getById( layer.id ) )
    }
    removeById( id: number | string ) {
        this._hashMap.remove( id )
        this.onRemove.raiseEvent( this.getById( id ) )
        this.onChange.raiseEvent( this.getById( id ) )
    }
    removeAll() {
        this._hashMap.removeAll()
        this.onRemove.raiseEvent()
        this.onChange.raiseEvent()
    }
}

export default GroupLayer