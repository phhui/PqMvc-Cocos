export default class GuideVo{
    /**编号*/
    public Tid:number;
    /**触发条件"[enum]
    主线进度小于:
    主线进度大于等于:
    章节未通关:
    章节已通关:
    位于指定界面:
    拥有伙伴数大于等于:
    累计普通召唤次数为:
    当前挂机宝箱时长大于等于:
    当前挂机宝箱时长小于:
    是否存在可直接解锁伙伴:
    是否存在2级及以上的伙伴:";*/
    public Condition:Array<number>;
    /**触发值*/
    public Threshold:Array<string>;
    /**下一引导*/
    public Next:number;
    /**引导位置*/
    public Position:Array<number>;
    /**资源类型*/
    public ResType:string;
    /**文字说明*/
    public Description:string;
    /**文字框相对资源偏移*/
    public Deviation:Array<number>;
    /**触发延迟毫秒*/
    public Delay:number;
    /**是否可重复触发*/
    public CanRepeat:boolean;
    /**是否强制引导*/
    public IsForced:boolean;
    /**附加参数*/
    public ExtraParam:Array<number>;
    /**是否已触发 */
    public isTrigger:boolean=false;
    public _data:any;
    constructor(data:any=null){
        this._data=data;
        this.Tid=data.Tid;
        this.Condition=data.Condition;
        this.Threshold=data.Threshold;
        this.Next=data.Preposition;
        this.Position=data.Position;
        this.ResType=data.ResType;
        this.Description=data.Description;
        this.Deviation=data.Deviation;
        this.Delay=data.Delay*0.001;
        this.CanRepeat=data.CanRepeat;
        this.IsForced=data.IsForced;
        this.ExtraParam=data.ExtraParam;
    }
}