export default class GraphicsUtils{
    /**绘制扇形 */
    public static drawSector(gh:cc.Graphics,r:number,startAngle:number,endAngle:number,color:cc.Color=null) {
        if(!gh)return;
		gh.clear();
        let angle=(endAngle-startAngle)/180;
		let startRadians = (startAngle/180)*Math.PI; //起始角度
		let endRadian = 0-angle*Math.PI;//结束角度
		let start = cc.v2(0, 0); //圆心点
        let point1 = cc.v2(Math.cos(startRadians)*r + start.x, Math.sin(startRadians)*r + start.y);
        
        if(color)gh.fillColor=color;
        gh.moveTo(start.x, start.y);
        gh.lineTo(point1.x, point1.y);
        gh.arc(start.x, start.y, r, startRadians, endRadian,false);
        gh.lineTo(start.x, start.y); 
        gh.fill();
    }
}