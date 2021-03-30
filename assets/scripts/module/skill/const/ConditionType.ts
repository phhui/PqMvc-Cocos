/*
 * @Author: phhui
 * @Date: 2021-02-26 16:02:17
 * @LastEditTime: 2021-02-26 16:19:48
 * @LastEditors: phhui
 * @Description: 
 * @FilePath: \ro\assets\Script\modules\skill\const\ConditionType.ts
 */
export default class ConditionType{
    /**无*/
    public static PASSIVE_NO:number=0;
    /**形态压制*/
    public static PASSIVE_CONDITION_FORM:number=1;
    /**概率触发*/
    public static PASSIVE_CONDITION_PROBALY:number=2;
    /**攻击目标为肉盾*/
    public static PASSIVE_CONDITION_TANK_FORM:number=3;
    /**血量低于最大血量*/
    public static PASSIVE_CONDITION_PER:number=4;
    /**血量百分比降低时*/
    public static PASSIVE_CONDITION_LOW_PER:number=5;
    /**概率触发和形态压制*/
    public static PASSIVE_CONDITION_PROBALY_FORM:number=6;
    /**概率触发和血量低于*/
    public static PASSIVE_CONDITION_PROBALY_LOW:number=7;
    /**我方所有家族死亡*/
    public static PASSIVE_CONDITION_SELF_ALL_DEAD:number=8;
    /**累计普通攻击*/
    public static PASSIVE_CONDITION_ATTACK_COUNT:number=9;
    /**暴击时触发*/
    public static PASSIVE_CONDITION_CRITS:number=10;
    /**我方场上无某类型家族时触发*/
    public static PASSIVE_CONDITION_MONSTER_NO_OUR:number=11;

}
