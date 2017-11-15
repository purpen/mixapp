import React from 'react'
import {StackNavigator} from 'react-navigation'
import HomePage from "./HomePage";
import SubjectDetailPage from "./localGuide/SubjectDetailPage";
import ProductDetailPage from "./product/ProductDetailPage";
import CategoryDetailPage from "./category/CategoryDetailPage";
import {ScreenOutDrawer} from "./category/ScreenOutDrawer";
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
        screen:ScreenOutDrawer
    },
}, {
    headerMode: 'none',
    headerTitleStyle: {
        alignSelf: 'center'
    }
});