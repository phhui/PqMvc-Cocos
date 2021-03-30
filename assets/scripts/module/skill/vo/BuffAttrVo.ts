/*
 * @Author: phhui
 * @Date: 2021-02-27 09:16:02
 * @LastEditTime: 2021-02-27 10:56:14
 * @LastEditors: phhui
 * @Description: 
 * @FilePath: \ro\assets\Script\modules\fight\vo\BuffAttrVo.ts
 */
/**由BUFF产生的属性 */
export default class BuffAttrVo{
    /**回光返归--死亡后继续战斗X秒 */
    public huiGuangHuanZhao:boolean=false;
    /**额外的物理攻击 */
    public phAtkExtra:number=0;
    /**额外的物理防御 */
    public phDefExtra:number=0;
    /**额外的魔法攻击 */
    public mgAtkExtra:number=0;
    /**额外的魔法防御 */
    public mgDefExtra:number=0;
    /**额外的伤害 */
    public hurtExtra:number=0;
    /**无视物理防御   值为1||0  默认为1 */
    public losePhDef:number=1;
    /**无视魔法防御   值为1||0  默认为1 */
    public loseMgDef:number=1;
    /**爆头  当敌方血量X时有概率秒杀 */
    public spike:number=0;
    /**攻击目标数量 */
    public atkObjNum:number=1;
    /**格挡伤害数值 */
    public parry:number=0;
    /**远程伤害减免% */
    public longDef:number=0;
    /**近程伤害减免% */
    public nearDef:number=0;
    /**伤害减免 %*/
    public hurtDef:number=0;
    /**伤害提升 %*/
    public hurtRatioUp:number=0;
    /**免疫所有减益效果 */
    public buffDef:boolean=false;
    /**BUFF效果失效 */
    public buffLose:boolean=false;
    /**攻速提升 %*/
    public atkSpeedUp:number=0;
    /**击退免疫 */
    public repelDef:boolean=false;
    /**免疫伤害并转为血量 */
    public hurtToBlood:number=0;
    /**眩晕 */
    public dizz:number=0;
    /**反弹伤害 */
    public rebound:number=0;
}