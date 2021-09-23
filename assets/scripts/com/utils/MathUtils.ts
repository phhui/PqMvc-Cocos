export default class MathUtils{

    /**获取点到直线间的最短距离及垂足(垂直点) */
    public static getDistanceP2L(point,line){
        if(!line)
        var x1=line.startPoint.x;
        var y1=line.startPoint.y;
        var x2=line.endPoint.x;
        var y2=line.endPoint.y;
        var x0=point.x;
        var y0=point.y;
        
        var k=x1==x2?10000:(y2-y1)/(x2-x1);//当x1=x2时，给斜率设一个较大值10000
        var a=k;
        var b=-1;
        var c=y1-k*x1;
        
        var d=Math.abs(a*x0+b*y0+c)/Math.sqrt(a*a+b*b);
        
        var px=(b*b*x0-a*b*y0-a*c)/(a*a+b*b);
        var py=(a*a*y0-a*b*x0-b*c)/(a*a+b*b);
        var p=new cc.Vec2(px,py);
        
        return [d,p];
    }
}