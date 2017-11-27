import React, {Component} from 'react'
import {StyleSheet, View, Text, FlatList, Image, TouchableOpacity} from 'react-native'
import {TAB} from "../HomePage";
import NavigationBar from "../common/NavigationBar";
import CheckBox from '../common/CheckBox';
import Toast from 'react-native-root-toast'
import {ToastConfig, width} from "../common/Constants";
import ParamsUtil from "../network/ParamsUtil";
import AppService from "../common/AppService";

export default class ShopCart extends Component {
    state = {
        isLoading: true,
        error: false,
        items: [],
        sumOfPrice: 0,
        isEdit: false,
        isAllSelect: false,
    }


    componentDidMount() {
        let params = ParamsUtil.generateShopCartParams();
        AppService.getShopCartData(params).then((response) => {
            console.log(response)
            if (response.success) {
                let dataSource = [];
                response.data.items.map((item, i) => {
                    dataSource.push({
                        isCustomChecked: false,
                        customIndex: i,
                        ...item
                    });
                })
                this.setState({
                    isLoading: false,
                    items: this.state.items.concat(dataSource),
                });
            } else {
                this.setState({
                    isLoading: false,
                    message: response.message,
                });
            }
        }).catch((error) => {
            console.log('getShopCartData:' + error)
            this.setState({
                isLoading: false,
                error: true,
                errorInfo: error.toString(),
            });
            Toast.show('网络异常', ToastConfig);
        });
    }

    render() {
        let navigationBar = <NavigationBar
            title={TAB.shopCart}
            statusBar={{translucent: true}}
            rightButton={this._renderRightButton()}
            hide={false}
        />;
        let editStateBottom = <TouchableOpacity activeOpacity={0.8} style={styles.editStateBottom}
                                                onPress={this._deleteProduct}>
            <Text style={{color: 'white', fontSize: 17}}>删除</Text>
        </TouchableOpacity>;
        let normalStateBottom = (<View style={styles.bottomBarContainer}>
            <View style={{height: 0.5, backgroundColor: "#ccc"}}/>
            <View style={styles.bottomBar}>
                <CheckBox style={{paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 10}}
                          onClick={() => this._onCheckBoxClick()}
                          isChecked={this.state.isAllSelect}
                          checkedImage={<Image source={require('../../res/imgs/checked.png')}
                                               style={styles.checkImage}/>}
                          unCheckedImage={<Image source={require('../../res/imgs/check.png')}
                                                 style={styles.checkImage}/>}/>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Text style={{color: '#9A7D56', fontSize: 15}}>合计: ￥{this.state.sumOfPrice}</Text>
                    <TouchableOpacity activeOpacity={0.7} style={[styles.purchase, {backgroundColor: "#9A7D56"}]}>
                        <Text style={{color: 'white', fontSize: 17}}>去结算</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>);
        return (
            <View style={styles.container}>
                {navigationBar}
                <FlatList
                    ListHeaderComponent={this._headerComponent}
                    renderItem={this._renderItem}
                    data={this.state.items}
                    refreshing={this.state.isLoading}
                />
                {this.state.isEdit ? editStateBottom : normalStateBottom}
            </View>
        )
    }

    _renderRightButton = () => {
        return <TouchableOpacity
            activeOpacity={0.8}
            onPress={this._changeEditState}
            style={{height: 44, paddingLeft: 15, paddingRight: 15, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 17, color: "#666"}}>{this.state.isEdit ? '完成' : '编辑'}</Text>
        </TouchableOpacity>
    }

    _changeEditState = () => {
        this.setState({
            isEdit: !this.state.isEdit,
        });
    }

    _headerComponent = () => {
        return (<View>

        </View>);
    }

    _renderItem = ({item}) => {
        console.log(item.customIndex + "==" + item.isCustomChecked);
        return (
            <TouchableOpacity onPress={() => this._onPress(item)} activeOpacity={0.8}>
                <View style={styles.productItem}>
                    <CheckBox style={{paddingLeft: 15, paddingTop: 35, paddingBottom: 35, paddingRight: 10}}
                              onClick={() => this._onCheckBoxClick(item)}
                              isChecked={item.isCustomChecked}
                              checkedImage={<Image source={require('../../res/imgs/checked.png')}
                                                   style={styles.checkImage}/>}
                              unCheckedImage={<Image source={require('../../res/imgs/check.png')}
                                                     style={styles.checkImage}/>}/>
                    <Image source={{uri: item.cover}} style={styles.imageItem}/>
                    <View style={{flex: 1, marginTop: 13, marginBottom: 13}}>
                        <Text style={{color: '#222', fontSize: 15}} numberOfLines={2}>{item.title}</Text>
                        <Text style={{color: '#666', fontSize: 12, marginTop: 5}}>颜色/分类:{item.sku_name} 数量
                            * {item.n}</Text>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end',}}>
                            <Text style={{color: '#9a7d56', fontSize: 15}}>￥{item.price}</Text>
                        </View>
                    </View>
                </View>
                <View style={{backgroundColor: '#eee', height: 0.5}}/>
            </TouchableOpacity>
        );
    }

    _deleteProduct = () => {
        alert('删除')
        //TODO    删除编辑状态下选中的商品
    }

    _onCheckBoxClick(item) {
        if (!item) {//全选/全否
            if (this.state.isAllSelect) {
                for (let item of this.state.items) item.isCustomChecked = false;
            } else {
                for (let item of this.state.items) item.isCustomChecked = true;
            }
            this.setState({
                items: Object.assign([], this.state.items),
                isAllSelect: !this.state.isAllSelect
            });
        } else {
            item.isCustomChecked = !item.isCustomChecked;
            let allSel;
            for (let item of this.state.items) {
                if (!item.isCustomChecked) {
                    allSel = false;
                    break
                }
                allSel = true;
            }
            this.setState({
                isAllSelect: allSel,
            });
        }

    }

    _onPress = (item) => {
        this.props.navigation.navigate('ProductDetail', {_id: item.product_id, title: item.title});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    productItem: {
        height: 115,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        paddingRight: 15,
    },
    imageItem: {
        width: 100,
        height: 90,
        borderColor: '#ccc',
        borderWidth: 0.5,
        marginRight: 10,
    },
    checkImage: {
        height: 20,
        width: 20,
    },
    bottomBarContainer: {
        position: 'absolute',
        bottom: 0,
    },
    bottomBar: {
        backgroundColor: 'white',
        height: 44,
        flex: 1,
        width: width,
        flexDirection: 'row'
    },
    purchase: {
        marginLeft: 13,
        paddingLeft: 20,
        paddingRight: 20,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center'
    },
    editStateBottom: {
        width: width,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        height: 44,
        backgroundColor: "#9a7d56"
    }
});