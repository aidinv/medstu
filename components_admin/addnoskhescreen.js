import React, { Component, useState } from 'react';

import {
    FlatList, Text, View, TextInput,
    Dimensions, Image, TouchableOpacity, SafeAreaView
} from 'react-native';


export default class Addnoskhescreen extends Component {


    width = Dimensions.get('window').width;

    constructor(props) {
        super(props);
        this.state = {

            cours: this.props.route.params.cours,

            cours1: this.props.route.params.cours1,
            name_fa: '',
            name_en: '',

            showtext: false,
            showtext1: false,
            showtext2: false,




        };


    }


    handleaddfasl = () => {
        const { cours1, name_fa, name_en } = this.state;


        fetch('http://draydinv.ir/extra/addnoskhe.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cours_en: cours1,
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
                            <Text style={{ fontWeight: '900', color: '#D20062', textAlign: 'center',}}> اضافه کردن نسخه جدید</Text>
                            <Text style={{ fontWeight: '900', color: '#D20062', textAlign: 'center', marginHorizontal: 3 }}> |  {this.state.cours} </Text>
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
                        <Text style={{ fontWeight: '900', color: 'grey', textAlign:'center',justifyContent:'center',alignSelf:'center' }}> اطلاعات نسخه جدید را وارد کنید</Text>
                    </View>


                    <TextInput
                        placeholder="نام فارسی نسخه جدید را بنویسید"
                        value={this.state.name_fa}
                        onChangeText={(text) => this.setState({ name_fa: text })}
                        style={{ alignSelf: 'center', height: 60, borderColor: 'purple', borderWidth: 1, borderRadius: 5, width: width * 4.5 / 5, marginBottom: 20, padding: 5 }}
                    />
                    <TextInput
                        placeholder="نام انگلیسی نسخه جدید را بنویسید"
                        value={this.state.name_en}
                        onChangeText={(text) => this.setState({ name_en: text })}
                        style={{ alignSelf: 'center', height: 60, borderColor: 'purple', borderWidth: 1, borderRadius: 5, width: width * 4.5 / 5, marginBottom: 20, padding: 5 }}
                    />



                    <TouchableOpacity title="اضافه کردن نسخه جدید" onPress={this.handleaddfasl} style={{ width: width * 4.5 / 5, justifyContent: 'center', alignSelf: 'center', backgroundColor: '#06d6a0', height: height / 13, borderRadius: 10 }} >

                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن نسخه جدید</Text>

                    </TouchableOpacity>



                {this.state.showtext1 && <Text style={{ textAlign: 'center', color: 'green', fontWeight: '900', marginTop: 10 }}>
                    نسخه مورد نظر با موفقیت اضافه شد
                </Text>}
                {this.state.showtext2 && <Text style={{ textAlign: 'center', color: 'red', fontWeight: '900', marginTop: 10 }}>
                    خطا در اضافه کردن نسخه جدید
                </Text>}


            </View>


        );
    }



};


