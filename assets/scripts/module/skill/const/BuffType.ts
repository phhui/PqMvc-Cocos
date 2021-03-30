/*
 * @Author: phhui
 * @Date: 2021-02-26 18:55:41
 * @LastEditTime: 2021-02-26 18:56:17
 * @LastEditors: phhui
 * @Description: 
 * @FilePath: \ro\assets\Script\modules\skill\const\BuffType.ts
 */
class BuffType{
    /**无*/
    public static NO:number=0;
    /**伤害提升*/
    public static BUFF_DAMAGE_UP:number=1;
    /**分身术*/
    public static BUFF_AVATAR:number=2;
    /**眩晕*/
    public static BUFF_DIZZY:number=3;
    /**减免远程伤害*/
    public static BUFF_DAMAGE_LOW_FAR:number=4;
    /**死亡免疫*/
    public static BUFF_DEAD_IMMUNO:number=5;
    /**圣灵召唤*/
    public static BUFF_HOLY_SPRIT:number=6;
    /**伤害减免加不被击退*/
    public static BUFF_HEGEMOR_ARMOR:number=7;
    /**伤害减免*/
    public static BUFF_DAMAGE_LOW:number=8;
    /**伤害提升且必爆*/
    public static BUFF_DAMAGE_UP_CRIT:number=9;
    /**持续百分比回血*/
    public static BUFF_HEAL_DOT:number=10;
    /**持续百分比掉血*/
    public static BUFF_DAMAGE_DOT:number=11;
    /**免疫伤害并转为血量*/
    public static BUFF_HEAL_IMMUNO:number=12;
    /**持续一段时间造成伤害*/
    public static BUFF_END_DAMAGE:number=13;
    /**所有被动技能无效持续一段时间*/
    public static BUFF_SILENT:number=14;
    /**持续一段时间造成伤害减少*/
    public static BUFF_CHARM:number=15;
    /**免疫所有减益效果*/
    public static BUFF_IMMUNITYACITIVE:number=16;
    /**增强基础伤害和攻速*/
    public static BUFF_ADD_BASEDAMAGE_SPEED:number=17;
}