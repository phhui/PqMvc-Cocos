/**
 * @ Author: phhui
 * @ Create Time: 2021-01-27 09:09:18
 * @ Modified by: phhui
 * @ Modified time: 2021-01-28 16:53:57
 * @ Description:
 */

class RandomUtils{
    public static getRandom(len:number=1){
        return Math.floor(Math.random()*9*Math.pow(10,len-1))+Math.pow(10,len-1);
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