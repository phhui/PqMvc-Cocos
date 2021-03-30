import TbPxy from "../../proxy/TbPxy";
import BuffVo from "./BuffVo";
import EffectVo from "./EffectVo";

/*
 * @Author: phhui
 * @Date: 2021-02-26 14:29:15
 * @LastEditTime: 2021-02-26 16:12:00
 * @LastEditors: phhui
 * @Description: 
 * @FilePath: \ro\assets\Script\modules\skill\vo\PassiveSkillVo.ts
 */
export default class PassiveSkillVo{
    /**技能ID*/
    public Tid:number;
    /**别名*/
    public Name:string;
    /**文本名字*/
    public TxName:string;
    /**文本名字*/
    public Des:string;
    /**头像*/
    public Icon:string;
    /**发生时刻/**"enum
    无:PASSIVE_NO:0
    物攻直接加成:PASSIVE_DIRECTLY_PS:1
    魔攻直接加成:PASSIVE_DIRECTLY_MS
    物防直接加成:PASSIVE_DIRECTLY_PD
    魔防直接加成:PASSIVE_DIRECTLY_MD
    双防直接加成:PASSIVE_DIRECTLY_BOTH_D
    血量直接增加百分比:PASSIVE_DIRECTLY_HP_PERCENT
    物防直接增加百分比:PASSIVE_DIRECTLY_PD_PERCENT
    魔防直接增加百分比:PASSIVE_DIRECTLY_MD_PERCENT
    物攻直接增加百分比:PASSIVE_DIRECTLY_PS_PERCENT
    魔攻直接增加百分比:PASSIVE_DIRECTLY_MS_PERCENT
    暴击率直接加成:PASSIVE_DIRECTLY_CRIT
    双攻直接加成:PASSIVE_DIRECTLY_BOTH_S
    伤害每100射程直接增加百分:PASSIVE_DIRECTLY_DB_PERCENT
    战斗开始:PASSIVE_BATTLE_BEGIN
    攻击前触发:PASSIVE_ATTACK_PRE
    攻击中触发:PASSIVE_ATTACK_MID
    攻击后触发:PASSIVE_ATTACK_BEHIND
    被击前触发:PASSIVE_BEATTACK_PRE
    被击中触发:PASSIVE_BEATTACK_MID
    被击后触发:PASSIVE_BEATTACK_BEHIND
    生命值:PASSIVE_HP
    伤害百分比加成:PASSIVE_PERCENT_DMG
    自身死亡触发:PASSIVE_DEAD
    1号技能等级上限增加:PASSIVE_SKILLLVUP
    2号技能等级上限增加:PASSIVE_SKILLLVUPS
    3号技能等级上限增加:PASSIVE_SKILLLVUPT
    射程直接增加:PASSIVE_DIRCTLY_RANGE
    目标死亡触发:PASSIVE_ENEMY_DEAD
    熟练度强化:PASSIVE_PROFICIENCY
    准备攻击时触发:PASSIVE_BEATTACK_READY
    攻速直接加成:PASSIVE_ATTACK_SPEED";*/
    public InTime:number;
    /**发生时刻参数*/
    public TimeParameter:number;
    /**触发条件
     * 无:PASSIVE_NO:0
    形态压制:PASSIVE_CONDITION_FORM
    概率触发:PASSIVE_CONDITION_PROBALY
    攻击目标为肉盾:PASSIVE_CONDITION_TANK_FORM
    血量低于最大血量:PASSIVE_CONDITION_PER
    血量百分比降低时:PASSIVE_CONDITION_LOW_PER
    概率触发和形态压制:PASSIVE_CONDITION_PROBALY_FORM
    概率触发和血量低于:PASSIVE_CONDITION_PROBALY_LOW
    我方所有家族死亡:PASSIVE_CONDITION_SELF_ALL_DEAD
    累计普通攻击:PASSIVE_CONDITION_ATTACK_COUNT
    暴击时触发:PASSIVE_CONDITION_CRITS
    我方场上无某类型家族时触发:PASSIVE_CONDITION_MONSTER_NO_OUR";*/
    public Condition:number;
    /**作用对象
     * 无:PASSIVE_NO:0
    自己:PASSIVE_SELF:1
    攻击者:PASSIVE_ATTACKER
    被攻击者:PASSIVE_BEATTACKER
    最近的敌方单位:PASSIVE_SENEMY
    随机友方单位:PASSIVE_ALLY*/
    public Objects:number;
    /**对象数量*/
    public ObjectsNums:number;
    /**无:NO:0
    直接伤害百分比:DAMAGE_PER
    产生Buff:ADDBUFF
    伤害加Buff:DAMGEBUFF
    直接治疗:HEAL
    击退:HITBACK
    反弹伤害:DERIVE_DAMAGE
    格挡伤害:DEFENT_DAMAGE
    变身术:CHANGE_FORM
    无视物理防御:DEFY_PD_DEFEND
    增加物理强度:ADD_PS_VALUE
    增加魔法强度:ADD_MS_VALUE
    血量伤害百分比:DAMAGE_HP_PER
    百分比伤害加成:DAMAGE_ADD_PER
    生成低一阶段的怪物:NEW_LOW_FORM
    复活:RELIVE
    吸血:BLOOD_SUCK
    嗜血:SPEECH
    追击:CHASING
    爆头:SPIKE
    生成指定阶段的怪物:NEW_MARK_FORM
    死亡免疫:DEAD_IMMUNO
    额外多个敌人伤害百分比:DAMAGE_PER_ENEMY
    圣灵召唤:HOLY_SPRIT
    目标血量DOT:DAMAGE_DOT_HP
    本次伤害DOT:DAMAGE_DOT_DAMAGE
    伤害并击退:DAMAGE_HITBACK
    无视魔法防御:DEFY_MD_DEFEND
    镜像自身:IMAGE_SELF
    本次普通攻击无效:DODGE
    直接治疗生命值百分比:HEAL_PER
    近战转远程:SHORT_CHANGE_REMOTE
    伤害百分比叠加:DAMAGE_OVERLYING_PER
    发出多个弹道:BULLET_AMOUNT
    血量百分比加成:PASSIVE_HP_PERCENT
    伤害百分比加成:PASSIVE_DEMAGE_PERCENT
    生成一个有增幅的虚影对象:PASSIVE_GENERATE
    免疫暴击并反伤:PASSIVE_NO_CRIT_REFLEX
    持续百分比回血:HEAL_PER_DOT";*/
    public Effect:number;
    /**buff索引*/
    public Buff:BuffVo;
    /**表现特效*/
    public PerformanceEffectID:EffectVo;
    /**击中特效*/
    public HitEffectID:EffectVo;
    /**技能名*/
    public SkillName:number;
    /**是否只触发一次*/
    public isActiveOnce:boolean;
    /**加成类型(1:加剑，2:加盾，3:加剑盾）*/
    public AddType:number;
    /**升级1级被动技能增加的基础数值*/
    public AddBaseNum:Array<number>;
    /**白卡加成*/
    public Add1Quality:Array<number>;
    /**绿卡加成*/
    public Add2Quality:Array<number>;
    /**蓝卡加成*/
    public Add3Quality:Array<number>;
    /**紫卡加成*/
    public Add4Quality:Array<number>;
    /**橙卡加成*/
    public Add5Quality:Array<number>;
    /**红卡加成*/
    public Add6Quality:Array<number>;
    constructor(data:any=null){
        this.bind(data);
    }
    public bind(data){
        if(!data)return;
        this.Tid=data.Tid;
        this.Name=data.Name;
        this.TxName=data.TxName;
        this.Des=data.Des;
        this.Icon=data.Icon;
        this.InTime=data.InTime;
        this.TimeParameter=data.TimeParameter;
        this.Condition=data.Condition;
        this.Objects=data.Objects;
        this.ObjectsNums=data.ObjectsNums;
        this.Effect=data.Effect;
        this.Buff=TbPxy.getBuffInfo(data.Buff);
        this.PerformanceEffectID=data.PerformanceEffectID;
        this.HitEffectID=data.HitEffectID;
        this.SkillName=data.SkillName;
        this.isActiveOnce=data.isActiveOnce;
        this.AddType=data.AddType;
        this.AddBaseNum=data.AddBaseNum;
        this.Add1Quality=data.Add1Quality;
        this.Add2Quality=data.Add2Quality;
        this.Add3Quality=data.Add3Quality;
        this.Add4Quality=data.Add4Quality;
        this.Add5Quality=data.Add5Quality;
        this.Add6Quality=data.Add6Quality;

    }
}