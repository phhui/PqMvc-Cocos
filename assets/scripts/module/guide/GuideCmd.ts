
export default class GuideCmd{
    public static MODULE_NAME:string='Guide';
    public static SHOW_WINDOW:string='Guide_show_window';
    public static CLOSE_WINDOW:string='Guide_close_window';
    public static INIT_DATA:string='Guide_init_data';
    /**触发引导 */
    public static TRIGGER:string="Guide_trigger";
    /**触发目标引导，需带引导ID */
    public static TRIGGER_TARGET:string="Guide_trigger_target"
}
window["GuideCmd"]=GuideCmd;