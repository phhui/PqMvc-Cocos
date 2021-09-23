export default class GroupVo{
    public name:string;
    public keys:Array<string>;
    constructor(data:any=null){
        this.bind(data);
    }
    public bind(data:any){
        if(!data)return;
        this.name=data.name;
        this.keys=data.keys.split(',');
    }
}