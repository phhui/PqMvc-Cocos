/*
 * @Author: phhui
 * @Date: 2021-02-26 16:03:11
 * @LastEditTime: 2021-02-26 16:14:33
 * @LastEditors: phhui
 * @Description: 
 * @FilePath: \ro\assets\Script\modules\skill\const\ObjectsType.ts
 */
class ObjectsType{
    //======主动技能作用对象类型======
    /**未配置作用对象 */
    public static SKILL_NO:number=0;
    /**随机敌人 */
    public static SKILL_RANDOM_ENEMY:number=1;
    /**射程内敌人 */
    public static SKILL_RANG_ENEMY:number=2;
    /**自己 */
    public static SKILL_SELF:number=3;
    /**随机已方 */
    public static SKILL_RANG_OUR:number=4;
    /**距离优先对象 */
    public static SKILL_DISTANCE_ENEMY:number=5;
    //======被动技能作用对象类型======
    /**自己*/
    public static PASSIVE_SELF:number=0;
    /**攻击者*/
    public static PASSIVE_ATTACKER:number=1;
    /**被攻击者*/
    public static PASSIVE_BEATTACKER:number=2;
    /**最近的敌方单位*/
    public static PASSIVE_SENEMY:number=3;
    /**随机友方单位*/
    public static PASSIVE_ALLY:number=4;
}