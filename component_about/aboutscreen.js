
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, useState } from 'react';

import {
  ActivityIndicator, FlatList, Text, View, StyleSheet,
  Dimensions, Image, TouchableOpacity, SafeAreaView, Button,
  ScrollView, TextInput, Modal, Animated,
  Pressable
} from 'react-native';

import { SwipeableFlatList } from 'react-native-swipe-list';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Newsitem_component from '../Marquee';




export default class Aboutscreen extends Component {




  constructor(props) {
    super(props);

    this.state = {

      isLoading: false,
      isOpen2: false,


      name: '',
      family: '',
      phone: '',
      email: '',
      username: '',
      password: '',
      university: '',
      age: '',
      degree: '',
      showtext1: false,
      showtext2: false,
      showtext: false,
    };
    this.timeouthandle = null;
    this.timeouthandle1 = null;
  }

  componentDidMount() {
    this.loadusername();
  }

  toggleAccordion2 = () => {
    this.setState({ isOpen2: !this.state.isOpen2 });
  };


  // getusername = async () => {
  //   try {
  //     const storedusername = await
  //       AsyncStorage.getItem('username')
  //     return storedusername;
  //   } catch (error) {
  //     console.error('error', error);
  //     return null;
  //   }
  // }

  async loadusername() {
    try {
      const username1 = await AsyncStorage.getItem('username');



      const response = await fetch('https://draydinv.ir/extra/userdata.php', {
        method: 'POST',
        headers: {

          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username1 }),
      });
      const jsonresponse = await response.json();
      this.setState({ username: jsonresponse[0].username });
      this.setState({ name: jsonresponse[0].name });
      this.setState({ family: jsonresponse[0].family });
      this.setState({ password: jsonresponse[0].password });
      this.setState({ university: jsonresponse[0].university });
      this.setState({ age: jsonresponse[0].year });
      this.setState({ phone: jsonresponse[0].phone });
      this.setState({ email: jsonresponse[0].email });
      this.setState({ degree: jsonresponse[0].degree });




    } catch (error) {
      console.error(error)
    }
  }



  handleupdate = () => {
    const { username, password, phone, name, family, university, age, email, degree } = this.state;


    fetch('https://draydinv.ir/extra/update_user.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username1: username,
        password1: password,
        phone1: phone,
        name1: name,
        family1: family,
        university1: university,
        age1: age,
        email1: email,
        degree1: degree,
      })
    })

      .then(() => {

        this.setState({ showtext1: true }, () => {
          this.timeouthandle1 = setTimeout(() => {
            this.setState({ showtext1: false })
          }, 5000);

        })

      }
      )
      .catch((error) => {
        console.error(error);
      });
  };



  render() {
    const { isLoading, } = this.state;
    const { isOpen2 } = this.state;
    

    const image = { uri: 'http://legacy.reactjs.org/logo-og.png' };

    return (


      <View style={{ marginTop: 30,flex:1,justifyContent:'center',alignSelf:'center'}}>
<Text style={{fontWeight:'900'}}>برنامه نویس : دکتر آیدین ودادی</Text>
       </View>
    );
  }



};







