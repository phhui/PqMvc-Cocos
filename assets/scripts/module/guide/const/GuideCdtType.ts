export default class GuideCdtType{
    /**主线进度小于 */
    public static MAIN_LESSTHAN:number=1;
    /**主线进度大于等于 */
    public static MAIN_ATLEAST:number=2;
    /**章节未通关 */
    public static CHAPTER_UNCLEARED:number=3;
    /**章节已通关 */
    public static CHAPTER_CLEARED:number=4;
    /**位于指定界面 */
    public static LOCATE_AT:number=5;
    /**拥有伙伴数大于等于 */
    public static PARTNER_OWNED:number=6;
    /**累计普通召唤次数为 */
    public static COMMON_SUMMON_NUM:number=7;
    /**当前挂机宝箱时长大于等于 */
    public static HOOKTIME_ATLEAST:number=8;
    /**当前挂机宝箱时长小于 */
    public static HOOKTIME_LESSTHAN:number=9;
    /**是否存在可直接解锁伙伴 */
    public static IFEXIST_UNLOCKABLE_PARTNER:number=10;
    /**是否存在2级及以上的伙伴 */
    public static IFEXIST_LV2_PARTNER:number=11;
}