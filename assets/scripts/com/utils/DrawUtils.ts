export default class DrawUtils{
    private static drawList:any={};
    public static autoDraw(nd:cc.Node){
        this.drawList[nd.name+"_"+nd.uuid]={nd:nd,defPos:nd.position,w:nd.width,h:nd.height};
        nd.on(cc.Node.EventType.TOUCH_START,this.drawStart,this);
        nd.on(cc.Node.EventType.TOUCH_END,this.drawEnd,this);
    }
    private static drawStart(e){
        
    }
    private static drawEnd(e){

    }
}