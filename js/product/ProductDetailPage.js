import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    ActivityIndicator,
    Platform,
    TouchableOpacity,
    StatusBar,
    WebView
} from 'react-native'
import NavigationBar from '../common/NavigationBar'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import ViewUtil from "../common/ViewUtil";
import ProductsIntroduction from "./ProductsIntroduction";
import {height, ToastConfig, width} from "../common/Constants";
import ProductsComments from "./ProductsComments";
import AppService from "../common/AppService";
import ParamsUtil from "../network/ParamsUtil";
import Toast from 'react-native-root-toast';

const tabNames = ['商品', '详情', '评价'];
export default class ProductDetailPage extends Component {
    state = {
        isLoading: true,
        productInfo: null,
        message: null
    }

    render() {
        const {goBack, state} = this.props.navigation;
        let navigationBar = <NavigationBar
            title={state.params.title}
            statusBar={{translucent: true}}
            leftButton={ViewUtil.getLeftButton(() => {
                goBack();
            })}
            hide={false}/>;

        let item = this.state.productInfo;
        let content = null;
        if (!this.state.message) {
            content = item === null ? <ActivityIndicator/> : (<ScrollableTabView
                renderTabBar={(tabBarProps) => <ScrollableTabBar {...tabBarProps} activeTextColor="#9A7D56"
                                                                 inactiveTextColor="#2A2A2A"
                                                                 style={{height: 44}} underlineStyle={{
                    height: 2,
                    backgroundColor: "#9A7D56"
                }}/>}
                initialPage={0}
            >

                {this._getTabContent(item)}
            </ScrollableTabView>);
        }
        return (
            <View style={styles.container}>
                {navigationBar}
                {content}
                {this._bottomBar()}
            </View>
        );
    }

    _bottomBar() {
        if (this.state.message) return <Text
            style={{alignSelf: 'center', color: '#666', fontSize: 14, marginTop: 80}}>{this.state.message}</Text>;
        return (
            <View style={styles.bottomBarContainer}>
                <View style={{height:0.5,backgroundColor:"#ccc"}}/>
                <View style={styles.bottomBar}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.share_favorite_container}>
                        <Image source={require('../../res/imgs/icon_unfavorite.png')} style={{width: 15, height: 15}}/>
                        <Text style={styles.share_favorite}>收藏</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={styles.share_favorite_container}>
                        <Image source={require('../../res/imgs/icon_share.png')}
                               style={{width: 15, height: 15, resizeMode: 'contain'}}/>
                        <Text style={styles.share_favorite}>分享</Text>
                    </TouchableOpacity>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <TouchableOpacity activeOpacity={0.7} style={[styles.purchase,{backgroundColor: "#9A7D56"}]}>
                            <Text style={{color: 'white', fontSize: 17}}>加入购物车</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={[styles.purchase,{backgroundColor:'#222'}]}>
                            <Text style={{color: 'white', fontSize: 17}}>立即购买</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    componentDidMount() {
        const {state} = this.props.navigation;
        let params = ParamsUtil.generateProductInfoParams(state.params._id);
        AppService.getProductInfo(params).then((response) => {
            console.log(response)
            if (response.success) {
                let data = response.data;
                this.setState({
                    isLoading: false,
                    productInfo: data,
                });
            } else {
                this.setState({
                    isLoading: false,
                    message: response.message,
                    productInfo: null
                });
            }
        }).catch((error) => {
            console.log('getProductInfo:' + error)
            this.setState({
                isLoading: false,
                error: true,
                errorInfo: error.toString(),
            });
            Toast.show('网络异常', ToastConfig);
        });
    }

    _getTabContent(item) {
        if (item === null) return <Text
            style={{width: width, alignSelf: 'center', fontSize: 14, color: '#666'}}>{this.state.message}</Text>;
        return tabNames.map((value, i) => {
            switch (i) {
                case 0:
                    return <ProductsIntroduction productInfo={item} tabLabel={value} key={i}/>
                    break;
                case 1:
                    return <WebView style={styles.webView} source={{uri: item.content_view_url}} scalesPageToFit={true}
                                    javaScriptEnabled={true}
                                    domStorageEnabled={true} tabLabel={value}
                                    key={i}/>
                    break;
                case 2:
                    return <ProductsComments style={{fontSize: 14, color: '#222'}} tabLabel={value}
                                             key={i} id={item._id.toString()}/>
                    break;
                default:
                    return <Text style={{fontSize: 14, color: '#222'}} tabLabel={value}
                                 key={i}>界面不存在</Text>
                    break
            }
        })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    share_favorite_container: {
        flexDirection: 'row',
        marginLeft: 15,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center'
    },
    share_favorite: {
        fontSize: 14,
        color: '#666',
        marginLeft: 2,
    },
    bottomBarContainer:{
        position: 'absolute',
        bottom: 0,
    },
    bottomBar: {
        backgroundColor: 'white',
        height: 44,
        width: width,
        flex: 1,
        flexDirection: 'row'
    },
    webView: {
        height: height - 44 * 3 - StatusBar.currentHeight,
    },
    purchase:{
        paddingLeft: 15,
        paddingRight: 15,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center'
    }
});