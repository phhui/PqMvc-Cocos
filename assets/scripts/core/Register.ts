import MapsMgr from "../module/maps/MapsMgr";

export default class Register{
    constructor(){
        this.reg();
    }
    private reg(){
        new LoadMgr();
        new LayerMgr();
        new MapsMgr();
        new LayerMgr();
    }
}