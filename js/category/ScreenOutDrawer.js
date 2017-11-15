import React from 'react'
import {ScrollView, Text} from 'react-native'
import {DrawerNavigator} from 'react-navigation';
import CategoryDetailPage from "./CategoryDetailPage";

const DrawerContent = (props) => (
    <ScrollView>
        <Text style={{fontSize: 14, color: '#222'}}>hahahah</Text>
    </ScrollView>
);

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
        contentComponent: DrawerContent,
        drawerBackgroundColor: 'white'
    }
);





