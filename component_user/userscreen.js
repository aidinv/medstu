
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

export default class Userscreen extends Component {



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


      <View style={{ marginTop: 30 }}>

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


        

          <View style={{ alignSelf: 'center', width: this.width * 9 / 10, flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', borderTopLeftRadius: 15, borderTopRightRadius: 15, padding: 10, backgroundColor: 'white' }}>

            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center', position: 'relative', alignItems: 'center', height: 35 }}>
              <Image resizeMode='contain' source={require('../assets/image/cash.png')} style={{ borderRadius: 10, backgroundColor: '#ffffff', }} />

              <View style={{ flexDirection: 'row', }}>
                <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: 'grey', fontSize: 10 }}>  تومان</Text>
                <Text style={{ textAlign: 'center', textAlignVertical: 'center', fontWeight: '900', fontSize: 16 }}>157000</Text>

              </View>

              <View style={{ position: 'absolute', right: 0, top: 0, bottom: 0, borderRightWidth: 1, borderRightColor: 'grey', borderStyle: 'dotted', height: '100%' }}></View>

            </View>

            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center', position: 'relative', alignItems: 'center', height: 35 }}>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: 'grey', fontSize: 10 }}>  امتیاز</Text>
                <Text style={{ textAlign: 'center', textAlignVertical: 'center', fontWeight: '900', fontSize: 16 }}>3560</Text>

              </View>
              <Image resizeMode='contain' source={require('../assets/image/score.png')} style={{ borderRadius: 10, backgroundColor: '#ffffff', }} />

            </View>





          </View>


          <AccordionItem title="Item 1" content="This is the content of item 1" />



