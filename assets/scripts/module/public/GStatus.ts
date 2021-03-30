/*
 * @Author: phhui
 * @Date: 2021-02-25 10:06:44
 * @LastEditTime: 2021-02-25 18:33:13
 * @LastEditors: phhui
 * @Description: 
 * @FilePath: \ro\assets\Script\modules\public\GStatus.ts
 */
/**暂时弃用，待删除 */
export default class GStatus{
    private static _fightStatus:number=0;
    public static set fightStatus(val:number){
        this._fightStatus=val;
    }
    /**战斗状态 0非战斗状态 1战斗状态 2战斗暂停状态 */
    public static get fightStatus(){
        return this._fightStatus;
    }
}