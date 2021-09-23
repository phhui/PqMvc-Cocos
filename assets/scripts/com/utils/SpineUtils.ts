import Timer from "./Timer";

export default class SpineUtils{
    /**为指定spine动画添加动作完成事件 */
    public static addFinishFunc(sp:sp.Skeleton,cb:Function,target:any){
        let ani=sp.findAnimation(sp.animation);
        let aniTime=ani.duration;
        Timer.setTimeOut("monAtkSpineEnd"+sp.uuid+target.uuid,aniTime,cb,target);
    }
    /**为spine添加事件监听 */
    public static addEvent(sp:sp.Skeleton,eventType:string,cb:Function,target:any){
        let cbFunc=function(trackEntry:any,e:any){
            if(e.data.name==eventType)cb.apply(target,[trackEntry,e]);
        }
        sp.setEventListener(cbFunc.bind(this));
    }
}