import PqMvc from "../../scripts/core/pqmvc/PqMvc";

export default class Proxy extends PqMvc{
    private static _pxy:Proxy;
    constructor(){
        super();
    }
    public static get self(){
        if(!this._pxy)this._pxy=new Proxy();
        return this._pxy;
    }
}