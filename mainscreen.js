import React, { Component, useState } from 'react';

import {
  FlatList, Text, View,
  Dimensions, Image, TouchableOpacity, SafeAreaView
} from 'react-native';

import Bottom_Tabs from './navigation/TabNavigator';



export default class SettingScreen extends Component {

  width = Dimensions.get('window').width;

  constructor(props) {
    super(props);
    this.state = {



    };
  }

  render() {


    return (
        <View style={{ flex: 1 }}>
          <Bottom_Tabs />
        </View>
     

    );
  }



};


