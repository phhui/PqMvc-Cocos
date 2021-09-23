/**
 * @ Author: phhui
 * @ Create Time: 2021-01-27 09:09:18
 * @ Modified by: phhui
 * @ Modified time: 2021-08-31 18:59:37
 * @ Description:
 */

export default class RandomUtils{
    public static getRandomFromRange(min:number,max:number){
        return Math.random()*(max-min)+min;
    }
    public static getRandom(len:number=1){
        return Math.floor(Math.random()*9*Math.pow(10,len-1))+Math.pow(10,len-1);
    }
    public static getRandomByArr(arr:Array<number>){
        if(arr.length<1)return 0;
        else if(arr.length==1)return arr[0];
        return Math.floor(Math.random()*(arr[1]-arr[0])+arr[0]);
    }
    /**抽奖
     * @param list 奖品列表    
     * @param luckNum 可获得的奖品数量    
     * @param repeat 奖品是否可重复    
     */
    public static getLuckItem(list:Array<any>,luckNum:number=1,repeat:boolean=false){
        let n:number=list.length;
        let luckItem:Array<any>=[];
        let luckId:any={};
        let totalRate:number=0;
        for(let key in list)totalRate+=list[key].rate;
        for(let i:number=0;i<luckNum;i++){
            let luckNum:number=Math.round(Math.random()*totalRate);
            let rate:number=0;
            for(let j:number=0;j<n;j++){
                let iv:any=list[j];
                if(repeat||(!repeat&&!luckId[iv.id]))rate+=iv.rate;
                if(luckNum<rate){
                    if(!repeat)totalRate-=iv.rate;
                    luckItem.push(luckId[iv.id]?iv.copy():iv);
                    luckId[iv.id]=1;
                    break;
                }
            }
        }
        return luckItem;
    }
}