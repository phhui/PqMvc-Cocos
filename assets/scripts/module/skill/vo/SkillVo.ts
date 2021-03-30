import Monster from "../../fight/Item/Monster";
import TbPxy from "../../proxy/TbPxy";
import BuffVo from "./BuffVo";
import EffectsVo from "./EffectsVo";

/*
 * @Author: phhui
 * @Date: 2021-02-23 09:53:13
 * @LastEditTime: 2021-03-13 10:43:31
 * @LastEditors: phhui
 * @Description: 
 * @FilePath: \ro\assets\Script\modules\skill\vo\SkillVo.ts
 */
class SkillVo{
    /**所属怪物UUID */
    public monUuid:string;
    /**技能所属怪物，需求太复杂，不存储施法对象很难处理*/
    public mon:cc.Node;
    /**技能所属怪物脚本 */
    public monScript:Monster;
    /**技能ID*/
    public Tid:number;
    /**别名*/
    public Name:string;
    /**技能名字*/
    public SkillName:string;
    /**技能描述 */
    public SkillDes:string;
    /**技能ICON*/
    public Icon:string;
    /**技能等级 */
    public lv:string;
    /**作用对象    
     * 无:NO：0    
     * 随机敌人:RANDOM_ENEMY：1    
     * 射程内敌人:RANG_ENEMY：2    
     * 自己:SELF：3    
     * 随机己方:RANG_OUR：4    
     * 距离优先对象:DISTANCE_ENEMY：5*/    
    public Objects:any;
    /**对象数量*/
    public ObjectsNums:number;
    /**效果数值1*/
    public Num1:Array<number>;
    /**效果数值2*/
    public Num2:Array<number>;
    /**效果数值3*/
    public Num3:Array<number>;
    /**效果数值4*/
    public Num4:Array<number>;
    /**效果数值5*/
    public Num5:Array<number>;
    /**技能图标遮罩层资源动画*/
    public MaskLayerRes:string;
    /**是否展示背景*/
    public isShowBg:boolean;
    /**释放动画是否在最底层*/
    public CastingLayer:boolean;
    /**施法音效ID*/
    public CastingSound:string;
    /**效果特效*/
    public EffectTabel: string;
    /**效果特效音效*/
    public ResultSound:string;
    /**场景是否抖动*/
    public IsShake:boolean;
    /**震动幅度及延迟*/
    public Amplitude:Array<number>;
    /**技能效果
    * 无:NO:0    
    * 直接伤害百分比:DAMAGE_PER    
    * 产生Buff:ADDBUFF    
    * 伤害加Buff:DAMGEBUFF    
    * 直接治疗:HEAL    
    * 击退:HITBACK    
    * 反弹伤害:DERIVE_DAMAGE    
    * 格挡伤害:DEFENT_DAMAGE    
    * 变身术:CHANGE_FORM    
    * 无视物理防御:DEFY_PD_DEFEND    
    * 增加物理强度:ADD_PS_VALUE    
    * 增加魔法强度:ADD_MS_VALUE    
    * 血量伤害百分比:DAMAGE_HP_PER    
    * 百分比伤害加成:DAMAGE_ADD_PER    
    * 生成低一阶段的怪物:NEW_LOW_FORM    
    * 复活:RELIVE    
    * 吸血:BLOOD_SUCK    
    * 嗜血:SPEECH    
    * 追击:CHASING    
    * 爆头:SPIKE    
    * 生成指定阶段的怪物:NEW_MARK_FORM    
    * 死亡免疫:DEAD_IMMUNO    
    * 额外多个敌人伤害百分比:DAMAGE_PER_ENEMY    
    * 圣灵召唤:HOLY_SPRIT    
    * 目标血量DOT:DAMAGE_DOT_HP    
    * 本次伤害DOT:DAMAGE_DOT_DAMAGE    
    * 伤害并击退:DAMAGE_HITBACK    
    * 无视魔法防御:DEFY_MD_DEFEND    
    * 镜像自身:IMAGE_SELF    
    * 本次普通攻击无效:DODGE    
    * 直接治疗生命值百分比:HEAL_PER    
    * 近战转远程:SHORT_CHANGE_REMOTE    
    * 直接伤害百分比加基础数值:DAMAGE_PER_NUM    
    */
    public Effect:number
    /**buff索引*/
    public Buff:Array<BuffVo>;
    /**主动技能释放 暂时只支持一种 如果未配置则直接进行攻击动作*/
    public startEffect:EffectsVo;
    /**起手特效 攻击动作中spine的事件帧 prepare触发 未配置则不播放特效*/
    public prepareEffects:Array<EffectsVo>=[];
    /**下落时间触发的特效 攻击动作中spine的事件帧：play触发 未配置则不播放特效 且技能立即生效 配置后未找到关键帧 则技能立即生效*/
    public playEffects:Array<EffectsVo>=[];
    /**特效资源(无用字段 用于参考)*/
    public EffectID:string;
    constructor(data:any=null){
        this.bindData(data);
    }
    public bindData(data){
        if(!data)return;
        this.Tid=data.Tid;
        this.Name=data.Name;
        this.SkillName=data.SkillName;
        this.SkillDes=data.SkillDes;
        this.Icon=data.Icon;
        this.Objects=data.Objects;
        this.ObjectsNums=data.ObjectsNums;
        this.Num1=data.Num1;
        this.Num2=data.Num2;
        this.Num3=data.Num3;
        this.Num4=data.Num4;
        this.Num5=data.Num5;
        this.MaskLayerRes=data.MaskLayerRes;
        this.isShowBg=data.isShowBg;
        this.CastingLayer=data.CastingLayer;
        this.CastingSound=data.CastingSound;
        this.EffectTabel=data.EffectTabel;
        this.ResultSound=data.ResultSound;
        this.IsShake=data.IsShake;
        this.Amplitude=data.Amplitude;
        this.Effect=data.Effect;
        let seConfig=TbPxy.getEffectsConfig(data.startEffect);
        if(seConfig)this.startEffect=new EffectsVo(seConfig);
        this.EffectID=data.EffectID;
        //======todo
        this.setBuff(data.Buff);
        this.setArr(this.prepareEffects,data.prepareEffects);
        this.setArr(this.playEffects,data.playEffects);
    }
    public getNum(from:number){
        return 50;//先写死数值，等表正常再改this["Num"+from]||0;
    }
    private setArr(list:Array<any>,data:Array<number>){
        let n:number=data.length;
        for(let i:number=0;i<n;i++){
            list[i]=TbPxy.getEffectsConfig(data[i]);
        }
    }
    private setBuff(data){
        let n:number=data.length;
        this.Buff=this.Buff||[];
        for(let i:number=0;i<n;i++){
            if(data[i]>0)this.Buff[i]=TbPxy.getBuffInfo(data[i]);
        }
    }
}