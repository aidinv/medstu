import React, { useEffect, useState } from 'react';
import { View, Pressable, Flatlist, Text, SafeAreaView, Dimensions, TouchableOpacity, ImageBackground, TextInput, Image, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Customswich_component from './Customswich';




import Gyneacology from './components/gyneacology';
import Surgery from './components/surgery';
import Heart from './components/heart';
import Urology from './components/urology';
import Rhumatology from './components/rhumatology';
import Radiology from './components/radiology';
import Pharmacology from './components/pharmacology';
import Eye from './components/eye';
import Infection from './components/infection';
import Lung from './components/lung';
import Neurology from './components/neurology';
import Digestive from './components/digestive';
import Ent from './components/ent';
import Orthopedy from './components/orthopedy';
import Kidney from './components/kidney';
import Atfal from './components/atfal';
import Pathology from './components/pathology';
import Psychiatrics from './components/psychiatrics';
import Hematology from './components/hematology';
import Dermatology from './components/dermatology';
import Endocrinology from './components/endocrinology';

import { ScrollView } from 'react-native-virtualized-view';









export default function Homescreen({ navigation }) {


    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;
    const [gamestab, setgamestab] = React.useState(18);
    const [active, setactive] = React.useState(null);
    const [username, setusername] = React.useState(null);
    const onselectswich = (value) => {
        setgamestab(value);
    }

    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);


    const toggleAccordion2 = () => {
        setIsOpen2(!isOpen2);
        setIsOpen3(false);
        setIsOpen4(false);
    };

    const toggleAccordion3 = () => {
        setIsOpen2(false);
        setIsOpen3(!isOpen3);
        setIsOpen4(false);
    };

    const toggleAccordion4 = () => {
        setIsOpen2(false);
        setIsOpen3(false);
        setIsOpen4(!isOpen4);
    };


    useEffect(() => {
        const loadusername = async () => {

            try {
                const storedusername = await
                    AsyncStorage.getItem('username')
                if (storedusername) {
                    setusername(storedusername);
                    fetch('https://draydinv.ir/extra/status.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: storedusername,
                            func: 'cours'
                        }),
                    })
                        .then(response => response.json())
                        .then((data) => {
                            setactive(data.status)
                        })
                }
            } catch (error) {
                console.error('erroe', error);
            }
        }
        loadusername();
    }, []);


    const styles = StyleSheet.create({
        container: {
            width: width * 9.5 / 10,
            borderRadius: 10,
            marginTop: 20,
            backgroundColor: '#EEEEEE',
            elevation: 2,
            alignSelf: 'center',
        },
        header: {
            justifyContent: 'space-between',
            borderBottomWidth: 0,
            borderBottomColor: 'white',
            paddingBottom: 0,
            flexDirection: 'row',
        },
        icon: {
            height: 50,
            width: 50,
            borderRadius: 10,
            backgroundColor: '#ffffff',
            margin: 5,
        },
        greetingContainer: {
            flexDirection: 'row-reverse',
            justifyContent: 'center',
        },
        greetingText: {
            color: 'grey',
            fontSize: 14,
            marginTop: 10,
            textAlign: 'center',
            textAlignVertical: 'center',
            padding: 5,
            fontFamily: 'dast',
        },
        likeIcon: {
            borderRadius: 10,
            width: 20,
            alignSelf: 'center',
        },
        scrollView: {
            alignSelf: 'center',
            flexDirection: 'row'
        },
        scrollViewContent: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: width * 9.5 / 10,
            marginTop: 5,
            padding: 5,
        },
        scrollItem: {
            elevation: 0,
            backgroundColor: 'transparent',
            borderRadius: 8,
            width: width * 9 / 77,
            marginHorizontal: width / 77,
            padding: 8,
        },
        iconContainer: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        scrollItemsRow: {
            flexDirection: 'row',
            borderTopColor: 'white',
            borderTopWidth: 1,
        },
        messageItem: {
            backgroundColor: 'transparent',
            flexDirection: 'row',
            borderTopColor: 'white',
            borderTopWidth: 1,
            width: width * 9 / 10,
        },
        messageImage: {
            height: 75,
            width: width * 2.5 / 9,
        },
        messageTextContainer: {
            backgroundColor: 'transparent',
            width: width * 5.5 / 9,
            paddingTop: 10,
        },
        messageText: {
            textAlign: 'right',
            fontFamily: 'dast',
            fontSize: 20,
            color: 'green',
        },
        messageSubText: {
            textAlign: 'right',
            fontFamily: 'dast',
            fontSize: 16,
            marginTop: 5,
        },
    });





    return (

        <View style={{ flex: 1, marginTop: 15 }}>


            <View style={styles.container}>

                {/* Header Section */}
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable onPress={toggleAccordion3}>
                            <Image resizeMode='contain' source={require('./assets/image/bag.png')} style={styles.icon} />
                        </Pressable>
                        <Pressable onPress={toggleAccordion4}>
                            <Image resizeMode='contain' source={require('./assets/image/message.png')} style={styles.icon} />
                        </Pressable>
                    </View>

                    {/* Greeting Section */}
                    <View style={styles.greetingContainer}>
                        <Text style={styles.greetingText}>سلام دکتر {username}  خوش اومدی </Text>
                        <Image resizeMode='contain' source={require('./assets/image/like.png')} style={styles.likeIcon} />
                    </View>

                    {/* Dot Icon */}
                    <Pressable onPress={toggleAccordion2}>
                        <Image resizeMode='contain' source={require('./assets/image/dot2.png')} style={styles.icon} />
                    </Pressable>
                </View>

                {/* Accordion 2 Content */}
                {isOpen2 && (
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between', width: width * 9.5 / 10, marginTop: 5, padding: 5 }}
                    >
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.scrollItem}>
                            <View style={styles.iconContainer}>
                                <Image source={require('./assets/image/logout.png')} resizeMode='contain' />
                            </View>
                        </TouchableOpacity>

                        <View style={styles.scrollItemsRow}>
                            <TouchableOpacity onPress={() => navigation.navigate('About')} style={styles.scrollItem}>
                                <View style={styles.iconContainer}>
                                    <Image source={require('./assets/image/about.png')} resizeMode='contain' />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.scrollItem}>
                                <View style={styles.iconContainer}>
                                    <Image source={require('./assets/image/instagram.png')} resizeMode='contain' />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.scrollItem}>
                                <View style={styles.iconContainer}>
                                    <Image source={require('./assets/image/telegram1.png')} resizeMode='contain' />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('User')} style={styles.scrollItem}>
                                <View style={styles.iconContainer}>
                                    <Image source={require('./assets/image/user.png')} resizeMode='contain' />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {/* Accordion 3 Content */}
                {isOpen3 && (
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between', width: width * 9.5 / 10, marginTop: 5, padding: 5 }}
                    >
                        <View style={styles.scrollItemsRow}>
                            <TouchableOpacity onPress={() => navigation.navigate('About')} style={styles.scrollItem}>
                                <View style={styles.iconContainer}>
                                    <Image source={require('./assets/image/about.png')} resizeMode='contain' />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {/* Accordion 4 Content */}
                {isOpen4 && (
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'flex-end', width: width * 9.5 / 10, marginTop: 5, padding: 5 }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => navigation.navigate('About')} style={{ flexDirection: 'row-reverse' }}>
                                <Image source={require('./assets/image/message1.gif')} resizeMode='contain' style={styles.messageImage} />
                                <View style={{ flexDirection: 'column', }}>
                                    <Text style={styles.messageText}>سلام</Text>
                                    <Text style={styles.messageSubText}>برای مشاهده پیامها و تیکت هایتان کلیک کنید</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

            </View>


            {/* <TextInput style={{ padding: 15, marginTop: 20, alignSelf: 'center', width: width * 4.65 / 5, borderRadius: 15, paddingHorizontal: 10, direction: 'rtl', borderColor: 'purple', borderWidth: 1, textAlign: 'right', color: 'purple' }} placeholder=' عبارتی را برای جست وجو وارد کنید' ></TextInput>
             */}
            <View style={{ marginTop: 10 }}>
                <Customswich_component selectionmode={18} onselectswitch={onselectswich} />

            </View>

          

            {active == 1 ? (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        gamestab == 1 &&

                        <Kidney navigation={navigation} username={username} />



                    }

                    {
                        gamestab == 2 &&
                        <Gyneacology navigation={navigation} username={username} />
                    }

                    {
                        gamestab == 3 &&
                        <Surgery navigation={navigation} username={username} />
                    }

                    {
                        gamestab == 4 &&
                        <Heart navigation={navigation} username={username} />
                    }

                    {
                        gamestab == 5 &&
                        <Urology navigation={navigation} username={username} />
                    }

                    {
                        gamestab == 6 &&
                        <Rhumatology navigation={navigation} username={username} />
                    }

                    {
                        gamestab == 7 &&
                        <Radiology navigation={navigation} username={username} />
                    }

                    {
                        gamestab == 8 &&
                        <Pharmacology navigation={navigation} username={username} />
                    }

                    {
                        gamestab == 9 &&
                        <Eye navigation={navigation} username={username} />
                    }

                    {
                        gamestab == 10 &&
                        <Infection navigation={navigation} username={username} />
                    }

                    {
                        gamestab == 11 &&
                        <Lung navigation={navigation} username={username} />
                    }

                    {
                        gamestab == 12 &&
                        <Neurology navigation={navigation} username={username} />
                    }


                    {
                        gamestab == 13 &&
                        <Digestive navigation={navigation} username={username} />
                    }

                    {
                        gamestab == 14 &&
                        <Ent navigation={navigation} username={username} />
                    }

                    {
                        gamestab == 15 &&
                        <Orthopedy navigation={navigation} username={username} />
                    }

                    {
                        gamestab == 16 &&
                        <Atfal navigation={navigation} username={username} />
                    }

                    {
                        gamestab == 17 &&
                        <Dermatology navigation={navigation} username={username} />
                    }

                    {
                        gamestab == 18 &&
                        <Endocrinology navigation={navigation} username={username} />
                    }

                    {
                        gamestab == 19 &&
                        <Hematology navigation={navigation} username={username} />
                    }

                    {
                        gamestab == 20 &&
                        <Psychiatrics navigation={navigation} username={username} />
                    }

                    {
                        gamestab == 21 &&
                        <Pathology navigation={navigation} username={username} />
                    }


                </ScrollView>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} >
                    <Image source={require('./assets/image/atfal.png')} style={{ width: 60, height: 60, marginLeft: 5 }} />

                    <Text style={{ fontWeight: '800', color: 'green', textAlign: 'center', marginHorizontal: 50 }}> برای مشاهده این قسمت لطفا نسبت به فعالسازی  بخش دروس اقدام نمایید</Text>
                </View>

            )

            }

        </View>
    )

}