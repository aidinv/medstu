
import { NavigationContainer } from '@react-navigation/native';

import React, { Component, useState } from 'react';

import {
    ActivityIndicator, FlatList, Text, View, StyleSheet,
    Dimensions, Image, TouchableOpacity, SafeAreaView, TextInput, ScrollView
} from 'react-native';

import { SwipeableFlatList } from 'react-native-swipe-list';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Customswich_component7 from '../Customswitch7';
// import { ScrollView } from 'react-native-virtualized-view';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Admin_news extends Component {





    constructor(props) {
        super(props);

        this.state = {
            DATA: [],
            isLoading: true,
            isLoading1: true,
            gamestab1: '',
            cat: '',
            gamestab2: '',
        };
        this.getMovies();
    }



    async getMovies() {
        try {
            const response = await fetch('http://draydinv.ir/extra/news.php');
            const json = await response.json();
            this.setState({ DATA: json.news });

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







    render() {

        const { DATA, isLoading } = this.state;
        const { navigation } = this.props;



        const showDialog1 = (id) => {

            fetch('https://draydinv.ir/extra/deletenews.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                    id: id,


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



        const ListItem = ({ text, onPress, type, text2 ,shamsi_date , days_passed ,id}) => (
            <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.9}>
                <View style={{ flexDirection: 'row-reverse' }} >
                    <View style={{ flexDirection: 'column', backgroundColor: '', flex: 1, alignItems:'flex-end' }}>

                        <Text style={{ fontFamily: 'morvarid', color: 'green' }}>  عنوان :   {text}</Text>
                         <Text style={{ fontFamily: 'morvarid', color: 'gray' }}>  تاریخ :   {shamsi_date}</Text>

                    </View>
                    <View style={{ flexDirection: 'row-reverse', backgroundColor: '', flex: 1, justifyContent: 'flex-end' }}>

                        <TouchableOpacity onPress={() => showDialog1(id)}>
                            <Image source={require('../assets/image/trash.png')} style={{ marginLeft: 5 }} resizeMode='contain' />
                        </TouchableOpacity>
                    </View>

                </View>

            </TouchableOpacity>
        );

        const SwipeableItem = ({ item }) => (
            <GestureHandlerRootView>
                <FlatList
                    data={item}
                    renderItem={({ item }) =>
                        <ListItem text={item.title} type={item.type} text2={item.content} days_passed={item.days_passed}
                            hours_passed={item.hours_passed} shamsi_date={item.shamsi_date} id={item.id}
                            onPress={() => navigation.navigate('Detail',
                                {
                                    title: item.title,
                                    content: item.content,
                                    type: item.type,
                                    shamsi_date: item.shamsi_date,
                                    days_passed: item.days_passeds
                                })}
                        />}

                    ListEmptyComponent={this.emptymessage}
                />
            </GestureHandlerRootView>
        );

        const Add = () => (
            <View style={{ justifyContent: 'space-around', alignItems: 'center', marginVertical: 15, flexDirection: 'row-reverse' }}>

                <TouchableOpacity title="ورود" onPress={() => navigation.navigate('Addnews1', { cat: this.state.cat })} style={{ width: width * 3.5 / 5, justifyContent: 'center', backgroundColor: '#06d6a0', borderRadius: 10, marginBottom: 10, elevation: 3, padding: 10 }} >

                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن خبر جدید   {this.state.cat}</Text>

                </TouchableOpacity>

            </View>
        );



        return (


            <View style={{ marginTop: 10 }}>

                <View>
                    {isLoading ?
                        <View>
                            <ActivityIndicator size={'large'} color={'#E59BE9'} />
                            <Text style={{ alignSelf: 'center' }}>در حال بارگذاری</Text>
                        </View>
                        : (

                            <View style={{paddingBottom:150}}>
                                <Add />
                                <View style={{ flexDirection: 'row-reverse' }}>
                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست اخبار </Text>
                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginHorizontal: 3 }}> {this.state.cours}</Text>
                                </View>

                                <Text style={{ marginVertical: 0, fontWeight: '200', color: 'grey', verticalAlign: 'bottom', marginHorizontal: 10, textAlign: 'center' }}>ازاین قسمت می توانید جهت حذف خبر مورد نظر اقدام نمایید</Text>
                                <SwipeableItem
                            
                                    item={DATA}
                                />
                            </View>


                        )}
                </View>

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
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 8,
        margin: 5,
        elevation: 2,
        borderRadius: 4,
        borderRightWidth: 2,
        borderRightColor: '#ffdb00',
        borderLeftWidth: 2,
        borderLeftColor: '#ffdb00',



    },
    text: {
        fontSize: 15,
        marginRight: 15,
        textAlign: 'center',

        alignSelf: 'center'

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