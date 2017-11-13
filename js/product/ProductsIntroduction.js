import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity,Button,FlatList} from 'react-native'
import Swiper from 'react-native-swiper'
import PropTypes from 'prop-types'
import {height, width} from "../common/Constants";
import NavigationBar from "../common/NavigationBar";

export default class ProductsIntroduction extends Component {

    state = {
        swiperShow: false,
    }

    static propTypes = {
        productInfo: PropTypes.object.isRequired,
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                swiperShow: true
            });
        }, 1)
    }

    render() {
        if (this.state.swiperShow) {
            let item = this.props.productInfo;
            return (
                <View style={styles.container}>
                    <View style={{height:240}}>
                    <Swiper
                        loop={true}
                        autoplay={true}
                        autoplayTimeout={4}
                        horizontal={true}
                        paginationStyle={{bottom: 10}}
                        showsButtons={false}
                        showsPagination={true}
                        dot={<View style={styles.dotStyle}/>}
                        activeDot={<View style={styles.activeDotStyle}/>}
                    >
                        {item.asset.map((url, i) => <Image source={{uri: url}} style={styles.image}/>)}
                    </Swiper>
                    </View>
                    <Text style={{color: '#666', fontSize: 17, margin:10}}
                          numberOfLines={2}>{item.short_title}</Text>
                    <Text style={styles.item_price}>
                        ￥{item.sale_price}
                        <Text style={{width: 5, height: 10}}> </Text>
                        <Text style={styles.item_market_price}>￥{item.market_price}</Text>
                    </Text>
                    {/*{this._relateProducts(item)}*/}

                </View>);
        } else {
            return <ActivityIndicator />
        }

    }

    _relateProducts(item){
        return '';
    }

}
const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    dotStyle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    activeDotStyle: {
        backgroundColor: '#fff',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    image: {
        width: width,
        height: 240,
    },
    item_price: {
        fontSize: 15,
        color: '#F05958',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 8,
    },
    item_market_price: {
        fontSize: 10,
        color: "#999",
        textDecorationLine: 'line-through',
    },

});
