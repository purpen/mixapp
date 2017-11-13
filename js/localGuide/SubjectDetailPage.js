import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity, FlatList} from 'react-native'
import NavigationBar from '../common/NavigationBar'
import {height, width} from "../common/Constants";
import ViewUtil from "../common/ViewUtil";
const imgItem = (width - 34) / 2;
export default class SubjectDetailPage extends Component {
    render() {
        const {goBack,state}=this.props.navigation;
        let navigationBar = <NavigationBar
            title={state.params.title}
            statusBar={{translucent: true}}
            leftButton={ViewUtil.getLeftButton(()=>{goBack();})}
            hide={false}/>;
        return (
            <View style={styles.container}>
                {navigationBar}
                <FlatList
                    ListHeaderComponent={()=>this._headerComponent(state.params)}
                    columnWrapperStyle={styles.item_container}
                    renderItem={this._renderItem}
                    data={state.params.products}
                    numColumns={2}
                    refreshing={false}
                    onEndReachedThreshold={0.1}
                    onRefresh={this._refresh}
                    onEndReached={this._loadMore}
                />
            </View>
        );
    }
    _headerComponent = (item) => {
        return (
            <View>
                <Image source={{uri: item.cover_url}} style={styles.coverItem}/>
                <Text style={styles.item_head_title}>{item.title}</Text>
                <Text style={styles.item_summary} numberOfLines={3}>{item.summary}</Text>
                <View style={styles.line}/>
            </View>
        );
    }
    _renderItem = ({item}) => {
        return (
            <View style={styles.item}>
                <Image source={{uri: item.cover_url}} style={styles.imgItem}/>
                <Text style={styles.item_title} numberOfLines={2}>{item.title}</Text>
                <View style={{height: 0.5, marginLeft: 10, marginRight: 10, backgroundColor: "#EEE"}}></View>
                <Text style={styles.item_price}>
                    ￥{item.sale_price}
                    <Text style={{width: 5, height: 10, color: '#00000000'}}>0</Text>
                    <Text style={styles.item_market_price}>￥{item.sale_price}</Text>
                </Text>
            </View>
        );
    }

    _loadMore = () => {
        // if (this.state.isLoading || this.state.isLoadingMore) return;
        // this.setState({
        //     isLoadingMore: true,
        // }, () => this._fetchData());
    }

    _refresh = () => {
        // this.setState({
        //     currentPage: 1,
        //     isRefreshing: true,
        // }, () => this._fetchData());
    }


    componentDidMount() {
        // this._fetchData();
    }

    // _fetchData() {
    //     let headers = new Headers();
    //     headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //     let body = 'page=' + this.state.currentPage + '&size=' + SIZE + '&stick=1&stage=9';
    //     let request = new Request(INDEX_PRODUCTS_LIST, {method: 'POST', headers: headers, body: body});
    //     fetch(request)
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             let items = responseJson.data.rows;
    //             if (items.length == 0) {
    //                 this.setState({
    //                     isLoading: false,
    //                     isLoadingMore: false,
    //                     // isRefreshing:false,
    //                 });
    //                 return;
    //             }
    //             if (this.state.isRefreshing) {
    //                 this.state.list.length = 0;
    //             }
    //             this.setState({
    //                 isLoading: false,
    //                 // isRefreshing: false,
    //                 isLoadingMore: false,
    //                 list: this.state.list.concat(items),
    //                 currentPage: ++this.state.currentPage,
    //             });
    //         }).catch((error) => {
    //         this.setState({
    //             isLoading: false,
    //             error: true,
    //             errorInfo: error.toString(),
    //         });
    //     })
    // }

}
const styles=StyleSheet.create({
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
    coverItem: {
        width: width,
        height: 180,
        resizeMode: 'cover',
    },
    item_head_title: {
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
    line: {
        height: 1,
        backgroundColor: "#e6e6e6",
        marginTop: 10,
        marginBottom: 10,
    }
});