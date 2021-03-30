import Timer from "../../../com/utils/Timer";
import Log from "../../../core/mgr/Log";
import Monster from "../../fight/Item/Monster";
import ConditionType from "../const/ConditionType";
import EffectType from "../const/EffectType";
import TimeParameterType from "../const/TimeParameterType";
import PassiveSkillLvVo from "../vo/PassiveSkillLvVo";
import PassiveSkillVo from "../vo/PassiveSkillVo";
import BuffUtils from "./BuffUtils";

/** 
 * @Author: phhui
 * @Date: 2021-02-26 18:03:32
 * @LastEditTime: 2021-02-27 14:22:59
 * @LastEditors: phhui
 * @Description: 被动技能逻辑类
 * @FilePath: \ro\assets\Script\modules\skill\utils\PassiveSkillUtils.ts
 */
export default class PassiveSkillUtils{
    /**触发被动技能    
     * @param m       自己    
     * @param target  攻击时为目标敌人，被攻击时为攻击者    
     * @param hurt    攻击时为对目标敌人造成的伤害值，被攻击时为将受到的伤害值*/
    public static passiveSkill(triggerType:number,m:Monster,hurt:number,target:Monster,hurtType:number){
        for(let i:number=0;i<m.vo.passiveSkill.length;i++){
            let v:PassiveSkillVo=m.vo.passiveSkill[i];
            let lvo:PassiveSkillLvVo=m.vo.passiveSkillLvList[i];
            if(lvo.Lv<1)return;
            if(v.InTime!=triggerType)continue;
            if(v.Condition==ConditionType.PASSIVE_CONDITION_FORM&&m.vo.Form<=target.vo.Form)continue;
            if(v.Condition==ConditionType.PASSIVE_CONDITION_PROBALY&&this.luckNum>lvo.SkillExtParam)continue;
            if(v.Condition==ConditionType.PASSIVE_CONDITION_TANK_FORM&&target.vo.family&&target.vo.family.Type!==2)continue;
            if(v.Condition==ConditionType.PASSIVE_CONDITION_LOW_PER&&m.vo.blood>=m.vo.maxBlood)continue;
            if(v.Condition==ConditionType.PASSIVE_CONDITION_PROBALY_FORM&&(this.luckNum>lvo.SkillExtParam||m.vo.Form>=target.vo.Form))continue;
            if(v.Condition==ConditionType.PASSIVE_CONDITION_PROBALY_LOW&&(this.luckNum>lvo.SkillExtParam||m.vo.blood>=m.vo.maxBlood))continue;
            if(v.Condition==ConditionType.PASSIVE_CONDITION_SELF_ALL_DEAD&&m.partnerList.length>1)continue;
            if(v.Condition==ConditionType.PASSIVE_CONDITION_ATTACK_COUNT&&m.atkNum<=lvo.SkillExtParam)continue;
            // if(v.Condition==ConditionType.PASSIVE_CONDITION_CRITS)不了解，暂不处理
            // if(v.Condition==ConditionType.PASSIVE_CONDITION_MONSTER_NO_OUR)略麻烦，丢后面
            if(v.TimeParameter==TimeParameterType.FAR&&(!target||!target.vo.isShooter))continue;
            if(v.TimeParameter==TimeParameterType.NEAR&&(!target||target.vo.isShooter))continue;
            if(v.TimeParameter==TimeParameterType.SKILL&&hurtType==0)continue;
            if(v.TimeParameter==TimeParameterType.HURT&&hurtType==1)continue;
            Log.log("触发被动技能："+v.Tid+":"+v.Effect+"   "+v.Name);
            m.showPassiveSkillTip(v);
            switch(v.Effect){
                /**无*/
                case EffectType.NO:
                    Log.log("未配置技能伤害效果");
                break;
                /**直接伤害百分比*/
                case EffectType.DAMAGE_PER:
                    m.skillHurt(m.vo.blood*lvo.SkillParam*0.01);
                break;
                /** 产生Buff*/
                case EffectType.ADDBUFF:
                    if(target&&this.luckNum<lvo.SkillExtParam)BuffUtils.buffClose(m,v.Buff,target,hurt);
                break;
                /**伤害加Buff*/
                case EffectType.DAMGEBUFF:
                    //没用，不处理
                break;
                /**直接治疗*/
                case EffectType.HEAL:
                    m.vo.blood+=Math.min(lvo.SkillParam*0.01,m.vo.maxBlood-m.vo.blood);
                break;
                /**击退*/
                case EffectType.HITBACK:
                    if(target&&this.luckNum<lvo.SkillExtParam&&m.vo.Form>target.vo.Form)target.node.y+=lvo.SkillParam;
                break;
                /**反弹伤害*/
                case EffectType.DERIVE_DAMAGE:
                    if(target)target.skillHurt(hurt*lvo.SkillParam*0.01);
                break;
                /**格挡伤害*/
                case EffectType.DEFENT_DAMAGE:
                    m.vo.buffAttr.parry=lvo.SkillParam*0.01;
                break;
                /**变身术*/
                case EffectType.CHANGE_FORM:
                    m.vo.blood+=lvo.SkillParam;
                break;
                /**无视物理防御*/
                case EffectType.DEFY_PD_DEFEND:
                    m.vo.buffAttr.losePhDef=0;
                break;
                /**增加物理强度*/
                case EffectType.ADD_PS_VALUE:
                    if(!m.buffTrigger)m.vo.buffAttr.phAtkExtra+=lvo.SkillParam;
                break;
                /**增加魔法强度*/
                case EffectType.ADD_MS_VALUE:
                    if(!m.buffTrigger)m.vo.buffAttr.mgAtkExtra+=lvo.SkillParam;
                break;
                /**血量伤害百分比*/
                case EffectType.DAMAGE_HP_PER:
                    //策划也不知道是什么鬼！
                break;
                /**百分比伤害加成*/
                case EffectType.DAMAGE_ADD_PER:
                    if(target&&m.vo.Form>target.vo.Form||target.vo.family.Type==2)m.vo.buffAttr.hurtExtra+=lvo.SkillParam*0.01;
                break;
                /**生成低一阶段的怪物*/
                case EffectType.NEW_LOW_FORM:
                    if(m.vo.blood<m.vo.maxBlood)m.copy(m.vo.Form-1,m.vo.lv);
                break;
                /**复活*/
                case EffectType.RELIVE:
                    if(this.luckNum<lvo.SkillExtParam)m.vo.blood=m.vo.maxBlood;
                break;
                /**吸血*/
                case EffectType.BLOOD_SUCK:
                    if(!target)return;
                    m.vo.blood+=lvo.SkillParam;
                    target.vo.blood-=lvo.SkillParam;
                break;
                /**嗜血*/
                case EffectType.SPEECH:
                    if(m.vo.blood<m.vo.maxBlood)m.vo.buffAttr.hurtExtra=m.vo.blood*m.vo.hurt/m.vo.maxBlood;
                break;
                /**追击*/
                case EffectType.CHASING:
                    m.vo.buffAttr.phAtkExtra=m.killNum*lvo.SkillParam;
                break;
                /**爆头*/
                case EffectType.SPIKE:
                    if(this.luckNum<lvo.SkillExtParam&&m.vo.blood/m.vo.maxBlood<lvo.ConditionParam*0.01)m.vo.buffAttr.spike=1;
                break;
                /**生成指定阶段的怪物*/
                case EffectType.NEW_MARK_FORM:
                    m.copy(lvo.SkillParam,1);
                break;
                /**死亡免疫--死亡后继续战斗X秒*/
                case EffectType.DEAD_IMMUNO:
                    m.vo.buffAttr.huiGuangHuanZhao=true;
                    Timer.setTimeOut("DEAD_IMMUNO",lvo.BuffParameterTime*0.001,()=>{
                        m.realDie();
                    },this);
                break;
                /**额外多个敌人伤害百分比*/
                case EffectType.DAMAGE_PER_ENEMY:
                    if(m.partnerList.length<2)m.vo.buffAttr.atkObjNum=lvo.SkillParam;
                break;
                /**圣灵召唤*/
                case EffectType.HOLY_SPRIT:
                    //策划也不知道是什么鬼！
                break;
                /**目标血量DOT*/
                case EffectType.DAMAGE_DOT_HP:
                    if(!target||this.luckNum>lvo.SkillExtParam)return;
                    Timer.addListen("damage_dot_hp_"+target.uuid,1,()=>{
                        target.skillHurt(target.vo.blood*lvo.SkillExtParam*0.01);
                    },this,lvo.BuffParameterTime);
                break;
                /**本次伤害DOT*/
                case EffectType.DAMAGE_DOT_DAMAGE:
                    //学良不知道，应该没用，不处理！
                break;
                /**伤害并击退*/
                case EffectType.DAMAGE_HITBACK:
                    if(target)target.node.y-=lvo.SkillExtParam;
                break;
                /**无视魔法防御*/
                case EffectType.DEFY_MD_DEFEND:
                    m.vo.buffAttr.loseMgDef=0;
                break;
                /**镜像自身*/
                case EffectType.IMAGE_SELF:
                    if(m.atkNum<v.ObjectsNums)return;
                    let copyMon:Monster=m.copy(m.vo.Form,m.vo.lv);
                    copyMon.vo.blood=m.vo.blood;
                    m.atkNum=0;
                break;
                /**本次普通攻击无效*/
                case EffectType.DODGE:
                    m.vo.blood+=hurt;//直接将扣掉的血量补回去
                break;
                /**直接治疗生命值百分比*/
                case EffectType.HEAL_PER:
                    m.vo.blood+=m.vo.blood*lvo.SkillParam*0.01;
                break;
                /**近战转远程*/
                case EffectType.SHORT_CHANGE_REMOTE:
                    //学良说没用，不处理！
                break;
                /**直接伤害百分比加基础数值*/
                case EffectType.DAMAGE_PER_NUM:
                    if(target)target.skillHurt(lvo.SkillParam*0.01*target.vo.blood+m.vo.hurt);
                break;
            }
        }
        m.buffTrigger=true;
    }
    private static get luckNum(){
        return Math.random()*100;
    }
}