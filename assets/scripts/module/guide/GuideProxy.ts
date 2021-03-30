class GuideProxy extends BaseProxy{
    static NAME:string='GuideProxy';
	public gd:GuideData=new GuideData();
	public guide:Array<GuideVo>=[];
	private inited:boolean=false;
	private guideHistory:Array<number>=[];
	public execute(param:any= null, type:string= null):void{
		switch(type){
			case GuideCmd.INIT_DATA:
				this.initData();
				break;
			case GuideCmd.TRIGGER:
				if(!this.inited)return;
				this.parseParam(param);
			break;
			case GuideCmd.TRIGGER_TARGET:
				if(!this.inited)return;
				this.triggerTarget(param);
			break;
		}
    }
    public initData(){
		if(this.inited)return;
		this.inited=true;
		let data;//=TbPxy.getGuideTb();
		let history=DbMgr.get("guideData");
		let m:number=history?history.length:0;
		let n:number=data.length;
		for(let i:number=0;i<n;i++){
			let g:GuideVo=new GuideVo(data[i]);
			for(let j:number=0;j<m;j++){
				if(g.Tid==parseInt(history[j]))g.isTrigger=true;
			}
			this.guide.push(g);
		}
		// this.gd.partnerList=TbPxy.getLineupList();
    }
	private triggerTarget(id){
		let gv:GuideVo;//=new GuideVo(TbPxy.getGuideObj(id));
		if(gv){
			this.gd.view=0;
			this.emit(GuideCmd.SHOW_WINDOW,gv);
		}
	}
	private parseParam(param){
		if(param.view)this.gd.view=param.view;
		else if(param.Lv)this.gd.lv=param.Lv;
		if(param.DrawEquipNormalFree){
			this.gd.freeDrawCardNum=param.DrawNormalFreeDailyNum||0;
			this.gd.hightDrawCardNum=param.DrawEquipHighFree;
		}
		let g:GuideVo=this.checkTrigger();
		if(g){
			Log.log("触发引导："+g.Tid);
			this.emit(GuideCmd.SHOW_WINDOW,g);
			if(!g.CanRepeat)this.saveData(g);
		}
	}
	private checkTrigger(){
		let n:number=this.guide.length;
		// this.gd.onHook=this.hookTime;
		this.checkCanLock();
		for(let i:number=0;i<n;i++){
			if(this.checkCondition(this.guide[i])){
				return this.guide[i];
			}
		}
		return null;
	}
	private checkCondition(gv:GuideVo){
		if(gv.isTrigger)return false;
		let res:boolean=true;
		for(let i:number=0;i<gv.Condition.length;i++){
			switch(gv.Condition[i]){
				case GuideCdtType.MAIN_LESSTHAN:
					// res=this.gd.chapterLevelId<parseInt(gv.Threshold[i]);
				break;
				case GuideCdtType.MAIN_ATLEAST:
					// res=this.gd.chapterLevelId>=parseInt(gv.Threshold[i]);
				break;
				case GuideCdtType.CHAPTER_UNCLEARED:
					// res=this.gd.chapterId<=parseInt(gv.Threshold[i]);
				break;
				case GuideCdtType.CHAPTER_CLEARED:
					// res=this.gd.chapterId>parseInt(gv.Threshold[i]);
				break;
				case GuideCdtType.LOCATE_AT:
					let view:Array<any>=gv.Threshold[i].split("||");
					let tm:boolean=false;
					for(let i:number=0;i<view.length;i++){
						if(view[i]==this.gd.view)tm=true;
					}
					res=tm;
				break;
				case GuideCdtType.PARTNER_OWNED:
					if(this.gd.view==GuideViewType.PARTNER){
						let n:number=this.gd.partnerList.length;
						let num:number;//=ObjPxy.cardLogic.getLineUpInfo().length;
						for(let i:number=0;i<n;i++){
							if(this.gd.partnerList[i].lv>0)num++;
						}
						res=num>=parseInt(gv.Threshold[i]);
					}else res=false;
				break;
				case GuideCdtType.COMMON_SUMMON_NUM:
					res=this.gd.freeDrawCardNum==parseInt(gv.Threshold[i]);
				break;
				case GuideCdtType.HOOKTIME_ATLEAST:
					res=this.gd.onHook>=parseInt(gv.Threshold[i]);
				break;
				case GuideCdtType.HOOKTIME_LESSTHAN:
					res=this.gd.onHook<=parseInt(gv.Threshold[i]);
				break;
				case GuideCdtType.IFEXIST_UNLOCKABLE_PARTNER:
					res=this.gd.canLock;
				break;
				case GuideCdtType.IFEXIST_LV2_PARTNER:
					res=this.gd.canLockAndLv2;
				break;
				default:
					res=false;
			}
			if(!res)return res;
		}
		return res;
	}
	private checkCanLock(){
		let n:number=this.gd.partnerList.length;
		let canLock:boolean=false;
		let canLockLv2:boolean=false;
		for(let i:number=0;i<n;i++){
			let cl;//=pxy.getLineupLock(this.gd.partnerList[i]);
			if(cl)canLock=true;
			if(cl&&this.gd.partnerList[i].lv>=2)canLockLv2=true;
		}
		this.gd.canLock=canLock;
		this.gd.canLockAndLv2=canLockLv2;
	}
	private get hookTime(){
		return //ObjPxy.hookLogic.getHookInfo().showTime;
	}
	private saveData(g:GuideVo){
		if(!g.CanRepeat)return;
		g.isTrigger=true;
		this.guideHistory.push(g.Tid);
		DbMgr.save("guideData",this.guideHistory);
	}
}