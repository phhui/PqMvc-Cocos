/*
 * @Author: phhui
 * @Date: 2021-03-17 10:01:07
 * @LastEditTime: 2021-03-17 10:02:44
 * @LastEditors: phhui
 * @Description: 
 * @FilePath: \ro\assets\Script\com\utils\PrefabUtils.ts
 */
export default class PrefabUtils{
    public static initPf(pf:cc.Prefab,parent:cc.Node):cc.Node{
        let nd:cc.Node=cc.instantiate(pf);
        nd.parent=parent;
        return nd;
    }
}