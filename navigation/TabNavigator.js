import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from 'expo-font';
import { HomeStackNavigator, OsceStackNavigator, OrderStackNavigator, PostStackNavigator, DiagnoseStackNavigator, SettingStackNavigator } from "./StackNavigator"

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;




const Tab = createBottomTabNavigator();

const Bottom_Tabs = () => {

    const [fontsLoaded] = useFonts({
        'morvarid': require('../assets/fonts/morvarid.ttf'),
    });


    return (

        <Tab.Navigator

            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    
                    backgroundColor: 'transparent',
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                    elevation: 2,
                    backgroundColor: '#EEEEEE',
                    flexWrap: 'wrap',
                    marginBottom: 30,
                    marginHorizontal:10,
                    marginTop: 0,
                    shadowColor: '#06d6a0'

                }
            }}
        >
            <Tab.Screen name="Home11" component={HomeStackNavigator} options={{
                headerShown: false
                , tabBarIcon: ({ focused }) => (
                    <View style={{width: width * 1.4 / 10, height: '100%', alignItems: 'center',  borderBottomColor: focused ? '#06d6a0' : '#EEEEEE', borderTopColor: focused ? '#06d6a0' : '#EEEEEE', borderTopWidth: 3, borderTopLeftRadius: 10 ,paddingTop:10}}>
                        <Image source={require('../assets/image/article.png')}
                            resizeMode='contain'
                            style={{
                                width: focused ? '45%' : '40%',
                                height: focused ? '100%' : '90%',



                                tintColor: focused ? '#06d6a0' : 'grey',
                                resizeMode: 'contain',

                            }}
                        />
                        <Text style={{ padding: 3, fontFamily: 'morvarid', backgroundColor: focused ? 'white' : '#EEEEEE', borderRadius: 5, height: '50%', width: '90%', textAlign: 'center', textAlignVertical: 'center', marginTop: '15%', color: focused ? '#06d6a0' : 'grey', fontSize: 10, }}>دانشگاه</Text>
                    </View>
                )
            }} />

            <Tab.Screen name="Order11" component={OrderStackNavigator} options={{
                headerShown: false
                , tabBarIcon: ({ focused }) => (
                    <View style={{ width: width * 1.4 / 10, height: '100%', alignItems: 'center',  borderBottomColor: focused ? '#06d6a0' : '#EEEEEE', borderTopColor: focused ? '#06d6a0' : '#EEEEEE', borderTopWidth: 3,paddingTop:10 }}>
                        <Image source={require('../assets/image/field.png')}
                            resizeMode='contain'
                            style={{
                                width: focused ? '45%' : '40%',
                                height: focused ? '100%' : '90%',


                                tintColor: focused ? '#06d6a0' : 'grey',
                                resizeMode: 'contain',

                            }}
                        />
                        <Text style={{ padding: 3, fontFamily: 'morvarid', backgroundColor: focused ? 'white' : '#EEEEEE', borderRadius: 5, height: '50%', width: '90%', textAlign: 'center', textAlignVertical: 'center', marginTop: '15%', color: focused ? '#06d6a0' : 'grey', fontSize: 10, }}>درمانگاه</Text>
                    </View>

                ),
                // tabBarBadge: '1',
                // tabBarBadgeStyle: { backgroundColor: '#F8E559', fontSize: 9, fontWeight: 'bold', marginTop: 10, color: '#D20062', fontWeight: 'bold' }
            }} />


            {/* <Tab.Screen name="Setting11"  component={SettingStackNavigator} options={{
                headerShown: false
            
                , tabBarIcon: ({ focused }) => (
                    <View style={{ width: width * 1.76 / 10, height: '90%', alignItems: 'center', justifyContent: 'center',marginBottom:50,borderRadius:200,backgroundColor:'#EEEEEE',elevation:10,shadowColor:'#06d6a0' ,borderWidth:2,borderColor:'#EEEEEE'}}>
                        <Image source={require('../assets/image/hearticon1.gif')}
                            resizeMode='contain'
                            style={{
                                width:  focused ? '45%' : '40%',
                                height: focused ? '45%' : '40%',


                                tintColor: focused ? '#06d6a0' : 'grey',
                                resizeMode: 'contain',

                            }}
                        />
                        <Text style={{ height: '40%', width: '100%', textAlign: 'center', textAlignVertical: 'center', marginTop: '5%', color: focused ? '#06d6a0' : 'grey', fontSize: 10, fontWeight: '900' }}>صفحه من</Text>
                    </View>

                )
            }} /> */}

            <Tab.Screen name="Osce11" component={OsceStackNavigator} options={{
                headerShown: false
                , tabBarIcon: ({ focused }) => (
                    <View style={{ width: width * 1.4 / 10, height: '100%', alignItems: 'center', borderBottomColor: focused ? '#06d6a0' : '#EEEEEE', borderTopColor: focused ? '#06d6a0' : '#EEEEEE', borderTopWidth: 3, paddingTop:10}}>
                        <Image source={require('../assets/image/ambulance1.png')}
                            resizeMode='contain'
                            style={{
                                width: focused ? '45%' : '40%',
                                height: focused ? '100%' : '90%',


                                tintColor: focused ? '#06d6a0' : 'grey',
                                resizeMode: 'contain',

                            }}
                        />
                        <Text style={{ padding: 3, fontFamily: 'morvarid', backgroundColor: focused ? 'white' : '#EEEEEE', borderRadius: 5, height: '50%', width: '90%', textAlign: 'center', textAlignVertical: 'center', marginTop: '15%', color: focused ? '#06d6a0' : 'grey', fontSize: 9, }}>مهارت های بالینی</Text>
                    </View>

                ),
                // tabBarBadge: '1',
                // tabBarBadgeStyle: { backgroundColor: '#F8E559', fontSize: 9, fontWeight: 'bold', marginTop: 10, color: '#D20062', fontWeight: 'bold' }
            }} />





            <Tab.Screen name="Drug11" component={PostStackNavigator} options={{
                headerShown: false
                , tabBarIcon: ({ focused }) => (
                    <View style={{ width: width * 1.4 / 10, height: '100%', alignItems: 'center',  borderBottomColor: focused ? '#06d6a0' : '#EEEEEE', borderTopColor: focused ? '#06d6a0' : '#EEEEEE', borderTopWidth: 3, paddingTop:10}}>
                        <Image source={require('../assets/image/drug.png')}
                            resizeMode='contain'
                            style={{
                                width: focused ? '45%' : '40%',
                                height: focused ? '100%' : '90%',


                                tintColor: focused ? '#06d6a0' : 'grey',
                                resizeMode: 'contain',

                            }}
                        />
                        <Text style={{ padding: 3, fontFamily: 'morvarid', backgroundColor: focused ? 'white' : '#EEEEEE', borderRadius: 5, height: '50%', width: '90%', textAlign: 'center', textAlignVertical: 'center', marginTop: '15%', color: focused ? '#06d6a0' : 'grey', fontSize: 10, }}>داروخانه</Text>
                    </View>

                ),
                // tabBarBadge: '1',
                // tabBarBadgeStyle: { backgroundColor: '#F8E559', fontSize: 9, fontWeight: 'bold', marginTop: 10, color: '#D20062', fontWeight: 'bold' }
            }} />



            <Tab.Screen name="Diagnose11" component={DiagnoseStackNavigator} options={{
                headerShown: false
                , tabBarIcon: ({ focused }) => (
                    <View style={{ width: width * 1.4 / 10, height: '100%', alignItems: 'center', borderTopColor: focused ? '#06d6a0' : '#EEEEEE', borderTopWidth: 3, borderTopRightRadius: 0 ,paddingTop:10}}>
                        <Image source={require('../assets/image/tabib.png')}
                            resizeMode='contain'
                            style={{
                                width: focused ? '45%' : '40%',
                                height: focused ? '100%' : '90%',


                                tintColor: focused ? '#06d6a0' : 'grey',
                                resizeMode: 'contain',

                            }}
                        />
                        <Text style={{ padding: 3, fontFamily: 'morvarid', backgroundColor: focused ? 'white' : '#EEEEEE', borderRadius: 5, height: '50%', width: '90%', textAlign: 'center', textAlignVertical: 'center', marginTop: '15%', color: focused ? '#06d6a0' : 'grey', fontSize: 9, }}>تشخیص افتراقی</Text>
                    </View>

                )

            }} />

            <Tab.Screen name="Setting11" component={SettingStackNavigator} options={{
                headerShown: false
                , tabBarIcon: ({ focused }) => (
                    <View style={{ width: width * 1.4 / 10, height: '100%', alignItems: 'center', borderTopColor: focused ? '#06d6a0' : '#EEEEEE', borderTopWidth: 3, borderTopRightRadius: 3,paddingTop:10 }}>
                        <Image source={require('../assets/image/hearticon1.gif')}
                            resizeMode='contain'
                            style={{
                                width: focused ? '45%' : '40%',
                                height: focused ? '100%' : '90%',


                                tintColor: focused ? '#06d6a0' : 'grey',
                                resizeMode: 'contain',

                            }}
                        />
                        <Text style={{ padding: 3, fontFamily: 'morvarid', backgroundColor: focused ? 'white' : '#EEEEEE', borderRadius: 5, height: '50%', width: '90%', textAlign: 'center', textAlignVertical: 'center', marginTop: '15%', color: focused ? '#06d6a0' : 'grey', fontSize: 9, }}>صفحه اصلی</Text>
                    </View>

                )

            }} />










        </Tab.Navigator>
    );

}

export default Bottom_Tabs;



