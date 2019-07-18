import React, { Component } from 'react'
import { Text, View, SafeAreaView, TextInput, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native'
import SendBirdLib from './SendBirdLib';
import { ContactCards } from './ChatComponents';
import { withNavigation } from 'react-navigation'

class ChatList extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading:true,
            chatList:[],
            chatListCopy:[],
            filterQuery:''
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
            this.setState({chatList:list,chatListCopy:list,isLoading:false})
        }).catch(c=>console.log(c))
    }

    componentWillUnmount(){
        if(this.refresher)
            this.refresher.remove()
    }

    filterContacts =(filterQuery)=>{
        this.setState({filterQuery},()=>{
            let list = this.state.chatListCopy.filter((contacts)=>{
                return contacts.members.find((member)=>{
                    return member.userId != SendBirdLib.senderUser && member.nickname.toLowerCase().indexOf(this.state.filterQuery.toLowerCase()) > -1
                })
            })
            this.setState({chatList:list})
        })
    }

    clearFilter =()=> {

    }

    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                {
                    this.state.isLoading && 
                    <View style={styles.centerOfScreen}>
                        <ActivityIndicator
                            size={'large'}
                            color={'#5B57DC'}
                        />
                    </View>
                }
                {
                    !this.state.isLoading &&
                    <View style={styles.parentView}>
                        {
                            this.state.chatListCopy.length > 0 &&
                            <View style={styles.searchBarView}>
                                <Image
                                    source={require('./assets/icons/search/search.png')}
                                />
                                <TextInput
                                    placeholder={'Search'}
                                    placeholderTextColor={'#668391'}
                                    style={styles.searchBar}
                                    clearButtonMode={'while-editing'}
                                    textContentType={'name'}
                                    keyboardType={'default'}
                                    onChangeText={this.filterContacts}
                                    selectionColor={'#668391'}
                                />
                            </View>
                        }
                        <View style={{paddingVertical:10,flex:1}}>
                            {
                                this.state.chatListCopy.length > 0 &&    
                                <FlatList
                                    data={this.state.chatList}
                                    renderItem={({item,index})=>
                                        <ContactCards 
                                            {...this.props} 
                                            {...item.lastMessage} 
                                            members={item.members} 
                                            unreadCount={item.unreadMessageCount} 
                                            channelUrl={item.url}
                                        />
                                    }
                                    extraData={this.state}
                                    keyExtractor={(item,index)=>index.toString()}
                                    contentContainerStyle={{paddingHorizontal:16}}
                                />
                            }
                            {
                                this.state.chatListCopy.length == 0 &&
                                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                    <Image
                                        source={require('./assets/icons/no_chat/no_chat.png')}
                                    />
                                </View>
                            }
                        </View>
                    </View>
                }
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
    },
    centerOfScreen:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    }
})

export default withNavigation(ChatList)