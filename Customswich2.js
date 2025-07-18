import React, { useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native'




function Customswich_component2({


    selectionmode, option1, option2, option3, option4, option5, option6, option7, option8, option9, option10, option11, option12, option13, option14, option15, option16, option17, option18, onselectswitch
}) {

    const [title, settitle] = useState('چشم');
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const [getselectionmode, setselectionmode] = useState(selectionmode);
    const updateswichdata = (value) => {
        setselectionmode(value);
        onselectswitch(value);
        if(value===1){
            settitle(' داخلی وجراحی');
        }else if(value===2){
            settitle('اطفال');
        }else if(value===3){
            settitle('عفونی وگرمسیری');
        }else if(value===4){
            settitle('زنان وزایمان');
        }else if(value===5){
            settitle(' اورولوژی');
        }else if(value===6){
            settitle('پوست ومو');
        }else if(value===7){
            settitle('روانپزشکی');
        }else if(value===8){
            settitle('گوش ، حلق وبینی');
        }else if(value===9){
            settitle('چشم');
        }else if(value===10){
            settitle('مغز واعصاب');
        }else if(value===11){
            settitle('مسمومیت');
        }else if(value===12){
            settitle('ضمائم');
        }
    }

    const numOfPages = 2; // تعداد صفحات را بر اساس نیاز خود تنظیم کنید


    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentPage, setCurrentPage] = useState(0);

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
    );

    const dotPosition = Animated.divide(scrollX, width);
    return (


        <View>
           <View style={{ flexDirection: 'row-reverse',}}>
                <View style={{ backgroundColor: '#06d6a0', width: 10, height: 10, borderRadius: 3, justifyContent: 'center', alignSelf: 'center', marginRight: 5 }}></View>
                <Text style={{ marginVertical: 10, fontWeight: '900', color: 'grey', verticalAlign: 'bottom', marginRight: 10, }}>درمانگاه</Text>
                <Text style={{ marginVertical: 10, fontWeight: '900', color: 'grey', verticalAlign: 'bottom', marginHorizontal: 3 }}>|  {title}</Text>
            </View>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingVertical: 5, marginVertical: 10, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}


            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(1)}
                    style={{
                        elevation: 6,
                        backgroundColor: getselectionmode == 1 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                        padding: 8,
                        elevation: 3
                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                        <Image
                            source={require('./assets/img/nephrology1.png')}
                            resizeMode='contain'
                        />
                    </View>


                </TouchableOpacity>



                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(2)}
                    style={{
                        elevation: 6,
                        backgroundColor: getselectionmode == 2 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                        padding: 8

                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('./assets/img/child1.png')}
                            resizeMode='contain'
                        />
                    </View>

                </TouchableOpacity>



                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(3)}
                    style={{
                        elevation: 6,
                        backgroundColor: getselectionmode == 3 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                        padding: 8

                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('./assets/img/infection1.png')}
                            resizeMode='contain'
                        />
                    </View>
                </TouchableOpacity>



                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(4)}
                    style={{
                        elevation: 6,
                        backgroundColor: getselectionmode == 4 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                        padding: 8

                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image

                            source={require('./assets/img/gyneacology1.png')}
                            resizeMode='contain'

                        />
                    </View>

                </TouchableOpacity>



                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(5)}
                    style={{
                        elevation: 6,
                        backgroundColor: getselectionmode == 5 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                        padding: 8

                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image

                            source={require('./assets/img/urology1.png')}
                            resizeMode='contain'

                        />
                    </View>


                </TouchableOpacity>



                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(6)}
                    style={{
                        elevation: 6,
                        backgroundColor: getselectionmode == 6 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                        padding: 8

                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('./assets/img/skin1.png')}
                            resizeMode='contain'

                        />
                    </View>

                </TouchableOpacity>



                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(7)}
                    style={{
                        backgroundColor: getselectionmode == 7 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                        padding: 8,
                        elevation: 6


                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image

                            source={require('./assets/img/psychiatrics1.png')}
                            resizeMode='contain'

                        />
                    </View>

                </TouchableOpacity>



                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(8)}
                    style={{
                        elevation: 6,
                        backgroundColor: getselectionmode == 8 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                        padding: 8

                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image

                            source={require('./assets/img/ear1.png')}
                            resizeMode='contain'

                        />
                    </View>

                </TouchableOpacity>


                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(9)}
                    style={{
                        elevation: 6,
                        backgroundColor: getselectionmode == 9 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                        padding: 8

                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image

                            source={require('./assets/img/eye1.png')}
                            resizeMode='contain'

                        />
                    </View>

                </TouchableOpacity>



                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(10)}
                    style={{
                        elevation: 6,
                        backgroundColor: getselectionmode == 10 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                        padding: 8

                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('./assets/img/neurology1.png')}
                            resizeMode='contain'

                        />
                    </View>

                </TouchableOpacity>



                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(11)}
                    style={{
                        elevation: 6,
                        backgroundColor: getselectionmode == 11 ? 'yellow' : 'white',
                        padding: 8,
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image

                            source={require('./assets/img/poison.png')}
                            resizeMode='contain'

                        />
                    </View>

                </TouchableOpacity>



                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(12)}
                    style={{
                        elevation: 6,
                        backgroundColor: getselectionmode == 12 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                        padding: 8

                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('./assets/img/attach.png')}
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
const styles = StyleSheet.create({
    dotView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 5

    },
    dot: {
        height: 5,
        width: 5,
        marginHorizontal:3,
        borderRadius: 20,
        backgroundColor: '#06d6a0',

        elevation: 5,


    },
});

export default Customswich_component2;