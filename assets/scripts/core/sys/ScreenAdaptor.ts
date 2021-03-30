/**等比缩放背景使屏幕不出现黑边，背景部分内容可能会超出去 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class ScreenAdaptor extends cc.Component {

    start () {
        ScreenAdaptor.Adaptor(this.node);
    }
    
    public static Adaptor(CanvasNode:cc.Node)
    {
        //屏幕适配
        let Canvas = CanvasNode.getComponent(cc.Canvas);

        //let frameSize = cc.view.getFrameSize();
        let winSize= cc.winSize;
        let designSize = cc.view.getDesignResolutionSize();

        let resultScale=1.0;

        let frameScale = winSize.width/winSize.height;//
        let designScale= designSize.width/designSize.height;//
        if( frameScale >= designScale )
        {//硬件屏幕width更大,适配width
            resultScale = winSize.width/designSize.width;
            Canvas.fitHeight = false;
            Canvas.fitWidth = true;
        }
        else
        {//硬件屏幕height更大,适配height
            resultScale = winSize.height/designSize.height;
            Canvas.fitHeight = true;
            Canvas.fitWidth = false;
        }
    }
    // update (dt) {}
}
