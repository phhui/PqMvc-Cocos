class MapsCreater {
    static create(panel:cc.Node,w:number,h:number){
        let img//:egret.Bitmap=ResUtils.getRes("base#grass");
        let col:number=Math.ceil(w/img.width)+5;
        let row:number=Math.ceil(h/img.height)+5;
        for(let i:number=-5;i<row;i++){
            for(let j:number=-5;j<col;j++){
                let item;//=ResUtils.getRes("base#grass");
                item.x=j*item.width;
                item.y=i*item.height;
                panel.addChild(item);
            }
        }
    }
    static createItem(){

    }
}