import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import {width} from "./Constants";
import PropTypes from 'prop-types'

export default class ViewItemWithTitle extends Component {
    static defaultProps = {
        showArrowRight:true,
        tipsColor:'#222'
    }

    static propTypes = {
        iconLeft: PropTypes.number,
        title: PropTypes.string.isRequired,
        tips: PropTypes.string,
        tipsColor:PropTypes.string,
        showArrowRight: PropTypes.bool,
        onPress:PropTypes.func,
    }

    render() {
        let iconLeft=this.props.iconLeft?<Image source={this.props.iconLeft} style={{resizeMode: 'center', height: 30, width: 30, marginRight: 5}}/>:null;
        let rightArrow=this.props.showArrowRight? <Image source={require('../../res/imgs/icon_arrow_right.png')} style={{resizeMode: 'center'}}/>:null;
        let tips=this.props.tips?<Text style={{fontSize: 12,color:this.props.tipsColor,marginRight:5}}>{this.props.tips}</Text>:null;
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={this._onClick.bind(this)}>
                <View style={styles.container}>
                    {iconLeft}
                    <Text style={{fontSize: 14, color: '#222'}}>{this.props.title}</Text>
                    <View style={styles.container_right}>
                        {tips}
                        {rightArrow}
                    </View>
                </View>
                <View style={{height:0.5,backgroundColor:"#ccc"}}/>
            </TouchableOpacity>
        );
    }

    _onClick(){
        if (!this.props.onPress) return;
        this.props.onPress(this.props.title);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 44,
        paddingLeft: 15,
        paddingRight: 15,
        width: width,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    container_right: {
        flex: 1,
        flexDirection: 'row',
        height: 44,
        alignItems: 'center',
        justifyContent: 'flex-end'
    }

});