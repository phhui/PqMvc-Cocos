class BaseController extends PqController{
    static NAME:string="BaseController";
    constructor(){
        super();
    }
    protected addEvent(obj:any,event:string,func:Function,target:any){
        obj.addEventListener(event,func,target);
    }
}