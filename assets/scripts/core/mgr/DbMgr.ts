/**
 * @ Author: phhui
 * @ Create Time: 2021-01-27 09:09:18
 * @ Modified by: phhui
 * @ Modified time: 2021-03-30 22:00:01
 * @ Description:
 */

class DbMgr{
    private static _key:string="ppqq_com_";
    public static _init(){
        if(this.get(this._key+"uid"))return;
        this.save(this._key+"uid","uid"+new Date().getTime()+RandomUtils.getRandom(4));
    }
    /**保存数据
     * @param key 数据ID
     * @param data 要保存的数据对象
     * @param period 数据有效期(分钟)，默认为 0永久
     */
    public static save(key:string,data:any,period:number=0){
        let _data={t:new Date().getTime(),data:data,period:period,type:"0"};
        if(typeof(data)=="object"){
            _data.data=JSON.stringify(data);
            _data.type="1";
        }
        cc.sys.localStorage.setItem(key,JSON.stringify(_data));
    }
    /**保存数据，当天有效 */
    public static saveToday(key:string,data:any){
        let d=new Date();
        let m=(24-d.getHours()+1)*60-d.getMinutes();
        this.save(key,data,m);
    }
    /**获取缓存
     * return 如果是对象，会自动解析成object，无需手动再转换
    */
    public static get(key:string){
        try{
            var data = JSON.parse(<string>cc.sys.localStorage.getItem(key));
            if( data==null)
                return cc.sys.localStorage.getItem(key);
            let st:number=parseInt(data.t);
            let et:number=new Date().getTime();
            let period:number=parseInt(data.period);
            if(period!=0&&et-st>period*60*1000){
                this.remove(key);
                return null;
            }
            return data.type==0?data.data:JSON.parse(data.data);
        }catch(err){
            return cc.sys.localStorage.getItem(key);
        }
    }
    /**移除缓存 */
    public static remove(key:string){
        cc.sys.localStorage.removeItem(key);
    }
    /**清除所有数据 */
    public static clear(){
        cc.sys.localStorage.clear();
    }
}
window["DbMgr"]=DbMgr;