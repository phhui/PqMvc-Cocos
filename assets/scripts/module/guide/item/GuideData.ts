import ObjPxy from "../../proxy/ObjPxy";

export default class GuideData{
    /**玩家等级 */
    public lv:number=0;
    /**所处界面 */
    public view:number=0;
    /**伙伴数量 */
    public partnerNum:number=0;
    /**召唤次数 */
    public summon:number=0;
    /**挂机时长 */
    public onHook:number=0;
    /**伙伴列表 */
    public partnerList:Array<any>=[];
    /**免费抽卡次数 */
    public freeDrawCardNum:number=0;
    /**高级抽卡次数 */
    public hightDrawCardNum:number=0;
    /**拥有可解锁伙伴 */
    public canLock:boolean=false;
    /**拥有可解锁且伙伴 */
    public canLockAndLv2:boolean=false;
    public get chapterId(){
        return ObjPxy.chapterLogic.getCurMaxChapterID();
    }
    public get chapterLevelId(){
        return ObjPxy.chapterLogic.getMaxMiniChapter();
    }
}