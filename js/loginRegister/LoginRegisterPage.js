import React, {Component} from 'react'
import {StyleSheet, View, TextInput, Image, Text, Platform, StatusBar, TouchableOpacity} from 'react-native'
import Swiper from 'react-native-swiper'
import {width} from "../common/Constants";

export default class LoginRegisterPage extends Component {
    render() {
        let separator = <View style={styles.separator}/>;
        let statusBar = <View style={styles.statusBar}><StatusBar backgroundColor="blue"/></View>;
        return (
            <View style={styles.container}>
                {statusBar}
                <TouchableOpacity activeOpacity={0.8} onPress={this._onClosePress} style={{alignSelf:'flex-start',height:44,width:44,alignItems:'center',justifyContent:'center'}}>
                    <Image source={require('../../res/imgs/icon_login_close.png')} style={{height:25,width:25}}/>
                </TouchableOpacity>
                <Image source={require('../../res/imgs/icon_login_logo.png')} style={{height:76,width:120,marginTop:57,marginBottom:20}}/>
                <Swiper
                    style={{width:width-40}}
                    loop={false}
                    autoplay={false}
                    horizontal={true}
                    showsButtons={false}
                    showsPagination={false}
                >
                    <View style={styles.content_container}>
                        <View style={styles.inputContainer}>
                            <Image source={require('../../res/imgs/icon_user_phone.png')}
                                   style={{height: 20, width: 20,}}/>
                            <TextInput placeholder='手机号' keyboardType='numeric' placeholderTextColor='#666'
                                       style={styles.input} underlineColorAndroid="transparent" maxLength={18}
                                       autoFocus={true}/>
                        </View>
                        {separator}
                        <View style={styles.inputContainer}>
                            <Image source={require('../../res/imgs/icon_password.png')}
                                   style={{height: 20, width: 20,}}/>
                            <TextInput placeholder='密码' secureTextEntry={true} keyboardType='default' placeholderTextColor='#666'
                                       style={styles.input} underlineColorAndroid="transparent" maxLength={30}
                                       autoFocus={true}/>
                        </View>
                        {separator}
                        <TouchableOpacity activeOpacity={0.8} style={styles.loginRegister}>
                            <Text style={{color: 'white', fontSize: 17}}>登录</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <View style={{flexDirection: 'row', marginLeft: 20, marginRight: 20}}>
                            <Image source={require('../../res/imgs/icon_user_phone.png')}
                                   style={{height: 20, width: 20,}}/>
                            <TextInput placeholder='手机号' keyboardType='phone-pad' placeholderTextColor='#666'
                                       style={{flex: 1, color: "#222", padding: 0,}}
                                       underlineColorAndroid="transparent"/>
                        </View>
                        {separator}
                        <TouchableOpacity activeOpacity={0.8} style={styles.loginRegister}>
                            <Text style={{color: 'white', fontSize: 17}}>登录</Text>
                        </TouchableOpacity>
                    </View>
                </Swiper>
            </View>
        );
    }

    _onClosePress=()=>{
        this.props.navigation.goBack();
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems:'center'
    },
    statusBar: {
        height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
    },
    content_container:{
        marginLeft: 20,
        marginRight: 20,
    },
    loginRegister: {
        backgroundColor: '#9A7D56',
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginLeft: 28,
        marginRight: 28,
        marginTop:20
    },
    separator: {
        height: 1,
        backgroundColor: '#f6f6f6',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44
    },
    input: {
        flex: 1,
        color: "#222",
        padding: 0,
        fontSize: 14,
        paddingLeft: 3,
    }
});
