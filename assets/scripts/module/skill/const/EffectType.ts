/*
 * @Author: phhui
 * @Date: 2021-02-26 16:03:35
 * @LastEditTime: 2021-02-26 16:18:41
 * @LastEditors: phhui
 * @Description: 
 * @FilePath: \ro\assets\Script\modules\skill\const\EffectType.ts
 */
export default class EffectType{
    /**无*/
    public static NO:number=0;
    /**直接伤害百分比*/
    public static DAMAGE_PER:number=1;
    /**产生Buff*/
    public static ADDBUFF:number=2;
    /**伤害加Buff*/
    public static DAMGEBUFF:number=3;
    /**直接治疗*/
    public static HEAL:number=4;
    /**击退*/
    public static HITBACK:number=5;
    /**反弹伤害*/
    public static DERIVE_DAMAGE:number=6;
    /**格挡伤害*/
    public static DEFENT_DAMAGE:number=7;
    /**变身术*/
    public static CHANGE_FORM:number=8;
    /**无视物理防御*/
    public static DEFY_PD_DEFEND:number=9;
    /**增加物理强度*/
    public static ADD_PS_VALUE:number=10;
    /**增加魔法强度*/
    public static ADD_MS_VALUE:number=11;
    /**血量伤害百分比*/
    public static DAMAGE_HP_PER:number=12;
    /**百分比伤害加成*/
    public static DAMAGE_ADD_PER:number=13;
    /**生成低一阶段的怪物*/
    public static NEW_LOW_FORM:number=14;
    /**复活*/
    public static RELIVE:number=15;
    /**吸血*/
    public static BLOOD_SUCK:number=16;
    /**嗜血*/
    public static SPEECH:number=17;
    /**追击*/
    public static CHASING:number=18;
    /**爆头*/
    public static SPIKE:number=19;
    /**生成指定阶段的怪物*/
    public static NEW_MARK_FORM:number=20;
    /**死亡免疫*/
    public static DEAD_IMMUNO:number=21;
    /**额外多个敌人伤害百分比*/
    public static DAMAGE_PER_ENEMY:number=22;
    /**圣灵召唤*/
    public static HOLY_SPRIT:number=23;
    /**目标血量DOT*/
    public static DAMAGE_DOT_HP:number=24;
    /**本次伤害DOT*/
    public static DAMAGE_DOT_DAMAGE:number=25;
    /**伤害并击退*/
    public static DAMAGE_HITBACK:number=26;
    /**无视魔法防御*/
    public static DEFY_MD_DEFEND:number=27;
    /**镜像自身*/
    public static IMAGE_SELF:number=28;
    /**本次普通攻击无效*/
    public static DODGE:number=29;
    /**直接治疗生命值百分比*/
    public static HEAL_PER:number=30;
    /**近战转远程*/
    public static SHORT_CHANGE_REMOTE:number=31;
    /**主动技能独有--直接伤害百分比加基础数值*/
    public static DAMAGE_PER_NUM:number=32;
    /**--被动技能独有--伤害百分比叠加*/
    public static DAMAGE_OVERLYING_PER:number=32;
    /**--被动技能独有--发出多个弹道*/
    public static BULLET_AMOUNT:number=33;
    /**--被动技能独有--血量百分比加成*/
    public static PASSIVE_HP_PERCENT:number=34;
    /**--被动技能独有--伤害百分比加成*/
    public static PASSIVE_DEMAGE_PERCENT:number=35;
    /**--被动技能独有--生成一个有增幅的虚影对象*/
    public static PASSIVE_GENERATE:number=36;
    /**--被动技能独有--免疫暴击并反伤*/
    public static PASSIVE_NO_CRIT_REFLEX:number=37;
    /**--被动技能独有--持续百分比回血*/
    public static HEAL_PER_DOT:number=38;
}