/**
 * @ Author: phhui
 * @ Create Time: 2021-01-31 13:25:59
 * @ Modified by: phhui
 * @ Modified time: 2021-08-27 17:46:27
 * @ Description:代理管理，代理：将当前模块真实数据包装并暴露给其它模块使用
 */

export default class ProxyMgr{
    public static pxyDict:any={};
    public static reg(name:string,mod:any){
        if(ProxyMgr.pxyDict[name])return;//throw new Error("proxy:"+name+"已存在！");
        ProxyMgr.pxyDict[name]=mod;
    }
    public static getPxy(name){
        return ProxyMgr.pxyDict[name];
    }
}