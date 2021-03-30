export default class SysCmd{
    /**打开窗口，传prefab路径，会自动加载并显示 */
    // public static OPEN_WINDOW:string="sys_open_window";//旧项目版本太低，加载不通用
    /**显示窗口，传node */
    public static SHOW_WINDOW:string="sys_show_window";
    /**关闭窗口 */
    public static CLOSE_WINDOW:string="sys_close_window";
    /**关闭所有窗口 */
    public static CLOSE_ALL_WINDOW:string="sys_close_all_window";
    /**显示进度条 */
    public static SHOW_LOADING:string="sys_show_loading";
    /**更新进度条 */
    public static UPDATE_PROGRESS:string="sys_update_progress";
    /**关闭进度条 */
    public static CLOSE_LOADING:string="sys_close_loading";
	static ADD_TO_STAGE: string="sys_add_to_stage";
	static REMOVE_FROM_STAGE: string="sys_remove_from_stage";
	static RESIZE: string="sys_resize";
}