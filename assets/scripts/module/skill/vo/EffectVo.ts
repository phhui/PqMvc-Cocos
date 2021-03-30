/*
 * @Author: phhui
 * @Date: 2021-02-26 14:33:31
 * @LastEditTime: 2021-02-26 14:33:54
 * @LastEditors: phhui
 * @Description: 
 * @FilePath: \ro\assets\Script\modules\skill\vo\EffectVo.ts
 */
class EffectVo{
    /**特效id*/
    public Tid:number;
    /**文本名*/
    public Name:string;
    /**单次持续时间(毫秒）*/
    public Duration:number;
    /**起始索引*/
    public BeginIndex:number;
    /**结束索引*/
    public  EndIndex:number;
    /**播放次数*/
    public Times:number;
    /**特效（预制体）名称*/
    public Resource:string;
    /**起手特效文件动画机名字*/
    public StartClipName:string;
    /**Y轴偏移量*/
    public StartOffsetY:number;
    /**特效文件动画机名字*/
    public ClipName:string;
    /**缩放因子*/
    public  Scale:number;
    /**X轴偏移量*/
    public OffXset:number;
    /**Y轴偏移量*/
    public OffYset:number;
    /**释放动画是否在最底层*/
    public CastingLayer:boolean;
    constructor(){

    }
}