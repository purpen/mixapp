import React, {Component} from 'react'
import {StyleSheet, Image, InteractionManager} from 'react-native'
import TabNavigator from 'react-native-tab-navigator';
import {StackNavigator} from 'react-navigation'
import IndexPage from './index/IndexPage'
import CategoryPage from './category/CategoryPage'
import LocalGuidePage from './localGuide/LocalGuidePage'
import ShopCartPage from './shopCart/ShopCartPage'
import PersonalCenterPage from './personalCenter/PersonalCenterPage'
import SplashScreen from 'react-native-splash-screen'
import SubjectDetailPage from "./localGuide/SubjectDetailPage";
import ProductDetailPage from "./product/ProductDetailPage";

export const TAB = {
    index: '首页', category: '分类', localGuide: '本地指南', shopCart: '购物车', personalCenter: '个人'
}

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        selectedTab: TAB.index
    };

    componentDidMount() {
        this.timer = setTimeout(() => {
            InteractionManager.runAfterInteractions(() => {
                SplashScreen.hide();
            });
        }, 1000);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <TabNavigator style={styles.container}>
                {this._renderTabItem(IndexPage, TAB.index, TAB.index, require('../res/imgs/home.png'), require('../res/imgs/home_selected.png'))}
                {this._renderTabItem(CategoryPage, TAB.category, TAB.category, require('../res/imgs/category.png'), require('../res/imgs/categoty_selected.png'))}
                {this._renderTabItem(LocalGuidePage, TAB.localGuide, TAB.localGuide, require('../res/imgs/local_guide.png'), require('../res/imgs/local_guide_selected.png'))}
                {this._renderTabItem(ShopCartPage, TAB.shopCart, TAB.shopCart, require('../res/imgs/shopping_cart.png'), require('../res/imgs/shopping_cart_selected.png'))}
                {this._renderTabItem(PersonalCenterPage, TAB.personalCenter, TAB.personalCenter, require('../res/imgs/personal_center.png'), require('../res/imgs/personal_center_selected.png'))}
            </TabNavigator>
        )
    }

    _renderTabItem(Component, title, selectedTab, renderIcon, renderSelectedIcon) {
        return <TabNavigator.Item
            selected={this.state.selectedTab === selectedTab}
            title={title}
            titleStyle={styles.tabStyle}
            selectedTitleStyle={styles.tabStyleSelected}
            renderIcon={() => <Image style={styles.tabIconStyle}
                                     source={renderIcon}/>}
            renderSelectedIcon={() => <Image style={styles.tabIconStyle} source={renderSelectedIcon}/>}
            onPress={() => this.setState({selectedTab: selectedTab})}>
            <Component {...this.props}/>
        </TabNavigator.Item>
    }
}

// export const D3IN = StackNavigator({
//     Home: {
//         screen: HomePage,
//         navigationOptions: {
//             // headerLeft: null
//             // headerTitle:"首页",
//
//         }
//     },
//     SubjectDetail:{
//         screen:SubjectDetailPage,
//     },
//     ProductDetail:{
//         screen:ProductDetailPage,
//     }
// }, {
//     headerMode: 'none',
//     headerTitleStyle: {
//         alignSelf: 'center'
//     }
// });

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabStyle: {
        color: "#A0A0A0",
        fontSize: 11,
    },
    tabStyleSelected: {
        color: "#9A7D56",
        fontSize: 11,
    },
    tabIconStyle: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
    }
})

