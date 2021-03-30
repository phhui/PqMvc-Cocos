import PqBase from "./PqBase";

export default class PqProxy extends PqBase implements IProxy{
	//static NAME:String="继承此类必需定义该NAME，且名字和文件名一样,如文件名为XXProxy,则NAME值为XXProxy";
    constructor(){
		super();
    }
	/**初始化后会被自动执行**/
	public init():void{}
	public execute(param:Object=null, type:String=null){
		//todo
	}
	/**格式化HttpRequest请求结果 return object */
	protected parse(e:Event){
		try{
			return JSON.parse(e.currentTarget["response"]);
		}catch(err){
			return {msg:e.currentTarget["response"]};
		}
	}
}