import React, { Component, useState } from 'react';
import {
  FlatList, Text, View,
  Dimensions, Image, TouchableOpacity, SafeAreaView,ScrollView
} from 'react-native';


import Editora from './customeditor';

export default class Addcontentscreen extends Component {

  width = Dimensions.get('window').width;

  constructor(props) {
    super(props);
    this.state = {
      fasl_name_fa: this.props.route.params.fasl_name_fa,
      fasl_name_en: this.props.route.params.fasl_name_en,
      subject: this.props.route.params.subject,
      subject1: this.props.route.params.subject1,


    };
  }



  render() {


    return (


      <View style={{backgroundColor:'white',flex:1}}>
       
        <Editora  subject={this.state.subject} fasl_name_fa={this.state.fasl_name_fa} fasl_name_en={this.state.fasl_name_en} subject1={this.state.subject1} />


      </View>







    );
  }



};


