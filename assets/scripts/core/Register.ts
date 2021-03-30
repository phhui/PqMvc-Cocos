/**
 * @ Author: phhui
 * @ Create Time: 2021-01-27 09:09:18
 * @ Modified by: phhui
 * @ Modified time: 2021-02-04 15:55:46
 * @ Description:
 */
import LayerMgr from "./mgr/LayerMgr";
import FightMgr from "../modules/fight/FightMgr";
import SandboxMgr from "../modules/sandbox/SandboxMgr";
import FightPrepareMgr from "../modules/fightprepare/FightPrepareMgr";
import SkillMgr from "../modules/skill/SkillMgr";
import TopbarMgr from "../modules/topbar/TopbarMgr";
import GuideMgr from "../modules/guide/GuideMgr";

class Register{
    constructor(){
        this.init();
        this.reg();
    }
    private reg(){
        new LayerMgr();
        new FightMgr();
        new SandboxMgr();
        new FightPrepareMgr();
        new SkillMgr();
        new TopbarMgr();
        new GuideMgr();
        //register your module on here 
        // new ResMgr();
    }
    private init(){
    }
}
module.exports=Register;