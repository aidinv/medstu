import React, { Component, useState } from 'react';

import {
    FlatList, Text, View, TextInput,
    Dimensions, Image, TouchableOpacity, SafeAreaView, StyleSheet, RefreshControl
} from 'react-native';
import { SwipeableFlatList } from 'react-native-swipe-list';
import { ScrollView } from 'react-native-virtualized-view';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Dialog, AlertNotificationRoot, ALERT_TYPE, Toast } from 'react-native-alert-notification';

export default class Editfaslscreen extends Component {


    width = Dimensions.get('window').width;

    constructor(props) {
        super(props);
        this.state = {

            fasl_name_fa: this.props.route.params.fasl_name_fa,
            fasl_name_en: this.props.route.params.fasl_name_en,
            showtext: false,
            showtext1: false,
            showtext2: false,
            subject: '',
            subject1: '',

            DATA: [],
            isLoading: true,
            isLoading1: true,
            refreshing: false,

        };
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData = async () => {
        try {
            const response = await fetch('http://draydinv.ir/extra/detail.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                body: JSON.stringify({
                    fasl_name_en: this.state.fasl_name_en,
                })
            });
            const json = await response.json();
            this.setState({ DATA: json, isLoading: false });
        } catch (error) {
            console.error(error);
        }
    };




    emptymessage = () => {
        return (

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10 }} >
                <Text style={{ fontWeight: '800', color: 'green' }}>محتوایی برای نمایش یافت نشد !</Text>
            </View>
        )
    }


    handleaddsubject = () => {
        const { subject1, fasl_name_fa, fasl_name_en, subject } = this.state;


        fetch('http://draydinv.ir/extra/addsubject.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                fasl_name_fa: fasl_name_fa,
                fasl_name_en: fasl_name_en,
                subject: subject,
                subject1: subject1

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

        const { DATA, isLoading, refreshing } = this.state;
        const { navigation } = this.props;


        const showDialog = (c, d) => {

            fetch('http://draydinv.ir/extra/deletesubject.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                    fasl_name_fa: c,
                    subject: d,


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

      
        const ListItem = ({ text1, text2, text3, text4, onPress }) => (
            <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.9}>
                <View style={{ flexDirection: 'row-reverse' }}>
                    <Image source={require('../assets/image/books.png')} style={{ width: 35, height: 35, marginLeft: 5 }} />
                    <Text style={styles.text}>{text3}</Text>
                </View>
                <View style={{ flexDirection: 'row-reverse' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Addcontent', { fasl_name_fa: text1, fasl_name_en: text2, subject: text3, subject1: text4 })} >
                        <Image source={require('../assets/image/edit.png')} style={{ marginLeft: 5 }} resizeMode='contain' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Changecontent', { fasl_name_fa: text1, fasl_name_en: text2, subject: text3, subject1: text4 })} >
                        <Image source={require('../assets/image/setting.png')} style={{ marginLeft: 5 ,height:35,width:35}} resizeMode='contain' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => showDialog(text1, text3)}>
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
                        <ListItem text1={item.fasl_name_fa} text2={item.fasl_name_en} text3={item.subject} text4={item.subject1}
                            onPress={() => navigation.navigate('Detail',
                                {
                                    fasl_name_en: item.fasl_name_en,
                                    fasl_name_fa: item.fasl_name_fa,

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

        return (

            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 60 }}>



                    <View style={{ flexDirection: 'row-reverse', marginBottom: 10, justifyContent: 'space-around', width: this.width * 5 / 5, alignSelf: 'center' }}>
                        <View style={{ flexDirection: 'row-reverse', alignSelf: 'center' }}>
                            <Text style={{ fontWeight: '900', color: '#D20062', textAlign: 'center', }}>ویرایش فصل</Text>
                            <Text style={{ fontWeight: '900', color: '#D20062', textAlign: 'center', marginHorizontal: 3 }}> | {this.state.fasl_name_fa} </Text>
                        </View>
                        <TouchableOpacity title="برگشت" onPress={() => this.props.navigation.navigate('Admin')} style={{ width: width * 0.75 / 5, justifyContent: 'center', backgroundColor: 'transparent', height: height / 20, borderRadius: 10, alignItems: 'center', alignSelf: 'flex-start' }} >
                            <Image
                                source={require('../assets/icons/back.png')}
                                resizeMode='contain'
                            />

                        </TouchableOpacity>
                    </View>


                    <View style={{ flexDirection: 'row-reverse', marginBottom: 10, width: this.width * 4.5 / 5, alignSelf: 'center' }}>
                        <Image
                            source={require('../assets/image/notice.png')}
                            resizeMode='contain'
                        />
                        <Text style={{ fontWeight: '900', color: 'grey', textAlign: 'center', justifyContent: 'center', alignSelf: 'center' }}> اطلاعات مبحث جدید را وارد کنید</Text>
                    </View>


                    <TextInput
                        placeholder="نام فارسی مبحث جدید را بنویسید"
                        value={this.state.subject}
                        onChangeText={(text) => this.setState({ subject: text })}
                        style={{ alignSelf: 'center', height: 60, borderColor: 'purple', borderWidth: 1, borderRadius: 5, width: width * 4.5 / 5, marginBottom: 20, padding: 5 }}
                    />
                    <TextInput
                        placeholder="نام انگلیسی مبحث جدید را بنویسید"
                        value={this.state.subject1}
                        onChangeText={(text) => this.setState({ subject1: text })}
                        style={{ alignSelf: 'center', height: 60, borderColor: 'purple', borderWidth: 1, borderRadius: 5, width: width * 4.5 / 5, marginBottom: 20, padding: 5 }}
                    />


                    <TouchableOpacity title="اضافه کردن مبحث جدید" onPress={this.handleaddsubject} style={{ width: width * 4.5 / 5, justifyContent: 'center', alignSelf: 'center', backgroundColor: '#06d6a0', height: height / 13, borderRadius: 10 }} >

                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن مبحث جدید</Text>

                    </TouchableOpacity>




                    <View style={{ flexDirection: 'row-reverse', marginVertical: 10 }}>
                        <Text style={{ fontWeight: '900', color: '#D20062', textAlign: 'center', marginRight: 10 }}> لیست مباحث فصل :</Text>
                        <Text style={{ fontWeight: '900', color: '#D20062', textAlign: 'center', marginHorizontal: 3 }}> {this.state.fasl_name_fa}</Text>
                    </View>

                    <Text style={{ marginVertical: 5, fontWeight: '200', color: 'grey', verticalAlign: 'bottom', marginHorizontal: 10, textAlign: 'center', borderBottomColor: 'grey', borderBottomWidth: 1, padding: 5 }}>دراین قسمت می توانید مباحث و محتوای  فصل رو مشاهده کنید  </Text>
                    <ScrollView>
                        <SwipeableItem
                            item={DATA}

                        />
                    </ScrollView>

                {this.state.showtext1 && <Text style={{ textAlign: 'center', color: 'green', fontWeight: '900', marginTop: 10 }}>
                    فصل مورد نظر با موفقیت اضافه شد
                </Text>}
                {this.state.showtext2 && <Text style={{ textAlign: 'center', color: 'red', fontWeight: '900', marginTop: 10 }}>
                    خطا در اضافه کردن فصل جدید
                </Text>}








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
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 8,
        margin: 10,
        elevation: 6,
        borderRadius: 8,

        borderRightWidth: 2,
        borderRightColor: '#FFCDEA',
        borderLeftWidth: 2,
        borderLeftColor: '#FFCDEA',
        width: width * 5.8 / 6,


    },
    text: {
        fontSize: 12,
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