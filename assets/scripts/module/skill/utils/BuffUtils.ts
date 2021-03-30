import Timer from "../../../com/utils/Timer";
import Log from "../../../core/mgr/Log";
import Monster from "../../fight/Item/Monster";
import BuffType from "../const/BuffType";
import BuffVo from "../vo/BuffVo";

/**
 * @Author: phhui
 * @Date: 2021-02-26 18:56:30
 * @LastEditTime: 2021-02-27 14:19:28
 * @LastEditors: phhui
 * @Description: BUFF逻辑类
 * @FilePath: \ro\assets\Script\modules\skill\utils\BuffUtils.ts
 */
export default class BuffUtils{
    /**BUFF结算
     * @param m 触发目标
     * @param bv buff数据
     * @param target 作用目标
     * @param hurt 产生的伤害
     */
    public static buffClose(m:Monster,bv:BuffVo,target:Monster,hurt:number=0){
        Log.log("产生BUFF："+bv.Tid+":"+bv.type+"    "+bv.Name);
        switch(bv.type){
            case BuffType.NO://无
                Log.log("无效的BUFF");
            break;
            case BuffType.BUFF_DAMAGE_UP://伤害提升
                m.vo.buffAttr.hurtExtra=m.vo.hurt*bv.Num[m.vo.Form]*0.01;
                Timer.setTimeOut("BUFF_DAMAGE_UP"+m.uuid,bv.Time[m.vo.Form]*0.001,()=>{
                    m.vo.buffAttr.hurtExtra=0;
                },this);
            break;
            case BuffType.BUFF_AVATAR://分身术
                let n:number=bv.Num[m.vo.Form];
                for(let i:number=0;i<n;i++){
                    let copyMon:Monster=m.copy(m.vo.Form,m.vo.lv);
                    copyMon.vo.blood=m.vo.blood;
                    Timer.setTimeOut("monsterTimeoutDie"+copyMon.uuid,bv.Time[copyMon.vo.Form-1]*0.001,()=>{
                        if(copyMon&&copyMon.vo)copyMon.realHurt(copyMon.vo.blood);
                    },this);
                }
            break;
            case BuffType.BUFF_DIZZY://眩晕
                target.vo.buffAttr.dizz=bv.Num[m.vo.Form]*0.01;
                Timer.setTimeOut("BUFF_DIZZY"+m.uuid,bv.Time[m.vo.Form]*0.001,()=>{
                    if(!m||!m.vo)return;
                    m.vo.buffAttr.dizz=0;
                },this);
            break;
            case BuffType.BUFF_DAMAGE_LOW_FAR://减免远程伤害
                m.vo.buffAttr.longDef=bv.Num[m.vo.Form]*0.01;
                Timer.setTimeOut("BUFF_DAMAGE_LOW_FAR"+m.uuid,bv.Time[m.vo.Form]*0.001,()=>{
                    m.vo.buffAttr.longDef=0;
                },this);
            break;
            case BuffType.BUFF_DEAD_IMMUNO://死亡免疫
                m.vo.buffAttr.huiGuangHuanZhao=true;
                Timer.setTimeOut("BUFF_DEAD_IMMUNO"+m.uuid,bv.Time[m.vo.Form]*0.001,()=>{
                    m.vo.buffAttr.huiGuangHuanZhao=false;
                },this);
            break;
            case BuffType.BUFF_HOLY_SPRIT://圣灵召唤
                //没用，不管
            break;
            case BuffType.BUFF_HEGEMOR_ARMOR://伤害减免加不被击退
                if(!m||!m.vo)return;
                m.vo.buffAttr.hurtDef=bv.Num[m.vo.Form]*0.01;
                m.vo.buffAttr.repelDef=true;
                Timer.setTimeOut("BUFF_HEGEMOR_ARMOR"+m.uuid,bv.Time[m.vo.Form]*0.001,()=>{
                    if(!m.vo)return;
                    m.vo.buffAttr.repelDef=false;
                    m.vo.buffAttr.hurtDef=0;
                },this);
            break;
            case BuffType.BUFF_DAMAGE_LOW://伤害减免
                m.vo.buffAttr.hurtDef=bv.Num[m.vo.Form]*0.01;
                Timer.setTimeOut("BUFF_DAMAGE_LOW"+m.uuid,bv.Time[m.vo.Form]*0.001,()=>{
                    m.vo.buffAttr.hurtDef=0;
                },this);
            break;
            case BuffType.BUFF_DAMAGE_UP_CRIT://伤害提升且必爆
                m.vo.buffAttr.hurtRatioUp=bv.Num[m.vo.Form]*0.01;
                Timer.setTimeOut("BUFF_DAMAGE_UP_CRIT"+m.uuid,bv.Time[m.vo.Form]*0.001,()=>{
                    m.vo.buffAttr.hurtRatioUp=0;
                },this);
            break;
            case BuffType.BUFF_HEAL_DOT://持续百分比回血
                Timer.addListen("BUFF_HEAL_DOT"+m.uuid,1,()=>{
                    if(!m.isDie)m.vo.blood+=m.vo.maxBlood*bv.Num[m.vo.Form]*0.01;
                },this,null,bv.Time[m.vo.Form]*0.001);
            break;
            case BuffType.BUFF_DAMAGE_DOT://持续百分比掉血
                Timer.addListen("BUFF_DAMAGE_DOT"+target.uuid,1,()=>{
                    if(!target.isDie)target.vo.blood-=target.vo.maxBlood*bv.Num[target.vo.Form]*0.01;
                },this,null,bv.Time[target.vo.Form]*0.001);
            break;
            case BuffType.BUFF_HEAL_IMMUNO://免疫伤害并转为血量
                m.vo.buffAttr.hurtToBlood=bv.Num[m.vo.Form]*0.01;
                Timer.setTimeOut("BUFF_HEAL_IMMUNO"+m.uuid,bv.Time[m.vo.Form]*0.001,()=>{
                    m.vo.buffAttr.hurtToBlood=0;
                },this);
            break;
            case BuffType.BUFF_END_DAMAGE://持续一段时间造成伤害
                Timer.addListen("BUFF_END_DAMAGE"+target.uuid,1,()=>{
                    if(!target.isDie)target.vo.blood-=target.vo.maxBlood*bv.Num[target.vo.Form]*0.01;
                },this,null,bv.Time[target.vo.Form]*0.001);
            break;
            case BuffType.BUFF_SILENT://所有被动技能无效持续一段时间
                if(!target.vo.buffAttr.buffDef){
                    target.vo.buffAttr.buffLose=true;
                    Timer.setTimeOut("BUFF_SILENT"+m.uuid,bv.Time[m.vo.Form]*0.001,()=>{
                        m.vo.buffAttr.buffLose=false;
                    },this);
                }
            break;
            case BuffType.BUFF_CHARM://持续一段时间造成伤害减少
                m.vo.buffAttr.hurtDef=bv.Num[m.vo.Form]*0.01;
                Timer.setTimeOut("BUFF_CHARM"+m.uuid,bv.Time[m.vo.Form]*0.001,()=>{
                    m.vo.buffAttr.hurtDef=0;
                },this);
            break;
            case BuffType.BUFF_IMMUNITYACITIVE://免疫所有减益效果
                m.vo.buffAttr.buffDef=true;
                Timer.setTimeOut("BUFF_IMMUNITYACITIVE"+m.uuid,bv.Time[m.vo.Form]*0.001,()=>{
                    m.vo.buffAttr.buffDef=false;
                },this);
            break;
            case BuffType.BUFF_ADD_BASEDAMAGE_SPEED://增强基础伤害和攻速
                m.vo.buffAttr.hurtExtra=m.vo.hurt*bv.Num[m.vo.Form]*0.01;
                m.vo.buffAttr.atkSpeedUp=m.vo.Speed*bv.Num[m.vo.Form]*0.01;
                Timer.setTimeOut("BUFF_ADD_BASEDAMAGE_SPEED"+m.uuid,bv.Time[m.vo.Form]*0.001,()=>{
                    m.vo.buffAttr.hurtExtra=0;
                    m.vo.buffAttr.atkSpeedUp=0;
                },this);
            break;
        }
        if(target)target.showBuffEff(bv);
    }
}