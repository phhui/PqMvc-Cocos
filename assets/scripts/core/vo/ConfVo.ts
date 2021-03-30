import GroupVo from "./GroupVo";
import ResVo from "./ResVo";

class ConfVo{
    public groups:Array<GroupVo>;
    public resources:Array<ResVo>;
    constructor(data:string=null){
        this.bind(data);
    }
    public bind(data:any){
        if(!data)return;
        let obj=JSON.parse(data);
        this.groups=this.parseGroups(obj.groups);
        this.resources=this.parseRes(obj.resources);
    }
    private parseGroups(arr:Array<any>):Array<GroupVo>{
        let n:number=arr.length;
        let g:Array<GroupVo>=[];
        for(let i:number=0;i<n;i++){
            g.push(new GroupVo(arr[i]));
        }
        return g;
    }
    private parseRes(arr:Array<any>):Array<ResVo>{
        let n:number=arr.length;
        let g:Array<ResVo>=[];
        for(let i:number=0;i<n;i++){
            g.push(new ResVo(arr[i]));
        }
        return g;
    } 
} 