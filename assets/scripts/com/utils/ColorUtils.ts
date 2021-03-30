/**
 * @ Author: phhui
 * @ Create Time: 2021-01-27 09:09:18
 * @ Modified by: phhui
 * @ Modified time: 2021-01-28 16:53:27
 * @ Description:
 */

import NumUtils from "./NumUtils";

export default class ColorUtils{
    public static DefColor:cc.Color=cc.color().fromHEX("603015");
    public static RedColor:cc.Color=cc.color().fromHEX("ff0000");
    public static GreenColor:cc.Color=cc.color().fromHEX("008000");
    public static HsvDefColor:string="#603015";
    public static HsvRedColor:string="#ff0000";
    public static HsvGreenColor:string="#008000";
    //品质的颜色 0绿 1蓝 2紫 3橙 4红
    public static qualityColor:Array<cc.Color>=[cc.color().fromHEX("76ff64"),cc.color().fromHEX("3576ee"),cc.color().fromHEX("bc14d9"),cc.color().fromHEX("ffd829"),cc.color().fromHEX("ff0000")];
    public static findQualityColor(quality:number):cc.Color
    {
        return this.qualityColor[quality]; 
    }
    /**根据拥有和需求数值获取颜色 */
    public static compareColor(hasNum:number,needNum:number):cc.Color{
        if(hasNum<needNum)return this.RedColor;
        return this.DefColor; 
    }
    /**根据拥有和需求数值返回对应颜色文本，必需使用richText    
     * 例 getTextColor(10000,20000)返回 <color=#ff0000>1万</c>/<color=#603015>2万</color> */
    public static getTextColor(hasNum:number,needNum:number):string{
        if(hasNum<needNum)return "<color="+this.HsvRedColor+">"+hasNum+"</c>/<color="+this.HsvDefColor+">"+needNum+"</color>";
        return "<color=#603015>"+NumUtils.numCompress(hasNum)+"</c>/<color=#603015>"+NumUtils.numCompress(needNum)+"</color>";
    }
    /**根据前后数据返回对应颜色文本，用于richText    
     * 例：
     * getIncreaseColor(5,3)返回 <color=绿色>+2</color>    
     * getIncreaseColor(3,5)返回 <color=红色>-2</color>    
     * getIncreaseColor(5,5)返回 <color=默认色>+0</color>    
     */
    public static getIncreaseColor(newNum:number,oldNum:number):string{
        if(newNum<newNum)return "<color="+this.HsvRedColor+">"+(newNum-oldNum).toString()+"</color>";
        if(newNum>newNum)return "<color="+this.HsvGreenColor+">+"+(newNum-oldNum).toString()+"</color>";
        return "<color="+this.HsvDefColor+">+"+(newNum-oldNum).toString()+"</color>";
    }
    /**如果数据不达标则将按钮设置成灰色 */
    public static premiseBtnGray(btn:cc.Node,hasNum:number,needNum:number){
        btn.color=hasNum<needNum?cc.color(0,0,0):cc.color(255,255,255);
        btn.opacity=hasNum<needNum?126:255;
    }
    /**置灰 */
    public static setGray(nd:cc.Node){
        nd.color=cc.color(0,0,0);
        nd.opacity=126;
    }
}