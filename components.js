import React, { Component } from 'react'
import { Text, View, TextInput,StyleSheet, Picker, Platform, TouchableOpacity ,Image } from 'react-native'
import {withNextInputAutoFocusInput,handleTextInput} from 'react-native-formik'
import { compose } from 'recompose'
import PickerIOS from 'react-native-picker';

const Colors = {
    primary:'#6B7A81',
    purple:'#5B57DC',
    red:'#DF1F20'
}

class Input extends React.PureComponent {
    constructor(props){
        super(props)

    }
    focus=()=>{
        this.input.focus()
    }

    zoomInFocus=()=>{
        this.view.setNativeProps({
            style:{
                borderColor:Colors.purple,
                shadowColor: Colors.purple,
                ...Platform.select({
                    ios:{
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 3,
                    },
                    android:{
                        elevation:2
                    }
                })
            }
        })
    }

    zoomOutFocus=()=>{
        this.view.setNativeProps({
            style:{
                shadowColor: Colors.primary,
                shadowOpacity: 1,
                shadowRadius: 0,
                shadowOffset: {
                    height: 0,
                    width: 0
                },
                borderColor:Colors.primary
            }
        })
    }

    borderColor=()=>{
        if(this.props.formik.touched[this.props.name] && this.props.formik.errors[this.props.name])
            return Colors.red
        return Colors.primary
    }

    isError=()=>{
        if(this.props.formik.touched[this.props.name] && this.props.formik.errors[this.props.name])
        return true
    return false
    }

    render() {
        return (
            <View style={{marginBottom:5}}>
                <Text style={style.inputLabel}>{this.props.label}</Text>
                <View ref={p=>this.view=p} style={[style.view,{borderColor:this.borderColor()}]}>
                    <TextInput
                        ref={p=>this.input=p}
                        {...this.props}
                        onFocus={this.zoomInFocus}
                        onBlur={this.zoomOutFocus}
                        style={[style.input,{...this.props.style}]}
                        onChangeText={()=>console.log(this.input)}
                    />
                </View>
                {this.isError() &&
                    <Text style={{ fontSize: 12, color: 'red' }}>{this.props.formik.errors[this.props.name]}</Text>
                }
                {
                    !this.isError() && <Text>{' '}</Text>
                }
            </View>
        )
    }
}

export const MyInput = compose(handleTextInput,withNextInputAutoFocusInput)(Input)

const style = StyleSheet.create({
    input:{
        color:Colors.purple,
        paddingVertical:10,
        paddingHorizontal:10,
        fontFamily: "Helvetica",
       fontSize: 14,
       fontWeight: "600"
    },
    view:{
        borderWidth:1,
        borderRadius:4,
        marginTop:10,
        // shadowColor: Colors.purple,
        // shadowOffset: {
        //     width: 0,
        //     height: 3,
        // },
        // shadowOpacity: 0.5,
        // shadowRadius: 7,
        borderColor:Colors.red,
        elevation: 2,
    },
    inputLabel:{
        fontFamily: "Helvetica",
        fontSize: 14,
        fontWeight: "500",
    },
    rowtWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:7
    },
    rowTitle:{
        fontSize:14,
        fontWeight:'600',
        fontFamily: "Helvetica"
    },
    rowValue:{
        fontSize:14,
        color:'#668391',
        fontFamily: "Helvetica",
        fontWeight:'600',
    }
})

export class ListCells extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={style.rowtWrapper}>
                <Text style={style.rowTitle}>{this.props.title}</Text>
                <Text style={style.rowValue}>{this.props.value}</Text>
            </View>
        )
    }
}

export class APTPicker extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            selectedValue:this.props.title
        }
    }

    openPicker=()=>{
        var data = []
        for(let d of this.props.data)
            data.push(d.label)

        PickerIOS.init({
            pickerData: data,
            selectedValue: [data[0]],
            pickerConfirmBtnText:'Confirm',
            pickerCancelBtnText:'Cancel',
            pickerTitleText:this.props.pickerTitle,
            onPickerConfirm: data => {
                this.setState({selectedValue:data[0]})
                this.selectValue(data[0])
            },
            onPickerCancel: data => {
                console.log(data);
            },
            onPickerSelect: data => {
                console.log(data)
            }
        });
        PickerIOS.show();
    }

    selectValue=value=>{
        let val = this.props.data.find((ele)=>ele.label == value)
        this.props.onChange(val)
    }

    borderColor=()=>{
        return this.props.valid?Colors.primary:Colors.red
    }

    render(){
        if(Platform.OS == 'ios'){
            return(
                <View style={{flex:1}}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={this.openPicker}
                        style={{...this.props.style,borderColor:this.borderColor(),marginBottom:6}}
                    >
                        <Text>{this.state.selectedValue}</Text>
                        <Image
                        source={require('./assets/icons/dropdown/dropdown.png')}
                        />
                    </TouchableOpacity>
                    {!this.props.valid &&
                        <Text style={{ fontSize: 12, color: 'red' }}>{this.props.title} is required</Text>
                    }
                    {
                        this.props.valid && <Text>{' '}</Text>
                    }
                </View>
            )
        }else{
            return(
                <Picker
                    selectedValue={this.props.data}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({gender: itemValue})
                    }
                    style={[{backgroundColor:'#fff',...this.props.style}]}>
                    {
                        this.props.data.map((item,index)=>
                            <Picker.Item label={item.label} value={item.value} key={item.label.toString()+index.toString()} />
                        )
                    }
                </Picker>
            )
        }
    }

}