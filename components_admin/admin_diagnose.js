
import { NavigationContainer } from '@react-navigation/native';

import React, { Component, useState } from 'react';

import {
    ActivityIndicator, FlatList, Text, View, StyleSheet,
    Dimensions, Image, TouchableOpacity, SafeAreaView, TextInput,ScrollView
} from 'react-native';

import { SwipeableFlatList } from 'react-native-swipe-list';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Customswich_component10 from '../Customswitch10';

const width = Dimensions.get('window').width;

export default class Admin_diagnose extends Component {





    constructor(props) {
        super(props);

        this.state = {
            DATA: [],
            isLoading: true,
            isLoading1: true,
            gamestab1: '',
            cat_fa: '',
            cat_en:'',
            gamestab2: '',
        };
    }



    async getMovies(cat_en) {
        try {
            const response = await fetch('http://draydinv.ir/extra/diagnose_' + cat_en + '.php');
            const json = await response.json();
            this.setState({ DATA: json });
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoading: false });
        }
    }



    emptymessage = () => {
        return (

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10 }} >
                <Text style={{ fontWeight: '800', color: 'green' }}>محتوایی برای نمایش یافت نشد !</Text>
            </View>
        )
    }

    handlex = (x) => {
        if (x == 1) {
            this.setState({ cat_fa: 'تظاهرات بالینی' })
            this.setState({ cat_en: 'sign' })
            this.getMovies('sign')
        } else if (x == 2) {
            this.setState({ cat_fa: 'تظاهرات بیوشیمیایی' })
            this.setState({ cat_en: 'biochemistery' })
            this.getMovies('biochemistery')
        } 
    }





    render() {

        const { DATA, isLoading } = this.state;
        const { navigation } = this.props;

        const onselectswich = (value) => {
            this.setState({ gamestab1: value })
        }

        const showDialog1 = (text) => {
        
            fetch('http://draydinv.ir/extra/deletediagnosefasl.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                 
                    name_fa: text,
                    
    
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


        const ListItem = ({ text, onPress ,text2}) => (
            <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.9}>
                <View style={{ flexDirection: 'row-reverse' }}>
                  
                    <Text style={styles.text}>{text}</Text>
                </View>
                <View style={{ flexDirection: 'row-reverse' }}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Editdiagnosefasl', { name_fa: text,name_en:text2})} >
                        <Image source={require('../assets/image/edit.png')} style={{ marginLeft: 5 }} resizeMode='contain' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>showDialog1(text)}>
                        <Image source={require('../assets/image/trash.png')} style={{ marginLeft: 5 }} resizeMode='contain' />
                    </TouchableOpacity>
                </View>

            </TouchableOpacity>
        );

        const SwipeableItem = ({ item }) => (
            <GestureHandlerRootView>
                <SwipeableFlatList
                    data={item}
                    renderItem={({ item }) =>
                        <ListItem text={item.name_fa} text2={item.name_en} 
                            onPress={() => navigation.navigate('Detail',
                                {
                                    name_en: item.name_en,
                                    name_fa: item.name_fa,
                                    cat_fa: item.cat_fa
                                })}
                        />}
                    renderRightActions={() => (

                        <TouchableOpacity style={styles.rightAction1} >
                            <View >
                                <Text style={styles.actionText}>یادداشت</Text>
                            </View>
                        </TouchableOpacity>


                    )}
                    renderLeftActions={() => (

                        <TouchableOpacity style={styles.rightAction1} >
                            <View >
                                <Text style={styles.actionText}>دانلود</Text>
                            </View>
                        </TouchableOpacity>


                    )}
                    ListEmptyComponent={this.emptymessage}
                />
            </GestureHandlerRootView>
        );

        const Add = () => (
            <View style={{ justifyContent: 'space-around', alignItems: 'center', marginVertical: 15, flexDirection: 'row-reverse' }}>

                <TouchableOpacity title="ورود" onPress={()=>navigation.navigate('Adddiagnosefasl', { cat_fa: this.state.cat_fa })} style={{ width: width * 3.5 / 5, justifyContent: 'center', backgroundColor: '#06d6a0', borderRadius: 10, marginBottom: 10, elevation: 3, padding: 10 }} >

                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن شکایت  جدید به  {this.state.cat_fa}</Text>

                </TouchableOpacity>

            </View>
        );



        return (


            <View style={{ marginTop: 10 }}>
                <Customswich_component10 sendxtoparent={this.handlex} selectionmode={3} onselectswitch={onselectswich} />

                

                        {
                            this.state.gamestab1 == 1 &&
                            <View>
                                {isLoading ?
                                    <View>
                                        <ActivityIndicator size={'large'} color={'#E59BE9'} />
                                        <Text style={{ alignSelf: 'center' }}>در حال بارگذاری</Text>
                                    </View>
                                    : (
                                        <SafeAreaView >

                                            <View>
                                                <Add />
                                                <View style={{ flexDirection: 'row-reverse' }}>
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست عناوین بخش</Text>
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginHorizontal: 3 }}> {this.state.cat_fa}</Text>
                                                </View>

                                                <Text style={{ marginVertical: 0, fontWeight: '200', color: 'grey', verticalAlign: 'bottom', marginHorizontal: 10, textAlign: 'center' }}>ازاین قسمت می توانید جهت ویرایش مباحث و محتوای فصول اقدام نمایید</Text>
                                                <SwipeableItem
                                                    item={DATA}
                                                />
                                            </View>

                                        </SafeAreaView>
                                    )}
                            </View>
                        }
                        {
                            this.state.gamestab1 == 2 &&
                            <View>
                                {isLoading ?
                                    <View>
                                        <ActivityIndicator size={'large'} color={'#E59BE9'} />
                                        <Text style={{ alignSelf: 'center' }}>در حال بارگذاری</Text>
                                    </View>
                                    : (
                                        <SafeAreaView >

                                            <View>
                                                <Add />
                                                <View style={{ flexDirection: 'row-reverse' }}>
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست عناوین بخش</Text>
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginHorizontal: 3 }}> {this.state.cat_fa}</Text>
                                                </View>

                                                <Text style={{ marginVertical: 0, fontWeight: '200', color: 'grey', verticalAlign: 'bottom', marginHorizontal: 10, textAlign: 'center' }}>ازاین قسمت می توانید جهت ویرایش مباحث و محتوای فصول اقدام نمایید</Text>
                                                <SwipeableItem
                                                    item={DATA}
                                                />
                                            </View>

                                        </SafeAreaView>
                                    )}
                            </View>
                        }
                        


             





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
        flexDirection:'row-reverse',
        justifyContent:'space-between',
        backgroundColor: 'white',
        padding: 8,
        margin: 5,
        elevation: 2,
        borderRadius: 4,
        borderRightWidth:2,
        borderRightColor:'#ffdb00',
        borderLeftWidth:2,
        borderLeftColor:'#ffdb00',
        
    
    
      },
      text: {
        fontSize: 15,
        marginRight:15,
        textAlign:'center',
    
        alignSelf:'center'
    
      },
    text1: {
        fontSize: 15,
        alignSelf: 'center',
        fontWeight: '700',
        textAlign: 'center'

    },
    text2: {
        fontSize: 15,
        alignSelf: 'center',
        fontWeight: '700',
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