/**别人写的代码，凑合着用 */
const delimsign ='|'
export default class CSVReader {
    public filename:string=null;
    public keyCol:number=0;//关键列
    public specialFunc:Function;
    public mapData={};
    protected typeAry:string[] ;//类型数组
    protected nameAry:string[] ;//名字数组
    protected rowSize:number = 0;
    protected colSize:number = 0;
    constructor(){
        
    }
    public getColName(col:number):string{
        return this.nameAry[col];
    }
    public getRowSize():number{//获得行数
        return this.rowSize;
    }
    public getColSize():number{//获得行数
        return this.colSize;
    }
    public loadCallbackFunc(err, file){
        let lineAry = file.text.split("\r\n");
        //第0行cs 第1行type 第2行 col 第3行是描述 name 第四行开始是实际数据
        let csAry:string[] = lineAry[0].split(",");
        this.typeAry =lineAry[1].split(",");
        this.nameAry =lineAry[2].split(",");
        let dataStartIdx=4;
        this.colSize = csAry.length;
        // this.rowSize= lineAry.length-dataStartIdx;
        for(let row = dataStartIdx;row<lineAry.length;row++){
            let lineStr:string=lineAry[row];
            if( lineStr=="")
                continue;
            let itemArr =this.splitField(lineStr);//lineStr.split(",")
            this.rowSize++;
            let key;
            let node={};
            //let key = this.readCol(itemArr,this.typeAry,this.keyCol);
            if( this.typeAry[this.keyCol]=="int")key=parseInt(itemArr[this.keyCol]);
            else key=itemArr[this.keyCol];
            for(let col =0; col < itemArr.length;col++){
                if(col >= csAry.length || csAry[col].toLowerCase()=="s"){
                    continue;
                }
                let strdata:string=itemArr[col];
                let colname=this.nameAry[col];
                let coltype=this.typeAry[col];
                if(this.specialFunc == null || this.specialFunc(colname, strdata, node,key,this) == false){
                    node[colname]=this.readCol(itemArr,this.typeAry,col);
                }
            }
            this.mapData[key] =node;
        }
    }
    public splitField(lineStr:string):string[]{
        if (lineStr.length == 0)return ;
        let fieldAry=[];
        let startIdx=0;//searchFlag 1
        let searchFlag=false;//0查找下一个逗号 1 则查找引号
        do{
            let fld:string="";
            if(lineStr[startIdx]=="," && lineStr[startIdx+1]=="\""){
                searchFlag = true;
                startIdx+=2;
            }else if(lineStr[startIdx]=="\""){
                searchFlag = true;
                startIdx++;
            }else if(lineStr[startIdx]==","){
                startIdx++;
                searchFlag = false;
            }else{
                searchFlag = false;
            }
            if( searchFlag ==true ){
                let findIdx=lineStr.indexOf("\"",startIdx);
                if( findIdx==-1)
                    throw Error(lineStr+"引号不成对");
                fld=lineStr.substr(startIdx,findIdx-startIdx);
                fieldAry.push(fld);
                startIdx=findIdx+1;
            }else{
                let findIdx=lineStr.indexOf(",",startIdx);
                if( findIdx==-1){//最后一列？
                    fld=lineStr.substr(startIdx,lineStr.length-startIdx);
                    fieldAry.push(fld);
                    startIdx=lineStr.length;
                }else{
                    fld=lineStr.substr(startIdx,findIdx-startIdx);
                    fieldAry.push(fld);
                    startIdx=findIdx;
                }
            }
        }while(startIdx<lineStr.length);
        return fieldAry;
    }
    /**读取配置文件
     * @csvfile:文件路径和名称
     * @keyCol:索引字段所在列
     * @specialFunc:指定特殊处理字段,参数:specialFunc(name, strdata, node,key)
     * @completeFunc:完成后调用函数
     */
    public readFromFile(csvfile:string,keyCol:number=0, specialFunc:Function=null,completeFunc:Function=null) {
        this.filename=csvfile;
        this.keyCol= keyCol;
        this.specialFunc= specialFunc;
        cc.resources.load(csvfile, (err, file)=>{
                if(err!=null){
                    throw new Error ("readFromFile error:"+err.message);
                }
                this.loadCallbackFunc(err, file);
                if( completeFunc != null){
                    completeFunc(this);
                }
        });
    }

    public readCol(itemArr:Array<string>, typeArr:Array<string>, col:number){
        let coldata=itemArr[col];
        if( typeArr[col]=="int"){
            let col_int = parseInt(coldata);//Number(coldata);
            if(isNaN(col_int)){
                col_int=0;
                //throw new Error ("配置表"+this.filename+"字段"+this.nameAry[col]+"抛出的异常");
            }
            return col_int;
        }else if(typeArr[col]=="int[]"){
            if( coldata=="" || coldata==null){
                return [];
            }
            let int_ary=coldata.split(delimsign).map(Number);
            return int_ary;
        }
        else if(typeArr[col]=="string[]"){
            if( coldata=="" || coldata==null){
                return [];
            }
            return coldata.split(delimsign);
        }
        else if(typeArr[col]=="vec2"){
            if( coldata=="" || coldata==null){
                return cc.v2(0,0);
            }
            let int_ary=coldata.split(delimsign).map(Number);
            return cc.v2(int_ary[0],int_ary[1]);
        }
        return coldata;
    }
    //查找节点
    public findNode(key:number|string){
        return this.mapData[key];
    }
    //查找值
    public findValue(key:number|string,colname:string){
        let node=this.findNode(key);
        if( node == null){
            cc.log("CSVReader.findValue:can't find key,colname:"+key+","+colname);
            return "";
        }
        return node[colname];
    }
    public printT(){
        cc.log(this.filename);
    }
}