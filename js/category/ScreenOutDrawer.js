import React, {Component} from 'react'
import {ScrollView, Text} from 'react-native'
import {DrawerNavigator} from 'react-navigation';
import CategoryDetailPage from "./CategoryDetailPage";
import ScreenOutItem from "./ScreenOutItem";


/*const DrawerContent = (props) => (
    <ScrollView style={{paddingLeft: 15, paddingRight: 15,}}>
        <ScreenOutItem title='标题' list={data}/>
        <ScreenOutItem title='我是'/>
    </ScrollView>
);*/


class DrawerContent extends Component{
    state={
        data:[{key: '你好'}, {key: '他好'}, {key: '我好'}, {key: '大多'}, {key: '哈哈'}, {key: '呵呵哈'}, {key: '哈想'}],
    }
    render(){
        return (
            <ScrollView style={{paddingLeft: 15, paddingRight: 15,}}>
                <ScreenOutItem title='标题' list={this.state.data}/>
                <ScreenOutItem title='我是' list={this.state.data}/>
            </ScrollView>
        )
    }
}

export const ScreenOutDrawer = DrawerNavigator(
    {
        CategoryDetail: {
            screen: CategoryDetailPage,
        }
    },
    {
        initialRouteName: 'CategoryDetail',
        drawerWidth: 320,
        drawerPosition: 'right',
        contentComponent: (props)=><DrawerContent/>,
        drawerBackgroundColor: 'white'
    }
);





