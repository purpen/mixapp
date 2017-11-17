import React, {Component} from 'react'
import {StyleSheet, Text, View, Image, FlatList, Animated, TouchableOpacity, Platform, StatusBar} from 'react-native';
import PropTypes from 'prop-types'

const ICON_ARROW_DOWN = require('../../res/imgs/icon_arrow_down.png');
export default class ScreenOutItem extends Component {
    static defaultProps = {
        showSize: 3,
        list: [],
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        list: PropTypes.array.isRequired,
        showSize: PropTypes.number,
    }

    state = {
        expanded: false,
    }

    render() {
        let dataSource = [];
        let dataBak = [];
        this.props.list.map((item, i) => {
            item.index = i;
            dataBak.push({
                title: item,
                index: i,
            })
        });
        if (this.state.expanded) {
            dataSource = dataBak;
        } else {
            if (this.props.showSize < this.props.list.length) {
                dataSource = dataBak.slice(0, this.props.showSize)
            }
        }

        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', height: 44, alignItems: 'center',}}>
                    <Text style={{color: "#666", fontSize: 14,}}>{this.props.title}</Text>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity style={styles.expandedItem} onPress={this._toggle}>
                        <Text style={{fontSize:12,color:"#a0a0a0"}}>全部</Text>
                        <Image source={ICON_ARROW_DOWN}
                               style={[styles.arrowImage, {transform: [{rotateX: this.state.expanded ? '0deg' : '180deg'}]}]}/>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={dataSource}
                    ItemSeparatorComponent={this._separator}
                    renderItem={this._renderItem}
                    numColumns={3}
                />
            </View>
        );
    }

    _renderItem({item}) {
        return (
            <TouchableOpacity style={[styles.item, {marginRight: item.index % 3 === 2 ? 0 : 10,}]}>
                <Text style={{color: "#666", textAlign: 'center'}}>{item.title}</Text>
            </TouchableOpacity>
        );
    }

    _separator = () => {
        return <View style={styles.separator}/>
    }

    _toggle = () => {
        this.setState({
            expanded: !this.state.expanded,
        });
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
    },
    separator: {
        height: 10,
    },
    item: {
        width: 90,
        height: 30,
        justifyContent: 'center',
        backgroundColor: '#fafafa',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#e6e6e6'
    },
    arrowImage: {
        width: 10,
        height: 7,
        marginLeft: 5
    },
    expandedItem:{
        justifyContent: 'flex-end',
        paddingTop: 10,
        paddingBottom:10,
        flexDirection: 'row',
        alignItems: 'center'
    }
});