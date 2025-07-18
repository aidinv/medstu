
import { NavigationContainer } from '@react-navigation/native';

import React, { Component, useState } from 'react';

import {
    ActivityIndicator, FlatList, Text, View, StyleSheet,
    Dimensions, Image, TouchableOpacity, SafeAreaView, TextInput,ScrollView
} from 'react-native';

import { SwipeableFlatList } from 'react-native-swipe-list';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Customswich_component7 from '../Customswitch7';
// import { ScrollView } from 'react-native-virtualized-view';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Admin_pharmacy extends Component {





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
            const response = await fetch('https://draydinv.ir/extra/drugslist.php');
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

   





    render() {

        const { DATA, isLoading } = this.state;
        const { navigation } = this.props;

      

        const showDialog1 = (text) => {
        
            fetch('https://draydinv.ir/extra/deletedrug.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                 
                    name1: text,
                    
    
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

        

        const ListItem = ({ text, onPress ,text2 }) => (
            <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.9}>
                <View style={{ flexDirection: 'row-reverse' }}>
                  
                    <Text style={styles.text}>{text}</Text>
                </View>
                <View style={{ flexDirection: 'row-reverse' }}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Editdrug1', { name1: text,name2:text2})} >
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
                <FlatList
                    data={item}
                    renderItem={({ item }) =>
                        <ListItem text={item.name1} text2={item.name2} 
                            onPress={() => navigation.navigate('Detail',
                                {
                                    name1: item.name1,
                                    name2: item.name2,
                                    cat: item.cat
                                })}
                        />}
                   
                    ListEmptyComponent={this.emptymessage}
                />
            </GestureHandlerRootView>
        );

        const Add = () => (
            <View style={{ justifyContent: 'space-around', alignItems: 'center', marginVertical: 15, flexDirection: 'row-reverse' }}>

                <TouchableOpacity title="ورود" onPress={()=>navigation.navigate('Adddrug1', { cat: this.state.cat })} style={{ width: width * 3.5 / 5, justifyContent: 'center', backgroundColor: '#06d6a0', borderRadius: 10, marginBottom: 10, elevation: 3, padding: 10 }} >

                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن داروی جدید   {this.state.cat}</Text>

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
                               
                                            <View>
                                                <Add />
                                                <View style={{ flexDirection: 'row-reverse' }}>
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست فصل های درس</Text>
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginHorizontal: 3 }}> {this.state.cours}</Text>
                                                </View>

                                                <Text style={{ marginVertical: 0, fontWeight: '200', color: 'grey', verticalAlign: 'bottom', marginHorizontal: 10, textAlign: 'center' }}>ازاین قسمت می توانید جهت ویرایش مباحث و محتوای فصول اقدام نمایید</Text>
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