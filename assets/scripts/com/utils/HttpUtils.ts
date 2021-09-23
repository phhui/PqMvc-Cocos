import Log from "../../core/mgr/Log";

export default class HttpUtils{
    public static get(url:string,callback:Function,target:any){
        let xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status <= 207)) {
                    callback.apply(target,[xhr.responseText]);
                } else {
                    Log.log("http请求错误失败 >> "+url);
                }
            }
        }
        xhr.timeout = 5000;
        xhr.open("GET", url, true);
        xhr.send();
    }
}