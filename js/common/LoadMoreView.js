import React,{Component} from 'react';
import {ActivityIndicator,View,Text,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
export default class LoadMoreView extends Component{

    static defaultProps = {
        isLoading: this.props.isLoading,
        onLoading:()=>{
            alert('默认onloading');
        }
    }

    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        onLoading:PropTypes.func,
    }

    render(){
        if (this.state.isLoading) {
            return (
                <View
                    style={{flexDirection:'row',alignSelf:'center',alignItems:'center',padding:ScreenUtils.scaleSize(10) }}>
                    <ActivityIndicator/>
                    <Text style={{
                        color:'red',
                        marginLeft:10,
                    }}>
                        正在加载...
                    </Text>
                </View>
            );
        } else if(this.props.onLoading){
            return (
                <TouchableOpacity
                    onPress={()=>{
                        this.setState({
                            isLoading:true
                        });
                        this.props.onLoading&&this.props.onLoading()
                    }}
                >
                    <Text style={{
                        color:'red',
                        alignSelf:'center',
                        padding:10
                    }}>
                        点击加载更多...
                    </Text>
                </TouchableOpacity>
            );
        }
    }
}
