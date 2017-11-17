import React, {Component} from 'react'
import {StyleSheet,ScrollView, View, Text, TouchableOpacity} from 'react-native'
import {DrawerNavigator} from 'react-navigation';
import CategoryDetailPage from "./CategoryDetailPage";
import ScreenOutItem from "./ScreenOutItem";
import {height} from "../common/Constants";


class DrawerContent extends Component {
    state = {
        types: ['全部', '促销优惠', '特卖', '自营', '众筹'],
        brands: ['素士', '狮王', '高露洁', '佳洁士', '博朗', '黑人'],
        categories: ['牙线', '牙刷', '牙线棒', '替换刷头', '牙签', '其他'],
        materials: ['细毛', '纳米', '中毛', '碳丝', '硬毛', '其他'],
    }

    render() {
        return (
            <View>
                <ScrollView style={{paddingLeft: 15, paddingRight: 15,height:height-44}}>
                    <ScreenOutItem title='类型' list={this.state.types}/>
                    <ScreenOutItem title='品牌' list={this.state.brands}/>
                    <ScreenOutItem title='分类' list={this.state.categories}/>
                    <ScreenOutItem title='材料' list={this.state.materials}/>
                </ScrollView>
                <View style={{flex: 1, flexDirection: 'row',height:44}}>
                    <TouchableOpacity activeOpacity={0.7} style={[styles.button,{borderWidth:0.5,borderColor:'#979797'}]}>
                        <Text style={{color:'#666',fontSize:17}}>重置</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={this._onPress} style={[styles.button,{backgroundColor:'#9a7d56'}]}>
                        <Text style={{color:'white',fontSize:17}}>确定</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
    _onPress=()=>{
        this.props.navigation.navigate("DrawerClose");
    }

}

const styles=StyleSheet.create({
    button:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        height:44,
        fontSize:17,
    }
});

export const ScreenOutDrawer = DrawerNavigator(
    {
        CategoryDetail: {
            screen: CategoryDetailPage,
        }
    },
    {
        initialRouteName: 'CategoryDetail',
        drawerWidth: 320,
        drawerPosition: 'right',
        contentComponent: props => <DrawerContent {...props}/>,
        drawerBackgroundColor: 'white'
    }
);





