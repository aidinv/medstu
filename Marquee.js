import { NavigationContainer } from '@react-navigation/native';
import AutoScroll from "@homielab/react-native-auto-scroll";

import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, Image } from 'react-native';
import * as Font from 'expo-font';

export default class Newsitem_component extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fontsLoaded: false,
            data: [],
            isLoading: true
        };
    }

    async getMovies() {
        try {
            const response = await fetch('https://draydinv.ir/extra/news.php');
            const json = await response.json();
            this.setState({ data: json.news });
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoading: false });
        }
    }

    async componentDidMount() {
        this.getMovies();
        await Font.loadAsync({
            'nazanin': require('./assets/fonts/nazanin.otf'),

        });
        this.setState({ fontsLoaded: true });
    }

    render() {
        const { data, isLoading } = this.state;

        return (


            <View style={{ flex: 1, padding: 5 ,marginTop:15}}>
                {isLoading ? <ActivityIndicator /> : (
                    <View style={styles.container}>
                        <AutoScroll delay={10} endPaddingWidth={-100} isLTR={true} duration={50000} isVertical={false}>
                            <View style={{ flexDirection: 'row-reverse'  }}>
                                {data.map((data) =>
                                    <View key={data.id} style={{ flexDirection: 'row', marginHorizontal:25,justifyContent:'center' }}>

                                        <View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                                <Text style={{ color: 'grey', textAlignVertical: 'center', fontSize: 14, fontFamily: 'nazanin' }}>
                                                    {data.days_passed}</Text>
                                                <Text style={styles.welcome} >{data.title}</Text>
                                            </View>

                                            <Text style={{ color: 'grey', marginTop: 5, fontFamily: 'nazanin', alignSelf:'flex-end'}}>   {data.content}</Text>

                                        </View>
                                        <Image
                                            style={{
                                                width: 70,
                                                height: 70,

                                                tintColor: '',
                                                alignSelf: 'flex-center'
                                            }}
                                            source={require('./assets/image/message1.gif')}
                                            resizeMode='contain'

                                        />




                                    </View>


                                )}

                            </View>
                        </AutoScroll>
                    </View>
                )}
            </View>

        );
    }


};


const styles = StyleSheet.create({
    container: {


        marginTop: 1,
        marginBottom: 1,
        marginHorizontal: 10


    },
    welcome: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "right",
        color: '#2B4865',
        backgroundColor: 'transparent',
        paddingVertical: 5,
        borderRadius: 5,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        fontFamily: 'nazanin'



    },
});