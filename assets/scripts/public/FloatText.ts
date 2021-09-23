import Timer from "../com/utils/Timer";

/*
 * @Author: phhui
 * @Date: 2021-02-03 17:11:31
 * @LastEditTime: 2021-03-12 20:03:27
 * @LastEditors: phhui
 * @Description: 生成一个向上飘的文字提示，暂时只支持数字，其它文字需要prefab中字体支持
 * @FilePath: \ro\assets\Script\modules\public\FloatText.ts
 */
export default class FloatText{
    private static _self:FloatText;
    private pool:Array<cc.Node>=[];
    private pf:cc.Prefab;
    private offset:number=300;
    public static get self(){
        if(!this._self)this._self=new FloatText();
        return this._self;
    }
    public preload(){
        // ResPxy.loadPrefab("public/FloatText",(pf)=>{
        //     this.pf=pf;
        // },this);
    }
    /**
     * @description: 创建一个向上飘的文本并自动播放
     * @param {string} str  文本内容
     * @param {cc} parent 父节点
     * @param {cc} color 文字颜色
     * @param {cc} pos 初始坐标，默认为0，0
     * @param {cc} endPos 终点坐标，默认向上偏移200像素
     * @return {*}
     */
    public create(str:string,parent:cc.Node,color:cc.Color=null,pos:cc.Vec3=null,endPos:cc.Vec3=null){
        if(!this.pf){
            this.preload();
            Timer.setTimeOut("delayShowFloatTip",1,()=>{
                this.create(str,parent,color,pos,endPos);
            },this);
            return;
        }
        let nd:cc.Node=this.NEW();
        nd.getChildByName("label").getComponent(cc.Label).string=str;
        if(color)nd.getChildByName("label").color=color;
        nd.parent=parent;
        nd.zIndex=9999;
        if(pos)nd.setPosition(pos);
        let toPos:any=endPos?endPos:(pos?cc.v2(pos.x,pos.y+this.offset):cc.v2(0,this.offset));
        cc.tween(nd).to(1.2,{position:toPos,opacity:0}).call((...args)=>{
            this.FREE(nd);
        }).start();
    }
    /**
     * @description: 创建一个向上飘的文本并自动播放
     * @param {string} str  文本内容
     * @param {cc} parent 父节点
     * @param {cc} pos 初始坐标，默认为0，0
     * @param {cc} endPos 终点坐标，默认向上偏移200像素
     * @return {*}
     */
    public tip(str:string,parent:cc.Node,pos:cc.Vec3=null,endPos:cc.Vec3=null){
        if(!this.pf){
            this.preload();
            Timer.setTimeOut("delayShowFloatTip",1,()=>{
                this.tip(str,parent,pos,endPos);
            },this);
            return;
        }
        let nd:cc.Node=this.NEW();
        nd.getChildByName("text").getComponent(cc.Label).string=str;
        nd.getChildByName("text").active=true;
        nd.parent=parent;
        nd.zIndex=9999;
        if(pos)nd.setPosition(pos);
        let toPos:any=endPos?endPos:(pos?cc.v2(pos.x,pos.y+this.offset):cc.v2(0,this.offset));
        cc.tween(nd).to(1.2,{position:toPos,opacity:0}).start();
        Timer.setTimeOut("ft_"+nd.uuid,1.2,()=>{
            this.FREE(nd);
        },this);
    }
    private NEW():cc.Node{
        if(this.pool.length>0)return this.pool.shift();
        else return cc.instantiate(this.pf);
    }
    private FREE(nd:cc.Node){
        nd.opacity=255;
        nd.parent=null;
        nd.getChildByName("text").active=false;
        nd.getChildByName("label").active=true;
        nd.getChildByName("label").getComponent(cc.Label).string="";
        nd.getChildByName("label").getComponent(cc.Label).string="";
        nd.setPosition(cc.v2(0,0));
        if(this.pool.length<200)this.pool.push(nd);
        else nd.destroy();
    }
}
window["FloatText"]=FloatText;