
export default class MainSceneCmd{
    public static MODULE_NAME:string='MainScene';
    public static SHOW_WINDOW:string='MainScene_show_window';
    public static CLOSE_WINDOW:string='MainScene_close_window';
    public static INIT_DATA:string='MainScene_init_data';
    public static UPDATE_DATA:string="MainScene_update_data";
    /**初始化UI，针对Bundle分包 */
    public static INIT_UI:string="MainScene_init_ui";
    public static START_CHECK_HIT:string="MainScene_start_check_hit";
    public static END_CHECK_HIT:string="MainScene_end_check_hit";
    public static ADD_CUSTOMER:string="MainScene_add_customer";
    public static SUB_CUSTOMER:string="MainScene_sub_customer";
    public static ADD_SELLER:string="MainScene_add_seller";
    public static ADD_OWNER:string="MainScene_add_owner";
    public static SUB_OWNER:string="MainScene_sub_owner";
    public static UNLOCK_PLOT:string="MainScene_unlock_plot";
    public static BUYING:string="MainScene_buying";
}