import * as yup from 'yup'
import { Formik } from 'formik'

import React, { Component, Fragment } from 'react';
import { TextInput, Text, Button, Alert, StyleSheet, SafeAreaView, 
  View, Picker, PickerIOS, KeyboardAvoidingView, ScrollView,
TouchableOpacity, Image } from 'react-native';
import { MyInput } from './components';
import {withNextInputAutoFocusForm,withNextInputAutoFocusInput} from 'react-native-formik'
import RNPicker from 'react-native-picker-select'

const MyView = withNextInputAutoFocusForm(View)

export default class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      gender:'Gender',
      showGenderPicker:false
    }
    this.fieldSchema = {
      first_name:'',
      last_name:'',
      age:'',
      email:'',
      password:'',
      confirm_password:'',
      mobile:'',
      address:'',
      emergency_contact_person:'',
      emergency_contact_number:'',
      primary_insurance_member_id:'',
      secondary_insurance_member_id:''
    }
    this.fieldValidationRules = yup.object().shape({
      first_name:yup.string().required().min(3),
      last_name:yup.string().required().min(3),
      age:yup.number().required().min(2).max(3),
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
      confirm_password: yup.string().min(6).required(),
      mobile:yup.number().min(10).required(),
      address:yup.string().required(),
      emergency_contact_person:yup.string().required(),
      emergency_contact_number:yup.number().required().min(10),
      primary_insurance_member_id:yup.string().required()
    })
    this.genders = [
      {label:'Male',value:'M'},
      {label:'Female',value:'F'}
    ]
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Formik
            initialValues={this.fieldSchema}
            onSubmit={values => Alert.alert(JSON.stringify(values))}
            validationSchema={this.fieldValidationRules}
          >
            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
              <MyView style={styles.p20}>
                <MyInput
                  placeholder={'First Name'}
                  name={'first_name'}
                  type={'name'}
                  label={'First Name'}
                />
              <MyInput
                  placeholder={'Last Name'}
                  name={'last_name'}
                  type={'name'}
                  label={'Last Name'}
                />
              <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                  <View style={{flex:1}}>
                    <MyInput
                      placeholder={'Age'}
                      name={'age'}
                      type={'number'}
                      label={'Age'}
                      keyboardType={'phone-pad'}
                    />
                  </View>
                  <View style={{flex:1,marginStart:16}}>
                    <Text style={styles.inputLabel}>Gender</Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={()=>this.setState({showGenderPicker:true})}
                      style={styles.smallPickerStyle}
                    >
                      <Text>{this.state.gender}</Text>
                      <Image
                        source={require('./assets/icons/dropdown/dropdown.png')}
                      />
                    </TouchableOpacity>
                  </View>
              </View>
              <MyInput
                  placeholder={'Email'}
                  name={'email'}
                  type={'email'}
                  label={'Email'}
                  keyboardType={'email-address'}
                />
                <MyInput
                    placeholder={'Password'}
                    name={'password'}
                    type={'password'}
                    label={'Password'}
                  />
                <MyInput
                    placeholder={'Confirm Password'}
                    name={'confirm_password'}
                    type={'password'}
                    label={'Confirm Passowrd'}
                  />
                <MyInput
                    placeholder={'Mobile'}
                    name={'mobile'}
                    type={'number'}
                    label={'Mobile'}
                    keyboardType={'phone-pad'}
                  />
                <MyInput
                    placeholder={'Address'}
                    name={'address'}
                    type={'address'}
                    label={'Address'}
                    multiline
                    style={{height:110}}
                  />
                <MyInput
                    placeholder={'Emergency Contact Person'}
                    name={'emergency_contact_person'}
                    type={'name'}
                    label={'Emergency Contact Person'}
                  />
                <MyInput
                    placeholder={'Emergency Contact Number'}
                    name={'emergency_contact_number'}
                    type={'phone'}
                    label={'Emergency Contact Number'}
                  />
                  <View style={{marginBottom:10}}>
                    <Text style={styles.primaryLabelStyle}>Primary Insurance Information</Text>
                  </View>
                  <View style={{flex:1,marginTop:10}}>
                      <Text style={styles.inputLabel}>State</Text>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>this.setState({showGenderPicker:true})}
                        style={styles.fullPickerStyle}
                      >
                        <Text>State</Text>
                        <Image
                          source={require('./assets/icons/dropdown/dropdown.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={{flex:1,marginTop:10}}>
                      <Text style={styles.inputLabel}>Carrier</Text>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>this.setState({showGenderPicker:true})}
                        style={styles.fullPickerStyle}
                      >
                        <Text>Carrier</Text>
                        <Image
                          source={require('./assets/icons/dropdown/dropdown.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={{flex:1,marginTop:10}}>
                      <Text style={styles.inputLabel}>Plan Type</Text>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>this.setState({showGenderPicker:true})}
                        style={styles.fullPickerStyle}
                      >
                        <Text>Plan Type</Text>
                        <Image
                          source={require('./assets/icons/dropdown/dropdown.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <MyInput
                      placeholder={'Member ID'}
                      name={'primary_insurance_member_id'}
                      type={'name'}
                      label={'Member ID'}
                    />
              </MyView>
            )}
          </Formik>
        </ScrollView>
        <View>
          {
            this.state.showGenderPicker &&
            <View>
              <View style={{alignSelf:'flex-end'}}>
                <Button
                  title={'Done'}
                  onPress={()=>this.setState({showGenderPicker:false})}
                />
              </View>
              <Picker
                    selectedValue={this.state.gender}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({gender: itemValue})
                    }
                    style={{backgroundColor:'#fff'}}>
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                  </Picker>
            </View>
          }
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  p20:{
    padding:20
  },
  smallPickerStyle:{
    borderWidth:1,
    borderRadius:4,
    marginTop:10,
    flex:1,
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:14,
    marginBottom:22,
    flexDirection:'row',
    borderColor:'#6B7A81'
  },
  fullPickerStyle:{
    borderWidth:1,
    borderRadius:4,
    marginTop:10,
    flex:1,
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:14,
    paddingVertical:10,
    marginBottom:10,
    flexDirection:'row',
    borderColor:'#6B7A81'
  },
  primaryLabelStyle:{
    fontFamily: "Helvetica",
    fontSize: 16,
    fontWeight: "500",
  },
  inputLabel:{
    fontFamily: "Helvetica",
    fontSize: 14,
    fontWeight: "500",
  }
});
