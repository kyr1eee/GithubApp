// 全局导航工具类
export default class NavigationUtil {
    // 返回上一页
    static goBack(navigation) {
        navigation.goBack();
    }

    // 返回首页
    static resetToHomePage(params) {
        const {navigation} = params;
        navigation.navigate("Main");
    }
}