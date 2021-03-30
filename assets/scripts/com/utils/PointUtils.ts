class PointUtils{
    /**计算两点间距离 */
    public static getDis(p1,p2){
        return p1.sub(p2).mag();
    }
    /**根据速度计算A到B水平垂和直分速度 */
    public static getXySpeed(p1,p2,speed){
        var dis=this.getDis(p1,p2);
        var t=dis/speed;
        var vx=(p2.x-p1.x)/t;
        var vy=(p2.y-p1.y)/t;
        return cc.v2(vx,vy);
    }
    /**计算两点所形成的角度 */
    public static getAngle(p1,p2){
        var dx = p2.x - p1.x;
        var dy = p2.y - p1.y;
        var dir = cc.v2(dx,dy);
        var angle = dir.signAngle(cc.v2(1,0));
        var degree = angle / Math.PI * 180;
        return 0-degree;
    }
    /**计算中心点，修改ratio值可计算任意比例点 */
    public static getMiddlePoint(p1,p2,ratio=0.5){
        return cc.v2(p1.x+(p2.x-p1.x)*ratio,p1.y+(p2.y-p1.y)*ratio);
    }
    /**判断两点间距离是否在指定范围内 */
    public static pointHit(p1,p2,r){
        // if(r<1)r=1;
        return Math.abs(p2.x-p1.x)<r&&Math.abs(p2.y-p1.y)<r;
    }
    public static getRandom(p1:cc.Vec2,p2:cc.Vec2){
        let x:number=Math.floor(Math.random()*(p2.x-p1.x))+p1.x;
        let y:number=Math.floor(Math.random()*(p2.y-p1.y))+p1.y;
        return cc.v2(x,y);
    }
};