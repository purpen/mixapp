import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity, FlatList} from 'react-native'
import NavigationBar from '../common/NavigationBar'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import {height, width} from "../common/Constants";
import ViewUtil from "../common/ViewUtil";
import IndexTab from "../index/IndexTab";
import ProductsIntroduction from "./ProductsIntroduction";

export default class ProductDetailPage extends Component{
    render() {
        const {goBack,state}=this.props.navigation;
        let navigationBar = <NavigationBar
            title={state.params.title}
            statusBar={{translucent: true}}
            leftButton={ViewUtil.getLeftButton(()=>{goBack();})}
            hide={false}/>;
        const tabNames = ['商品', '详情', '评价'];
        const banners=['http://imgsrc.baidu.com/imgad/pic/item/0ff41bd5ad6eddc40377fadc33dbb6fd52663300.jpg','http://imgsrc.baidu.com/imgad/pic/item/0ff41bd5ad6eddc40377fadc33dbb6fd52663300.jpg'];
        return (
            <View style={styles.container}>
                {navigationBar}
                <ScrollableTabView
                    renderTabBar={(tabBarProps) => <ScrollableTabBar {...tabBarProps} activeTextColor="#9A7D56"
                                                                     inactiveTextColor="#2A2A2A"
                                                                     style={{height: 44}} underlineStyle={{
                        height: 2,
                        backgroundColor: "#9A7D56"
                    }}/>}
                    initialPage={0}
                >
                    {tabNames.map((value, i) => {
                        switch(i){
                            case 0:
                                return <ProductsIntroduction productInfo={{"banners":banners,"title":'标题'}} tabLabel={value} key={i}/>
                                break;
                            case 1:
                                return <Text style={{fontSize:14,color:'#222'}} tabLabel={value} key={i}>{value}</Text>
                                break;
                            case 2:
                                return <Text style={{fontSize:14,color:'#222'}} tabLabel={value} key={i}>{value}</Text>
                                break;
                            default:
                                return <Text style={{fontSize:14,color:'#222'}} tabLabel={value} key={i}>界面不存在</Text>
                                break
                        }
                    })}
                </ScrollableTabView>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
});