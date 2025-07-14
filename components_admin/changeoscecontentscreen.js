import React, { Component, useState } from 'react';
import {
  FlatList, Text, View,
  Dimensions, Image, TouchableOpacity, SafeAreaView
} from 'react-native';



import Editorg from './customeditor6';

export default class Changecontentoscescreen extends Component {

  width = Dimensions.get('window').width;

  constructor(props) {
    super(props);
    this.state = {
      name_fa: this.props.route.params.name_fa,
      name_en: this.props.route.params.name_en,
      subject: this.props.route.params.subject,
      subject1: this.props.route.params.subject1,


    };
  }



  render() {


    return (



      <View style={{backgroundColor:'white',flex:1}}>
       <Editorg subject={this.state.subject} name_fa={this.state.name_fa} name_en={this.state.name_en} subject1={this.state.subject1}/>

     </View>

   




    );
  }



};


