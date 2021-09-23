/**等比缩放背景使所有内容都出现在屏幕上  */

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShowAllScale extends cc.Component {

    start () {
        ShowAllScale.AdaptorDesign(this.node);
    }
    public static AdaptorDesign(node:cc.Node)
    {
        //屏幕适配
        //let frameSize = cc.view.getFrameSize();
        let winSize= cc.winSize;
        let designSize = cc.view.getDesignResolutionSize();

        let resultScale=1.0;

        let frameScale = winSize.width/winSize.height;//
        let designScale= designSize.width/designSize.height;//
        if( frameScale >= designScale )
        {//硬件屏幕width更大,适配height
            resultScale = winSize.height/designSize.height;
        }
        else
        {//硬件屏幕height更大,适配width
            resultScale = winSize.width/designSize.width;
        }
        node.setScale(resultScale,resultScale);
    }
}
