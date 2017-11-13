import React, {Component} from 'react'
import {StyleSheet, View, Image, Text,TouchableOpacity,FlatList, Dimensions} from 'react-native'
import {INDEX_CHOICE_GOODS_URL} from '../common/URLS'
import PropTypes from 'prop-types';

const {width} = Dimensions.get('window');
const imgItem = (width - 34) / 2;
export default class IndexChoiceGoodList extends Component {
    state = {
        isRefreshing: false,
        error: false,
        items: [],
    }

    static propTypes = {
        _onLoaded: PropTypes.func,
    }

    // static defaultProps={
    //     onLoaded:()=>{
    //         this.props.callbackParent();
    //     }
    // }

    _onLoaded = () => this.props.callbackParent();

    render() {
        if (this.state.isRefreshing) {
            this._fetchData();
        }

        if (this.state.error) {
            return <Text>Network Error: {this.state.errorInfo}</Text>;
        }

        return (
            <FlatList
                renderItem={this._renderItem}
                ListHeaderComponent={this._headerComponent}
                ListFooterComponent={this._footerComponent}
                columnWrapperStyle={styles.item_container}
                data={this.state.items}
                refreshing={false}
                numColumns={2}
            >
            </FlatList>
        );
    }

    _renderItem = ({item}) => {
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => this._onItemClick(item)}>
                <View style={styles.item}>
                    <Image source={{uri: item.cover_url}} style={styles.imgItem}/>
                    <Text style={styles.item_title} numberOfLines={2}>{item.title}</Text>
                    <View style={{height: 0.5, marginLeft: 10, marginRight: 10, backgroundColor: "#EEE"}}></View>
                    <Text style={styles.item_price}>￥{item.sale_price}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    _onItemClick(item){
        const {navigate}=this.props.navigation;
        navigate('ProductDetail',item);
    }

    _headerComponent() {
        return (
            <View style={{height: 78, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 17, color: '#222'}}>精选推荐</Text>
                <Text style={{color: '#9A7D56', fontSize: 10, marginTop: 3}}>MORE</Text>
            </View>
        );
    }

    _footerComponent() {
        return (
            <View style={{height: 78, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 17, color: '#222'}}>新品推荐</Text>
                <Text style={{color: '#9A7D56', fontSize: 10, marginTop: 3}}>MORE</Text>
            </View>
        );
    }

    componentDidMount() {
        this._fetchData();
    }

    _fetchData() {
        fetch(INDEX_CHOICE_GOODS_URL)
            .then((response) => response.json())
            .then((responseJson) => {
                let data = responseJson.data.items;

                if (this.state.isRefreshing) {
                    this.state.items.length = 0;
                    this._onLoaded();
                }
                this.setState({
                    items: this.state.items.concat(data),
                    isRefreshing: false,
                    isLoading: false,
                    error: false,
                });
            }).catch((error) => {
            this.setState({
                isLoading: false,
                error: true,
                errorInfo: error.toString(),
            });
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isRefreshing: nextProps.refreshing,
        });
    }
}

const styles = StyleSheet.create({
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
        width: imgItem,
        color: '#9A7D56',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 8,
    },
    list_item_font: {
        fontSize: 16
    },
    separator: {
        // height: 10,
        // backgroundColor: '#00000000',
    },
    imgItem: {
        width: imgItem,
        height: imgItem,
    }
});