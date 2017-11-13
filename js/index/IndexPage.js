import React, {Component} from 'react'
import {StyleSheet, View, Text, FlatList, ScrollView} from 'react-native'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import NavigationBar from "../common/NavigationBar";
import {TAB} from '../HomePage'
import IndexHeaderView from './IndexHeaderView'
import IndexTab from "./IndexTab";
import URL from '../common/URLS';

export default class IndexPage extends Component {
    render() {
        let tabNames = ['推荐', '智能家居', '可穿戴'];
        let navigationBar = <NavigationBar
            title={TAB.index}
            statusBar={{translucent: true}}
            hide={false}/>;
        return (
            <View style={styles.container}>
                {navigationBar}
                <IndexHeaderView/>
                <ScrollableTabView
                    ref="scrollableTabView"
                    renderTabBar={(tabBarProps) => <ScrollableTabBar {...tabBarProps} activeTextColor="#9A7D56"
                                                                     inactiveTextColor="#2A2A2A"
                                                                     style={{height: 44}} underlineStyle={{
                        height: 2,
                        backgroundColor: "#9A7D56"
                    }}/>}
                    initialPage={0}
                >
                    {tabNames.map((value, i) => {
                        return <IndexTab key={i} {...this.props} tabLabel={value}/>;
                    })}
                </ScrollableTabView>
            </View>
        );
    }

    componentDidMount() {
        // this._fetchData();
    }

    _fetchData() {
        fetch().then((respnse) => respnse.json()).then((responseJson) => {
        }).catch((error) => {
            this.setState({
                error: true,
                errorInfo: error.toString(),
            });
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
});