import React, {Component} from 'react';
import {StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, FlatList, View, Text, Image} from 'react-native'
import IndexChoiceGoodList from "./IndexChoiceGoodList";
import {INDEX_PRODUCTS_LIST} from '../common/URLS'
import {SIZE} from "../common/Constants";

const {width} = Dimensions.get('window');
const imgItem = (width - 34) / 2;
export default class IndexTab extends Component {
    state = {
        isLoading: true,
        isRefreshing: false,
        isLoadingMore: false,
        currentPage: 1,
        error: false,
        list: [],
    }
    _callBackParent = () => {
        this.setState({
            isRefreshing: false,
        });
    };

    render() {
        return (
            <FlatList
                ListHeaderComponent={this._headerComponent}
                ListFooterComponent={this._footerComponent}
                columnWrapperStyle={styles.item_container}
                renderItem={this._renderItem}
                data={this.state.list}
                numColumns={2}
                refreshing={false}
                onEndReachedThreshold={0.1}
                onRefresh={this._refresh}
                onEndReached={this._loadMore}
            >
            </FlatList>
        );
    }

    _separator = () => {
        return <View style={styles.separator}></View>
    }

    _headerComponent = () => {
        return <IndexChoiceGoodList {...this.props} refreshing={this.state.isRefreshing} callbackParent={this._callBackParent}/>;
    }

    _footerComponent = () => {
        return <Text style={{height: 10, width: width, color: '#00000000'}}>footer</Text>;
    }

    _renderItem = ({item}) => {
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={()=>this._onItemClick(item)}>
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

    _onItemClick(item){
        this.props.navigation.navigate('ProductDetail',item);
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
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let body = 'page=' + this.state.currentPage + '&size=' + SIZE + '&stick=1&stage=9';
        // alert(body);
        let request = new Request(INDEX_PRODUCTS_LIST, {method: 'POST', headers: headers, body: body});
        fetch(request)
            .then((response) => response.json())
            .then((responseJson) => {
                let items = responseJson.data.rows;
                if (items.length == 0) {
                    this.setState({
                        isLoading: false,
                        isLoadingMore: false,
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
            }).catch((error) => {
            this.setState({
                isLoading: false,
                error: true,
                errorInfo: error.toString(),
            });
        })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#F8F8F8"
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
});