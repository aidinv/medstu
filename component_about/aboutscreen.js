
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



width = Dimensions.get('window').width;
height = Dimensions.get('window').height;

export default class Aboutscreen extends Component {



  width = Dimensions.get('window').width;

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


      <View style={{ marginTop: 30,}}>

        <View style={{ width: this.width * 9.5 / 10, borderRadius: 10, marginTop: 20, backgroundColor: '#EEEEEE', elevation: 2, alignSelf: 'center', }}>

          <View style={{ justifyContent: 'space-between', borderBottomWidth: 0, borderBottomColor: 'white', paddingBottom: 0, flexDirection: 'row', }}>
            <View style={{ flexDirection: 'row' }}>
              <Image resizeMode='contain' source={require('../assets/image/bag.png')} style={{ height: 50, width: 50, borderRadius: 10, backgroundColor: '#ffffff', margin: 5 }} />
              <Image resizeMode='contain' source={require('../assets/image/message.png')} style={{ height: 50, width: 50, borderRadius: 10, backgroundColor: '#ffffff', margin: 5 }} />

            </View>

            <View style={{ flexDirection: 'row-reverse', justifyContent: 'center' }}>
              <Text style={{ color: 'grey', fontWeight: '900', fontStyle: 'italic', marginTop: 10, textAlign: 'center', textAlignVertical: 'center', padding: 5 }}>سلام دکتر {this.state.name + ' ' + this.state.family + ''} خوش اومدی </Text>
              <Image resizeMode='contain' source={require('../assets/image/like.png')} style={{ borderRadius: 10, width: 20, alignSelf: 'center' }} />
            </View>


            <Pressable
              onPress={this.toggleAccordion2} >

              <Image resizeMode='contain' source={require('../assets/image/dot2.png')} style={{ height: 50, width: 50, borderRadius: 10, backgroundColor: '#ffffff', margin: 5 }} />

            </Pressable>



          </View>

