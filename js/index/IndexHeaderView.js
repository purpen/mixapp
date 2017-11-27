import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    Dimensions,
    ActivityIndicator,
    ToastAndroid,
} from 'react-native'
import Swiper from 'react-native-swiper'
import {INDEX_BANNER_URL} from '../common/URLS'
import Toast from 'react-native-root-toast';
import {ToastConfig} from "../common/Constants";
import ParamsUtil from "../network/ParamsUtil";
import AppService from "../common/AppService";
const {width} = Dimensions.get('window')
const styles = {
    container: {
        height: 213,
        width: width,
    },
    tips: {
        width: width,
        height: 213,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: width,
        height: 213,
        resizeMode: 'cover',
    },
    dotStyle: {
        width: 14,
        height: 2,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
        backgroundColor: 'rgba(255,255,255,0.7)',
    },
    activeDotStyle: {
        backgroundColor: 'rgba(154,125,86,1)',
        width: 14,
        height: 2,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    }
}

export default class IndexHeaderView extends Component {
    state = {
        isLoading: true,
        error: false,
    }

    _renderLoadingView = () => {
        return <ActivityIndicator style={styles.tips}/>
    }

    _renderErrorView = () => {
        return <Text style={styles.tips}>Network Error: {this.state.errorInfo}</Text>
    }

    render() {
        if (this.state.isLoading && !this.state.error) {
            return this._renderLoadingView();
        } else if (this.state.error) {
            return this._renderErrorView();
        }

        return (
            <View style={styles.container}>
                <Swiper
                    height={213}
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
                    {this.state.banners.map((item, i, arr) => <Image source={{uri: item.cover_url}}
                                                                     style={styles.img}/>)}
                </Swiper>
            </View>
        )
    }

    componentDidMount() {
        this._fetchData();
    }

    _fetchData() {
        let params = ParamsUtil.generateIndexBannerParams();
        AppService.getIndexBannerData(params).then((response) => {
            if (response.success) {
                let banners = response.data.rows;
                this.setState({
                    isLoading: false,
                    banners: banners,
                });
            }
        }).catch((error) => {
            console.log('getIndexBannerData:' + error)
            this.setState({
                error: true,
                errorInfo: error.toString(),
            });
            Toast.show('网络异常', ToastConfig);
        });
    }
}