import { LoadMgr } from "./loader/LoadMgr";
import ResInfo from "./loader/ResInfo";

// 音效播放管理
export default class AudioMgr{
    public static musicPath="music/"
    /**预加载声音 */
    public static preload(path:string)
    {
        if( path==null||path=='')return;
        path=AudioMgr.musicPath+path;
        LoadMgr.load(path,cc.AudioClip);
    }
    public static preloadAry(pathAry:Array<string>,startAtOnce=false)
    {
        if( pathAry.length<=0)return;
        for(let i = 0 ;i < pathAry.length;++i){
            this.preload(pathAry[i]);
        }
    }
    /**播放背景音乐 */
    public static playMusic(path:string,loop:boolean=true,startAtOnce=true)
    {
        if( path==null||path=='')return;
        path=AudioMgr.musicPath+path;
        LoadMgr.load(path,(res_node:ResInfo)=>{
            cc.audioEngine.playMusic(res_node.res, loop);
        });
    }
    /*** 返回:必须预加载声音才可能返回id,没有预加载声音返回0 */
    public static playRandom(pathAry:Array<string>,loop:boolean = false):number
    {
        if( pathAry.length<=0)
            return;
        let randIdx= Math.floor(Math.random()*(pathAry.length));
        return this.playEffect(pathAry[randIdx]);
    }
    /**
     * 返回:必须预加载声音才可能返回id,没有预加载声音返回0 */
    public static playEffect(path:string,loop:boolean = false):number
    {
        if( path==null||path=='')return;
        path=AudioMgr.musicPath+path;
        let clip = LoadMgr.getRes(path).res;
        if( clip !=null )return cc.audioEngine.playEffect(clip, loop);
        LoadMgr.load(path,(res_node:ResInfo)=>{
            cc.audioEngine.playMusic(res_node.res, loop);
        });
        return 0;
    }
    //暂停所有音效
    public static pauseAll() {
        cc.audioEngine.pauseAll();
    }

    //暂停正在播放音频
    public static pause(audioID:number) {
        cc.audioEngine.pause(audioID);
    }

    //恢复所有暂停的音效
    public static resumeAll() {
        cc.audioEngine.resumeAll();
    }

    //恢复播放指定的音频
    public static resume(audioID:number) {
        cc.audioEngine.resume(audioID);
    }

    //停止所有正在播放的音效
    public static stopAll() {
        cc.audioEngine.stopAll();
    }

    public static stop(audioID:number) {
        cc.audioEngine.stop(audioID);
    }

    //恢复播放背景音乐
    public resumeMusic() {
        cc.audioEngine.resumeMusic();
    }

    //停止播放背景音乐
    public static stopMusic() {
        cc.audioEngine.stopMusic();
    }

    //暂停播放背景音乐
    public static pauseMusic() {
        cc.audioEngine.pauseMusic();
    }

    /**
     * 设置背景音效音量（0.0 ~ 1.0）
     * @param Volume
     */
    public static setMusicVolume(Volume: number) {
        //if (LocalDataMgr.GetConfigProperty("SysSetting", "BackMusic")) {
            cc.audioEngine.setMusicVolume(Volume);
            //LocalDataMgr.SetConfigProperty("SysSetting", "BackVolume", Volume);
        //}
    }

    /**
     * 设置音效音量（0.0 ~ 1.0）
     * @param Volume
     */
    public static setEffectsVolume(Volume: number) {
        //if (LocalDataMgr.GetConfigProperty("SysSetting", "SpSound")) {
            cc.audioEngine.setEffectsVolume(Volume);
            //LocalDataMgr.SetConfigProperty("SysSetting", "SpVolume", Volume);
        //}
    }



    public static uncacheAll() {
        cc.audioEngine.uncacheAll();
    }

}//end class

