import PointUtils from "../../../com/utils/PointUtils";
import MonPosType from "../const/MonPosType";
import EffectsVo from "../vo/EffectsVo";
import SkillVo from "../vo/SkillVo";

/*
 * @Author: phhui
 * @Date: 2021-02-25 11:10:34
 * @LastEditTime: 2021-03-17 15:57:44
 * @LastEditors: phhui
 * @Description: 
 * @FilePath: \ro\assets\Script\modules\skill\utils\SkillUtils.ts
 */
export default class SkillUtils{
    /**策划文档的数值：http://wiki.alienidea.com/pages/viewpage.action?pageId=36585205 */
    private static spaceList:Array<number>=[0,144,144,116,107,94,85,78,67,61,55,50,46,42,39];
    /**根据技能数量获取技能卡间隔 */
    public static getSpace(n:number){
        return this.spaceList[Math.min(n,this.spaceList.length-1)];
    }
    /**获取技能位置 */
    public static getSkillPos(sv:SkillVo,evo:EffectsVo,pos:cc.Vec2){
        let tb=window["tb"];
        let targetPos;
        switch (evo.effectPosType) {
            case tb.EFFECT_TYPE_MY:
                targetPos=sv.mon?sv.mon.position:cc.v2();
                break;
            case tb.EFFECT_TYPE_ENEMY:
                targetPos=this.findMon(sv,pos);
                break;
            case tb.EFFECT_TYPE_FW:
                targetPos = this.findMon(sv,pos);
                break;
            case tb.EFFECT_TYPE_QP:
                targetPos = sv.monScript?this.getMonCenter(sv.monScript.enemyList):cc.v2();
                break;
            case tb.EFFECT_TYPE_CENTER:
                targetPos = cc.v2(0, 0);
                break;
        }
        let mon:cc.Node;
        switch(evo.monsterPosType){
            case MonPosType.MONSTER_POSTYPE_BEEN_HIT:
                mon=this.findMon(sv,pos,1) as cc.Node;
                targetPos.y+=mon.height*0.5;
            break;
            case MonPosType.MONSTER_POSTYPE_BOTTOM:

            break;
            case MonPosType.MONSTER_POSTYPE_BUFF:

            break;
            case MonPosType.MONSTER_POSTYPE_CENTER:
                mon=this.findMon(sv,pos,1) as cc.Node;
                targetPos.y+=mon.height*0.5;
            break;
            case MonPosType.MONSTER_POSTYPE_HP:
                mon=this.findMon(sv,pos,1) as cc.Node;
                if(mon)targetPos.y+=mon.height;
            break;
        }
        return targetPos;
    }
    /**查找最近的敌怪 */
    public static findMon(v:SkillVo,pos:cc.Vec2,type:number=0){
        if(!v.monScript)return type==0?cc.v2():null;
        let n:number=v.monScript.enemyList.length;
        let dis:number=9999;
        let target:cc.Node;
        for(let i:number=0;i<n;i++){
            let s=PointUtils.getDis(v.monScript.enemyList[i].position,pos);
            if(s<dis){
                dis=s;
                target=v.monScript.enemyList[i];
            }
        }
        return type==0?(target&&target.position)||pos:target;
    }
    /**获取敌怪中心点 */
    public static getMonCenter(list:Array<cc.Node>){
        let n:number=list.length;
        let min:number=99999;
        let max:number=-99999;
        for(let i:number=0;i<n;i++){
            min=list[i].y<min?list[i].y:min;
            max=list[i].y>max?list[i].y:max;
        }
        return cc.v2(0,(max-min)*0.5);
    }
}