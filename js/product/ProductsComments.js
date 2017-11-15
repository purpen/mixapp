import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity, Button, FlatList} from 'react-native'
import PropTypes from 'prop-types'
import StarRating from 'react-native-star-rating'
import {height, SIZE, width} from "../common/Constants";
import {PRODUCT_COMMENTS_URL} from "../common/URLS";

export default class ProductsComments extends Component {

    state = {
        currentPage: 1,
        isLoading: true,
        isRefreshing: false,
        isLoadingMore: false,
        error: false,
        list: [],
    }

    static propTypes = {
        id: PropTypes.string.isRequired,
    }

    componentDidMount() {
        this._fetchData();
    }

    _fetchData() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let body = 'target_id=' + this.props.id + '&page=' + this.state.currentPage + '&size=' + SIZE + '&type=4';
        console.log(this.props.id)
        let request = new Request(PRODUCT_COMMENTS_URL, {method: 'POST', headers: headers, body: body});
        fetch(request)
            .then((response) => response.json())
            .then((responseJson) => {
                let items = responseJson.data.rows;
                if (items.length == 0) {
                    this.setState({
                        isLoading: false,
                        isLoadingMore: false,
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

    render() {
        return (
            <FlatList
                renderItem={this._renderItem}
                data={this.state.list}
                refreshing={false}
                onEndReachedThreshold={0.1}
                ItemSeparatorComponent={()=><View style={{height:10,backgroundColor:'#FAFAFA'}}/>}
                onRefresh={this._refresh}
                onEndReached={this._loadMore}
                ListEmptyComponent={this._onListEmpty}
            >
            </FlatList>
        );
    }

    _renderItem = ({item}) => {
        return (
            <View style={styles.item_container}>
                <View style={styles.item_head}>
                    <Image
                        source={{uri: item.user.small_avatar_url}}
                        style={styles.avatar}/>
                    <View>
                        <Text style={styles.item_name} numberOfLines={1}>{item.user.nickname}</Text>
                        <Text style={styles.item_time}>{item.created_at}</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            buttonStyle={{width: 12}}
                            starStyle={{marginRight: 2}}
                            rating={item.star}
                            starColor={'#9A7D56'}
                            starSize={10}
                        />
                    </View>

                </View>
                <Text style={styles.comment_content}>{item.content}</Text>
                {/*<View style={{height: 0.5, marginLeft: 10, marginRight: 10, backgroundColor: "#EEE"}}></View>*/}

            </View>
        );
    }

    _onListEmpty() {
        return (
            <View style={{
                flex: 1,
                width: width,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop:100
            }}>
                <Text style={{color: '#666',fontSize: 12,}}>暂无评论</Text>
            </View>
        );
    }

    _refresh = () => {
        this.setState({
            currentPage: 1,
            isRefreshing: true,
        }, () => this._fetchData());
    }

    _loadMore = () => {
        if (this.state.isLoading || this.state.isLoadingMore) return;
        this.setState({
            isLoadingMore: true,
        }, () => this._fetchData());
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item_container: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom:15,
    },
    item_head: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    item_name: {
        fontSize: 14,
        color: '#666'
    },
    item_time: {
        fontSize: 10,
        color: '#c8c8c8',
        marginTop: 3
    },
    comment_content: {
        fontSize: 14,
        color: '#666'
    }
});