          {isLoading ?
            <View style={{ alignSelf: 'center', justifyContent: 'center', flex: 1 }}>
              <ActivityIndicator size={'large'} color={'#E59BE9'} />
              <Text>دریافت اطلاعات کاربری</Text>
            </View>
            : (
              <ScrollView>
                <Text style={{ fontWeight: '900', color: '#e54069', textAlign: 'center', marginTop: 10, padding: 10, borderTopLeftRadius: 5, borderTopRightRadius: 5, width: this.width * 4 / 5, alignSelf: 'center', borderBottomColor: '#e54069', borderBottomWidth: 2 }}>اطلاعات کاربری شما</Text>
                <Text style={{ fontWeight: '900', color: '#e54069', textAlign: 'center', marginTop: 10, padding: 10, borderTopLeftRadius: 5, borderTopRightRadius: 5, width: this.width * 4 / 5, alignSelf: 'center', }}>سطح کاربری  :  {this.state.degree}</Text>

                {this.state.degree == 'رئیس' ? (
                  <TouchableOpacity title="ورود" onPress={() => this.props.navigation.navigate('Admin')} style={{ margin: 10, alignSelf: 'center', width: width * 4.5 / 5, justifyContent: 'center', backgroundColor: '#06d6a0', height: height / 15, borderRadius: 10 }} >

                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', color: 'white' }}> ورود به پنل مدیریت</Text>

                  </TouchableOpacity>
                ) : (
                  <Text></Text>
                )}

                <View style={{ flexDirection: 'row-reverse', marginTop: 5, alignSelf: 'center', width: this.width * 4.5 / 5 }}>
                  <Text style={{ fontWeight: '900', color: 'grey', textAlign: 'right', marginTop: 0, padding: 10, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderBottomColor: 'grey', borderBottomWidth: 2, flex: 1 }}>نام : {this.state.name}</Text>
                  <Text style={{ fontWeight: '900', color: 'grey', textAlign: 'right', marginTop: 0, padding: 10, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderBottomColor: 'grey', borderBottomWidth: 2, flex: 1 }}>نام خانوادگی : {this.state.family}</Text>
                </View>

                <View style={{ backgroundColor: 'transparent', flexDirection: 'row-reverse', justifyContent: 'space-around', margin: 5, alignSelf: 'center', width: this.width }}>
                  <TextInput
                    placeholder="نام"
                    onChangeText={(text) => this.setState({ name: text })}
                    style={{ height: 50, borderColor: '#e54069', borderWidth: 1, borderRadius: 5, padding: 5, width: this.width * 2 / 5 }}
                  />
                  <TextInput
                    placeholder="نام خانوادگی"
                    onChangeText={(text) => this.setState({ family: text })}
                    style={{ height: 50, borderColor: '#e54069', borderWidth: 1, borderRadius: 5, padding: 5, width: this.width * 2 / 5 }}
                  />
                </View>

                <View style={{ flexDirection: 'row-reverse', marginTop: 5, alignSelf: 'center', width: this.width * 4.5 / 5 }}>
                  <Text style={{ fontWeight: '900', color: 'grey', textAlign: 'right', marginTop: 0, padding: 10, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderBottomColor: 'grey', borderBottomWidth: 2, flex: 1 }}>شماره تلفن : {this.state.phone}</Text>
                  <Text style={{ fontWeight: '900', color: 'grey', textAlign: 'right', marginTop: 0, padding: 10, borderTopLeftRadius: 5, borderTopRightRadius: 5, alignSelf: 'center', borderBottomColor: 'grey', borderBottomWidth: 2, flex: 1 }}>ایمیل : {this.state.email}</Text>
                </View>

                <View style={{ backgroundColor: 'transparent', flexDirection: 'row-reverse', justifyContent: 'space-around', margin: 5, alignSelf: 'center', width: this.width }}>
                  <TextInput
                    placeholder="ایمیل"

                    onChangeText={(text) => this.setState({ email: text })}
                    style={{ height: 50, borderColor: '#e54069', borderWidth: 1, borderRadius: 5, padding: 5, width: this.width * 2 / 5 }}
                  />
                  <TextInput
                    placeholder="شماره تلفن"

                    onChangeText={(text) => this.setState({ phone: text })}
                    style={{ height: 50, borderColor: '#e54069', borderWidth: 1, borderRadius: 5, padding: 5, width: this.width * 2 / 5 }}
                  />
                </View>

                <View style={{ flexDirection: 'row-reverse', marginTop: 5, alignSelf: 'center', width: this.width * 4.5 / 5 }}>
                  <Text style={{ fontWeight: '900', color: 'grey', textAlign: 'right', marginTop: 0, padding: 10, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderBottomColor: 'grey', borderBottomWidth: 2, flex: 1 }}>نام کاربری  : {this.state.username}</Text>
                  <Text style={{ fontWeight: '900', color: 'grey', textAlign: 'right', marginTop: 0, padding: 10, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderBottomColor: 'grey', borderBottomWidth: 2, flex: 1 }}>رمز عبور : {this.state.password}</Text>
                </View>
                <View style={{ backgroundColor: 'transparent', flexDirection: 'row-reverse', justifyContent: 'space-around', margin: 5, alignSelf: 'center', width: this.width }}>
                  <TextInput
                    placeholder="نام کاربری"
                    editable={false}

                    onChangeText={(text) => this.setState({ username: text })}
                    style={{ height: 50, borderColor: '#e54069', borderWidth: 1, borderRadius: 5, padding: 5, width: this.width * 2 / 5 }}
                  />
                  <TextInput
                    placeholder=" رمز عبور"

                    onChangeText={(text) => this.setState({ password: text })}
                    style={{ height: 50, borderColor: '#e54069', borderWidth: 1, borderRadius: 5, padding: 5, width: this.width * 2 / 5 }}
                  />
                </View>

                <View style={{ flexDirection: 'row-reverse', marginTop: 5, alignSelf: 'center', width: this.width * 4.5 / 5 }}>
                  <Text style={{ fontWeight: '900', color: 'grey', textAlign: 'right', marginTop: 0, padding: 10, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderBottomColor: 'grey', borderBottomWidth: 2, flex: 1 }}> دانشگاه: {this.state.university}</Text>
                  <Text style={{ fontWeight: '900', color: 'grey', textAlign: 'right', marginTop: 0, padding: 10, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderBottomColor: 'grey', borderBottomWidth: 2, flex: 1 }}>سن : {this.state.age}</Text>
                </View>
                <View style={{ backgroundColor: 'transparent', flexDirection: 'row-reverse', justifyContent: 'space-around', margin: 5, alignSelf: 'center', width: this.width }}>
                  <TextInput
                    placeholder="دانشگاه"

                    onChangeText={(text) => this.setState({ university: text })}
                    style={{ height: 50, borderColor: '#e54069', borderWidth: 1, borderRadius: 5, padding: 5, width: this.width * 2 / 5 }}
                  />
                  <TextInput
                    placeholder="سن"

                    onChangeText={(text) => this.setState({ age: text })}
                    style={{ height: 50, borderColor: '#e54069', borderWidth: 1, borderRadius: 5, padding: 5, width: this.width * 2 / 5 }}
                  />
                </View>

                <TouchableOpacity title="ورود" onPress={this.handleupdate} style={{ margin: 10, alignSelf: 'center', width: width * 4.5 / 5, justifyContent: 'center', backgroundColor: '#e54069', height: height / 15, borderRadius: 10 ,marginBottom:250}} >

                  <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', color: 'white' }}>به روز رسانی اطلاعات کاربری</Text>

                </TouchableOpacity>

                {this.state.showtext1 && <Text style={{ textAlign: 'center', color: 'green', fontWeight: '900', marginTop: 10 }}> اطلاعات شما با موفقیت بروز رسانی شد</Text>}
                {this.state.showtext2 && <Text style={{ textAlign: 'center', color: 'red', fontWeight: '900', marginTop: 10 }}>متاسفانه اطلاعات شما بروزرسانی نشد  ...</Text>}





              </ScrollView>
            )}


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
              <Text style={{ textAlign: 'center', textAlignVertical: 'bottom', marginRight: 15 }}>تومان</Text>

              <TextInput style={{ borderBottomWidth: 1, borderBottomColor: 'white', borderRadius: 4, padding: 4, width: width * 3.5 / 5, }} placeholder='مبلغ مورد نظر را وارد کنید'></TextInput>

            </View>

            <TouchableOpacity title="اضافه کردن نسخه جدید" onPress={this.handleaddfasl} style={{ width: width * 4 / 5, justifyContent: 'center', alignSelf: 'center', backgroundColor: '#06d6a0', borderRadius: 10, padding: 15 }} >

              <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>افزایش اعتبار</Text>

            </TouchableOpacity>

            <Text style={{ color: 'grey', fontSize: 12, marginRight: 20, marginTop: 10 }}>تاریخچه واریز وجه :</Text>

            <View style={{ flexDirection: 'row-reverse', marginVertical: 8, justifyContent: 'space-around' }}>
              <View style={{ flexDirection: 'row-reverse', marginVertical: 8 }}>
                <Image resizeMode='contain' source={require('../assets/image/done.png')} style={{ borderRadius: 10, width: 20, height: 20, alignSelf: 'center' }} />
                <Text style={{ color: 'grey', fontSize: 12, marginRight: 4, textAlignVertical: 'center' }}> 200000 تومان</Text>
              </View>
              <Text style={{ color: 'grey', fontSize: 12, marginRight: 4, textAlignVertical: 'center' }}>1403 / 08 /01</Text>
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