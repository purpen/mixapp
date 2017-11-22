import React, {Component} from 'react'
import {StyleSheet,ScrollView, View, TextInput, Image, Text, Platform, StatusBar, TouchableOpacity} from 'react-native'
import Swiper from 'react-native-swiper'
import {width} from "../common/Constants";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
export default class LoginRegisterPage extends Component {
    isEnable=true;
    state={
        isEnabled:true,
        index:0,
    }
    render() {
        let statusBar = <View style={styles.statusBar}><StatusBar/></View>;
        return (
            <View style={styles.container}>
                {statusBar}
                <TouchableOpacity activeOpacity={0.8} onPress={this._onClosePress} style={{
                    alignSelf: 'flex-start',
                    height: 44,
                    width: 44,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image source={require('../../res/imgs/icon_login_close.png')} style={{height: 25, width: 25}}/>
                </TouchableOpacity>
                <Image source={require('../../res/imgs/icon_login_logo.png')}
                       style={{height: 76, width: 120, marginTop: 57, marginBottom: 20}}/>
                <Swiper
                    style={{width:Platform.OS==='ios'?null:width-40}}
                    removeClippedSubviews={false}
                    ref="swiper"
                    loop={false}
                    autoplay={false}
                    horizontal={true}
                    showsButtons={false}
                    showsPagination={false}
                    index={0}
                    scrollEnabled={false}
                    onIndexChanged={(index)=> this.isEnable=true}
                >
                    <LoginComponent {...this.props} />
                    <RegisterComponent {...this.props}/>
                </Swiper>
                <View style={{flex:1,flexDirection: 'row',justifyContent:'center',}}>
                    <TouchableOpacity activeOpacity={0.8} onPress={this._goLoginRegister}>
                        <Text style={{fontSize: 14,alignSelf:'center',padding:5,paddingTop:0,color: '#9a7d56'}}>{this.state.index===0?"注册账户":'登录'}</Text>
                    </TouchableOpacity>
                    <View style={{height:15,width:1,margin:5,marginTop:0,backgroundColor:'#666'}}/>
                    <TouchableOpacity activeOpacity={0.8} onPress={this._goFindPassword}>
                        <Text style={{fontSize: 14,padding:5,paddingTop:0,color: '#666'}}>忘记密码</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _goLoginRegister=()=>{
        if (!this.isEnable) return;
        this.isEnable=false;
        if(this.state.index===0){
            this.setState({
                index:1,
            },()=>{
                this.refs.swiper.scrollBy(1);
            });
        }else {
            this.setState({
                index:0,
            },()=>{this.refs.swiper.scrollBy(-1);});
        }
    }



    _onClosePress = () => {
        this.props.navigation.goBack();
    }

    _goFindPassword=()=>{
        alert('find');
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    statusBar: {
        height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
    },
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
