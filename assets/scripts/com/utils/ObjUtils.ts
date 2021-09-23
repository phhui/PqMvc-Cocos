export default class ObjUtisl{
    /**
     * 拷贝属性
     * @param oldItem
     * @param newItem
     */
     public static copyAttr = function (oldItem, newItem) {
        for (const key in oldItem) {
            if (typeof oldItem[key] !== 'function') {
                newItem[key] = oldItem[key];
            }
        }
    };
    /**复制对象 */
    public static copyObj = function (oldItem, newItem) {
        for (const key in oldItem) {
            newItem[key] = oldItem[key];
        }
    };
}