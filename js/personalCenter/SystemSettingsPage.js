import React, {Component} from 'react'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Platform} from 'react-native'
import {LOGIN_INFO} from "../common/Constants";
import ViewItemWithTitle from "../common/ViewItemWithTitle";
import ViewUtil from "../common/ViewUtil";
import NavigationBar from "../common/NavigationBar";
import {TAB} from "../HomePage";

export default class PersonalCenterPage extends Component {
    render() {
        const {goBack, state} = this.props.navigation;
        let navigationBar = <NavigationBar
            title='系统设置'
            statusBar={{translucent: true}}
            leftButton={ViewUtil.getLeftButton(() => {
                goBack();
            })}
            hide={false}/>;
        return (
            <View style={{flex: 1,backgroundColor:'#fafafa'}}>
                {navigationBar}
                <ScrollView>
                    <ViewItemWithTitle title='个人资料' onPress={this._onClick}/>
                    <ViewItemWithTitle title='修改密码' onPress={this._onClick}/>
                    <ViewItemWithTitle title='关于我们' onPress={this._onClick}/>
                    <ViewItemWithTitle title='给个好评' onPress={this._onClick}/>
                    <ViewItemWithTitle title='分享给好友' onPress={this._onClick}/>
                    <ViewItemWithTitle title='欢迎页' onPress={this._onClick}/>
                    <ViewItemWithTitle title='意见与反馈' onPress={this._onClick}/>
                    <TouchableOpacity activeOpacity={0.8} style={{
                        height: 44,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop:10,
                    }} onPress={this._onPress}>
                        <Text style={{fontSize: 17, color: "#9a7d56"}}>退出登录</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }

    _onClick(title) {
        alert(title)
    }

    _onPress = () => {
        storage.remove({key: LOGIN_INFO});
        this.props.navigation.navigate('Home',{index:TAB.category});
    }
}

const styles = StyleSheet.create({});