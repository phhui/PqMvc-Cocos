export default class SysCmd{
    public static GAME_INIT:string="sys_game_init";
    /**显示窗口，传node */
    public static SHOW_WINDOW:string="sys_show_window";
    /**关闭窗口 */
    public static CLOSE_WINDOW:string="sys_close_window";
    /**关闭所有窗口 */
    public static CLOSE_ALL_WINDOW:string="sys_close_all_window";
    /**配置加载完毕，可以初始化数据 */
    public static INIT_DATA:string="sys_init_data";
    /**数据更新 */
    public static UPDATE_DATA:string="sys_update_data";
    static RESIZE: string="sys_resize";
    public static SHOW_DIALOG:string="sys_show_dialog";
}