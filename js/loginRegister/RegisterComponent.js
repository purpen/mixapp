import React, {Component} from 'react'
import {StyleSheet, View, TextInput, Image, Text, TouchableOpacity} from 'react-native'
export default class LoginComponent extends Component{
    render(){
        let separator = <View style={styles.separator}/>;
        return (
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
                    <Image source={require('../../res/imgs/icon_phone_code.png')}
                           style={{height: 20, width: 20,}}/>
                    <TextInput placeholder='请输入验证码' secureTextEntry={true} keyboardType='default'
                               placeholderTextColor='#666'
                               style={styles.input} underlineColorAndroid="transparent" maxLength={20}
                               autoFocus={true}/>
                    <TouchableOpacity style={{width:90,height:30,justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'#9a7d56',borderRadius:4,}}>
                        <Text style={{fontSize:14,color:'#9a7d56',}}>验证码</Text>
                    </TouchableOpacity>
                </View>
                {separator}
                <View style={styles.inputContainer}>
                    <Image source={require('../../res/imgs/icon_password.png')}
                           style={{height: 20, width: 20,}}/>
                    <TextInput placeholder='密码' secureTextEntry={true} keyboardType='default'
                               placeholderTextColor='#666'
                               style={styles.input} underlineColorAndroid="transparent" maxLength={30}
                               autoFocus={true}/>
                </View>
                {separator}
                <TouchableOpacity activeOpacity={0.8} style={styles.loginRegister} onPress={this._registerUser}>
                    <Text style={{color: 'white', fontSize: 17}}>注册</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _registerUser=()=>{

    }
}

const styles = StyleSheet.create({
    content_container: {
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
        marginTop: 20
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