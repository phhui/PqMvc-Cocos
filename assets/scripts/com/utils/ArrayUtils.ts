/**
 * @ Author: phhui
 * @ Create Time: 2021-01-27 09:09:18
 * @ Modified by: phhui
 * @ Modified time: 2021-01-28 16:53:20
 * @ Description:
 */

class ArrayUtils{
    /**根据字符串获得二维数组，
     * @param str要分割的字符串
     * @param splitChar0 1级数组分割符
     * @param splitChar1 2级数组侵害符
     * @example 例：strToArr("hp_100|atk_50") 返回[[hp,100],[atk,50]] */
    public static strToArr(str:string,splitChar0:string="|",splitChar1:string="_"):Array<any>{
        if( str==null || str.length<=0)
        {
            return[];
        }
        let arr:Array<string>=str.split(splitChar0);
        let n:number=arr.length;
        let res:Array<any>=[];
        for(let i:number=0;i<n;i++){
            res.push(arr[i].split(splitChar1));
        }
        return res;
    }
    /**参考根据字符串获得二维数组,区别是的是 转换成的元素为Number */
    public static strToIntArr(str:string,splitChar0:string="|",splitChar1:string="_"):Array<any>{
        if( str==null || str.length<=0)
        {
            return[];
        }
        let res:Array<any>=[];
        let arr:Array<string>=str.split(splitChar0);
        let n:number=arr.length;
        
        for(let i:number=0;i<n;i++){
            res.push(arr[i].split(splitChar1).map(Number));
        }
        return res;
    }
    /**释放对象，对象必需实现destory */
    public static destoryArr(arr:Array<any>){
        if(!arr)return;
        while(arr.length>0){
            arr[0].destory(true);
            arr.shift();
        }
    }
    /**按照索引交换数组2个值 */
    public static swap(arr:Array<any>,idx1:number,idx2:number)
    {
        if( idx1!=idx2)
        {
            let tmp = arr[idx1];
            arr[idx1]=arr[idx2];
            arr[idx2]=tmp;
        }
    }
}//end class