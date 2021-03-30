import AppPxy from "../../modules/proxy/AppPxy";

export default class Log{
    private static logList:Array<string>=[];
    public static log(msg:string){
        this.logList.push(msg);
        console.log(" >> "+msg);
        AppPxy.callApp(msg);
        if(this.logList.length>500)this.logList.splice(0,300);
    }
}
window["Log"]=Log;