import PlayerCmd from "./PlayerCmd";

class PlayerProxy extends BaseProxy{
    static NAME:string="PlayerProxy";
    public size:number=500;
	public execute(param:any=null, type:string=null):void{
		switch(type){
			case PlayerCmd.INIT_DATA:
				this.initData();
				break;
		}
	}
    private initData(){

    }
	public getLocation(){
		var x:number=Math.random()*10000;
		var y:number=Math.random()*10000;
		return [888,8888];
	}
	public getRect(){
		let st=cc.director.getScene();
        var location:Array<any>=this.getLocation();
        var row:number=Math.round(location[0]/this.size);
        var col:number=Math.round(location[1]/this.size);
		var rowNum:number=Math.ceil((st.width-this.size)/2/this.size);
		var colNum:number=Math.ceil((st.height-this.size)/2/this.size);
        var startRow:number=row-rowNum-1;
        var startCol:number=col-colNum-1;
	}
}