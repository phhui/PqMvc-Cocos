import Tween from "../../com/utils/Tween";
import BaseUi from "../base/BaseUi";
import SkillVo from "./vo/SkillVo";

/*
 * @Author: phhui
 * @Date: 2021-02-23 10:04:03
 * @LastEditTime: 2021-03-13 19:53:58
 * @LastEditors: phhui
 * @Description: 
 * @FilePath: \ro\assets\Script\modules\skill\SkillItem.ts
 */
const {ccclass, property} = cc._decorator;
@ccclass
export default class SkillItem extends BaseUi{
    @property({type:[cc.Node]})
    private card:cc.Node[]=[];
    @property(cc.Node)
    private caution:cc.Node=null;
    @property(cc.Node)
    private panel:cc.Node=null;
    
    private _vo:SkillVo;

    /**技能卡片默认比例 */
    private cardScale:number=0.6;
    private cardId:number=0;
    private curCard:cc.Node;
    private pos:cc.Rect;
    private isShow:boolean=false;
    private touchOffset:number=18;
    private space:number=0;
    private drawOffset:number=40;
    private topOffset:number=0;
    onDisable(){
        this.reset();
    }
    public set vo(val){
        this._vo=val;
    }
    public get vo(){
        return this._vo;
    }
    public show(){
        this.isShow=true;
        this.node.zIndex=9999;
        Tween.to(this.curCard,0.1,{y:200,scale:1/this.cardScale});
    }
    public hide(){
        this.isShow=false;
        this.node.zIndex=this.node.x+999;
        Tween.to(this.curCard,0.1,{x:0,y:0,scale:1});
    }
    public bind(data:SkillVo,space:number,isTop:boolean){
        this.topOffset=isTop?Math.min(this.node.width-space,this.node.width):0;
        this.space=space;
        this.vo=data;
        if(this.curCard)this.curCard.active=false;
        this.cardId=this.cardId%this.card.length;
        this.curCard=this.card[this.cardId];
        this.curCard.active=true;
        this.node.zIndex=this.node.x+999;
    }
    public move(pos:cc.Vec2){
        if(!this.curCard)return;
        if(!this.pos)this.pos=this.node.getBoundingBoxToWorld();
        this.curCard.x=(pos.x-this.pos.x-this.curCard.width*0.5);
        this.curCard.y=(pos.y-this.pos.y-this.curCard.height*0.5);
    }
    public isReset(pos:cc.Vec2){
        return pos.y<this.pos.y+this.pos.height;
    }
    public isDrawUp(pos:cc.Vec2){
        if(!this.isShow)return false;
        if(!this.pos)this.pos=this.node.getBoundingBoxToWorld();
        if(pos.x>this.pos.x&&pos.x<this.pos.x+this.touchOffset+this.drawOffset+this.space&&pos.y>this.pos.y+this.pos.height*0.4)return true;
        return false;
    }
    public isTouch(pos:cc.Vec2){
        if(!this.pos)this.pos=this.node.getBoundingBoxToWorld();
        if(pos.x>this.pos.x+this.touchOffset&&
            pos.x<this.pos.x+this.space+this.touchOffset+this.topOffset&&
            pos.y>this.pos.y&&
            pos.y<this.pos.y+this.pos.height)return true;
        return false;
    }
    public refresh(space:number,isTop:boolean){
        this.topOffset=isTop?Math.min(this.node.width-space,this.node.width):0;
        this.space=space;
        this.pos=this.node.getBoundingBoxToWorld();
    }
    public reset(){
        this.hide();
        this.cardId=0;
        this.pos=null;
        this.isShow=false;
        this.topOffset=0;
        this.space=0;
        this.vo=null;
    }
}