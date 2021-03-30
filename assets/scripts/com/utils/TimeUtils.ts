/**
 * @ Author: phhui
 * @ Create Time: 2021-01-27 09:09:18
 * @ Modified by: phhui
 * @ Modified time: 2021-01-28 16:54:05
 * @ Description:
 */

class TimeUtils{
    /**1小时毫秒数 */
    public static HMS:number=60*60*1000;
    /**1分钟毫秒值 */
    public static MMS:number=60*1000;
    /**1秒的毫秒值 */
    public static SMS:number=1000;
    /**毫秒转 时：分：秒   
     * 例：
     * msToTime(3661000) 返回 01:01:01
    */
    public static msToTime(ms:number):string{
        if(ms<this.SMS)return "00:00:00";
        let h:number=Math.floor(ms/this.HMS);
        let m:number=Math.floor((ms%this.HMS)/this.MMS);
        let s:number=Math.round((ms%this.MMS)/this.SMS);
        return (h<10?"0"+h:h)+":"+(m<10?"0"+m:m)+":"+(s<10?"0"+s:s);
    }
}