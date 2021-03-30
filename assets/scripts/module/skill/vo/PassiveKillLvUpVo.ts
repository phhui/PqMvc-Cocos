/*
 * @Author: phhui
 * @Date: 2021-02-26 14:35:42
 * @LastEditTime: 2021-02-26 14:36:42
 * @LastEditors: phhui
 * @Description: 
 * @FilePath: \ro\assets\Script\modules\skill\vo\PassiveKillLvUpVo.ts
 */
class PassiveKillLvUpVo{
    /**编号*/
    public Tid:number;
    /**技能等级*/
    public SkillLv:number;
    /**A槽位升级技能主角增加经验*/
    public AddExpA:number;
    /**A槽位消耗金币*/
    public CostGoldA:number;
    /**A槽位消耗道具*/
    public CostItemsA:any;
    /**A槽位消耗道具数量*/
    public CostItemNumsA:Array<number>;
    /**B槽位升级技能主角增加经验*/
    public AddExpB:number;
    /**B槽位消耗金币*/
    public CostGoldB:number;
    /**B槽位消耗道具*/
    public CostItemsB:any;
    /**B槽位消耗道具数量*/
    public CostItemNumsB:Array<number>;
    /**C槽位升级技能增加经验*/
    public AddExpC:number;
    /**C槽位消耗金币*/
    public CostGoldC:number;
    /**C槽位消耗道具*/
    public CostItemsC:any;
    /**C槽位消耗道具数量*/
    public CostItemNumsC:Array<number>;
    constructor(){

    }
}