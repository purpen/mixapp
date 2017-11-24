import React, {Component} from 'react'
import {StyleSheet, View, TextInput, Image, Text, TouchableOpacity} from 'react-native'
import Toast from 'react-native-root-toast';
import {LOGIN_INFO, ToastConfig} from '../common/Constants'
import ParamsUtil from "../network/ParamsUtil";
import AppService from "../common/AppService";
import {Store} from "../common/AsycStorageConfig";

export default class LoginComponent extends Component {
    state = {
        phone: '13366469976',
        password: '123456',
        checkCode: '',
        isRegistering: false
    }

    render() {
        let separator = <View style={styles.separator}/>;
        return (
            <View style={styles.content_container}>
                <View style={styles.inputContainer}>
                    <Image source={require('../../res/imgs/icon_user_phone.png')}
                           style={{height: 20, width: 20,}}/>
                    <TextInput placeholder='手机号' keyboardType='numeric' placeholderTextColor='#666'
                               style={styles.input} underlineColorAndroid="transparent" maxLength={18}
                               autoFocus={true}
                               onChangeText={(text) => {
                                   this.setState({phone: text});
                               }}
                    />
                </View>
                {separator}
                <View style={styles.inputContainer}>
                    <Image source={require('../../res/imgs/icon_phone_code.png')}
                           style={{height: 20, width: 20,}}/>
                    <TextInput placeholder='请输入验证码' secureTextEntry={true} keyboardType='default'
                               placeholderTextColor='#666'
                               style={styles.input} underlineColorAndroid="transparent" maxLength={20}
                               autoFocus={true}
                               onChangeText={(text) => {
                                   this.setState({checkCode: text});
                               }}
                    />
                    <TouchableOpacity style={{
                        width: 90,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: '#9a7d56',
                        borderRadius: 4,
                    }} onPress={this._sendCheckCode}>
                        <Text style={{fontSize: 14, color: '#9a7d56',}}>验证码</Text>
                    </TouchableOpacity>
                </View>
                {separator}
                <View style={styles.inputContainer}>
                    <Image source={require('../../res/imgs/icon_password.png')}
                           style={{height: 20, width: 20,}}/>
                    <TextInput placeholder='密码' secureTextEntry={true} keyboardType='default'
                               placeholderTextColor='#666'
                               style={styles.input} underlineColorAndroid="transparent" maxLength={30}
                               autoFocus={true}
                               onChangeText={(text) => {
                                   this.setState({password: text});
                               }}
                    />
                </View>
                {separator}
                <TouchableOpacity activeOpacity={0.8} style={styles.loginRegister} onPress={this._registerUser}>
                    <Text style={{color: 'white', fontSize: 17}}>注册</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _sendCheckCode=()=>{
        if (this.state.phone === '' || this.state.phone === null) {
            Toast.show('请输入手机号', ToastConfig);
            return;
        }
        let params = ParamsUtil.generateRegisterCheckCodeParams(this.state.phone);
        AppService.getCheckCode(params).then((response) => {
            console.log(response)
            Toast.show(response.message, ToastConfig);
        }).catch((error) => {
            console.log('registerUser:' + error)
            Toast.show('网络异常', ToastConfig);
        });
    }

    _registerUser = () => {
        if (this.state.phone === '' || this.state.phone === null) {
            Toast.show('请输入手机号', ToastConfig);
            return;
        }
        if (this.state.checkCode === '' || this.state.checkCode === null) {
            Toast.show('请输入验证码', ToastConfig);
            return;
        }
        if (this.state.password === '' || this.state.password === null) {
            Toast.show('请输入密码', ToastConfig);
            return;
        }

        this.setState({
            isRegistering: true,
        }, () => this._submitData());
    }

    _submitData() {
        let params = ParamsUtil.generateRegisterUserParams(this.state.phone, this.state.password);
        AppService.registerUser(params).then((response) => {
            console.log(response)
            if (response.success) {
                storage.save(new Store(LOGIN_INFO, response.data, null));
                this.props.navigation.goBack();
            } else {
                Toast.show(response.message, ToastConfig);
            }
        }).catch((error) => {
            console.log('registerUser:' + error)
            Toast.show('网络异常', ToastConfig);
        });
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