
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

export default class Admin_cours extends Component {





    constructor(props) {
        super(props);

        this.state = {
            DATA: [],
            isLoading: true,
            isLoading1: true,
            gamestab1: '',
            cours: '',
            gamestab2: '',
        };
    }



    async getMovies(cours_en) {
        try {
            const response = await fetch('http://draydinv.ir/extra/' + cours_en + '.php');
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
            this.setState({ cours: 'کلیه' })
            this.getMovies('kidney')
        } else if (x == 2) {
            this.setState({ cours: 'زنان وزایمان' })
            this.getMovies('gyneacology')
        } else if (x == 3) {
            this.setState({ cours: 'جراحی' })
            this.getMovies('surgery')
        } else if (x == 4) {
            this.setState({ cours: 'قلب وعروق' })
            this.getMovies('heart')
        } else if (x == 5) {
            this.setState({ cours: 'اورولوژی' })
            this.getMovies('urology')
        } else if (x == 6) {
            this.setState({ cours: 'روماتولوژی' })
            this.getMovies('rheumatology')
        } else if (x == 7) {
            this.setState({ cours: 'رادیولوژی' })
            this.getMovies('radiology')
        } else if (x == 8) {
            this.setState({ cours: 'فارماکولوژی' })
            this.getMovies('pharmacology')
        } else if (x == 9) {
            this.setState({ cours: 'چشم' })
            this.getMovies('eye')
        } else if (x == 10) {
            this.setState({ cours: 'عفونی' })
            this.getMovies('infection')
        } else if (x == 11) {
            this.setState({ cours: 'ریه' })
            this.getMovies('lung')
        } else if (x == 12) {
            this.setState({ cours: 'نورولوژی' })
            this.getMovies('neurology')
        } else if (x == 13) {
            this.setState({ cours: 'گوارش' })
            this.getMovies('digestive')
        } else if (x == 14) {
            this.setState({ cours: 'گوش گلوبینی' })
            this.getMovies('ent')
        } else if (x == 15) {
            this.setState({ cours: 'ارتوپدی' })
            this.getMovies('orthopedy')
        } else if (x == 16) {
            this.setState({ cours: 'اطفال' })
            this.getMovies('pediatrics')
        } else if (x == 17) {
            this.setState({ cours: 'پوست' })
            this.getMovies('dermatology')
        } else if (x == 18) {
            this.setState({ cours: 'غدد' })
            this.getMovies('endocrinology')
        } else if (x == 19) {
            this.setState({ cours: 'هماتولوژی' })
            this.getMovies('hematology')
        } else if (x == 20) {
            this.setState({ cours: 'روانپزشکی' })
            this.getMovies('psychiatric')
        } else if (x == 21) {
            this.setState({ cours: 'پاتولوژی' })
            this.getMovies('pathology')
        }
    }





    render() {

        const { DATA, isLoading } = this.state;
        const { navigation } = this.props;

        const onselectswich = (value) => {
            this.setState({ gamestab1: value })
        }

        const showDialog1 = (text) => {
        
            fetch('http://draydinv.ir/extra/deletefasl.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                 
                    fasl_name_fa: text,
                    
    
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

        

        const ListItem = ({ text, img, onPress ,text2}) => (
            <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.9}>
                <View style={{ flexDirection: 'row-reverse' }}>
                    <Image source={{ uri: img }} style={{ width: 30, height: 30, marginLeft: 5, alignSelf: 'center' }} resizeMode='contain' />
                    <Text style={styles.text}>{text}</Text>
                </View>
                <View style={{ flexDirection: 'row-reverse' }}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Editfasl', { fasl_name_fa: text,fasl_name_en:text2})} >
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
                        <ListItem text={item.fasl_name_fa} text2={item.fasl_name_en} img={item.img} 
                            onPress={() => navigation.navigate('Detail',
                                {
                                    fasl_name_en: item.fasl_name_en,
                                    fasl_name_fa: item.fasl_name_fa,
                                    img: item.img,
                                    cours_fa: item.cours_fa
                                })}
                        />}
                   
                    ListEmptyComponent={this.emptymessage}
                />
            </GestureHandlerRootView>
        );

        const Add = () => (
            <View style={{ justifyContent: 'space-around', alignItems: 'center', marginVertical: 15, flexDirection: 'row-reverse' }}>

                <TouchableOpacity title="ورود" onPress={()=>navigation.navigate('Addfasl', { cours: this.state.cours })} style={{ width: width * 3.5 / 5, justifyContent: 'center', backgroundColor: '#06d6a0', borderRadius: 10, marginBottom: 10, elevation: 3, padding: 10 }} >

                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن فصل جدید به درس {this.state.cours}</Text>

                </TouchableOpacity>

            </View>
        );



        return (


            <View style={{ marginTop: 10 }}>
                <Customswich_component7 sendxtoparent={this.handlex} selectionmode={3} onselectswitch={onselectswich} />

               
                    

                        {
                            this.state.gamestab1 == 1 &&
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
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست فصل های درس</Text>
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
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست فصل های درس</Text>
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
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست فصل های درس</Text>
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
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست فصل های درس</Text>
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
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست فصل های درس</Text>
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
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست فصل های درس</Text>
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
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست فصل های درس</Text>
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
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست فصل های درس</Text>
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
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست فصل های درس</Text>
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
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست فصل های درس</Text>
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
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست فصل های درس</Text>
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
                            this.state.gamestab1 == 13 &&
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
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست فصل های درس</Text>
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
                            this.state.gamestab1 == 14 &&
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
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست فصل های درس</Text>
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
                            this.state.gamestab1 == 15 &&
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
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست فصل های درس</Text>
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
                            this.state.gamestab1 == 16 &&
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
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست فصل های درس</Text>
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
                            this.state.gamestab1 == 17 &&
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
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست فصل های درس</Text>
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
                            this.state.gamestab1 == 18 &&
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
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست فصل های درس</Text>
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
                            this.state.gamestab1 == 19 &&
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
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست فصل های درس</Text>
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
                            this.state.gamestab1 == 20 &&
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
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست فصل های درس</Text>
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
                            this.state.gamestab1 == 21 &&
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
                                                    <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> لیست فصل های درس</Text>
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