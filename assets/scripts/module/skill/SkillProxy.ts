
import BaseProxy from '../base/BaseProxy';
import Monster from '../fight/Item/Monster';
import TbPxy from '../proxy/TbPxy';
import SkillCmd from './SkillCmd';
import SkillVo from './vo/SkillVo';
class SkillProxy extends BaseProxy{
    static NAME:string='SkillProxy';
	public skillList:Array<SkillVo>;
	public maxSkillNum:number=15;
	public execute(param:any= null, type:string= null):void{
		switch(type){
			case SkillCmd.INIT_DATA:
				break;
		}
    }
    public parseData(data:Array<any>){
		// this.skillList=data;
		// return;
		this.skillList=[];
		let n:number=data.length;
		if(n>this.maxSkillNum)this.maxSkillNum=15;
		for(let i:number=0;i<n;i++){
			let m:Monster=data[i].getComponent("Monster");
			if(!m.vo||!m.vo.Skill||m.vo.useSkill)continue;
			let sv:SkillVo=new SkillVo(TbPxy.getSkillInfo(m.vo.Skill));
			if(sv){
				sv.monUuid=m.uuid;
				sv.mon=data[i];
				sv.monScript=m;
				this.skillList.push(sv);
			}
		}
    }
}