          {isOpen2 && (

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              inverted={true}
              style={{ alignSelf: 'center' }}
              contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-between', width: this.width * 9.5 / 10, marginTop: 5, padding: 5 }}
            >

              <TouchableOpacity


                style={{
                  elevation: 0,
                  backgroundColor: 'transparent',
                  borderRadius: 8,
                  width: width * 9 / 77,
                  marginHorizontal: width / 77,
                  padding: 8,

                }}
              >
                <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                  <Image
                    source={require('../assets/image/logout.png')}
                    resizeMode='contain'
                  />
                </View>


              </TouchableOpacity>

              <View style={{ flexDirection: 'row', borderTopColor: 'white', borderTopWidth: 1 }}>
                <TouchableOpacity


                  style={{
                    elevation: 0,
                    backgroundColor: 'transparent',
                    borderRadius: 8,
                    width: width * 9 / 77,
                    marginHorizontal: width / 77,
                    padding: 8,

                  }}
                >
                  <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                    <Image
                      source={require('../assets/image/about.png')}
                      resizeMode='contain'
                    />
                  </View>


                </TouchableOpacity>

                <TouchableOpacity


                  style={{
                    elevation: 0,
                    backgroundColor: 'transparent',
                    borderRadius: 8,
                    width: width * 9 / 77,
                    marginHorizontal: width / 77,
                    padding: 8,

                  }}
                >
                  <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                    <Image
                      source={require('../assets/image/instagram.png')}
                      resizeMode='contain'
                    />
                  </View>


                </TouchableOpacity>

                <TouchableOpacity


                  style={{
                    elevation: 0,
                    backgroundColor: 'transparent',
                    borderRadius: 8,
                    width: width * 9 / 77,
                    marginHorizontal: width / 77,
                    padding: 8,

                  }}
                >
                  <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                    <Image
                      source={require('../assets/image/telegram1.png')}
                      resizeMode='contain'
                    />
                  </View>


                </TouchableOpacity>



                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('User')}

                  style={{
                    elevation: 0,
                    backgroundColor: 'transparent',
                    borderRadius: 8,
                    width: width * 9 / 77,
                    marginHorizontal: width / 77,
                    padding: 8,

                  }}
                >
                  <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                    <Image
                      source={require('../assets/image/user.png')}
                      resizeMode='contain'
                    />
                  </View>


                </TouchableOpacity>
              </View>




            </ScrollView>



          )}
        </View>


        <ScrollView style={{ marginTop: 20 }}>

          <Text style={{ fontWeight: '900', color: '#7ebc89', textAlign: 'center', marginTop: 10, padding: 10, borderTopLeftRadius: 5, borderTopRightRadius: 5, width: this.width * 4 / 5, alignSelf: 'center', borderBottomColor: '#7ebc89', borderBottomWidth: 2 }}>درباره ما</Text>


          <View style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>

            <Text style={{ fontWeight: '900', color: '#7ebc89', textAlign: 'center', marginHorizontal: 20, marginTop: 10, padding: 10, }}>
              سلام دکتر !
              ما جمعی از فارغ التحصیلان و دانشجویان پزشکی دانشگاه علوم پزشکی اردبیل هستیم که تصمیم گرفتیم برای آمادگی طرح ودوران پزشکی عمومی وطبابت نسخه ها و مطالبی که فکرمیکنیم در درمانگاه و اورژانس ها به دردمون میخوره رو جمع کنیم
            </Text>

          </View>

          <Image
            source={require('../assets/image/graduate.png')}
            style={{ width: 80, height: 80, tintColor: '#7ebc89', marginBottom: 10, alignSelf: 'center' }}
          />

          <Text style={{ fontWeight: '900', color: '#7ebc89', textAlign: 'center', marginHorizontal: 20, marginTop: 0, padding: 10, }}>
            اعضای تیم ما :
          </Text>

          <View style={{ flexDirection: 'row-reverse', width: this.width * 4.5 / 5, alignSelf: 'center', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row-reverse', alignSelf: 'center', }}>
              <Image
                source={require('../assets/image/teacher.png')}
                style={{ width: 35, tintColor: '#7ebc89', height: 35, marginBottom: 10, alignSelf: 'center' }}
              />
              <Text style={{ textAlign: 'center', color: '#7ebc89', fontWeight: '900', alignSelf: 'center', marginHorizontal: 10 }}>دکتر آیدین ودادی</Text>

            </View>
            <View style={{ flexDirection: 'row-reverse', alignSelf: 'center', marginTop: 5 }}>
              <Image
                source={require('../assets/image/teacher.png')}
                style={{ width: 35, tintColor: '#7ebc89', height: 35, marginBottom: 10, alignSelf: 'center' }}
              />
              <Text style={{ textAlign: 'center', color: '#7ebc89', fontWeight: '900', alignSelf: 'center', marginHorizontal: 10 }}>دکتر مریم احمد زاده</Text>

            </View>
          </View>

          <View style={{ flexDirection: 'row-reverse', width: this.width * 4.5 / 5, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row-reverse', alignSelf: 'center', }}>
              <Image
                source={require('../assets/image/teacher.png')}
                style={{ width: 35, tintColor: '#7ebc89', height: 35, marginBottom: 10, alignSelf: 'center' }}
              />
              <Text style={{ textAlign: 'center', color: '#7ebc89', fontWeight: '900', alignSelf: 'center', marginHorizontal: 10 }}>دکتر نیما عطایی</Text>

            </View>
            <View style={{ flexDirection: 'row-reverse', alignSelf: 'center', marginTop: 5 }}>
              <Image
                source={require('../assets/image/teacher.png')}
                style={{ width: 35, tintColor: '#7ebc89', height: 35, marginBottom: 10, alignSelf: 'center' }}
              />
              <Text style={{ textAlign: 'center', color: '#7ebc89', fontWeight: '900', alignSelf: 'center', marginHorizontal: 10 }}>دکتر مریم  یوسفی</Text>

            </View>

          </View>


          <Text style={{ fontWeight: '900', color: '#470024', textAlign: 'center', marginBottom: 10, marginTop: 10, padding: 10, borderTopLeftRadius: 5, borderTopRightRadius: 5, width: this.width * 4 / 5, alignSelf: 'center', borderBottomColor: '#470024', borderBottomWidth: 2 }}> راه های ارتباطی </Text>


          <View style={{ flexDirection: 'column', width: this.width * 4.5 / 5, alignSelf: 'flex-start', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginHorizontal: 20 }}>
              <Image
                source={require('../assets/image/email.png')}
                style={{ width: 50, height: 50, marginBottom: 10, alignSelf: 'center' }}
              />
              <Text style={{ textAlign: 'center', color: '#470024', fontWeight: '900', alignSelf: 'center', marginHorizontal: 10 }}>EMAIL : admin@draydinv.ir</Text>

            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginTop: 5, marginHorizontal: 20 }}>
              <Image
                source={require('../assets/image/phone.png')}
                style={{ width: 50, height: 50, marginBottom: 10, alignSelf: 'center' }}
              />
              <Text style={{ textAlign: 'center', color: '#470024', fontWeight: '900', alignSelf: 'center', marginHorizontal: 10 }}>PHONE : 09027535716</Text>

            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginTop: 5, marginHorizontal: 20 }}>
              <Image
                source={require('../assets/image/telegram.png')}
                style={{ width: 50, height: 50, marginBottom: 10, alignSelf: 'center' }}
              />
              <Text style={{ textAlign: 'center', color: '#470024', fontWeight: '900', alignSelf: 'center', marginHorizontal: 10 }}>TELEGRAM : @draydinvedadi</Text>

            </View>
          </View>

          <Text style={{ fontWeight: '900', color: '#646165', textAlign: 'center', marginHorizontal: 20, marginTop: 0, padding: 10, }}>
            از همراهی شما سپاسگزاریم
            - تیم برنامه نویسی DOCTOR
          </Text>


          <Text style={{ fontWeight: '900', color: '#646165', textAlign: 'center', marginHorizontal: 20, marginTop: 0, padding: 10,paddingBottom:250 }}>
            version 1.0.8
          </Text>
        </ScrollView>

      </View>
    );
  }



};








const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    marginTop: 5,
    marginBottom: 10,

    marginHorizontal: 10
  },
  container1: {
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  accordionItem: {
    marginBottom: 3,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff',
    width: this.width * 9 / 10,
    alignSelf: 'center'
  },
  accordionHeader: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  accordionContent: {
    padding: 10,
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
    marginHorizontal: 0,
    color: '#2B4865',
    backgroundColor: '#F5F8FA',
    padding: 10,
    borderRadius: 5,

  },
  item: {
    flexDirection: 'row-reverse',
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    elevation: 4,
    borderRadius: 8,
    alignItems: 'center',
    borderRightWidth: 2,
    borderRightColor: '#FFCDEA',
    borderLeftWidth: 2,
    borderLeftColor: '#FFCDEA'


  },
  text1: {
    fontSize: 15,
    marginRight: 15,
    fontWeight: '600',
    textAlign: 'center'

  },
  text2: {
    fontSize: 15,
    marginRight: 15,
    fontWeight: '400',
    textAlign: 'center'

  },
  rightAction1: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 12,
    marginHorizontal: 5,
    elevation: 10,

  },
  actionText: {
    color: 'black',
    fontWeight: '700',
    padding: 20
  },


});