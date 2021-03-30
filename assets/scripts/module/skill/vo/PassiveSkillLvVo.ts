/*
 * @Author: phhui
 * @Date: 2021-02-26 14:34:55
 * @LastEditTime: 2021-02-26 14:35:20
 * @LastEditors: phhui
 * @Description: 
 * @FilePath: \ro\assets\Script\modules\skill\vo\PassiveSkillLvVo.ts
 */
class PassiveSkillLvVo{
    /**技能ID*/
    public Tid:number;
    /**等级*/
    public Lv:number;
    /**条件参数{0}*/
    public ConditionParam:number;
    /**条件额外参数{1}*/
    public ConditionExtParam:number;
    /**技能效果参数{2}*/
    public SkillParam:number;
    /**技能效果参数2{3}*/
    public SkillExtParam:number;
    /**buff时间参数{4}*/
    public BuffParameterTime:number;
    /**buff数值参数{5}*/
    public BuffParameterNum:number;
    /**需求金币*/
    public UpgradeCost:number;
    /**获得经验*/
    public ExpGet:number;
    /**需求熟练度*/
    public ProficiencyCost :number;
    /**需要统一为百分比的行数999为无效值*/
    public Remark:Array<number>;
    constructor(){

    }
}