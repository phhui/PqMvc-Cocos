import PointUtils from "../../../com/utils/PointUtils";
import Timer from "../../../com/utils/Timer";
import Log from "../../../core/mgr/Log";
import Monster from "../../fight/Item/Monster";
import EffectType from "../const/EffectType";
import ObjectsType from "../const/ObjectsType";
import SkillVo from "../vo/SkillVo";
import BuffUtils from "./BuffUtils";

/*
 * @Author: phhui
 * @Date: 2021-02-26 18:03:19
 * @LastEditTime: 2021-03-17 15:39:48
 * @LastEditors: phhui
 * @Description: 
 * @FilePath: \ro\assets\Script\modules\skill\utils\ActiveSkillUtils.ts
 */
export default class ActiveSkillUtils{
    private static monScriptName:string="Monster";
    /**主动技能结算 */
    public static skillClose(v:SkillVo,partnerList:Array<cc.Node>,enemyList:Array<cc.Node>){
        let n:number=enemyList.length;
        let hurtList:Array<cc.Node>=[];
        if(v.Objects==ObjectsType.SKILL_NO){
            Log.log("未配置技能作用对象！");
            return;
        }
        if(v.Objects==ObjectsType.SKILL_RANDOM_ENEMY){
            for(let i:number=0;i<n;i++){
                if(i<v.ObjectsNums){
                    let m:Monster=enemyList[i].getComponent(this.monScriptName);
                    m.skillSettle(v);
                }
            }
        }else if(v.Objects==ObjectsType.SKILL_RANG_ENEMY){
            for(let i:number=0;i<n;i++){
                if(i<v.ObjectsNums&&PointUtils.getDis(v.mon.position,enemyList[i].position)<v.monScript.vo.range){
                    let m:Monster=enemyList[i].getComponent(this.monScriptName);
                    m.skillSettle(v);
                }
            }
        }else if(v.Objects==ObjectsType.SKILL_SELF)v.monScript.skillSettle(v);
        else if(v.Objects==ObjectsType.SKILL_RANG_OUR){
            n=partnerList.length;
            for(let i:number=0;i<n;i++){
                if(i<v.ObjectsNums){
                    let m:Monster=partnerList[i].getComponent(this.monScriptName);
                    m.skillSettle(v);
                }
            }
        }else if(v.Objects==ObjectsType.SKILL_DISTANCE_ENEMY){
            hurtList=enemyList.slice(0,n);
            hurtList.sort((a,b)=>{
                return PointUtils.getDis(v.mon.position,a.position)-PointUtils.getDis(v.mon.position,b.position);
            });
            let m:number=Math.min(v.ObjectsNums,hurtList.length);
            for(let j:number=0;j<m;j++){
                let m:Monster=enemyList[j].getComponent(this.monScriptName);
                m.skillSettle(v);
            }
        }
    }
    /**主动技能作用对象列表 */
    public static getSkillTarget(v:SkillVo,partnerList:Array<cc.Node>,enemyList:Array<cc.Node>):Array<Monster>{
        let n:number=enemyList.length;
        let targetList:Array<Monster>=[v.monScript];
        if(v.Objects==ObjectsType.SKILL_NO){
            Log.log("未配置技能作用对象！");
            return targetList;
        }
        if(v.Objects==ObjectsType.SKILL_RANDOM_ENEMY){
            for(let i:number=0;i<n;i++){
                if(i<v.ObjectsNums){
                    targetList.push(enemyList[i].getComponent(this.monScriptName));
                }
            }
        }else if(v.Objects==ObjectsType.SKILL_RANG_ENEMY){
            for(let i:number=0;i<n;i++){
                if(i<v.ObjectsNums&&PointUtils.getDis(v.mon.position,enemyList[i].position)<v.monScript.vo.range){
                    let m:Monster=enemyList[i].getComponent(this.monScriptName);
                    targetList.push(m);
                }
            }
        }//else if(v.Objects==ObjectsType.SKILL_SELF)v.monScript.skillSettle(v);
        else if(v.Objects==ObjectsType.SKILL_RANG_OUR){
            n=partnerList.length;
            for(let i:number=0;i<n;i++){
                if(i<v.ObjectsNums){
                    let m:Monster=partnerList[i].getComponent(this.monScriptName);
                    targetList.push(m);
                }
            }
        }else if(v.Objects==ObjectsType.SKILL_DISTANCE_ENEMY){
            let tmpList=enemyList.slice(0,n);
            tmpList.sort((a,b)=>{
                return PointUtils.getDis(v.mon.position,a.position)-PointUtils.getDis(v.mon.position,b.position);
            });
            let m:number=Math.min(v.ObjectsNums,tmpList.length);
            for(let j:number=0;j<m;j++){
                let m:Monster=enemyList[j].getComponent(this.monScriptName);
                targetList.push(m);
            }
        }
        return targetList;
    }
    /**处理怪物受到的主动技能效果    
     * @param m 自己
     * @param v 技能数据
    */
    public static skillEffect(m:Monster,v:SkillVo){
        Log.log("施放主动技能："+v.Tid+":"+v.Effect+"    "+v.Name);
        //***需要根据技能效果 区分m是已方还是敌方***
        switch(v.Effect){
            /**无*/
            case EffectType.NO:
                Log.log("未配置技能伤害效果");
            break;
            /**直接伤害百分比*/
            case EffectType.DAMAGE_PER:
                m.beHurt(m.vo.blood*v.getNum(m.vo.Form)*0.01,v.monScript);
            break;
            /** 产生Buff*/
            case EffectType.ADDBUFF:
                //表设计逻辑不通，此条件等于无效不做处理，只要有BUFF必触发，无需此属性
            break;
            /**伤害加Buff*/
            case EffectType.DAMGEBUFF:
                //没用，不处理
            break;
            /**直接治疗*/
            case EffectType.HEAL:
                m.vo.blood+=Math.min(v.getNum(m.vo.Form),m.vo.maxBlood-m.vo.blood);
            break;
            /**击退*/
            case EffectType.HITBACK:
                m.node.y+=v.getNum(m.vo.Form);
            break;
            /**反弹伤害*/
            case EffectType.DERIVE_DAMAGE:
                m.vo.buffAttr.rebound=v.getNum(m.vo.Form);
            break;
            /**格挡伤害*/
            case EffectType.DEFENT_DAMAGE:
                m.vo.buffAttr.parry=v.getNum(m.vo.Form);
            break;
            /**变身术*/
            case EffectType.CHANGE_FORM:
                m.vo.blood+=v.getNum(m.vo.Form);
            break;
            /**无视物理防御*/
            case EffectType.DEFY_PD_DEFEND:
                m.vo.buffAttr.losePhDef=0;
            break;
            /**增加物理强度*/
            case EffectType.ADD_PS_VALUE:
                m.vo.buffAttr.phAtkExtra=v.getNum(m.vo.Form);
            break;
            /**增加魔法强度*/
            case EffectType.ADD_MS_VALUE:
                m.vo.buffAttr.mgAtkExtra=v.getNum(m.vo.Form);
            break;
            /**血量伤害百分比*/
            case EffectType.DAMAGE_HP_PER:
                m.vo.buffAttr.hurtRatioUp=v.getNum(m.vo.Form);
            break;
            /**百分比伤害加成*/
            case EffectType.DAMAGE_ADD_PER:
                m.vo.buffAttr.hurtRatioUp=v.getNum(m.vo.Form);
            break;
            /**生成低一阶段的怪物*/
            case EffectType.NEW_LOW_FORM:
                m.copy(m.vo.Form-1);
            break;
            /**复活*/
            case EffectType.RELIVE:
                m.resurgence();
            break;
            /**吸血*/
            case EffectType.BLOOD_SUCK:
                v.monScript.vo.blood+=m.vo.blood*v.getNum(v.monScript.vo.Form)*0.01;
            break;
            /**嗜血*/
            case EffectType.SPEECH:
                m.vo.buffAttr.hurtExtra=m.vo.blood*m.vo.hurt/m.vo.maxBlood;
            break;
            /**追击*/
            case EffectType.CHASING:
                m.vo.buffAttr.phAtkExtra=m.killNum*v.getNum(m.vo.Form);
            break;
            /**爆头*/
            case EffectType.SPIKE:
                m.vo.buffAttr.spike=1;
            break;
            /**生成指定阶段的怪物*/
            case EffectType.NEW_MARK_FORM:
                m.copy(v.getNum(m.vo.Form));
            break;
            /**死亡免疫*/
            case EffectType.DEAD_IMMUNO:
                m.vo.buffAttr.huiGuangHuanZhao=true;
            break;
            /**额外多个敌人伤害百分比*/
            case EffectType.DAMAGE_PER_ENEMY:
                m.vo.buffAttr.atkObjNum=v.getNum(m.vo.Form);
            break;
            /**圣灵召唤*/
            case EffectType.HOLY_SPRIT:
                //策划也不知道是什么鬼！
            break;
            /**目标血量DOT*/
            case EffectType.DAMAGE_DOT_HP:
                Timer.addListen("DAMAGE_DOT_HP"+m.uuid,1,()=>{
                    m.skillHurt(m.vo.blood*v.getNum(m.vo.Form)*0.01);
                },this,3);//不知道具体作用时间，暂时定死3秒
            break;
            /**本次伤害DOT*/
            case EffectType.DAMAGE_DOT_DAMAGE:
                //不知道什么鬼，不处理
            break;
            /**伤害并击退*/
            case EffectType.DAMAGE_HITBACK:
                m.node.y-=v.getNum(m.vo.Form);
            break;
            /**无视魔法防御*/
            case EffectType.DEFY_MD_DEFEND:
                m.vo.buffAttr.loseMgDef=0;
            break;
            /**镜像自身*/
            case EffectType.IMAGE_SELF:
                let copyMon:Monster=m.copy(m.vo.Form,m.vo.lv);
                copyMon.vo.blood=m.vo.blood;
            break;
            /**本次普通攻击无效*/
            case EffectType.DODGE:
                m.vo.blood+=v.monScript.vo.hurtValue(m.vo);//直接将扣掉的血量补回去
            break;
            /**直接治疗生命值百分比*/
            case EffectType.HEAL_PER:
                m.vo.blood+=m.vo.blood*v.getNum(m.vo.Form)*0.01;
            break;
            /**近战转远程*/
            case EffectType.SHORT_CHANGE_REMOTE:
                //没用
            break;
            /**直接伤害百分比加基础数值*/
            case EffectType.DAMAGE_PER_NUM:
                m.beHurt(v.getNum(m.vo.Form)*0.01*m.vo.blood+m.vo.hurt,v.monScript);
            break;
        }
        if(v.Buff.length>0){
            for(let i:number=0;i<v.Buff.length;i++){
                BuffUtils.buffClose(v.monScript,v.Buff[i],m,0);
            }
        }
    }
}