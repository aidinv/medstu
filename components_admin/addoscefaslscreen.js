import React, { Component, useState } from 'react';

import {
    FlatList, Text, View, TextInput,
    Dimensions, Image, TouchableOpacity, SafeAreaView
} from 'react-native';


export default class Addoscefaslscreen extends Component {


    width = Dimensions.get('window').width;

    constructor(props) {
        super(props);
        this.state = {

            cat_fa: this.props.route.params.cat_fa,
            name_fa: '',
            name_en: '',
         
            showtext: false,
            showtext1: false,
            showtext2: false,




        };


    }


    handleaddfasl = () => {
        const { cat_fa, name_fa, name_en,  } = this.state;


        fetch('http://draydinv.ir/extra/addoscefasl.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cat_fa: cat_fa,
                name_fa: name_fa,
                name_en: name_en,
        
            })
        })
            .then(response => response.json())
            .then(async (data) => {
                if (data.success == true) {
                  

                } else {
              
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    render() {



        return (
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 60}}>
                


                    <View style={{ flexDirection: 'row-reverse', marginBottom: 10, justifyContent: 'space-around',width:this.width*5/5,alignSelf:'center' }}>
                        <View style={{ flexDirection: 'row-reverse',alignSelf:'center' }}>
                            <Text style={{ fontWeight: '900', color: '#D20062', textAlign: 'center',}}> اضافه کردن فصل جدید به</Text>
                            <Text style={{ fontWeight: '900', color: '#D20062', textAlign: 'center', marginHorizontal: 3 }}> {this.state.cat_fa} </Text>
                        </View>
                        <TouchableOpacity title="برگشت" onPress={()=>this.props.navigation.navigate('Admin')} style={{ width: width * 0.75 / 5, justifyContent: 'center', backgroundColor: 'transparent', height: height / 20, borderRadius: 10,alignItems:'center',alignSelf:'flex-start'}} >
                            <Image
                                source={require('../assets/icons/back.png')}
                                resizeMode='contain'
                            />

                        </TouchableOpacity>
                    </View>


                    <View style={{ flexDirection: 'row-reverse', marginBottom: 10,width:this.width*4.5/5,alignSelf:'center' }}>
                        <Image
                            source={require('../assets/image/notice.png')}
                            resizeMode='contain'
                        />
                        <Text style={{ fontWeight: '900', color: 'grey', textAlign:'center',justifyContent:'center',alignSelf:'center' }}> اطلاعات فصل جدید را وارد کنید</Text>
                    </View>


                    <TextInput
                        placeholder="نام فارسی فصل جدید را بنویسید"
                        value={this.state.name_fa}
                        onChangeText={(text) => this.setState({ name_fa: text })}
                        style={{ alignSelf: 'center', height: 60, borderColor: 'purple', borderWidth: 1, borderRadius: 5, width: width * 4.5 / 5, marginBottom: 20, padding: 5 }}
                    />
                    <TextInput
                        placeholder="نام انگلیسی فصل جدید را بنویسید"
                        value={this.state.name_en}
                        onChangeText={(text) => this.setState({ name_en: text })}
                        style={{ alignSelf: 'center', height: 60, borderColor: 'purple', borderWidth: 1, borderRadius: 5, width: width * 4.5 / 5, marginBottom: 20, padding: 5 }}
                    />



                 

                    <TouchableOpacity title="اضافه کردن فصل جدید" onPress={this.handleaddfasl} style={{ width: width * 4.5 / 5, justifyContent: 'center', alignSelf: 'center', backgroundColor: '#06d6a0', height: height / 13, borderRadius: 10 }} >

                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن فصل جدید</Text>

                    </TouchableOpacity>



                {this.state.showtext1 && <Text style={{ textAlign: 'center', color: 'green', fontWeight: '900', marginTop: 10 }}>
                    فصل مورد نظر با موفقیت اضافه شد
                </Text>}
                {this.state.showtext2 && <Text style={{ textAlign: 'center', color: 'red', fontWeight: '900', marginTop: 10 }}>
                    خطا در اضافه کردن فصل جدید
                </Text>}


            </View>


        );
    }



};


