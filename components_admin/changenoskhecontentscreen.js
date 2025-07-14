import React, { Component, useState } from 'react';
import {
  FlatList, Text, View,
  Dimensions, Image, TouchableOpacity, SafeAreaView
} from 'react-native';


import Editorj from './customeditor8';

export default class Changecontentnoskhescreen extends Component {

  width = Dimensions.get('window').width;

  constructor(props) {
    super(props);
    this.state = {
      name_fa: this.props.route.params.name_fa,
      name_en: this.props.route.params.name_en,
      cours_en: this.props.route.params.cours_en,
     


    };
  }



  render() {


    return (



      <View style={{backgroundColor:'transparent',flex:1,marginTop:50}}>
       <Editorj cours_en={this.state.cours_en} name_fa={this.state.name_fa} name_en={this.state.name_en} />

     </View>

   




    );
  }



};


