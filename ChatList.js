import React, { Component } from 'react'
import { Text, View, SafeAreaView, TextInput, StyleSheet, Image, FlatList } from 'react-native'
import SendBirdLib from './SendBirdLib';
import { ContactCards } from './ChatComponents';
import { withNavigation } from 'react-navigation'

class ChatList extends Component {
    constructor(props){
        super(props)
        this.state = {
            chatList:[]
        }
        SendBirdLib.senderUser = 'user-test-01';
    }

    componentDidMount(){
        SendBirdLib.connectUser()
        .then(()=>{
            this.addRefreshListener()
            this.connectToChannel()
        }).catch(c=>console.log(c))
    }

    addRefreshListener =()=> {
        const { navigation } = this.props
        this.refresher = navigation.addListener('didFocus',()=>{
            this.connectToChannel()
        })
    }

    connectToChannel =()=> {
        SendBirdLib.listCurrentUserChannels()
        .then((list)=>{
            console.log(list)
            this.setState({chatList:list})
        }).catch(c=>console.log(c))
    }

    componentWillUnmount(){
        if(this.refresher)
            this.refresher.remove()
    }

    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                <View style={styles.parentView}>
                    <View style={styles.searchBarView}>
                        <Image
                            source={require('./assets/icons/search/search.png')}
                        />
                        <TextInput
                            placeholder={'Search'}
                            placeholderTextColor={'#668391'}
                            style={styles.searchBar}
                            clearButtonMode={'while-editing'}
                        />
                    </View>
                    <View style={{paddingVertical:10}}>
                        <FlatList
                            data={this.state.chatList}
                            renderItem={({item,index})=>
                                <ContactCards {...this.props} {...item.lastMessage} unreadCount={item.unreadMessageCount} />
                            }
                            extraData={this.state}
                            keyExtractor={(item,index)=>index.toString()}
                            contentContainerStyle={{paddingHorizontal:16}}
                        />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    parentView:{
        flex:1,
        backgroundColor:'#fff'
    },
    searchBarView:{
        backgroundColor:'#F5F5F5',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:10,
        borderRadius:4,
        margin:16,
        marginBottom:0
    },
    searchBar:{
        flex:1,
        padding:10
    }
})

export default withNavigation(ChatList)