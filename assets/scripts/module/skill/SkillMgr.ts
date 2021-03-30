
import BaseMgr from '../base/BaseMgr';
import SkillCmd from './SkillCmd';
import SkillCtl from './SkillCtl';
import SkillProxy from './SkillProxy';
export default class SkillMgr extends BaseMgr{
    constructor(){
        super();
    }
    protected start():void{
	    if(this.isStart)return;
		this.regProxy(SkillProxy.NAME,new SkillProxy());
		this.regController(SkillCtl.NAME,new SkillCtl());
		this.isStart=true;
	}
	protected get EventList():Array<any>{
		return [SkillCmd.SHOW_WINDOW,
				SkillCmd.CLOSE_WINDOW,
                SkillCmd.MODULE_NAME,
				SkillCmd.INIT_DATA];
	}
	protected execute(type:string, param:Object=null):void{
		switch(type){
			case SkillCmd.INIT_DATA:
				this.proxy(SkillProxy.NAME,param,type);
			break;
			default:
				this.control(SkillCtl.NAME,param,type);
			break;
		}
	}
}