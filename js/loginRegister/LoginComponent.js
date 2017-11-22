import React, {Component} from 'react'
import {StyleSheet,Platform,View, TextInput, Image, Text, TouchableOpacity} from 'react-native'
import Toast from 'react-native-root-toast';
import {POST} from "../common/Constants";
import AppService from "../common/AppService";
import ParamsUtil from "../network/ParamsUtil";
export default class LoginComponent extends Component{
    state={
        phone:'15001120509',
        password:'123456',
        isLogining:false
    }
    render(){
        let separator = <View style={styles.separator}/>;
        return (
            <View style={styles.content_container}>
                <View style={styles.inputContainer}>
                    <Image source={require('../../res/imgs/icon_user_phone.png')}
                           style={{height: 20, width: 20,}}/>
                    <TextInput placeholder='手机号' keyboardType='numeric' placeholderTextColor='#666'
                               style={styles.input} underlineColorAndroid="transparent" maxLength={18}
                               autoFocus={true} onChangeText={(text) => {
                        this.setState({phone:text});
                    }} defaultValue='15001120509'/>
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
                                   this.setState({password:text});
                               }}
                               defaultValue='123456' />
                </View>
                {separator}
                <TouchableOpacity activeOpacity={0.8} style={styles.loginRegister} onPress={this._loginUser}>
                    <Text style={{color: 'white', fontSize: 17}}>登录</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _loginUser=()=>{
        if (this.state.phone==='' || this.state.phone===null){
            Toast.show('请输入手机号',{position:0,backgroundColor:'#333'});
            return;
        }
        if (this.state.password==='' || this.state.password===null){
            Toast.show('请输入密码',{position:0,backgroundColor:'#333'});
            return;
        }

        this.setState({
          isLogining:true,
        },()=>this._submitData());
    }


    _submitData() {
    //     let headers = new Headers();
    //         headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //         let from_to=Platform.OS==='ios'?1:2;
    //         let body = 'mobile=' + this.state.phone + '&password=' + this.state.password + '&from_to='+from_to;
    //         let request = new Request(USER_LOGIN_URL,{method: 'POST', headers: headers, body: body});
    //         fetch(request)
    //             .then((response) => response.json())
    //             .then((responseJson) => {
    //                 let items = responseJson;
    //                 console.log(items);
    //                 this.setState({
    //                     isLogining: false,
    //                 });
    //             }).catch((error) => {
    //             this.setState({
    //                 isLogining: false,
    //                 error: true,
    //                 errorInfo: error.toString(),
    //             });
    //         })
        let params=ParamsUtil.generateLoginUserParams(this.state.phone,this.state.password)
        AppService.loginUser(params).then((response)=>{
            console.log(response)
        }).catch((error)=>{
                console.log('error=='+error);
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