import React, { Component, useState } from 'react';
import {
  FlatList, Text, View,
  Dimensions, Image, TouchableOpacity, SafeAreaView,ScrollView
} from 'react-native';


import Editora from './customeditor';
import Editork from './customeditor9';

export default class Addcontentdrugscreen extends Component {

  width = Dimensions.get('window').width;

  constructor(props) {
    super(props);
    this.state = {
      name1: this.props.route.params.name1,
      name2: this.props.route.params.name2,
      subject: this.props.route.params.subject,
      subject1: this.props.route.params.subject1,


    };
  }



  render() {


    return (


      <View style={{backgroundColor:'white',flex:1}}>
       
        <Editork  subject={this.state.subject} name1={this.state.name1} name2={this.state.name2} subject1={this.state.subject1} />


      </View>







    );
  }



};


