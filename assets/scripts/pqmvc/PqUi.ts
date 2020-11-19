const {ccclass, property} = cc._decorator;
@ccclass
export default class PqUi extends cc.Component{
    protected inited:boolean=false;
    protected init(){
        if(this.inited)return;
        this.inited=true;
    }
    onLoad(){
        if(!this.inited)this.init();
    }
    onDestroy(){
        this.destory();
    }
    destory(){
        this.inited=false;
    }
}