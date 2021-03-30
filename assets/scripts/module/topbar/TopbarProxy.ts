
import BaseProxy from '../base/BaseProxy';
import TopbarCmd from './TopbarCmd';
class TopbarProxy extends BaseProxy{
    static NAME:string='TopbarProxy';
	public execute(param:any= null, type:string= null):void{
		switch(type){
			case TopbarCmd.INIT_DATA:
				this.initData();
				break;
		}
    }
    public initData()
    {

    }
}