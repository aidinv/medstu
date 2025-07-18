import React, { Component, useState } from 'react';

import {
    FlatList, Text, View, TextInput,
    Dimensions, Image, TouchableOpacity, SafeAreaView, StyleSheet, RefreshControl
} from 'react-native';
import { SwipeableFlatList } from 'react-native-swipe-list';
import { ScrollView } from 'react-native-virtualized-view';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Dialog, AlertNotificationRoot, ALERT_TYPE, Toast } from 'react-native-alert-notification';

export default class Editdrugscreen extends Component {


    width = Dimensions.get('window').width;

    constructor(props) {
        super(props);
        this.state = {

            name1: this.props.route.params.name1,
            name2: this.props.route.params.name2,
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
            const response = await fetch('https://draydinv.ir/extra/drugs_detail.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                body: JSON.stringify({
                    name2: this.state.name2,
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






    render() {

        const { DATA, isLoading, refreshing } = this.state;
        const { navigation } = this.props;


        const showDialog = (c, d) => {

            fetch('https://draydinv.ir/extra/deletesubject.php', {
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
                    <TouchableOpacity onPress={() => navigation.navigate('Adddrugcontent1', { name1: text1, name2: text2, subject: text3, subject1: text4 })} >
                        <Image source={require('../assets/image/edit.png')} style={{ marginLeft: 5 }} resizeMode='contain' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Changecontent', { name1: text1, name2: text2, subject: text3, subject1: text4 })} >
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
                        <ListItem text1={item.name1} text2={item.name2} text3={item.subject} text4={item.subject1}
                            onPress={() => navigation.navigate('Detail',
                                {
                                    name1: item.name1,
                                    name2: item.name2,

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
                            <Text style={{ fontWeight: '900', color: '#D20062', textAlign: 'center', }}>ویرایش داروی</Text>
                            <Text style={{ fontWeight: '900', color: '#D20062', textAlign: 'center', marginHorizontal: 3 }}> | {this.state.name1} </Text>
                        </View>
                        <TouchableOpacity title="برگشت" onPress={() => this.props.navigation.navigate('Admin')} style={{ width: width * 0.75 / 5, justifyContent: 'center', backgroundColor: 'transparent', height: height / 20, borderRadius: 10, alignItems: 'center', alignSelf: 'flex-start' }} >
                            <Image
                                source={require('../assets/icons/back.png')}
                                resizeMode='contain'
                            />

                        </TouchableOpacity>
                    </View>


                

            




                    <View style={{ flexDirection: 'row-reverse', marginVertical: 10 }}>
                        <Text style={{ fontWeight: '900', color: '#D20062', textAlign: 'center', marginRight: 10 }}> لیست مباحث داروی :</Text>
                        <Text style={{ fontWeight: '900', color: '#D20062', textAlign: 'center', marginHorizontal: 3 }}> {this.state.name1}</Text>
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