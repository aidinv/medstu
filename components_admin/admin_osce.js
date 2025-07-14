
import { NavigationContainer } from '@react-navigation/native';

import React, { Component, useState } from 'react';

import {
    ActivityIndicator, FlatList, Text, View, StyleSheet,
    Dimensions, Image, TouchableOpacity, SafeAreaView ,ScrollView
} from 'react-native';

import { SwipeableFlatList } from 'react-native-swipe-list';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Dialog, AlertNotificationRoot, ALERT_TYPE ,Toast} from 'react-native-alert-notification';
import Customswich_component9 from '../Customswitch9';
import Customswich_component11 from '../Customswitch11';

const width = Dimensions.get('window').width;

export default class Admin_osce extends Component {





    constructor(props) {
        super(props);

        this.state = {
            DATA: [],
            isLoading: true,
            isLoading1: true,
            gamestab1: '',
            cours: '',
            gamestab2: '',
            cours1:'',
        };
    }



    async getMovies(cat_en) {
        try {
            const response = await fetch('https://draydinv.ir/extra/osce_'+cat_en+'.php');
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
            this.setState({ cours: 'داخلی وجراحی' })
            this.setState({ cours1: 'dakheli' })
            this.getMovies('dakheli')
        } else if (x == 2) {
            this.setState({ cours: 'اطفال' })
            this.setState({ cours1: 'atfal' })
            this.getMovies('atfal')
        } else if (x == 3) {
            this.setState({ cours: 'عفونی و گرمسیری' })
            this.setState({ cours1: 'infection' })
            this.getMovies('infection')
        } else if (x == 4) {
            this.setState({ cours: 'زنان وزایمان' })
            this.setState({ cours1: 'gyneacology' })
            this.getMovies('gyneacology')
        } else if (x == 5) {
            this.setState({ cours: 'اورولوژی' })
            this.setState({ cours1: 'urology' })
            this.getMovies('urology')
        } else if (x == 6) {
            this.setState({ cours: 'پوست ومو' })
            this.setState({ cours1: 'skin' })
            this.getMovies('skin')
        } else if (x == 7) {
            this.setState({ cours: 'روانپزشکی' })
            this.setState({ cours1: 'psychiatrics' })
            this.getMovies('psychiatrics')
        } else if (x == 8) {
            this.setState({ cours: 'گوش،حلق وبینی' })
            this.setState({ cours1: 'ear' })
            this.getMovies('ear')
        } else if (x == 9) {
            this.setState({ cours: 'چشم' })
            this.setState({ cours1: 'eye' })
            this.getMovies('eye')
        } else if (x == 10) {
            this.setState({ cours: 'مغزواعصاب' })
            this.setState({ cours1: 'neurology' })
            this.getMovies('neurology')
        } else if (x == 11) {
            this.setState({ cours: 'مسمومیت' })
            this.setState({ cours1: 'poison' })
            this.getMovies('poison')
        }  
    }





    render() {

        const { DATA, isLoading } = this.state;
        const { navigation } = this.props;
      

        const onselectswich = (value) => {
            this.setState({ gamestab1: value })
        }

        const showDialog1 = (text) => {
        
            fetch('https://draydinv.ir/extra/deleteoscefasl.php', {
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

      

        const ListItem = ({name_fa, onPress ,name_en}) => (
            <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.9}>
                <View style={{ flexDirection: 'row-reverse'}}>
                    <Text style={styles.text}>{name_fa}</Text>
                    <Text style={{marginHorizontal:20,alignSelf:'center'}}>|</Text>
                    <Text style={styles.text}>{name_en}</Text>
                </View>
                <View style={{ flexDirection: 'row-reverse' }}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Editoscefasl', { name_fa: name_fa,name_en:name_en,cat_en:this.state.cours1})} >
                        <Image source={require('../assets/image/edit.png')} style={{ marginLeft: 5 }} resizeMode='contain' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>showDialog1(name_fa)}>
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
                        <ListItem name_fa={item.name_fa} name_en={item.name_en}
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

                <TouchableOpacity title="ورود" onPress={()=>navigation.navigate('Addoscefasl', { cat_fa: this.state.cours })} style={{ width: width * 3.5 / 5, justifyContent: 'center', backgroundColor: '#06d6a0', borderRadius: 10, marginBottom: 10, elevation: 3, padding: 10 }} >

                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن مهارت بالینی جدید به {this.state.cours}</Text>

                </TouchableOpacity>

            </View>
        );



        return (


            <View style={{ marginTop: 10 }}>
                <Customswich_component11 sendxtoparent={this.handlex} selectionmode={3} onselectswitch={onselectswich} />

               

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
                                                <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست مهارت های بالینی</Text>
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginHorizontal: 3 }}> {this.state.cours}</Text>
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
                                                <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست مهارت های بالینی</Text>
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginHorizontal: 3 }}> {this.state.cours}</Text>
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
                            this.state.gamestab1 == 3 &&
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
                                                <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست مهارت های بالینی</Text>
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginHorizontal: 3 }}> {this.state.cours}</Text>
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
                            this.state.gamestab1 == 4 &&
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
                                                <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست مهارت های بالینی</Text>
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginHorizontal: 3 }}> {this.state.cours}</Text>
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
                            this.state.gamestab1 == 5 &&
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
                                                <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست مهارت های بالینی</Text>
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginHorizontal: 3 }}> {this.state.cours}</Text>
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
                            this.state.gamestab1 == 6 &&
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
                                                <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست مهارت های بالینی</Text>
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginHorizontal: 3 }}> {this.state.cours}</Text>
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
                            this.state.gamestab1 == 7 &&
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
                                                <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست مهارت های بالینی</Text>
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginHorizontal: 3 }}> {this.state.cours}</Text>
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
                            this.state.gamestab1 == 8 &&
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
                                                <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست مهارت های بالینی</Text>
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginHorizontal: 3 }}> {this.state.cours}</Text>
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
                            this.state.gamestab1 == 9 &&
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
                                                <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست مهارت های بالینی</Text>
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginHorizontal: 3 }}> {this.state.cours}</Text>
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
                            this.state.gamestab1 == 10 &&
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
                                                <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست مهارت های بالینی</Text>
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginHorizontal: 3 }}> {this.state.cours}</Text>
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
                            this.state.gamestab1 == 11 &&
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
                                                <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست مهارت های بالینی</Text>
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginHorizontal: 3 }}> {this.state.cours}</Text>
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
                            this.state.gamestab1 == 12 &&
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
                                                <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست مهارت های بالینی</Text>
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginHorizontal: 3 }}> {this.state.cours}</Text>
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
        textAlign: 'center',
        fontWeight:'700'

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