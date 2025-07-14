
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, useState } from 'react';
import * as Font from 'expo-font';

import {
  ActivityIndicator, FlatList, Text, View, StyleSheet,
  Dimensions, Image, TouchableOpacity, SafeAreaView, Button,
  ScrollView, TextInput, Modal, Animated,
  Pressable
} from 'react-native';

import { SwipeableFlatList } from 'react-native-swipe-list';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Editorf from '../components_admin/customeditor5';
import Count from './count';

import Newsitem_component from '../Marquee';








width = Dimensions.get('window').width;
height = Dimensions.get('window').height;

export default class Setting1 extends Component {





  width = Dimensions.get('window').width;

  constructor(props) {
    super(props);

    this.state = {
      fontsLoaded: false,
      isLoading: false,
      isOpen2: false,
      isOpen3: false,
      isOpen4: false,


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

  async componentDidMount() {
    this.loadusername();
    await Font.loadAsync({
      'dast': require('../assets/fonts/dast.otf'),

    });
    this.setState({ fontsLoaded: true });


  }

  toggleAccordion2 = () => {
    this.setState({ isOpen2: !this.state.isOpen2 });
    this.setState({ isOpen3: false });
    this.setState({ isOpen4: false });
  };

  toggleAccordion3 = () => {
    this.setState({ isOpen3: !this.state.isOpen3 });
    this.setState({ isOpen2: false });
    this.setState({ isOpen4: false });

  };

  toggleAccordion4 = () => {
    this.setState({ isOpen4: !this.state.isOpen4 });
    this.setState({ isOpen3: false });
    this.setState({ isOpen2: false });
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



      const response = await fetch('http://draydinv.ir/extra/userdata.php', {
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


    fetch('http://draydinv.ir/extra/update_user.php', {
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
    const { isOpen2, isOpen3, isOpen4 } = this.state;

    const image = { uri: 'http://legacy.reactjs.org/logo-og.png' };

    if (!this.state.fontsLoaded) {
      return <Text>Loading...</Text>;
    }



    return (


      <View style={{ marginTop: 15, }}>

        <View style={{ width: this.width * 9.5 / 10, borderRadius: 10, marginTop: 20, backgroundColor: '#EEEEEE', elevation: 2, alignSelf: 'center', }}>

          <View style={{ justifyContent: 'space-between', borderBottomWidth: 0, borderBottomColor: 'white', paddingBottom: 0, flexDirection: 'row', }}>
            <View style={{ flexDirection: 'row' }}>

              <Pressable
                onPress={this.toggleAccordion3} >
                <Image resizeMode='contain' source={require('../assets/image/bag.png')} style={{ height: 50, width: 50, borderRadius: 10, backgroundColor: '#ffffff', margin: 5 }} />
              </Pressable>

              <Pressable
                onPress={this.toggleAccordion4} >
                <Image resizeMode='contain' source={require('../assets/image/message.png')} style={{ height: 50, width: 50, borderRadius: 10, backgroundColor: '#ffffff', margin: 5 }} />
              </Pressable>

            </View>

            <View style={{ flexDirection: 'row-reverse', justifyContent: 'center' }}>
              <Text style={{ color: 'grey', fontSize: 14, marginTop: 10, textAlign: 'center', textAlignVertical: 'center', padding: 5, fontFamily: 'dast' }}>سلام دکتر {this.state.name + ' ' + this.state.family + ''} خوش اومدی </Text>
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
                onPress={() => this.props.navigation.navigate('About')}


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
                  onPress={() => this.props.navigation.navigate('About')}

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

          {isOpen3 && (

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              inverted={true}
              style={{ alignSelf: 'center' }}
              contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-between', width: this.width * 9.5 / 10, marginTop: 5, padding: 5 }}

            >



              <View style={{ flexDirection: 'row', borderTopColor: 'white', borderTopWidth: 1 }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('About')}

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


              </View>




            </ScrollView>



          )}

          {isOpen4 && (

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              inverted={true}
              style={{ alignSelf: 'center', }}
              contentContainerStyle={{ flexDirection: 'row', width: this.width * 9.5 / 10, marginTop: 5, backgroundColor: 'transparent', justifyContent: 'space-around' }}

            >



              <View style={{ backgroundColor: 'transparent', flexDirection: 'row', borderTopColor: 'white', borderTopWidth: 1, width: this.width * 9 / 10, }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('About')}

                  style={{
                    elevation: 0,
                    backgroundColor: 'transparent',
                    borderRadius: 8,
                    width: '100%',

                    flexDirection: 'row-reverse',

                    justifyContent: 'center'





                  }}
                >

                  <Image
                    source={require('../assets/image/message1.gif')}
                    resizeMode='contain'
                    style={{ height: 75, width: this.width * 2.5 / 9, }}
                  />
                  <View style={{ backgroundColor: 'transparent', width: this.width * 5.5 / 9, paddingTop: 10 }}>
                    <Text style={{ textAlign: 'right', fontFamily: 'dast', fontSize: 20, color: 'green' }}> سلام</Text>
                    <Text style={{ textAlign: 'right', fontFamily: 'dast', fontSize: 16, marginTop: 5 }}> برای مشاهده پیامها و تیکت هایتان کلیک کنید</Text>
                  </View>



                </TouchableOpacity>


              </View>




            </ScrollView>



          )}


        </View>

        <ScrollView style={{ marginTop: 0 }}>



          {/* <Newsitem_component />
    */}

          {/* <Count />

          <View style={{ alignSelf: 'center', width: this.width * 9 / 10, flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', borderTopLeftRadius: 15, borderTopRightRadius: 15, padding: 10, backgroundColor: 'white' }}>

            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center', position: 'relative', alignItems: 'center', height: 35 }}>
              <Image resizeMode='contain' source={require('../assets/image/cash.png')} style={{ borderRadius: 10, backgroundColor: '#ffffff', }} />

              <View style={{ flexDirection: 'row', }}>
                <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: 'grey', fontSize: 10, fontFamily: 'dast' }}>  تومان</Text>
                <Text style={{ textAlign: 'center', textAlignVertical: 'center', fontWeight: '600', fontSize: 20, fontFamily: 'dast' }}>157000</Text>

              </View>

              <View style={{ position: 'absolute', right: 0, top: 0, bottom: 0, borderRightWidth: 1, borderRightColor: 'grey', borderStyle: 'dotted', height: '100%' }}></View>

            </View>

            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center', position: 'relative', alignItems: 'center', height: 35 }}>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: 'grey', fontSize: 10 }}>  امتیاز</Text>
                <Text style={{ textAlign: 'center', textAlignVertical: 'center', fontWeight: '600', fontSize: 20, fontFamily: 'dast' }}>3560</Text>

              </View>
              <Image resizeMode='contain' source={require('../assets/image/score.png')} style={{ borderRadius: 10, backgroundColor: '#ffffff', }} />

            </View>





          </View>


          <AccordionItem title="Item 1" content="This is the content of item 1" /> */}

          {/* <TextInput style={{ padding: 10, marginTop: 20, alignSelf: 'center', width: width * 4.2 / 5, borderRadius: 10, paddingHorizontal: 10, direction: 'rtl', borderColor: 'purple', borderWidth: 1, textAlign: 'right' }} placeholder=' عبارتی را برای جست وجو وارد کنید' ></TextInput> */}

          {/* <View style={{ flexDirection: 'row-reverse', backgroundColor: 'transparent', marginTop: 30, justifyContent: 'space-around' }}>
            <Image resizeMode='contain' source={require('../assets/image/maingif2.gif')} style={{ width: this.width * 2 / 10, height: 70, backgroundColor: 'white', borderRadius: 15, elevation: 1, shadowColor: '#06d6a0', }} />
            <Image resizeMode='contain' source={require('../assets/image/maingif1.gif')} style={{ width: this.width * 2 / 10, height: 70, backgroundColor: 'white', borderRadius: 15, elevation: 1, shadowColor: '#06d6a0' }} />
            <Image resizeMode='contain' source={require('../assets/image/maingif3.gif')} style={{ width: this.width * 2 / 10, height: 70, backgroundColor: 'white', borderRadius: 15, elevation: 1, shadowColor: '#06d6a0' }} />
            <Image resizeMode='contain' source={require('../assets/image/pharmacy1.gif')} style={{ width: this.width * 2 / 10, height: 70, backgroundColor: 'white', borderRadius: 15, elevation: 1, shadowColor: '#06d6a0' }} />

          </View>


          <View style={{ flexDirection: 'row-reverse', backgroundColor: 'transparent', maxWidth: this.width, marginTop: 20, justifyContent: 'space-around' }}>
            <Image resizeMode='contain' source={require('../assets/image/lab.gif')} style={{ width: this.width * 2 / 10, height: 70, backgroundColor: 'white', borderRadius: 15, elevation: 1, shadowColor: '#06d6a0' }} />
            <Image resizeMode='contain' source={require('../assets/image/hearticon1.gif')} style={{ width: this.width * 2 / 10, height: 70, backgroundColor: 'white', borderRadius: 15, elevation: 1, shadowColor: '#06d6a0' }} />
            <Image resizeMode='contain' source={require('../assets/image/xray.gif')} style={{ width: this.width * 2 / 10, height: 70, backgroundColor: 'white', borderRadius: 15, elevation: 1, shadowColor: '#06d6a0' }} />
            <Image resizeMode='contain' source={require('../assets/image/maingif4.gif')} style={{ width: this.width * 2 / 10, height: 70, backgroundColor: 'white', borderRadius: 15, elevation: 1, shadowColor: '#06d6a0' }} />

          </View> */}




          {/* <Text style={{ fontWeight: '900', color: '#06d6a0', textAlign: 'center', marginTop: 10, padding: 10, borderTopLeftRadius: 5, borderTopRightRadius: 5, width: this.width * 4 / 5, alignSelf: 'center', borderBottomColor: '#06d6a0', borderBottomWidth: 2 }}></Text> */}




          <View style={{ flexDirection: 'column', alignSelf: 'center', backgroundColor: 'transparent', marginTop: 30, marginBottom: 170 }}>
            <Image resizeMode='contain' source={require('../assets/image/doctorgif.gif')} style={{ width: this.width * 8 / 10, height: 180, backgroundColor: 'transparent', borderRadius: 15 }} />


          </View>

        </ScrollView>

      </View>
    );
  }



};

class AccordionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleAccordion = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { title, content } = this.props;
    const { isOpen } = this.state;

    return (
      <View style={styles.accordionItem}>
        <TouchableOpacity onPress={this.toggleAccordion} style={styles.accordionHeader}>
          <Image resizeMode='contain' source={require('../assets/image/down.png')} style={{ borderRadius: 10, width: 10, height: 10, alignSelf: 'center' }} />
        </TouchableOpacity>
        {isOpen && (

          <View style={{ flexDirection: 'column' }}>
            <View title="اضافه کردن فصل جدید" style={{ flexDirection: 'row', width: width * 4 / 5, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'transparent', borderRadius: 10, margin: 15 }} >
              <Text style={{ textAlign: 'center', textAlignVertical: 'bottom', marginRight: 15, fontSize: 20, fontFamily: 'dast' }}>تومان</Text>

              <TextInput style={{ borderBottomWidth: 1, borderBottomColor: 'white', borderRadius: 4, padding: 4, width: width * 3.5 / 5, fontSize: 16, fontFamily: 'dast' }} placeholder='مبلغ مورد نظر را وارد کنید'></TextInput>

            </View>

            <TouchableOpacity title="اضافه کردن نسخه جدید" onPress={this.handleaddfasl} style={{ width: width * 4 / 5, justifyContent: 'center', alignSelf: 'center', backgroundColor: '#06d6a0', borderRadius: 10, padding: 15 }} >

              <Text style={{ textAlign: 'center', color: 'white', fontWeight: '600', fontSize: 20, fontFamily: 'dast' }}>افزایش اعتبار</Text>

            </TouchableOpacity>

            <Text style={{ color: 'grey', fontSize: 20, fontFamily: 'dast', textAlign: 'right', marginRight: 20, marginTop: 10 }}>تاریخچه واریز وجه :</Text>

            <View style={{ flexDirection: 'row-reverse', marginVertical: 8, justifyContent: 'space-around' }}>
              <View style={{ flexDirection: 'row-reverse', marginVertical: 8 }}>
                <Image resizeMode='contain' source={require('../assets/image/done.png')} style={{ borderRadius: 10, width: 20, height: 20, alignSelf: 'center' }} />
                <Text style={{ color: 'grey', fontSize: 12, marginRight: 4, textAlignVertical: 'center', fontSize: 20, fontFamily: 'dast' }}> 200000 تومان</Text>
              </View>
              <Text style={{ color: 'grey', fontSize: 12, marginRight: 4, textAlignVertical: 'center', fontSize: 20, fontFamily: 'dast' }}>1403 / 08 /01</Text>
            </View>

          </View>






        )}
      </View>
    );
  }
}






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
    width: Dimensions.get('window').width * 9 / 10,
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