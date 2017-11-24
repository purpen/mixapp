import React from 'react'
import {StackNavigator} from 'react-navigation'
import HomePage from "./HomePage";
import SubjectDetailPage from "./localGuide/SubjectDetailPage";
import ProductDetailPage from "./product/ProductDetailPage";
import {ScreenOutDrawer} from "./category/ScreenOutDrawer";
import LoginRegisterPage from "./loginRegister/LoginRegisterPage";
import SystemSettingsPage from './personalCenter/SystemSettingsPage'
export const D3IN = StackNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {

        }
    },
    SubjectDetail:{
        screen:SubjectDetailPage,
    },
    ProductDetail:{
        screen:ProductDetailPage,
    },
    ScreenOut:{
        screen:ScreenOutDrawer,
    },
    LoginRegister:{
        screen:LoginRegisterPage,
    },
    SystemSettings:{
        screen:SystemSettingsPage,
    }
}, {
    headerMode: 'none',
    headerTitleStyle: {
        alignSelf: 'center'
    }
});