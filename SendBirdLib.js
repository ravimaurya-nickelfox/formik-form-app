import SendBird from 'sendbird'
class SendBirdLib{
    constructor(){
        this.app_id = '609B359F-699F-4E48-970C-9202A1574D9D'
        this.libSendBird = new SendBird({appId:this.app_id})
        this.channelId;
        this.openChannel;
        this.messageParams = new this.libSendBird.UserMessageParams()
        this.senderUser;       // My user id
        this.participentUser;
    }
    
    connectUser =()=> {
        return new Promise((resolve,reject)=>{
            this.libSendBird.connect(this.senderUser,(res,err)=>{
                if(err) reject(err);
                resolve(res);
            })
        });
    }

    createChannel =()=> {
        return new Promise((resolve,reject)=>{
            const userIdsArray = [this.senderUser,this.participentUser];
            const params = new this.libSendBird.GroupChannelParams()
            params.isPublic = false;
            params.isEphemeral = false;
            params.isDistinct = true;
            params.addUserIds(userIdsArray);
            params.operatorIds = userIdsArray;

            this.libSendBird.GroupChannel.createChannel(params,(res,err)=>{
                if(err) reject(err);
                this.channelId = res.url;
                resolve(res);
            })
        });
    }

    connectToChannel =(channelId=this.channelId)=> {
        return new Promise((resolve,reject)=>{
            this.libSendBird.GroupChannel.getChannel(channelId,(openChannel,err)=>{
                console.log(openChannel,err)
                if(err) reject(err);
                this.openChannel = openChannel;
            })
        });
    }

    listCurrentUserChannels =()=>{
        return new Promise((resolve,reject)=>{
            var channelListQuery = this.libSendBird.GroupChannel.createMyGroupChannelListQuery();
            channelListQuery.userIdsFilter = [this.senderUser]
            if(channelListQuery.hasNext) {
                channelListQuery.next((list,err)=>{
                    if(err) reject(err)
                    resolve(list)
                })
            }
        })
    }

    getChannelMessages =(limit=30)=>{
        return new Promise((resolve,reject)=>{
            var msgQuery = this.openChannel.createPreviousMessageListQuery();
            msgQuery.limit = limit;
            msgQuery.load((messages,error)=>{
                if(error) reject(error)
                resolve(messages.reverse())
            })
        })
    }

    sendMessage =(params)=> {
        return new Promise((resolve,reject)=>{
            this.openChannel.sendUserMessage(params,(res,err)=>{
                if(err) reject(err)
                resolve(res);
            })
        })
    }

}

export default new SendBirdLib()