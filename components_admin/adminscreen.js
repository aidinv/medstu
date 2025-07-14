import React, { useEffect, useState } from 'react';
import { View, Flatlist, Text, SafeAreaView, Dimensions, TouchableOpacity, ImageBackground, TextInput, Image, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Customswich_component from '../Customswich';


import Customswich_component6 from '../Customswich6';
import Admin_cours from './admin_cours';
import Users from './users';
import Admin_noskhe from './admin_noskhe';
import Admin_diagnose from './admin_diagnose';
import Admin_osce from './admin_osce';


import { ScrollView } from 'react-native-virtualized-view';
import Carouseledit from './carouseledit';




export default function Adminscreen({ navigation }) {


    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;
    const [gamestaba, setgamestaba] = React.useState(1);
    const [active, setactive] = React.useState(null);
    const [username, setusername] = React.useState(null);
    const [name, setname] = React.useState(null);
    const [family, setfamily] = React.useState(null);

    const onselectswicha = (value) => {
        setgamestaba(value);
    }


    useEffect(() => {
        const loadusername = async () => {

            try {
                const storedusername = await
                    AsyncStorage.getItem('username')
                if (storedusername) {
                    setusername(storedusername);
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
                        setactive(jsonresponse[0].degree)
                        setname(jsonresponse[0].name)
                        setfamily(jsonresponse[0].family)




                    } catch (error) {
                        console.error(error)
                    }
                }
            } catch (error) {
                console.error('erroe', error);
            }
        }
        loadusername();
    }, []);






    return (

        <View style={{ flex: 1 }}>


            <View style={{ flexDirection: 'row', marginHorizontal: 15, justifyContent: 'space-between', marginTop: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../assets/image/hearticon1.gif')} style={{ width: 40, height: 30, justifyContent: 'center', marginStart: 20, }} />
                    <Text style={{ color: '#06d6a0', justifyContent: 'center', textAlign: 'center', alignSelf: 'center', fontWeight: '900', marginHorizontal: 10 }}>DOCTOR</Text>
                </View>
                <View style={{ flexDirection: 'row-reverse', alignSelf: 'center' }}>
                    <Image
                        source={require('../assets/image/teacher.png')}
                        style={{ width: 30, height: 30, tintColor: '#864AF9' }}
                    />
                    {username ?
                        <View style={{ flexDirection: 'column', marginHorizontal: 10, justifyContent: 'center' }}>
                            <Text style={{ margin: 5, fontWeight: '900', color: '#864AF9' }}>سلام مدیر محترم : {name + ' ' + family}</Text>
                        
                        </View>
                        :
                        <Text>درحال بارگذاری...</Text>

                    }

                </View>

            </View>

            <View style={{ marginTop: 10 }}>
                <Customswich_component6 selectionmodea={1} onselectswitcha={onselectswicha} />

            </View>




            {active == 'رئیس' ? (
                <ScrollView showsVerticalScrollIndicator={false} style={{ height: height * 9 / 10, paddingBottom: 300 }}>
                    {
                        gamestaba == 1 && <Admin_cours navigation={navigation} />
                    }
                    {
                        gamestaba == 2 &&
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }} >
                            <Image source={require('../assets/image/atfal.png')} style={{ width: 60, height: 60, marginLeft: 5 }} />
                            <Text style={{ fontWeight: '800', color: 'green', textAlign: 'center', marginHorizontal: 50 }}> مدیر محترم</Text>
                            <Text style={{ fontWeight: '800', color: 'green', textAlign: 'center', marginHorizontal: 50 }}>این قسمت در نسخه های بعدی در دسترس قرار خواهد گرفت</Text>
                        </View>
                    }
                    {
                        gamestaba == 3 && <Users />
                    }
                    {
                        gamestaba == 4 && <Admin_noskhe navigation={navigation} />
                    }
                    {
                        gamestaba == 5 && <Admin_diagnose navigation={navigation} />
                    }
                    {
                        gamestaba == 6 && <Admin_osce navigation={navigation} />
                    } 
                </ScrollView>

            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        gamestaba == 1 && <Text>مدیریت دروس</Text>
                    }
                    {
                        gamestaba == 2 && <Text>مدیریت داروخانه</Text>
                    }
                    {
                        gamestaba == 3 &&
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }} >
                            <Image source={require('../assets/image/atfal.png')} style={{ width: 60, height: 60, marginLeft: 5 }} />
                            <Text style={{ fontWeight: '800', color: 'green', textAlign: 'center', marginHorizontal: 50 }}> مدیر محترم</Text>
                            <Text style={{ fontWeight: '800', color: 'green', textAlign: 'center', marginHorizontal: 50 }}>این قسمت در نسخه های بعدی در دسترس قرار خواهد گرفت</Text>
                        </View>
                    }
                    {
                        gamestaba == 4 && <Text>مدیریت نسخه نویسی</Text>
                    }
                    {
                        gamestaba == 5 && <Text>مدیریت تشخیص افتراقی</Text>
                    }
                    {
                        gamestaba == 6 && <Text>مدیریت مهارت بالینی</Text>
                    }
                </ScrollView>

            )

            }


        </View>
    )

}