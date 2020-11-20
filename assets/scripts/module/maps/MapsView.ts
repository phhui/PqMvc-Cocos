import BaseUi from '../base/BaseUi';
export default class MapsView extends BaseUi{
    private btn:cc.Button;
    constructor(){
        super();
    }
    onload(){
        this.node.removeAllChildren();
        this.btn=this.node.addComponent(cc.Button);
    }
}