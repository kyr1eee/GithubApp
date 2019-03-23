// 全局导航工具类
export default class NavigationUtil {
    // 跳转指定页面
    static turnToPage(params, page) {
        const navigation = NavigationUtil.navigation;
        if(!navigation) {
            console.error('navigation can not be null');
            return;
        }
        navigation.navigate(
            page,
            {
                ...params
            }
        )
    }
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