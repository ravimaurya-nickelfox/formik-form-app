const dateTime = {
    convertTo24Hrs:function(timestamp){
        let getTime = new Date(timestamp)
        let minutes = getTime.getHours() > 10 ? getTime.getHours() : '0'+getTime.getHours()
        let seconds = getTime.getSeconds() > 10 ? getTime.getSeconds() : '0'+getTime.getSeconds()
        return `${minutes}:${seconds}`
    }
}
export default dateTime;