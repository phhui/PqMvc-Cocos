/*
 * @Author: phhui
 * @Date: 2021-02-24 13:58:50
 * @LastEditTime: 2021-02-24 14:03:48
 * @LastEditors: phhui
 * @Description: 
 * @FilePath: \ro\assets\Script\modules\skill\vo\BuffVo.ts
 */
export default class BuffVo{
    /**编号*/
    public Tid:number;
    /**是否为增益*/
    public IsActive:boolean;
    /**名称*/
    public Name:string;
    /**类型枚举无:
     * NO:0    
     * 伤害提升:BUFF_DAMAGE_UP:1    
     * 分身术:BUFF_AVATAR    
     * 眩晕:BUFF_DIZZY    
     * 减免远程伤害:BUFF_DAMAGE_LOW_FAR    
     * 死亡免疫:BUFF_DEAD_IMMUNO    
     * 圣灵召唤:BUFF_HOLY_SPRIT    
     * 伤害减免加不被击退:BUFF_HEGEMOR_ARMOR    
     * 伤害减免:BUFF_DAMAGE_LOW    
     * 伤害提升且必爆:BUFF_DAMAGE_UP_CRIT    
     * 持续百分比回血:BUFF_HEAL_DOT    
     * 持续百分比掉血:BUFF_DAMAGE_DOT    
     * 免疫伤害并转为血量:BUFF_HEAL_IMMUNO    
     * 持续一段时间造成伤害:BUFF_END_DAMAGE    
     * 所有被动技能无效持续一段时间:BUFF_SILENT    
     * 持续一段时间造成伤害减少:BUFF_CHARM    
     * 免疫所有减益效果:BUFF_IMMUNITYACITIVE    
     * 增强基础伤害和攻速:BUFF_ADD_BASEDAMAGE_SPEED";*/
    public type:any;
    /**时间毫秒*/
    public Time:Array<number>;
    /**数值百分比*/
    public Num:Array<number>;
    /**特效名称*/
    public Resource:string;
    /**特效文件动画名字*/
    public ClipName:string;
    /**特效名称(扩展)*/
    public ResourceEx:string;
    /**特效文件动画名字(扩展)*/
    public ClipNameEx:string;
    /**buff特效缩放因子*/
    public BuffScale:number;
    /**"X轴比例（-50*/
    public XScale:number;
    /**50）"*/
    public BuffYOffset:number;
    /**在血条上偏移像素*/
    public BuffZnum:number;
    constructor(data:any=null){
        this.bind(data);
    }
    public bind(data){
        if(!data)return;
        this.Tid=data.Tid;
        this.IsActive=data.IsActive;
        this.Name=data.Name;
        this.type=data.type;
        this.Time=data.Time;
        this.Num=data.Num;
        this.Resource=data.Resource;
        this.ClipName=data.ClipName;
        this.ResourceEx=data.ResourceEx;
        this.ClipNameEx=data.ClipNameEx;
        this.BuffScale=data.BuffScale;
        this.XScale=data.XScale;
        this.BuffYOffset=data.BuffYOffset;
        this.BuffZnum=data.BuffZnum;
    }
}