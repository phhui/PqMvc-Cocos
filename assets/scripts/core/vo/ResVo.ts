class ResVo{
    public name:string;
    public type:string;
    public url:string;
    constructor(data:any=null){
        this.bind(data);
    }
    public bind(data:any){
        if(!data)return;
        this.name=data.name;
        this.type=data.type;
        this.url=data.url;
    }
}