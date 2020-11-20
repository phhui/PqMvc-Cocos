class LoadMgr extends PqMvc{
    private loadList:Array<any>=[];
    private loadIndex:number=0;
    private curList:Array<any>;
    constructor(){
        super();
        this.registerEvent();
    }
    private registerEvent(){
        this.on(SysCmd.LOAD_RES,this.loadRes,this);
        this.on(SysCmd.LOAD_CONFIG,this.loadConfig,this);
        this.on(SysCmd.LOAD_MODULE_RES,this.loadModule,this);
    }
    private async loadConfig(){

    }
    private loadRes(){

    }
    private loadModule(event:string,name:string=null){ 
        //console.log("load module>>"+name);
        this.loadList.push(name);
        if(this.loadList.length==1){
            this.getConfig();
        }
    }
    private getConfig(){
        var list=Config.configDict[this.loadList[0]]//=RES.getRes(this.loadList[0]);
        this.curList=[];
        var n: number = list.length;
        for (var i: number = 0; i < n; i++) {
            if(list[i].sheet||!list[i].url)continue;
            if (list[i].category == "img" || list[i].category == "res" || list[i].category == "btn")this.curList.push(list[i]);
        }
        if(this.curList.length>0){
            this.load();
        }else{
            this.loadNextList();
        }
    }
    private load(){
        var url:string=this.curList[this.loadIndex].url;
        // RES.getResByUrl(url,this.resLoaded,this,this.curList[this.loadIndex].type);
    }
    private resLoaded(e:any,url:string){
        // ResUtils.dict[url]=e;
        this.loadIndex+=1;
        this.loadIndex>=this.curList.length?this.loadNextList():this.load();
    }
    private loadNextList(){
        this.loadIndex=0;
        this.emit(this.loadList[0]);
        this.loadList.shift();
        // this.loadList.length>0?this.getConfig():Loading.self.close();
    }
}