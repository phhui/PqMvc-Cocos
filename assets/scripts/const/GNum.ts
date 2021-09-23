export default class GNum{
    public static  MAXLEN_NAME=22;	//名字长度
    public static  MAXLEN_URL=160;//url长度
    public static  STRMAXLEN_KEY=16;//CheckKey长度
    public static  MAX_ATTRIBUTE=6;
    public static  LobbyServerID=6000;//大厅服务器id
    public static  MaxMission=201;//关卡数量
    public static  MAX_USERDATA=128;//玩家自定义设置
    public static  TITLE_STR_LEN=128;//标题长度
    public static  MAX_CHAPTER=20;	//最大20章
    
    public static RateScale:number =1000;//千分比
    public static ADDelay:number = 3.2;//与广告同时出现的按钮延迟出现x秒
    //--------------------------------------------------数字显示缩写 如 100000写成10万
    /**千 */
    public static Thousand=1000;//千
    /**百万 */
    public static Million=1000000;//百万
    /**十亿 */
    public static Billion=1000000000;//十亿
    /**中文数量单位对应的值10000 */
    public static CnNumUnit:number=10000;
    /**英文数量单位对应的值1000 */
    public static EnNumUnit:number=1000;
    /**最多4种品质 */
    public static MaxQuality:number=4;
    /**体力恢复间隔(分钟) */
    public static autoRecoverPower:number=15;
    /**最大体力值 */
    public static maxPower:number=5;
}