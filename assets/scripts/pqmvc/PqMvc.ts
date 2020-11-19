class PqMvc extends BaseObject{
	constructor(){
		super();
	}
	public once(e:string,func:Function,target:any){
		EventHelper.once(e,func,target);
	}
	public on(event:string,func:Function,target:any){
		EventHelper.on(event,func,target);
	}
	public emit(event:string,...args){
		args.unshift(event);
		EventHelper.emit.apply(EventHelper,args);
	}
	public remove(event:string,func:Function=null,target:any=null){
		EventHelper.remove(event,func,target);
	}
	public shareData(key: string, data: any): void{
		DataHelper.self.shareData(key, data);
	}
    public getData(key: string): any{
       return DataHelper.self.getData(key);
	}
	public delData(key:string){
		DataHelper.self.delData(key);
	}
}