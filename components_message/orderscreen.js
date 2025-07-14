import React, { useEffect, useState } from 'react';
import { View, Pressable, Flatlist, Text, SafeAreaView, Dimensions, TouchableOpacity, ImageBackground, TextInput, Image, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Customswich_component2 from '../Customswich2';
import Noskhe_dakheli from './noskhe_dakheli';
import Noskhe_atfal from './noskhe_atfal';
import Noskhe_infection from './noskhe_infection';
import Noskhe_ent from './noskhe_ent';
import Noskhe_eye from './noskhe_eye';
import Noskhe_neurology from './noskhe_neurology';
import Noskhe_skin from './noskhe_skin';
import Noskhe_urology from './noskhe_urology';
import Noskhe_psychiatrics from './noskhe_psychiatrics';
import Noskhe_gyneacology from './noskhe_gyneacology';

import { ScrollView } from 'react-native-virtualized-view';
import Noskhe_append from './noskhe_append';
import Noskhe_poison from './noskhe_poison';




export default function Orderscreen({ navigation }) {

    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;
    const [username, setusername] = React.useState(null);
    const [active, setactive] = React.useState(null);
    const [gamestab, setgamestab] = React.useState(9);
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


    useEffect(() => {
        const loadusername = async () => {

            try {
                const storedusername = await
                    AsyncStorage.getItem('username')
                if (storedusername) {
                    setusername(storedusername);
                    fetch('http://draydinv.ir/extra/status.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: storedusername,
                            func: 'diagnose'
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

    return (

        <View style={{ flex: 1, marginTop: 15 }}>

            <View style={styles.container}>

                {/* Header Section */}
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable onPress={toggleAccordion3}>
                            <Image resizeMode='contain' source={require('../assets/image/bag.png')} style={styles.icon} />
                        </Pressable>
                        <Pressable onPress={toggleAccordion4}>
                            <Image resizeMode='contain' source={require('../assets/image/message.png')} style={styles.icon} />
                        </Pressable>
                    </View>

                    {/* Greeting Section */}
                    <View style={styles.greetingContainer}>
                        <Text style={styles.greetingText}>سلام دکتر {username}  خوش اومدی </Text>
                        <Image resizeMode='contain' source={require('../assets/image/like.png')} style={styles.likeIcon} />
                    </View>

                    {/* Dot Icon */}
                    <Pressable onPress={toggleAccordion2}>
                        <Image resizeMode='contain' source={require('../assets/image/dot2.png')} style={styles.icon} />
                    </Pressable>
                </View>

                {/* Accordion 2 Content */}
                {isOpen2 && (
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between', width: width * 9.5 / 10, marginTop: 5, padding: 5 }}
                    >
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.scrollItem}>
                            <View style={styles.iconContainer}>
                                <Image source={require('../assets/image/logout.png')} resizeMode='contain' />
                            </View>
                        </TouchableOpacity>

                        <View style={styles.scrollItemsRow}>
                            <TouchableOpacity onPress={() => navigation.navigate('About')} style={styles.scrollItem}>
                                <View style={styles.iconContainer}>
                                    <Image source={require('../assets/image/about.png')} resizeMode='contain' />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.scrollItem}>
                                <View style={styles.iconContainer}>
                                    <Image source={require('../assets/image/instagram.png')} resizeMode='contain' />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.scrollItem}>
                                <View style={styles.iconContainer}>
                                    <Image source={require('../assets/image/telegram1.png')} resizeMode='contain' />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('User')} style={styles.scrollItem}>
                                <View style={styles.iconContainer}>
                                    <Image source={require('../assets/image/user.png')} resizeMode='contain' />
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
                                    <Image source={require('../assets/image/about.png')} resizeMode='contain' />
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
                                <Image source={require('../assets/image/message1.gif')} resizeMode='contain' style={styles.messageImage} />
                                <View style={{ flexDirection: 'column', }}>
                                    <Text style={styles.messageText}>سلام</Text>
                                    <Text style={styles.messageSubText}>برای مشاهده پیامها و تیکت هایتان کلیک کنید</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

            </View>


            {/* <TextInput style={{ padding: 15, marginTop: 20, alignSelf: 'center', width: width * 4.65 / 5, borderRadius: 15, paddingHorizontal: 10, direction: 'rtl', borderColor: 'purple', borderWidth: 1, textAlign: 'right', color: 'purple' }} placeholder=' عبارتی را برای جست وجو وارد کنید' ></TextInput> */}


            <View style={{ marginTop: 10 }}>
                <Customswich_component2 selectionmode={9} onselectswitch={onselectswich} />

            </View>


            {active == 1 ? (
                <ScrollView showsVerticalScrollIndicator={false}>

                    {
                        gamestab == 1 &&
                        <Noskhe_dakheli navigation={navigation} />
                    }
                    {
                        gamestab == 2 &&
                        <Noskhe_atfal navigation={navigation} />
                    }
                    {
                        gamestab == 3 &&
                        <Noskhe_infection navigation={navigation} />
                    }
                    {
                        gamestab == 4 &&
                        <Noskhe_gyneacology navigation={navigation} />
                    }


                    {
                        gamestab == 5 &&
                        <Noskhe_urology navigation={navigation} />
                    }
                    {
                        gamestab == 6 &&
                        <Noskhe_skin navigation={navigation} />
                    }
                    {
                        gamestab == 7 &&
                        <Noskhe_psychiatrics navigation={navigation} />
                    }
                    {
                        gamestab == 8 &&
                        <Noskhe_ent navigation={navigation} />
                    }

                    {
                        gamestab == 9 &&
                        <Noskhe_eye navigation={navigation} />
                    }
                    {
                        gamestab == 10 &&
                        <Noskhe_neurology navigation={navigation} />
                    }
                    {
                        gamestab == 11 &&
                        <Noskhe_poison navigation={navigation} />
                    }
                    {
                        gamestab == 12 &&
                        <Noskhe_append navigation={navigation} />
                    }


                </ScrollView>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} >
                    <Image source={require('../assets/image/atfal.png')} style={{ width: 60, height: 60, marginLeft: 5 }} />

                    <Text style={{ fontWeight: '800', color: 'green', textAlign: 'center', marginHorizontal: 50 }}> برای مشاهده این قسمت لطفا نسبت به فعالسازی  بخش نسخه نویسی اقدام نمایید</Text>
                </View>
            )
            }
        </View>
    )

}