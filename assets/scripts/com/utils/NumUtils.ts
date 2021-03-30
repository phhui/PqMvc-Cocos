/**
 * @ Author: phhui
 * @ Create Time: 2021-01-27 09:09:18
 * @ Modified by: phhui
 * @ Modified time: 2021-03-30 22:01:23
 * @ Description:
 */
class NumUtils{
    /**中文数量单位对应的单位["","万","亿","兆","京","垓","秭","穰","沟","涧","正","载","极"] */
    public static CnNumUnit:Array<string>=["","万","亿","兆","京","垓","秭","穰","沟","涧","正","载","极"];
    /**英文数量单位对应的单位["K","M","G","T","P","E","Z","Y","B","N","D"] */
    public static EnNumUnit:Array<string>=["","K","M","G","T","P","E","Z","Y","B","N","D"];
    /**数值精简，即1000000转成100万或1M */
    public static numCompress(val:number):string{
        return GConfig.lang==GConfig.CN?this.compressCn(val):this.compressEn(val);
    }
    private static compressCn(val:number):string{
        let n:number=1;
        while(val>Math.pow(GNum.CnNumUnit,n))n++;
        return Math.floor(val/Math.pow(GNum.CnNumUnit,n-1))+this.CnNumUnit[n-1];
    }
    private static compressEn(val:number):string{
        let n:number=1;
        while(val>Math.pow(GNum.EnNumUnit,n))n++;
        return Math.floor(val/Math.pow(GNum.EnNumUnit,n-1))+this.EnNumUnit[n-1];
    }
}