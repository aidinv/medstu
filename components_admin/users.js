
import { NavigationContainer } from '@react-navigation/native';

import React, { Component, useState } from 'react';

import {
    ActivityIndicator, FlatList, Text, View, StyleSheet,
    Dimensions, Image, TouchableOpacity, SafeAreaView
} from 'react-native';

import { SwipeableFlatList } from 'react-native-swipe-list';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-virtualized-view';
import { Button } from 'react-native-web';

export default class Users extends Component {



    width = Dimensions.get('window').width;

    constructor(props) {

        super(props);

        this.state = {
            DATA: [],
            isLoading: true,
            activeButtons: {}
        };
    }

    toggleValueOnServer = async (username) => {
        try {
            const response = await fetch('http://draydinv.ir/extra/users1.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });

            const data = await response.json();
            if (data.success) {
                this.setState(prevState => ({
                    activeButtons: {
                        ...prevState.activeButtons,
                        [username]: data.newValue
                    }
                }));
            } else {
                console.error('خطا در تغییر مقدار برای ' + username);
            }
        } catch (error) {
            console.error('خطا در ارتباط با سرور: ', error);
        }
    };

    handlePress = (username) => {
        this.toggleValueOnServer(username);
    };
    

    async getMovies() {
        try {
            const response = await fetch('http://draydinv.ir/extra/users.php');
            const json = await response.json();
            this.setState({ DATA: json });
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoading: false });
        }
    }

    componentDidMount() {
        this.getMovies();
    }

    emptymessage = () => {
        return (

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ fontWeight: '800', color: 'green' }}>محتوایی برای نمایش یافت نشد !</Text>
            </View>
        )
    }

    render() {
        const { DATA, isLoading } = this.state;
        const { navigation } = this.props;

        const ListItem = ({ name, username, family, password, phone, email, degree, university, activate_cours, activate_diagnose, activate_noskhe, activate_osce, onPress }) => (
            <TouchableOpacity style={{ width: this.width * 4.75 / 5, backgroundColor: 'transparent', alignSelf: 'center', marginVertical: 5, borderRadius: 10, elevation: 0 }} onPress={onPress} activeOpacity={0.9}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: this.width * 4.5 / 5, backgroundColor: 'white', alignSelf: 'center', marginVertical: 5, borderRadius: 5, borderBottomColor: 'purple', borderBottomWidth: 2, elevation: 5, shadowColor: 'transparent', borderRadius: 7 }}>

                    <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../assets/image/student.png')}
                            style={{ width: 30, height: 30, tintColor: '#06d6a0', margin: 10 }}
                        />
                        <Text style={{ justifyContent: 'center', textAlign: 'center', backgroundColor: 'white', margin: 5, borderRadius: 5, padding: 5, fontWeight: '700' }}> {username}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../assets/image/phone.png')}
                            style={{ width: 30, height: 30, margin: 10 }}
                        />
                        <Text style={{ justifyContent: 'center', textAlign: 'center', backgroundColor: 'white', margin: 5, borderRadius: 5, padding: 5, fontWeight: '700' }}> {phone}</Text>
                    </View>

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: this.width * 4.5 / 5, backgroundColor: 'transparent', alignSelf: 'center', marginVertical: 0, }}>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../assets/image/key.png')}
                            style={{ width: 30, height: 30, margin: 10 }}
                        />
                        <Text style={{ justifyContent: 'center', textAlign: 'center', margin: 0, borderRadius: 5, padding: 0, fontWeight: '700' }}> {password}</Text>
                    </View>
                    <View style={{ flexDirection: 'row-reverse', alignSelf: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../assets/image/atfal.png')}
                            style={{ width: 30, height: 30, margin: 10 }}
                        />
                        <Text style={{ justifyContent: 'center', textAlign: 'center', margin: 0, borderRadius: 5, padding: 0, fontWeight: '700' }}> {name} {family}</Text>
                    </View>

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: this.width * 4.5 / 5, backgroundColor: 'transparent', alignSelf: 'center', marginVertical: 0, }}>

                    <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../assets/image/email1.png')}
                            style={{ width: 30, height: 30, margin: 10 }}
                        />
                        <Text style={{ justifyContent: 'center', textAlign: 'center', margin: 0, borderRadius: 5, padding: 0, fontWeight: '700' }}> {email}</Text>
                    </View>
                </View>


                <View style={{ width: this.width * 4.5 / 5, flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'transparent', alignSelf: 'center', marginVertical: 0, }}>

                    <TouchableOpacity title="ورود" onPress={() => this.handlePress(username)} style={[styles.Button, this.state.activeButtons[username] ? styles.active : styles.inactive]} >

                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', fontSize: 11 }}>نسخه</Text>

                    </TouchableOpacity>

                    <TouchableOpacity title="ورود" onPress={this.handleLogin} style={{ width: width * 1.25 / 6, justifyContent: 'center', backgroundColor: '#e9c46a', height: height / 20, borderRadius: 10 }} >

                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', fontSize: 11 }}> دروس</Text>

                    </TouchableOpacity>

                    <TouchableOpacity title="ورود" onPress={this.handleLogin} style={{ width: width * 1.25 / 6, justifyContent: 'center', backgroundColor: '#ff006e', height: height / 20, borderRadius: 10 }} >

                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', fontSize: 11 }}>مهارت بالینی</Text>

                    </TouchableOpacity>

                    <TouchableOpacity title="ورود" onPress={this.handleLogin} style={{ width: width * 1.25 / 6, justifyContent: 'center', backgroundColor: '#8338ec', height: height / 20, borderRadius: 10 }} >

                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', fontSize: 11 }}>تشخیص افتراقی</Text>

                    </TouchableOpacity>
                </View>


            </TouchableOpacity>
        );

        const SwipeableItem = ({ item }) => (
            <GestureHandlerRootView>
                <FlatList
                    data={item}
                    renderItem={({ item }) =>
                        <ListItem
                            username={item.username}
                            name={item.name}
                            family={item.family}
                            password={item.password}
                            email={item.email}
                            phone={item.phone}
                            university={item.university}
                            degree={item.degree}
                            activate_cours={item.activate_cours}
                            activate_noskhe={item.activate_noskhe}
                            activate_osce={item.activate_osce}
                            activate_diagnose={item.activate_diagnose}

                        //    onPress={()=>navigation.navigate('Detail',
                        //    {fasl_name_en:item.fasl_name_en ,
                        //     fasl_name_fa:item.fasl_name_fa,
                        //     img:item.img,
                        //     cours_fa:item.cours_fa  
                        //   })}
                        />}

                    ListEmptyComponent={this.emptymessage}
                    extraData={this.state.activeButtons}
                    keyExtractor={(item)=>item.id.toString()}
                />
            </GestureHandlerRootView>
        );


        return (

            <View style={{ marginTop: 10 }}>
                {isLoading ?
                    <View>
                        <ActivityIndicator size={'large'} color={'#E59BE9'} />
                        <Text style={{ alignSelf: 'center', marginTop: 5 }}>در حال بارگذاری</Text>
                    </View>
                    : (
                        <SafeAreaView >
                            <SwipeableItem
                                item={DATA}
                            />
                        </SafeAreaView>
                    )}
            </View>

        );
    }



};


const styles = StyleSheet.create({

    Button: {
        width: width * 1.25 / 6, justifyContent: 'center', height: height / 20, borderRadius: 10


    }, active: {
        backgroundColor: '#06d6a0'
    }, inactive: {

        backgroundColor: 'grey'
    },

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

        marginTop: 5,
        marginBottom: 10,

        marginHorizontal: 10
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
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 8,
        margin: 10,
        elevation: 4,
        borderRadius: 8,
        alignItems: 'center',
        borderRightWidth: 2,
        borderRightColor: '#FFCDEA',
        borderLeftWidth: 2,
        borderLeftColor: '#FFCDEA',



    },
    text: {
        fontSize: 15,
        marginRight: 15

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