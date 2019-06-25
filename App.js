import * as yup from 'yup'
import { Formik } from 'formik'

import React, { Component } from 'react';
import { Text, StyleSheet, SafeAreaView, 
  View, ScrollView,
TouchableOpacity, Image,  } from 'react-native';
import { MyInput, ListCells, APTPicker } from './Components';
import {withNextInputAutoFocusForm} from 'react-native-formik'
import {KeyboardAccessoryNavigation} from 'react-native-keyboard-accessory'

const MyView = withNextInputAutoFocusForm(View)

const doctorInfo = [
  {title:'Doctor Name',value:'Adam Smith'},
  {title:'Address',value:'24th George St'},
  {title:'Referral Code',value:'94533'},
]

const genders = [
    {'label':'Male',value:'M'},
    {'label':'Female',value:'F'}
]

const states = [
    {label:'State 1', value:1},
    {label:'State 2',value:2},
    {label:'State 3',value:3}
]

const carriers = [
  {label:'Carrier 1', value:1},
  {label:'Carrier 2',value:2},
  {label:'Carrier 3',value:3}
]

const plans = [
  {label:'Plan 1', value:1},
  {label:'Plan 2',value:2},
  {label:'Plan 3',value:3}
]

export default class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      gender:'Gender',
      showSecondary:false,
      state:'State',
      carrier:'Carrier',
      plan:'Plan',
      stateSecondary:'State',
      carrierSecondary:'Carrier',
      planSecondary:'Plan'
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
      first_name:yup.string().required('First Name is required').matches(/^[a-zA-Z]+$/, 'Digits, space & special characters are not allowed'),
      last_name:yup.string().required('Last Name is required').matches(/^[a-zA-Z]+$/, 'Digits, space & special characters are not allowed'),
      age:yup.number().typeError('Age must be a number').required('Age is required').max(140, 'Age must be less than 140.').positive('Age must be positive'),
      email: yup.string().email('Enter a valid email address').required('Email is required'),
      password: yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain atleast 8 characters, one uppercase and one lowercase, a digit and one special character.'),
      confirm_password: yup.string().required('Confirm password please').oneOf([yup.ref('password'), null], 'Password does not match'),
      mobile:yup.number().required('Mobile no. is required'),
      address:yup.string().required('Address is required'),
      emergency_contact_person:yup.string().required('This is required'),
      emergency_contact_number:yup.string().required('This is required'),
      primary_insurance_member_id:yup.string()
    })
    this.genders = [
      {label:'Male',value:'M'},
      {label:'Female',value:'F'}
    ]
    this.customValidation = {
          gender:true,
          state:true,
          carrier:true,
          plan:true,
          stateSecondary:true,
          carrierSecondary:true,
          planSecondary:true
    }
  }

  handleSecondaryFormBtnPress=()=>{
    this.setState({showSecondary:!this.state.showSecondary},()=>{
      setTimeout(()=>{
        this.scrollRef.scrollToEnd({animated:true})
      },150)
    })
  }

  submitForm=(values)=>{
    this.pickerValidation()
    this.formik.submitForm()
    console.log(values)
    // Alert.alert(JSON.stringify(values))
  }

  pickerValidation=()=>{
    for(let v in this.customValidation){
      if(typeof this.state[v] == 'string'){
        this.customValidation[v] = false
      }else
        this.customValidation[v] = true
    }
  }

  updatePickerValue=(field,select)=>{
    this.setState({[field]:select},()=>{
      this.submitForm()
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView ref={p=>this.scrollRef=p}>
          <Formik
            initialValues={this.fieldSchema}
            onSubmit={values => this.submitForm(values)}
            validationSchema={this.fieldValidationRules}
            ref={p=>this.formik=p}
          >
            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
              <MyView style={styles.p20}>
                <MyInput
                  placeholder={'First Name'}
                  name={'first_name'}
                  type={'name'}
                  label={'First Name'}
                  onFocus={()=>console.log(this.in)}
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
                    <APTPicker
                      data={genders}
                      style={styles.smallPickerStyle}
                      title={'Gender'}
                      pickerTitle={'Select Gender'}
                      onChange={(gender)=>this.updatePickerValue('gender',gender)}
                      valid={this.customValidation.gender}
                    />
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
                      <APTPicker
                        data={states}
                        style={styles.fullPickerStyle}
                        title={'State'}
                        pickerTitle={'Select State'}
                        onChange={(state)=>this.updatePickerValue('state',state)}
                        valid={this.customValidation.state}
                      />
                    </View>
                    <View style={{flex:1,marginTop:10}}>
                      <Text style={styles.inputLabel}>Carrier</Text>
                      <APTPicker
                        data={carriers}
                        style={styles.fullPickerStyle}
                        title={'Carrier'}
                        pickerTitle={'Select Carrier'}
                        onChange={(carrier)=>this.updatePickerValue('carrier',carrier)}
                        valid={this.customValidation.carrier}
                      />
                    </View>
                    <View style={{flex:1,marginTop:10,marginBottom:10}}>
                      <Text style={styles.inputLabel}>Plan Type</Text>
                      <APTPicker
                        data={plans}
                        style={styles.fullPickerStyle}
                        title={'Plan Type'}
                        pickerTitle={'Select Plan'}
                        onChange={(plan)=>this.updatePickerValue('plan',plan)}
                        valid={this.customValidation.plan}
                      />
                    </View>
                    <MyInput
                      placeholder={'Member ID'}
                      name={'primary_insurance_member_id'}
                      type={'name'}
                      label={'Member ID'}
                    />

                    <TouchableOpacity activeOpacity={1}
                      onPress={this.handleSecondaryFormBtnPress}
                    >
                      { !this.state.showSecondary && <View style={{
                        flexDirection:'row',
                        alignItems:'center'
                      }}>
                        <Image
                          source={require('./assets/icons/ic_add/ic_add.png')}
                        />
                        <Text style={{fontSize:16, color:'#5B57DC',fontWeight:'600',marginStart:10}}>Add Secondary Insurance</Text>
                      </View>}
                      { this.state.showSecondary && <View style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center'
                      }}>
                        <Text style={{fontSize:16, color:'#000',fontWeight:'600'}}>Secondary Insurance Information</Text>
                        <Image
                          source={require('./assets/icons/ic_remove/ic_remove.png')}
                        />
                      </View>}
                    </TouchableOpacity>

                    { this.state.showSecondary && 
                      <View>
                        <View style={{flex:1,marginTop:10}}>
                          <Text style={styles.inputLabel}>State</Text>
                          <APTPicker
                            data={states}
                            style={styles.fullPickerStyle}
                            title={'State'}
                            pickerTitle={'Select State'}
                            onChange={(stateSecondary)=>this.setState({stateSecondary})}
                            valid={this.customValidation.stateSecondary}
                          />
                        </View>
                        <View style={{flex:1,marginTop:10}}>
                          <Text style={styles.inputLabel}>Carrier</Text>
                          <APTPicker
                            data={carriers}
                            style={styles.fullPickerStyle}
                            title={'Carrier'}
                            pickerTitle={'Select Carrier'}
                            onChange={(carrierSecondary)=>this.updatePickerValue('carrierSecondary',carrierSecondary)}
                            valid={this.customValidation.carrierSecondary}
                          />
                        </View>
                        <View style={{flex:1,marginTop:10,marginBottom:10}}>
                          <Text style={styles.inputLabel}>Plan Type</Text>
                          <APTPicker
                            data={plans}
                            style={styles.fullPickerStyle}
                            title={'Plan Type'}
                            pickerTitle={'Select Plan'}
                            onChange={(planSecondary)=>this.updatePickerValue('planSecondary',planSecondary)}
                            valid={this.customValidation.planSecondary}
                          />
                        </View>
                        <MyInput
                          placeholder={'Member ID'}
                          name={'primary_insurance_member_id'}
                          type={'name'}
                          label={'Member ID'}
                        />
                      </View>
                    }

              </MyView>
            )}
          </Formik>
          <View style={{borderBottomColor:'rgba(0,0,0,0.16)',borderBottomWidth:1,marginHorizontal:20,marginVertical:10}}></View>
          <View style={{padding:20,}}>
            <Text style={{fontSize:16,fontWeight:'600',fontFamily:'Helvetica'}}>Associated PCP Details</Text>
            <View style={{marginTop:10}}>
              {
                doctorInfo.map((item,index)=>
                  <ListCells
                    key={'list'+index.toString()}
                    title={item.title}
                    value={item.value}
                  />
                )
              }
            </View>
          </View>
          <View style={{}}>
              <TouchableOpacity style={styles.submitBtn} activeOpacity={0.7}
                onPress={()=>this.submitForm(this.formik.state.values)}
              >
                <Text style={{fontSize:16,fontWeight:'600',fontFamily:'Helvetica',color:'#fff'}}>SUBMIT</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
        {/* <KeyboardAccessoryNavigation
          avoidKeyboard={true}
          multiline={false}
          androidAdjustResize ={true}
          accessoryStyle={{marginBottom:-35,backgroundColor:'#fff'}}
          onNext={()=>console.log(this.formik.getFormikContext())}/> */}
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
  },
  submitBtn:{
    paddingVertical:14,
    paddingHorizontal:45,
    backgroundColor:'#0CD0A7',
    alignSelf:'center',
    borderRadius:4,
    marginVertical:50
  }
});
