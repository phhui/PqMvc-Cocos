/*
 * @Author: phhui
 * @Date: 2021-02-23 09:59:07
 * @LastEditTime: 2021-02-24 13:57:04
 * @LastEditors: phhui
 * @Description: 
 * @FilePath: \ro\assets\Script\modules\skill\vo\EffectVo.ts
 */
export default class EffectsVo{
    /**特效id*/
    public Tid:string
    /**文本名*/
    public Name:string;
    /**特效层级类型*/
    public LayerType:string;
    /**特效位置类型 全屏：全部敌人的正中心； 范围：选择目标受击点的中心位置 （x = 0）单体：选择目标受击点的位置*/
    public effectPosType:number;
    /**怪物位置类型*/
    public monsterPosType:number;
    /**是否是关键特效（关键特效意味着该动画机中需要k effectiveFunc事件帧）*/
    public isKeyEffect:boolean;
    /**关键帧 触发关键帧（未填默认结束后）*/
    public keyFrame:string;
    /**特效（预制体）名称*/
    public Resource:string;
    /**特效文件动画机名字*/
    public ClipName:string;
    /**缩放因子*/
    public  Scale:number;
    /**X轴偏移量（最终的偏移X）*/
    public OffXset:number;
    /**Y轴偏移量(最终的偏移X)*/
    public OffYset:number;
    constructor(data=null){
        this.bind(data);
    }
    public bind(data){
        if(!data)return;
        this.Tid=data.Tid;
        this.Name=data.Name;
        this.LayerType=data.LayerType;
        this.effectPosType=data.effectPosType;
        this.monsterPosType=data.monsterPosType;
        this.isKeyEffect=data.isKeyEffect;
        this.keyFrame=data.keyFrame;
        this.Resource=data.Resource;
        this.ClipName=data.ClipName;
        this. Scale=data. Scale;
        this.OffXset=data.OffXset;
        this.OffYset=data.OffYset;
    }
}