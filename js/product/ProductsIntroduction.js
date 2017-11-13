import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity, FlatList} from 'react-native'
import Swiper from 'react-native-swiper'
import PropTypes from 'prop-types'
import {height, width} from "../common/Constants";

const ProductShape={
    banners:PropTypes.array.isRequired,
    title:PropTypes.string.isRequired,

};

export default class ProductsIntroduction extends Component {
    static propTypes = {
        productInfo:PropTypes.object.isRequired,
    }

    render() {
        const banners=['http://imgsrc.baidu.com/imgad/pic/item/0ff41bd5ad6eddc40377fadc33dbb6fd52663300.jpg','http://imgsrc.baidu.com/imgad/pic/item/0ff41bd5ad6eddc40377fadc33dbb6fd52663300.jpg'];

        alert(this.props.productInfo.banners[0])
        return (
            <View style={styles.container}>
                <Swiper
                    style={{width:width,backgroundColor:'red'}}
                    height={240}
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
                    <View style={{color:"#333"}}>
                        <Text style={styles.text}>Hello Swiper</Text>
                    </View>
                    <View style={{color:"#333"}}>
                        <Text style={styles.text}>Beautiful</Text>
                    </View>
                    <View style={{color:"#333"}}>
                        <Text style={styles.text}>And simple</Text>
                    </View>
                    {/*{banners.map((url, i) => <Image source={{uri: url}} style={styles.image}/>)}*/}
                </Swiper>
                <Text style={{color:'#666',fontSize:17,marginLeft:10,marginRight:10,height:50}} numLines={1}>{this.props.productInfo.title}</Text>
                {/*<Text style={styles.item_price}>*/}
                    {/*￥{item.sale_price}*/}
                    {/*<View style={{width: 5, height: 10}}/>*/}
                    {/*<Text style={styles.item_market_price}>￥{item.market_price}</Text>*/}
                {/*</Text>*/}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: width,
        height: 240,
    },
    dotStyle: {
        width: 8,
        height: 8,
        borderRadius:4,
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
        borderRadius:4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    image:{
        width:width,
        height:240,
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
