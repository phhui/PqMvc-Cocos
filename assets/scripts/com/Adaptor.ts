const {ccclass, property} = cc._decorator;

@ccclass
export default class Adaptor extends cc.Component {
    private defW:number=1080;
    private defH:number=1920;

    start () {
        let w:number=cc.view.getCanvasSize().width;
        let h:number=cc.view.getCanvasSize().height;
        let scale:number=(w<h?w/this.defW:h/this.defH);
        this.node.setScale(cc.v2(scale,scale));
    }
}
