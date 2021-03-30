export default class TriggerType{
    /**无*/
    public static PASSIVE_NO:number=0;
    /**物攻直接加成*/
    public static PASSIVE_DIRECTLY_PS:number=1;
    /**魔攻直接加成*/
    public static PASSIVE_DIRECTLY_MS:number=2;
    /**物防直接加成*/
    public static PASSIVE_DIRECTLY_PD:number=3;
    /**魔防直接加成*/
    public static PASSIVE_DIRECTLY_MD:number=4;
    /**双防直接加成*/
    public static PASSIVE_DIRECTLY_BOTH_D:number=5;
    /**血量直接增加百分比*/
    public static PASSIVE_DIRECTLY_HP_PERCENT:number=6;
    /**物防直接增加百分比*/
    public static PASSIVE_DIRECTLY_PD_PERCENT:number=7;
    /**魔防直接增加百分比*/
    public static PASSIVE_DIRECTLY_MD_PERCENT:number=8;
    /**物攻直接增加百分比*/
    public static PASSIVE_DIRECTLY_PS_PERCENT:number=9;
    /**魔攻直接增加百分比*/
    public static PASSIVE_DIRECTLY_MS_PERCENT:number=10;
    /**暴击率直接加成*/
    public static PASSIVE_DIRECTLY_CRIT:number=11;
    /**双攻直接加成*/
    public static PASSIVE_DIRECTLY_BOTH_S:number=12;
    /**伤害每100射程直接增加百分*/
    public static PASSIVE_DIRECTLY_DB_PERCENT:number=13;
    /**战斗开始*/
    public static PASSIVE_BATTLE_BEGIN:number=14;
    /**攻击前触发*/
    public static PASSIVE_ATTACK_PRE:number=15;
    /**攻击中触发*/
    public static PASSIVE_ATTACK_MID:number=16;
    /**攻击后触发*/
    public static PASSIVE_ATTACK_BEHIND:number=17;
    /**被击前触发*/
    public static PASSIVE_BEATTACK_PRE:number=18;
    /**被击中触发*/
    public static PASSIVE_BEATTACK_MID:number=19;
    /**被击后触发*/
    public static PASSIVE_BEATTACK_BEHIND:number=20;
    /**生命值*/
    public static PASSIVE_HP:number=21;
    /**伤害百分比加成*/
    public static PASSIVE_PERCENT_DMG:number=22;
    /**自身死亡触发*/
    public static PASSIVE_DEAD:number=23;
    /**1号技能等级上限增加*/
    public static PASSIVE_SKILLLVUP:number=24;
    /**2号技能等级上限增加*/
    public static PASSIVE_SKILLLVUPS:number=25;
    /**3号技能等级上限增加*/
    public static PASSIVE_SKILLLVUPT:number=26;
    /**射程直接增加*/
    public static PASSIVE_DIRCTLY_RANGE:number=27;
    /**目标死亡触发*/
    public static PASSIVE_ENEMY_DEAD:number=28;
    /**熟练度强化*/
    public static PASSIVE_PROFICIENCY:number=29;
    /**准备攻击时触发*/
    public static PASSIVE_BEATTACK_READY:number=30;
    /**攻速直接加成*/
    public static PASSIVE_ATTACK_SPEED:number=31;
}