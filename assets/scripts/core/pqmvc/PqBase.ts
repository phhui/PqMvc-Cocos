import DbMgr from "../mgr/DbMgr";
import PqMgr from "./PqMgr";

export default class PqBase{	
    protected __md:PqMgr;
    constructor(){

    }
	public set Mgr(m:PqMgr){
		if(this.__md!=null)throw new Error("PqMgr已赋值");
		this.__md=m;
	}
	/**监听消息，并自动移除 */
	protected once(event:string,callBack:Function){
		this.__md.once(event,callBack,this);
	}
	/**监听消息**/
	protected on(event:string,callBack:Function){
		this.__md.on(event,callBack,this);
	}
	/**删除监听**/
	protected off(name:string,func:Function=null,target:any=null):void{
		this.__md.remove(name,func,target);
	}
	/**广播**/
	protected emit(name:String,...args){
		args.unshift(name);
		this.__md.emit.apply(null,args);
	}
	/**
	 *获取共享数据 
	 * @param key 钥匙
	 * @param args 参数
	 * @return 
	 * 
	 */		
	public getData(key:string,...args):any{
		args.unshift(key);
		return this.__md.getData.apply(null,args);
	}
	public shareData(key:string,data:any){
		this.__md.shareData(key,data);
	}
	public delData(key:string){
		this.__md.delData(key);
	}
	public execute(param:Object=null, type:String=null){
		
	}
	public destory(){
		
	}
    
	//==================Cache===Start=====================
    /**保存缓存    
     * saveCache(缓存名称，缓存内容，缓存有效期(分钟)-默认为0 不过期)     
	 */
	protected save(key:string,data:any,period:number=0){
		DbMgr.save(key,data,period);
	}
	protected saveToday(key:string,data:any){
		DbMgr.saveToday(key,data);
	}
    /**获取缓存 */
	protected getCache(key:string){
		return DbMgr.get(key);
	}
	protected removeCache(key:string){
		DbMgr.remove(key);
	}
    protected clearCache(){
		DbMgr.clear();
    }
	//===================Cache===End========================
}