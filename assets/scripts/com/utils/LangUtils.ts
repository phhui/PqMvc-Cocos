import GConfig from "../../const/GConfig";
import Log from "../../core/mgr/Log";

export default class LangUtils{
    private static langDict:any={};
    private static dict:any={};
    public static init(){
    }
    public static auto(nd:cc.Node,repeat:boolean=true){
        if(!repeat&&this.dict[nd.uuid])return;
        this.dict[nd.uuid]=1;
        this.autoLang(nd);
    }
    private static autoLang(nd:cc.Node){
        let lb:cc.Label=nd.getComponent(cc.Label);
        if(lb){
            let str:string=this.langDict[lb.string];
            if(str)lb.string=str;
            else if(lb.string.substring(0,2)=="T_"){
                str=this.langDict[lb.string.substr(2)][this.getLangType()];
                if(str)lb.string=str;
            }
            // else Log.log("待翻译内容："+lb.string);
        }
        nd.children.forEach(element => {
            this.autoLang(element);
        });
        nd.on(cc.Node.EventType.CHILD_ADDED, (ele)=>{
            this.autoLang(ele);
        }, this);
    }
    public static getLangType(){
        return GConfig.lang==GConfig.CN?0:1;
    }
    /**特殊文本处理，如剩余{0}天||{1}小时||{2}分钟，如果参数0和2为false则显示  X小时 */
    public static autoJoin(id,...args){
        let str:string=this.langDict[id][this.getLangType()];
        if(!str)return id;
        let arr:Array<string>=str.split("|");
        if(arr.length==1)return this.jointStr(str,args);
        let res="";
        let n:number=Math.min(arr.length,args.length);
        for(let i:number=0;i<n;i++){
            if(arr[i]&&args[i])res+=arr[i].replace("{"+i+"}",args[i]);
        }
        return res;
    }
    public static getConfig(id,...args){
        let str:string=this.langDict[id][this.getLangType()];
        return this.jointStr(str,args);
    }
    public static lang(txt:string,...args){
        let str:string=this.langDict[txt][this.getLangType()]||txt;
        return this.jointStr(str,args)||this.jointStr(txt,args);
    }
    public static jointStr(str:string,arg:Array<any>=[]){
        if(!str)return null;
        if(typeof(str)=="number")return str;
        let n:number=arg.length;
        for(let i:number=0;i<n;i++){
            if(str.indexOf("{"+i+"}")!=-1)str=str.replace("{"+i+"}",arg[i]);
        }
        return str;
    }
}
window["LangUtils"]=LangUtils;