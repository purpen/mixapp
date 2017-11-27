import React, {Component} from 'react'
import {StyleSheet, TouchableOpacity, FlatList, View, Image, Text} from 'react-native'
import NavigationBar from '../common/NavigationBar'
import {TAB} from "../HomePage";
import {SIZE, width} from "../common/Constants";
import {INDEX_LOCALGUIDE_URL} from "../common/URLS";
import Toast from 'react-native-root-toast';
import {ToastConfig} from "../common/Constants";
import ParamsUtil from "../network/ParamsUtil";
import AppService from "../common/AppService";

export default class LocalGuidePage extends Component {
    state = {
        currentPage: 1,
        list: [],
    }

    render() {
        let navigationBar = <NavigationBar
            title={TAB.localGuide}
            statusBar={{translucent: true}}
            hide={false}/>;
        return (
            <View style={styles.container}>
                {navigationBar}
                <FlatList
                    renderItem={this._renderItem}
                    data={this.state.list}
                    refreshing={true}
                />
            </View>
        )
    }

    _renderItem = ({item}) => {
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => this._onItemClick(item)}>
                <Image source={{uri: item.cover_url}} style={styles.coverItem}/>
                <Text style={styles.item_title}>{item.title}</Text>
                <Text style={styles.item_summary} numberOfLines={3}>{item.summary}</Text>
                <View style={styles.line}/>
                <FlatList
                    style={styles.flatList}
                    renderItem={({item}) => <TouchableOpacity activeOpacity={0.7}
                                                              onPress={() => this._onProductClick(item)}>
                        <Image source={{uri: item.cover_url}} style={styles.productsImage}/>
                    </TouchableOpacity>}
                    data={item.products}
                    refreshing={true}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </TouchableOpacity>
        );
    }

    _onItemClick(item) {
        this.props.navigation.navigate('SubjectDetail',item);
    }


    // _renderProductsItem({item}) {
    //     return (
    //         <TouchableOpacity activeOpacity={0.7} onPress={() => this._onProductClick(item)}>
    //             <Image source={{uri: item.cover_url}} style={styles.productsImage}/>
    //         </TouchableOpacity>
    //     )
    // }

    _onProductClick(item) {
        this.props.navigation.navigate('ProductDetail',item);
    }

    componentDidMount() {
        this._fetchData();
    }

    _fetchData() {
        let stick='1';
        let sort='1';
        let type='5';
        let params = ParamsUtil.generateLocalGuideParams(this.state.currentPage,stick,sort,type);
        AppService.getLocalGuideData(params).then((response) => {
            if (response.success) {
                let items = response.data.rows;
                if (items.length == 0) {
                    this.setState({
                        isLoading: false,
                        isLoadingMore: false,
                        list: this.state.list.concat(items),
                        // isRefreshing:false,
                    });
                    return;
                }
                if (this.state.isRefreshing) {
                    this.state.list.length = 0;
                }
                this.setState({
                    isLoading: false,
                    // isRefreshing: false,
                    isLoadingMore: false,
                    list: this.state.list.concat(items),
                    currentPage: ++this.state.currentPage,
                });
            }
        }).catch((error) => {
            console.log('getLocalGuideData:' + error)
            this.setState({
                isLoading: false,
                error: true,
                errorInfo: error.toString(),
            });
            Toast.show('网络异常', ToastConfig);
        });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    flatList: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10
    },
    coverItem: {
        width: width,
        height: 180,
        resizeMode: 'cover',
    },
    item_title: {
        fontSize: 15,
        color: "#222",
        height: 20,
        marginTop: 9,
        marginLeft: 10,
        marginRight: 10,
    },
    item_summary: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
        marginLeft: 10,
        marginRight: 10,
    },
    productsImage: {
        width: 83,
        marginRight: 5,
        height: 75,
        borderColor: "#e6e6e6",
        borderWidth: 1,
    },
    line: {
        height: 1,
        backgroundColor: "#e6e6e6",
        marginTop: 10,
        marginBottom: 10,
    }
});