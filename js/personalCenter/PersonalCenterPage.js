import React, {Component} from 'react'
import {StyleSheet, StatusBar, ScrollView, View, ImageBackground,Image,Text, TouchableOpacity, Platform} from 'react-native'
import {AVATAR_SIZE, width} from "../common/Constants";
import ViewItemWithTitle from "../common/ViewItemWithTitle";

export default class PersonalCenterPage extends Component {
    render() {
        return (
            <ScrollView>
                <View style={{height: 160}}>
                    <ImageBackground source={require('../../res/imgs/user_bg.jpg')} style={styles.bgImage}>
                        <TouchableOpacity activeOpacity={0.7} style={styles.settingBtn}
                                          onPress={() => this._onClick('setting')}>
                            <Image source={require('../../res/imgs/setting.png')} style={styles.settingImage}/>
                        </TouchableOpacity>
                        <View style={styles.infoContainer}>
                            <Image
                                source={{uri: 'http://img.dongqiudi.com/uploads/avatar/2015/07/25/QM387nh7As_thumb_1437790672318.jpg'}}
                                style={styles.avatar}/>
                            <View style={styles.infoText}>
                                <Text style={styles.userName}>188****5706</Text>
                                <Text style={styles.userText}>说说你是什么人，来自哪片山川湖海</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <ViewItemWithTitle title='我的订单' tips='查看全部订单' onPress={this._onClick}/>
                {this._renderSaleStateItems()}
                <ViewItemWithTitle title='我的优惠券' tips='10' tipsColor='#9a7d56' onPress={this._onClick}/>
                <ViewItemWithTitle title='我的收藏' onPress={this._onClick}/>
                <ViewItemWithTitle title='我的足迹' onPress={this._onClick}/>
                <ViewItemWithTitle title='我的消息' onPress={this._onClick}/>
                <ViewItemWithTitle title='地址管理' onPress={this._onClick}/>
            </ScrollView>
        )
    }

    _onClick(title) {
        switch (title){
            case 'setting':
                this.props.navigation.navigate('SystemSettings');
                break;
            default:
                alert(title);
                break;
        }
    }

    _renderSaleStateItems() {
        return (
            <View style={{marginBottom:10}}>
                <View
                    style={{backgroundColor:'white',flex: 1, height: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    {this._renderSaleStateItem(require('../../res/imgs/icon_unpaid.png'), '未付款')}
                    {this._renderSaleStateItem(require('../../res/imgs/icon_wait_pay.png'), '待发货')}
                    {this._renderSaleStateItem(require('../../res/imgs/icon_wait_recieve.png'), '待收货')}
                    {this._renderSaleStateItem(require('../../res/imgs/icon_wait_comment.png'), '待评价')}
                    {this._renderSaleStateItem(require('../../res/imgs/icon_after_sale.png'), '退款售后')}
                </View>
                <View style={{height: 0.5, backgroundColor: "#ccc"}}/>
            </View>
        );
    }

    _onSaleItemClick(title) {
        alert(title)
    }

    _renderSaleStateItem(icon, title) {
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => this._onSaleItemClick(title)}>
                <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 15, marginRight: 15,}}>
                    <Image source={icon}
                           style={{resizeMode: 'contain', backgroundColor: '#d8d8d8', width: 30, height: 30}}/>
                    <Text style={{fontSize: 12, color: "#222", marginTop: 5}}>{title}</Text>
                </View>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    avatar: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE * 0.5,
    },
    infoContainer: {
        flex: 1,
        width: width,
        flexDirection: 'row',
        marginLeft: 38,
    },
    infoText: {
        justifyContent: 'center',
        height: 65,
        marginLeft: 15
    },
    bgImage: {
        width: width,
        height: 160
    },
    settingImage: {
        width: 30,
        height: 30,
    },
    settingBtn: {
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        width: 44,
        marginTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
    },
    userName: {
        color: 'white',
        backgroundColor: "#00000000",
        fontSize: 18
    },
    userText: {
        color: 'white',
        backgroundColor: "#00000000",
        fontSize: 11
    }
});