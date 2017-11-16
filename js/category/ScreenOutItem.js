import React, {Component} from 'react'
import {StyleSheet, Text, View, Image, FlatList, Animated, TouchableOpacity, Platform, StatusBar} from 'react-native';
import PropTypes from 'prop-types'
import {height} from "../common/Constants";

const ICON_ARROW_DOWN = require('../../res/imgs/icon_arrow_down.png');
export default class ScreenOutItem extends Component {
    static defaultProps={
        defaultShowSize:3,
        list:[],
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        list: PropTypes.array,
        defaultShowSize:PropTypes.number,
    }

    state = {
        expanded: false,
    }

    render() {
        let dataSource=[];
        let dataBak=[];
        this.props.list.map((item,i)=>{
            item.index=i;
            dataBak.push(item)
        });
        if (this.state.expanded) {
            dataSource=dataBak;
        }else {
            if (this.props.defaultShowSize<this.props.list.length){
                dataSource=dataBak.slice(0,this.props.defaultShowSize)
            }
        }



        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', height: 44, alignItems: 'center',}}>
                    <Text style={{color: "#666", fontSize: 14}}>{this.props.title}</Text>
                    <View style={{flex: 1}}>
                        <TouchableOpacity style={{justifyContent: 'flex-end',flexDirection: 'row',alignItems:'center'}} onPress={this._toggle}>
                            <Text>全部</Text>
                            <Image source={ICON_ARROW_DOWN}
                                   style={{width: 10, height: 7,marginLeft:5}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={dataSource}
                    ItemSeparatorComponent={this._separator}
                    columnWrapperStyle={{}}
                    renderItem={this._renderItem}
                    numColumns={3}
                />
            </View>
        );
    }

    _renderItem({item}){
        return (
            <View style={{width: 90, height: 30,justifyContent:'center',backgroundColor:'#fafafa',alignItems:'center',marginRight:item.index%3===2?0:10,borderRadius:4,borderWidth:1, borderColor:'#e6e6e6'}}>
                <Text style={{ color: "#666",textAlign:'center'}}>{item.key}</Text>
            </View>
        );
    }

    _separator = () => {
        return <View style={styles.separator} />
    }

    _toggle=()=>{
        this.setState({
            expanded:!this.state.expanded,
        });
    }

    _setMaxHeight=(event)=>{
        this.setState({
            maxHeight: event.nativeEvent.layout.height
        });
    }

    _setMinHeight=(event)=>{
        this.setState({
            minHeight: event.nativeEvent.layout.height
        });
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
    },
    separator:{
        height:10,
    }
});