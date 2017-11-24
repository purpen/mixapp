import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity, FlatList} from 'react-native'
import NavigationBar from '../common/NavigationBar'
import {TAB} from '../HomePage'
import {height, width} from "../common/Constants";
import {INDEX_CATEGORY_URL} from "../common/URLS";

const titles = ['推荐', '先锋智能', '数码电子', '户外出行', '运动健康', '文创文品', '先锋设计', '家具日用', '厨房卫浴', '母婴成长', '品质饮品'];

function TitleModel(index,title, isSelected) {
    this.index=index;
    this.title = title;
    this.isSelected = isSelected;
}

export default class CategoryPage extends Component {
    state = {
        error:false,
        items: [],
        contentItems:[],
        currentIndex: 0,
    }

    render() {
        let navigationBar = <NavigationBar
            title={TAB.category}
            statusBar={{translucent: true}}
            hide={false}/>;
        return (
            <View>
                {navigationBar}
                <View style={styles.container}>
                    <FlatList
                        style={styles.flatList}
                        renderItem={this._renderItemLeft}
                        data={this.state.items}
                    >
                    </FlatList>
                    <View style={{height: height, width: 1, backgroundColor: "#EEE"}}></View>
                    <View style={styles.right_container}>
                        <FlatList
                            style={{width:230}}
                            ListHeaderComponent={this._headerComponent}
                            renderItem={this._renderItemRight}
                            data={this.state.contentItems}
                            numColumns={3}
                            refreshing={true}
                        >
                        </FlatList>
                    </View>
                </View>
            </View>
        )
    }

    componentDidMount() {
        this._getTitles();
        fetch(INDEX_CATEGORY_URL).then((response) => response.json()).then((jsonResponse) => {
            let items=jsonResponse.data.pro_category;
            if (items.length==0) {
                this.setState({
                    empty:true
                });
                return;
            }
            let i=0;
            items.map((item)=>{
                items[i]={index:i,item:item};
                i++;
            })

            this.setState({
                contentItems:this.state.contentItems.concat(items),
                error:false
            });
        }).catch((error) => {
            this.setState({
                error:true,
                errorInfo:error.toString()
            });
        })
    }

    _headerComponent = () => {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                marginTop: 5,
                marginBottom:5,
            }}>
                <View style={styles.titleLine}/>
                <Text style={{
                    fontSize: 14,
                    color: '#c8c8c8',
                    marginLeft: 10,
                    marginRight: 10
                }}>{titles[this.state.currentIndex]}</Text>
                <View style={styles.titleLine}/>
            </View>
        );
    }

    _renderItemLeft = ({item}) => {
        return (
            <TouchableOpacity onPress={() => this._onPress(item)} activeOpacity={0.7}>
                <View style={styles.titleItem}>
                    <View style={item.isSelected ? styles.selectedTitleIndicator : styles.unSelectedTitleIndicator} />
                    <Text style={item.isSelected ? styles.selectedTitle : styles.unSelectedTitle}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    _renderItemRight = ({item}) => {
        return (
            <TouchableOpacity onPress={() => this._onPressItem(item.item)} activeOpacity={0.7}>
                <View style={[{marginBottom:15,},item.index%3===1?{marginLeft:40,marginRight:40}:{}]}>
                    <Image
                        source={{uri:item.item.back_url}}
                        style={styles.imageItem}/>
                    <View style={styles.textContainer}>
                        <Text style={styles.textItem}>{item.item.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    _onPress = (item) => {
        this.state.items[this.state.currentIndex].isSelected=false;
        this.state.items[item.index].isSelected=true;

        // this.state.items.map((titleItem, i) => {
        //     if (item.title === titleItem.title) {
        //         index = i;
        //         titleItem.isSelected = true;
        //     } else {
        //         titleItem.isSelected = false;
        //     }
        //
        // });

        this.setState({
            currentIndex: item.index,
            items: Object.assign([], this.state.items),
        });
    }

    _getTitles() {
        let titleItems = [];
        titles.map((title, i) => {
            let isSelected = (i === 0);
            titleItems.push(new TitleModel(i,title, isSelected));
        });
        this.setState({
            items: titleItems
        });
    }

    _onPressItem(item) {
        const {navigate} = this.props.navigation;
        navigate('ScreenOut',item);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    flatList: {
        height: height,
        backgroundColor: 'white'
    },
    right_container: {
        height: height,
        width: width - 90,
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems:'center'
    },
    titleItem: {
        flex: 1,
        flexDirection: 'row',
        height: 40,
        width: 89,
        alignItems: 'center'
    },
    selectedTitle: {
        flex: 1,
        color: '#9A7D56',
        fontSize: 14,
        marginLeft: 17,
    },
    unSelectedTitle: {
        flex: 1,
        color: '#2A2A2A',
        fontSize: 14,
        marginLeft: 17,
    },
    selectedTitleIndicator: {
        width: 2,
        height: 20,
        backgroundColor: '#9A7D56'
    },
    unSelectedTitleIndicator: {
        width: 2,
        height: 20,
        backgroundColor: 'white'
    },
    titleLine:{
        height: 1,
        width: 20,
        backgroundColor: "#c8c8c8"
    },
    imageItem: {
        width: 50,
        height: 50,
    },
    textContainer:{
        flex: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textItem:{
        color: '#666',
        fontSize: 12,
    },

});