/**
 * @ Author: phhui
 * @ Create Time: 2021-01-27 09:09:18
 * @ Modified by: phhui
 * @ Modified time: 2021-09-08 17:25:54
 * @ Description:
 */

 import GConfig from "../../const/GConfig";
 import GNum from "../../const/GNum";
 export default class NumUtils{
     /**中文数量单位对应的单位["","万","亿","兆","京","垓","秭","穰","沟","涧","正","载","极"] */
     public static CnNumUnit:Array<string>=["","万","亿","兆","京","垓","秭","穰","沟","涧","正","载","极"];
     /**英文数量单位对应的单位["K","M","G","T","P","E","Z","Y","B","N","D"] */
     public static EnNumUnit:Array<string>=["","K","M","B","T","P","E","Z","Y","B","N","D"];
     /**数值精简，即1000000转成100万或1M */
     public static numCompress(val:number):string{
         return GConfig.lang==GConfig.CN?this.compressCn(val):this.compressEn(val);
     }
     private static compressCn(val:number):string{
         let n:number=1;
         while(val>=Math.pow(GNum.CnNumUnit,n))n++;
         let res=val/Math.pow(GNum.CnNumUnit,n-1);
         return this.fixed(res,n>1&&res>=100?0:2)+this.CnNumUnit[n-1];
     }
     private static compressEn(val:number):string{
         let n:number=1;
         while(val>Math.pow(GNum.EnNumUnit,n))n++;
         let res=val/Math.pow(GNum.EnNumUnit,n-1);
         return this.fixed(res,n>1&&res>=100?0:2)+this.EnNumUnit[n-1];
     }
     public static fixed(val:number,len:number=2):number{
         if(val%1==0)return val;
         if(len==0)return Math.floor(val);
         let res:string=val.toFixed(len);
         if(Number(res)%1==0)return Number(res);
         while(res.substr(res.length-1)=="0")res=res.substr(0,res.length-1);
         if(res.substr(res.length-1)==".")res=res.substr(0,res.length-1);
         return parseFloat(res);
     }
     /**数值转二进制进行统计 */
     public static countNum(num:number){
         var result = 0;
         while (num) {
             if(1 & num)result ++;
             num = num >> 1;
         }
         return result;
     }
     /**位移数值转二进制[数组][0,1,0,1,1,1,0,...] */
     private static moveToArr(n:number){
         return n.toString().split('');
     }
 }
 window["NumUtils"]=NumUtils;