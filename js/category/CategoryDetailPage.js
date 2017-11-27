import React, {Component} from 'react'
import {StyleSheet, FlatList, View, Text, Image, TouchableOpacity} from 'react-native'
import {height, SIZE, width} from "../common/Constants";
import ViewUtil from "../common/ViewUtil";
import NavigationBar from "../common/NavigationBar";
import {ToastConfig} from "../common/Constants";
import ParamsUtil from "../network/ParamsUtil";
import AppService from "../common/AppService";
import Toast from 'react-native-root-toast'

const imgItem = (width - 34) / 2;
export default class CategoryDetailPage extends Component {
    state = {
        isLoading: true,
        isRefreshing: false,
        isLoadingMore: false,
        currentPage: 1,
        error: false,
        list: [],
    }

    render() {
        const {goBack, state} = this.props.navigation;
        let navigationBar = <NavigationBar
            title={state.params.title}
            statusBar={{translucent: true}}
            leftButton={ViewUtil.getLeftButton(() => {
                goBack(null);
            })}
            hide={false}/>;
        return (
            <View style={styles.container}>
                {navigationBar}
                {this._sortBar()}
                <FlatList
                    columnWrapperStyle={styles.item_container}
                    renderItem={this._renderItem}
                    data={this.state.list}
                    numColumns={2}
                    refreshing={this.state.isLoading}
                    onEndReachedThreshold={0.1}
                    onRefresh={this._refresh}
                    onEndReached={this._loadMore}
                />
            </View>
        );
    }

    _sortBar = () => {
        return (
            <View style={{height:45}}>
                <View style={{height: 44,flex:1,flexDirection:'row'}}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.sortBarItem}>
                        <Text style={styles.sortBarText}>好评</Text>
                        <Image source={require('../../res/imgs/icon_lower.png')} style={styles.imgSort}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={styles.sortBarItem}>
                        <Text style={styles.sortBarText}>销量</Text>
                        <Image source={require('../../res/imgs/icon_lower.png')} style={styles.imgSort}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={styles.sortBarItem}>
                        <Text style={styles.sortBarText}>价格</Text>
                        <Image source={require('../../res/imgs/icon_lower.png')} style={styles.imgSort}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={styles.sortBarItem} onPress={this._showDrawer}>
                        <Image source={require('../../res/imgs/icon_screen_out.png')} style={{width:15,height:15,marginRight:2}} />
                        <Text style={styles.sortBarText}>筛选</Text>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor: '#eee', height:1}}/>
            </View>
        );
    }

    _renderItem = ({item}) => {
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => this._onItemClick(item)}>
                <View style={styles.item}>
                    <Image source={{uri: item.cover_url}} style={styles.imgItem}/>
                    <Text style={styles.item_title} numberOfLines={2}>{item.title}</Text>
                    <View style={{height: 0.5, marginLeft: 10, marginRight: 10, backgroundColor: "#EEE"}}></View>
                    <Text style={styles.item_price}>
                        ￥{item.sale_price}
                        <Text style={{width: 5, height: 10}}> </Text>
                        <Text style={styles.item_market_price}>￥{item.market_price}</Text>
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    _onItemClick(item) {
        const {navigate} = this.props.navigation;
        navigate('ProductDetail', item);
    }

    _loadMore = () => {
        if (this.state.isLoading || this.state.isLoadingMore) return;
        this.setState({
            isLoadingMore: true,
        }, () => this._fetchData());
    }

    _refresh = () => {
        this.setState({
            currentPage: 1,
            isRefreshing: true,
        }, () => this._fetchData());
    }


    componentDidMount() {
        this._fetchData();
    }

    _fetchData() {
        let stick='1';
        let stage='9';
        let params = ParamsUtil.generateIndexTabParams(this.state.currentPage,stick,stage);
        AppService.getIndexTabData(params).then((response) => {
            if (response.success) {
                let items = response.data.rows;
                if (items.length == 0) {
                    this.setState({
                        isLoading: false,
                        isLoadingMore: false,
                        isRefreshing: false,
                    });
                    return;
                }
                if (this.state.isRefreshing) {
                    this.state.list.length = 0;
                }
                this.setState({
                    isLoading: false,
                    isRefreshing: false,
                    isLoadingMore: false,
                    list: this.state.list.concat(items),
                    currentPage: ++this.state.currentPage,
                });
            }
        }).catch((error) => {
            console.log('getIndexTabData:' + error)
            this.setState({
                isLoading: false,
                error: true,
                errorInfo: error.toString(),
            });
            Toast.show('网络异常', ToastConfig);
        });
    }

    _showDrawer=()=>{
        this.props.navigation.navigate('DrawerOpen');
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    item_container: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
    item: {
        marginLeft: 5,
        marginRight: 5,
        borderColor: "#E6E6E6",
        borderWidth: 1,
        backgroundColor: "#f8f8f8"
    },
    item_title: {
        fontSize: 12,
        width: imgItem,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 10,
        height: 35
    },
    item_price: {
        fontSize: 15,
        color: '#9A7D56',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 8,
    },
    item_market_price: {
        fontSize: 9,
        color: "#999",
        textDecorationLine: 'line-through',
    },
    imgItem: {
        width: imgItem,
        height: imgItem,
    },
    imgSort:{
        height:12,
        width:6,
        marginLeft:2
    },
    sortBarItem:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    sortBarText:{
        color: "#222",
        fontSize:14
    }
});
