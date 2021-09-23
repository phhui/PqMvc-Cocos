export default class ResArgs{
    public resPath:string;
    public resType:any;
    public progress:Function;
    public callback:Function;
    public target:any;
    public priority:number=0;
    //resPath:string,resType:any,progress?:Function,cb?:Function,target?:any,priority?:number
    public static create(...args):ResArgs{
        if(args.length<1)throw new Error("resload param error");
        let ra:ResArgs=new ResArgs();
        ra.resPath=args[0];
        if(args.length==6||(args.length==5&&typeof(args[4])!="number")){
            ra.resType=args[1];
            ra.progress=args[2];
            ra.callback=args[3];
            ra.target=args[4];
            if(args.length==6)ra.priority=args[5];
        }else if(args.length==5||(args.length==4&&typeof(args[3])!="number")){
            if(args[1].name.substr(0,3)!="cc_"&&args[1].name.substr(0,6)!="_Class"){
                ra.progress=args[1];
                ra.callback=args[2];
                ra.target=args[3];
            }else{
                ra.resType=args[1];
                ra.callback=args[2];
                ra.target=args[3];
            }
            if(args.length==5)ra.priority=args[4];
        }else if(args.length==4||(args.length==3&&typeof(args[2])!="number")){
            ra.callback=args[1];
            ra.target=args[2];
            if(args.length==4)ra.priority=args[3];
        }else if(args.length==3||(args.length==2&&typeof(args[1])!="number")){
            ra.callback=args[2];
            if(args.length==3)ra.priority=args[2];
        }else ra.priority=args[1];
        return ra;
    }
}