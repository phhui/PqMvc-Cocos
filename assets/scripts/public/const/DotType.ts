/**
 * @ Author: phhui
 * @ Create Time: 2020-12-16 14:52:53
 * @ Modified by: phhui
 * @ Modified time: 2020-12-23 16:00:10
 * @ Description:
 */

export default class DotType{
    /**关卡开始  带参数关卡ID 关卡名字    */
    public static STAGE_START:string="dottype_stage_start";
    /**关卡进行中 带参数 选择的BUFF*/
    public static STAGE_RUNNING:string="dottype_stage_running";
    /**关卡结束   带参数object    
     * stageId  关卡ID  String  1 , 2 , 3 , 1.1 , 1.2 , 1.3 格式 最多支持 32 个字符  必传    
     * stageName 关卡名称 String 最多支持 32 个字符 必传    
     * userId 用户ID String 最多支持 32 个字符 可选    
     * event 事件类型 String complete:关卡完成 fail:关卡失败 必传    
     * params 事件参数  Object params.desc 描述 String 对关卡失败/成功的描述 可选*/
    public static STAGE_END:string="dottype_stage_end";
    /**玩家闯关通关：领取双倍奖励*/
    public static Mission_double_reward:string="Mission_double_reward";
    /**玩家闯关通关：再次领取双倍奖励*/
    public static Mission_double_reward_again:string="Mission_double_reward_again";
    /**玩家闯关通关：直接领取奖励*/
    public static Mission_reward:string="Mission_reward";
    /**玩家闯关死亡复活*/
    public static Mission_relive:string="Mission_relive";
    /**无尽之塔死亡复活 */
    public static Endless_relive:string="Endless_relive";
    /**无尽之塔通关:   领取双倍奖励*/
    public static Endless_double_reward:string="Endless_double_reward";
    /**无尽之塔通关：再次领取双倍奖励*/
    public static Endless_double_reward_again:string="Endless_double_reward_again";
    /**无尽之塔通关:   直接领取奖励*/
    public static Endless_reward:string="Endless_reward";;
    /**精英副本通关:  领取双倍奖励*/
    public static Boss_double_reward:string="Boss_double_reward";
    /**精英副本通关：再次领取双倍奖励*/
    public static Boss_double_reward_again:string="Boss_double_reward_again";
    /**精英副本通关:  直接领取奖励*/
    public static Boss_reward:string="Boss_reward";
    /**精英副本死亡复活*/
    public static Boss_relive:string="Boss_relive";
    /**白金宝箱：领取双倍奖励*/
    public static Platinum_box_dounble_reward:string="Platinum_box_dounble_reward";
    /**白金宝箱：直接领取奖励*/
    public static Platinum_box_reward:string="Platinum_box_reward";
    /**神秘宝箱：领取双倍奖励*/
    public static Mystery_box_dounble_reward:string="Mystery_box_dounble_reward";
    /**神秘宝箱：直接领取奖励*/
    public static Mystery_box_reward:string="Mystery_box_reward";
    /**离线奖励双倍领取*/
    public static Offline_double_reward:string="Offline_double_reward";
    /**离线奖励直接领取*/
    public static Offline_reward:string="Offline_reward";
    /**玩家装备提升*/
    public static clickEquipUpgrade:string="clickEquipUpgrade";
    /**玩家点击装备洗炼*/
    public static clickEquipRefine:string="clickEquipRefine";
    /**玩家天赋提升*/
    public static talentUpgrade:string="talentUpgrade";
    /**周卡多倍领取*/
    public static Daily_card_double_reward:string="Daily_card_double_reward";
    /**周卡多倍再次领取*/
    public static Daily_card_double_reward_again:string="Daily_card_double_reward_again";
}