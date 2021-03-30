
import Timer from '../../com/utils/Timer';
import BaseUi from '../base/BaseUi';
import FightCmd from '../fight/FightCmd';
import Monster from '../fight/Item/Monster';
import MonsterVo from '../fight/vo/MonsterVo';
import ObjPxy from '../proxy/ObjPxy';
import ResPxy from '../proxy/ResPxy';
import TbPxy from '../proxy/TbPxy';
import GStatus from '../public/GStatus';
import SkillCmd from './SkillCmd';
import SkillItem from './SkillItem';
import SkillUtils from './utils/SkillUtils';
import SkillVo from './vo/SkillVo';
const {ccclass, property} = cc._decorator;
@ccclass
class SkillUi extends BaseUi{
    @property(cc.Node)
    private nd:cc.Node=null;
    @property(cc.Node)
    private effNd:cc.Node=null;
    private cardSpace:number=42;
    private voList:Array<SkillVo>;
    private skillList:Array<cc.Node>=[];
    private sList:Array<SkillItem>=[];
    private skillNum:number=0;
    private touching:boolean=false;
    private drawing:boolean=false;
    private drawItem:SkillItem;
    private t:number=0;
    private e:any;
    onEnable(){
        this.nd.on(cc.Node.EventType.TOUCH_START,this.touchStart,this);
        this.nd.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this);
        this.nd.on(cc.Node.EventType.TOUCH_CANCEL,this.touchEnd,this);
        this.nd.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this);
        this.on(FightCmd.MONSTER_DIE,this.updateList,this);
        this.on("gm_add_skill",this.gmSkill,this);
    }
    private gmSkill(nd:cc.Node){
        let m:Monster=nd.getComponent("Monster");
		if(!m.vo||!m.vo.Skill||m.vo.useSkill)return;
		let sv:SkillVo=new SkillVo(TbPxy.getSkillInfo(m.vo.Skill));
		if(sv){
			sv.monUuid=m.uuid;
			sv.mon=nd;
			sv.monScript=m;
            this.voList.push(sv);
            this.bindData(this.voList);
            this.updateList(null);
		}
    }
    onDisable(){
        this.nd.off(cc.Node.EventType.TOUCH_START,this.touchStart,this);
        this.nd.off(cc.Node.EventType.TOUCH_END,this.touchEnd,this);
        this.nd.off(cc.Node.EventType.TOUCH_CANCEL,this.touchEnd,this);
        this.nd.off(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this);
        this.off(FightCmd.MONSTER_DIE,this);
    }
    public bindData(data){
        this.voList=data;
        this.skillNum=this.voList.length;
        this.cardSpace=SkillUtils.getSpace(this.skillNum);
        let mid:number=this.skillNum*0.5;
        let offset:number=this.cardSpace*0.5;
        for(let i:number=0;i<this.skillNum;i++){
            let nd:cc.Node=this.createSkillCard(this.voList[i],i==this.skillNum-1);
            nd.x=this.cardSpace*(i-mid)+offset;
        }
    }
    private updateList(v:SkillVo){
        let mid:number=this.skillNum*0.5;
        let offset:number=this.cardSpace*0.5;
        for(let i:number=0;i<this.skillNum;i++){
            if(v&&this.sList[i].vo.monUuid==v.monUuid){
                this.sList.splice(i,1)[0].reset();
                let nd:cc.Node=this.skillList.splice(i,1)[0];
                nd.parent=null;
                this.FREE(nd);
                this.skillNum=this.skillList.length;
                this.cardSpace=SkillUtils.getSpace(this.skillNum);
                mid=this.skillNum*0.5;
                i=0;
                continue;
            }
            this.skillList[i].x=this.cardSpace*(i-mid)+offset;
            this.skillList[i].zIndex=999+this.skillList[i].x;
            this.skillList[i].getComponent("SkillItem").refresh(this.cardSpace,i==this.skillNum-1);
        }
    }
    private createSkillCard(sv:SkillVo,isTop:boolean):cc.Node{
        let nd:cc.Node=this.NEW();
        let si:SkillItem=nd.getComponent("SkillItem");
        si.bind(sv,this.cardSpace,isTop);
        this.skillList.push(nd);
        this.sList.push(si);
        this.nd.addChild(nd);
        return nd;
    }
    private releaseSkill(v:SkillVo){
        if(v.monScript.vo)v.monScript.vo.useSkill=true;
        // this.emit(SkillCmd.SKILL_CONJURE+v.monUuid);
        this.emit(SkillCmd.SKILL_CONJURE);
        v.monScript.playSkillSpine(v,this.effNd,this.e?this.e.getLocation():cc.v2());
        this.updateList(v);
        Timer.setTimeOut("skillResume"+v.Tid,2,()=>{
            this.emit(SkillCmd.SKILL_SELECT_CANCEL);
        },this);
    }
    touchStart(e){ 
        this.touching=true;
        this.e=e;
        this.checkTouch();
    }
    touchEnd(e){
        if(this.drawItem)this.releaseSkill(this.drawItem.vo);
        this.emit(SkillCmd.SKILL_SELECT_CANCEL);
        GStatus.fightStatus=1;
        this.touching=false;
        this.drawing=false;
        this.drawItem=null;
        for(let i:number=0;i<this.skillNum;i++){
            this.sList[i].hide();
        }
    }
    checkTouch(){
        let show:boolean=false;
        let pos=this.e.getLocation();
        for(let i:number=0;i<this.skillNum;i++){
            if(this.sList[i].isTouch(pos)){
                if(show)return;
                this.emit(SkillCmd.SKILL_PREVIEW+this.sList[i].vo.monUuid);
                this.sList[i].show();
                show=true;
            }else if(this.sList[i].isDrawUp(pos)){
                this.drawing=true;
                this.drawItem=this.sList[i];
                // this.emit(SkillCmd.SKILL_SELECT);
                GStatus.fightStatus=2;
            }else{
                if(this.sList[i].vo)this.emit(SkillCmd.SKILL_SELECT_CANCEL+this.sList[i].vo.monUuid);
                this.sList[i].hide();
            }
        }
    }
    touchMove(e){
        this.e=e;
        if(this.drawItem){
            this.drawItem.move(e.getLocation());
            if(this.drawItem.isReset(e.getLocation())){
                GStatus.fightStatus=1;
                this.drawItem.hide();
                this.drawItem=null;
                this.drawing=false;
            }
        }
    }
    clear(){
        this.emit(SkillCmd.SKILL_SELECT_CANCEL);
        this.touchEnd(null);
        this.touching=false;
        this.drawing=false;
        this.drawItem=null;
        this.t=0;
        this.skillNum=0;
        while(this.skillList.length>0){
            this.FREE(this.skillList.shift());
        }
        while(this.sList.length>0){
            this.sList.shift().reset();
        }
        this.effNd.removeAllChildren();
        this.nd.removeAllChildren();
    }
    update(dt){
        if(!this.touching||this.drawing)return;
        this.t++;
        if(this.t>5){
            this.t=0;
            this.checkTouch();
        }
    }
    destory(){
        //todo
    }
}