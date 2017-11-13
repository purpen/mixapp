import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {TAB} from "../HomePage";
import NavigationBar from "../common/NavigationBar";

export default class ShopCart extends Component {
    render() {
        let navigationBar = <NavigationBar
            title={TAB.shopCart}
            statusBar={{translucent: true}}
            hide={false}/>;
        return (
            <View>
                {navigationBar}
            </View>
        )
    }
}