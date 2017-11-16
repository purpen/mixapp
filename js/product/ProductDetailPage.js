import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, ActivityIndicator,Platform,TouchableOpacity,StatusBar,WebView} from 'react-native'
import NavigationBar from '../common/NavigationBar'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import ViewUtil from "../common/ViewUtil";
import ProductsIntroduction from "./ProductsIntroduction";
import {PRODUCT_DETAIL_URL} from "../common/URLS";
import {height, width} from "../common/Constants";
import ProductsComments from "./ProductsComments";

const tabNames = ['商品', '详情', '评价'];
export default class ProductDetailPage extends Component {
    state = {
        isLoading: true,
        productInfo: null,
        message:null
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
        let content=null;
        if (!this.state.message){
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

    _bottomBar(){
        if (this.state.message) return <Text style={{alignSelf:'center',color:'#666',fontSize:14,marginTop:80}}>{this.state.message}</Text>;
        return (
            <View style={styles.bottomBar}>
                <TouchableOpacity activeOpacity={0.7} style={styles.share_favorite_container}>
                    <Image source={require('../../res/imgs/icon_unfavorite.png')} style={{width:15,height:15}}/>
                    <Text style={styles.share_favorite}>收藏</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.share_favorite_container}>
                    <Image source={require('../../res/imgs/icon_share.png')} style={{width:15,height:15,resizeMode:'contain'}}/>
                    <Text style={styles.share_favorite}>分享</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={{paddingLeft:15,paddingRight:15,height:44,backgroundColor:"#9A7D56",alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'white',fontSize:17}}>加入购物车</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={{paddingLeft:15,paddingRight:15,height:44,backgroundColor:"#222",alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'white',fontSize:17}}>立即购买</Text>
                </TouchableOpacity>
            </View>
        );
    }

    componentDidMount() {
        const {state} = this.props.navigation;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let body = 'id=' + state.params._id;
        let request = new Request(PRODUCT_DETAIL_URL, {method: 'POST', headers: headers, body: body});
        fetch(request)
            .then((response) => response.json())
            .then((responseJson) => {
                if (!responseJson.success){
                    this.setState({
                        isLoading: false,
                        message: responseJson.message,
                        productInfo:null
                    });
                    return;
                }
                let data = responseJson.data;
                this.setState({
                    isLoading: false,
                    productInfo: data,
                });
            }).catch((error) => {
            this.setState({
                isLoading: false,
                error: true,
                errorInfo: error.toString(),
            });
        })
    }

    _getTabContent(item) {
        if (item===null) return <Text style={{width:width,alignSelf:'center',fontSize:14,color:'#666'}}>{this.state.message}</Text>;
        return tabNames.map((value, i) => {
            switch (i) {
                case 0:
                    return <ProductsIntroduction productInfo={item} tabLabel={value} key={i}/>
                    break;
                case 1:
                    return <WebView source={{uri: item.content_view_url}} scalesPageToFit={true} javaScriptEnabled={true}
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
    share_favorite_container:{
        flex:1,
        flexDirection:'row',
        height:44,
        alignItems:'center',
        justifyContent:'center'
    },
    share_favorite:{
        fontSize:14,
        color:'#666',
        marginLeft:2,
    },
    bottomBar:{
        backgroundColor:'white',
        position:'absolute',
        top:Platform.OS==='ios'?height-44:height-44-StatusBar.currentHeight,
        height:44,
        width:width,
        flex:1,
        flexDirection:'row'
    }
});