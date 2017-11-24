import React from 'react';
import {TouchableOpacity, Image,Text} from 'react-native'

export default class ViewUtil {
    static getLeftButton(callBack) {
        return <TouchableOpacity
                activeOpacity={0.7}
                onPress={callBack} style={{height: 44,paddingLeft:16,paddingRight:16,justifyContent:'center',alignItems:'center'}}>
            <Image
                style={{height:18,width:11}}
                source={require('../../res/imgs/back_black.png')}/>
        </TouchableOpacity>
    }

}