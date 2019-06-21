import React, { Component } from 'react'
import { Text, View, SafeAreaView,StyleSheet } from 'react-native'
import t from 'tcomb-form-native'

var Forms = t.form.Form
var Person = t.struct({
    name: t.String,              // a required string
    surname: t.maybe(t.String),  // an optional string
    age: t.Number,               // a required number
    select:t.enums({
        M:'Male',
        F:'Female'
    }),
    rememberMe: t.Boolean        // a boolean
  });
  
  var options = {
      fields:{
          name:{
              placeholder:'Name',
              error:'Name should not be empty'
          },
          select:{
              label:'Gender'
          }
      }
  };
export default class Form extends Component {

    onPress = () =>{
        var value = this.refs.form.getValue();
        if (value) { // if validation fails, value will be null
        console.log(value); // value here is an instance of Person
        }
      }

    render() {
        return (
            <SafeAreaView>
                <View style={{padding:20}}>
                    <Forms
                        ref="form"
                        type={Person}
                        options={options}
                        />
                    <Text onPress={this.onPress}>Submit</Text>
                </View>
            </SafeAreaView>
        )
    }
}
