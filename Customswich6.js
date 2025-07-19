import React, { useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native'




function Customswich_component6({

    selectionmodea, option1, option2, option3, option4, option5, option6, option7, option8, option9, option10, option11, option12, option13, option14, option15, option16, option17, option18, onselectswitcha
}) {

    const [title, settitle] = useState('دروس');
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const [a, setselectionmodea] = useState(selectionmodea);
    const updateswichdata = (value) => {
        setselectionmodea(value);
        onselectswitcha(value);
        if(value===1){
            settitle('دروس');
        }else if(value===2){
            settitle('داروخانه');
        }else if(value===3){
            settitle('کاربران');
        }else if(value===4){
            settitle('نسخه نویسی');
        }else if(value===5){
            settitle(' تشخیص افتراقی');
        }else if(value===6){
            settitle('مهارت بالینی');
        }else if(value===7){
            settitle('اخبار و اسلایدر');
        }
       
    }

    const numOfPages = 1; // تعداد صفحات را بر اساس نیاز خود تنظیم کنید


    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentPage, setCurrentPage] = useState(0);

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
    );

    const dotPosition = Animated.divide(scrollX, width);
    return (


        <View>
            <View style={{ flexDirection: 'row-reverse' }}>
                <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> مدیریت بخش </Text>
                <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginHorizontal: 3 }}>|  {title}</Text>
            </View>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                style={{alignSelf:'center'}}
                contentContainerStyle={{paddingVertical: 5, marginVertical: 10, flexDirection: 'row-reverse',  justifyContent: 'center'}}


            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(1)}
                    style={{
                        elevation: 6,
                        backgroundColor: a == 1 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                        padding: 8,
                        elevation: 3
                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                        <Image
                            source={require('./assets/image/books.png')}
                            resizeMode='contain'
                        />
                    </View>


                </TouchableOpacity>



                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(2)}
                    style={{
                        elevation: 6,
                        backgroundColor: a == 2 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                        padding: 8

                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('./assets/img/pharmacology1.png')}
                            resizeMode='contain'
                        />
                    </View>

                </TouchableOpacity>



                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(3)}
                    style={{
                        elevation: 6,
                        backgroundColor: a == 3 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                        padding: 8

                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('./assets/image/users.png')}
                            resizeMode='contain'
                        />
                    </View>
                </TouchableOpacity>



                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(4)}
                    style={{
                        elevation: 6,
                        backgroundColor: a == 4 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                        padding: 8

                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image

                            source={require('./assets/image/equip.png')}
                            resizeMode='contain'

                        />
                    </View>

                </TouchableOpacity>



                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(5)}
                    style={{
                        elevation: 6,
                        backgroundColor: a == 5 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                        padding: 8

                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image

                            source={require('./assets/image/think.png')}
                            resizeMode='contain'

                        />
                    </View>


                </TouchableOpacity>



                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(6)}
                    style={{
                        elevation: 6,
                        backgroundColor: a == 6 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                        padding: 8

                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('./assets/image/ambulance.png')}
                            resizeMode='contain'

                        />
                    </View>

                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(7)}
                    style={{
                        elevation: 6,
                        backgroundColor: a == 7 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                        padding: 8,
                        height:55

                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('./assets/image/instagram.png')}
                            resizeMode='contain'

                        />
                    </View>

                </TouchableOpacity>



          



               



               



               

            </ScrollView>
            <View style={styles.dotView}>
                {Array.from({ length: numOfPages }, (_, index) => {
                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0, 1, 0],
                        extrapolate: 'clamp',
                    });
                    return (
                        <Animated.View
                            key={index}
                            style={[styles.dot, { opacity }]}
                        />
                    );
                })}
            </View>
        </View>

    );
}
const height2 = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    dotView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 5,
        backgroundColor:'white',
        

    },
    dot: {
        height: 1,
        width: width*9/10,
        alignSelf:'center',
        borderRadius: 20,
        backgroundColor: 'yellow',

        elevation: 5,


    },
});

export default Customswich_component6;