const dateTime = {
    convertTo24Hrs : function(timestamp) {
        let getTime = new Date(timestamp)
        let minutes = getTime.getHours() > 10 ? getTime.getHours() : '0'+getTime.getHours()
        let seconds = getTime.getSeconds() > 10 ? getTime.getSeconds() : '0'+getTime.getSeconds()
        return `${minutes}:${seconds}`
    },
    getChatFriend : function(members,my_id) {
        return members.find((user)=>{
            return user.userId != my_id
        })
    }
}
export default dateTime;