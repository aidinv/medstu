import React, { useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native'




function Customswich_component({


    selectionmode, option1, option2, option3, option4, option5, option6, option7, option8, option9, option10, option11, option12, option13, option14, option15, option16, option17, option18, onselectswitch
}) {



    const [title, settitle] = useState('بیماری های غدد ومتابولیسم');
    const width = Dimensions.get('window').width;
    const [getselectionmode, setselectionmode] = useState(selectionmode);
    const updateswichdata = (value) => {

        setselectionmode(value);
        onselectswitch(value);
        if (value === 1) {
            settitle('بیماری های کلیه');
        } else if (value === 2) {
            settitle('بیماری های زنان وزایمان');
        } else if (value === 3) {
            settitle('بیماری های جراحی');
        } else if (value === 4) {
            settitle('بیماری های قلب وعروق');
        } else if (value === 5) {
            settitle('بیماری های اورولوژی');
        } else if (value === 6) {
            settitle('بیماری های روماتولوژی');
        } else if (value === 7) {
            settitle('رادیولوژی');
        } else if (value === 8) {
            settitle('فارماکولوژی');
        } else if (value === 9) {
            settitle('بیماری های  چشم');
        } else if (value === 10) {
            settitle('بیماری های  عفونی وگرمسیری');
        } else if (value === 11) {
            settitle('بیماری های ریه ومسمومیت');
        } else if (value === 12) {
            settitle('بیماری مغزواعصاب');
        } else if (value === 13) {
            settitle('بیماری های  گوارش وکبد');
        } else if (value === 14) {
            settitle('بیماری های گوش ، حلق وبینی ');
        } else if (value === 15) {
            settitle('بیماری های ارتوپدی');
        } else if (value === 16) {
            settitle('بیماری های اطفال');
        } else if (value === 17) {
            settitle('بیماری های  پوست ومو');
        } else if (value === 18) {
            settitle('بیماری های غدد ومتابولیسم');
        } else if (value === 19) {
            settitle('بیماری های  خون وسرطان');
        } else if (value === 20) {
            settitle('بیماری های  روانپزشکی');
        } else if (value === 21) {
            settitle('پاتولوژی');
        }
    }

    const numOfPages = 3; // تعداد صفحات را بر اساس نیاز خود تنظیم کنید


    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentPage, setCurrentPage] = useState(0);

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
    );
    const height = Dimensions.get('window').height;
    const dotPosition = Animated.divide(scrollX, width);



    return (


        <View>
            <View style={{ flexDirection: 'row-reverse',}}>
                <View style={{ backgroundColor: '#06d6a0', width: 10, height: 10, borderRadius: 3, justifyContent: 'center', alignSelf: 'center', marginRight: 5 }}></View>
                <Text style={{ marginVertical: 10, fontWeight: '900', color: 'grey', verticalAlign: 'bottom', marginRight: 10, }}>لیست دروس</Text>
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
                        elevation: 3,
                        backgroundColor: getselectionmode == 1 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                        padding: 8,
                        elevation: 6
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
                            source={require('./assets/img/gyneacology1.png')}
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
                            source={require('./assets/img/surgery1.png')}
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

                            source={require('./assets/img/heart1.png')}
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
                            source={require('./assets/img/rhuematology1.png')}
                            resizeMode='contain'

                        />
                    </View>

                </TouchableOpacity>



                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(7)}
                    style={{
                        elevation: 6,
                        backgroundColor: getselectionmode == 7 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                        padding: 8

                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image

                            source={require('./assets/img/radiology1.png')}
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

                            source={require('./assets/img/pharmacology1.png')}
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
                            source={require('./assets/img/infection1.png')}
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

                            source={require('./assets/img/lung1.png')}
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
                            source={require('./assets/img/neurology1.png')}
                            resizeMode='contain'

                        />
                    </View>

                </TouchableOpacity>



                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(13)}
                    style={{
                        elevation: 6,
                        backgroundColor: getselectionmode == 13 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                        padding: 8

                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('./assets/img/digestive1.png')}
                            resizeMode='contain'

                        />
                    </View>

                </TouchableOpacity>


                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(14)}
                    style={{
                        elevation: 6,
                        backgroundColor: getselectionmode == 14 ? 'yellow' : 'white',
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
                    onPress={() => updateswichdata(15)}
                    style={{
                        elevation: 6,
                        backgroundColor: getselectionmode == 15 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                        padding: 8

                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('./assets/img/orthopaedic1.png')}
                            resizeMode='contain'

                        />
                    </View>

                </TouchableOpacity>



                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(16)}
                    style={{
                        elevation: 6,
                        backgroundColor: getselectionmode == 16 ? 'yellow' : 'white',
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
                    onPress={() => updateswichdata(17)}
                    style={{
                        elevation: 6,
                        backgroundColor: getselectionmode == 17 ? 'yellow' : 'white',
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
                    onPress={() => updateswichdata(18)}
                    style={{
                        elevation: 6,
                        backgroundColor: getselectionmode == 18 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                        padding: 8

                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('./assets/img/endocrinology1.png')}
                            resizeMode='contain'

                        />
                    </View>

                </TouchableOpacity>



                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(19)}
                    style={{
                        elevation: 6,
                        backgroundColor: getselectionmode == 19 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                        padding: 8

                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('./assets/img/hematology1.png')}
                            resizeMode='contain'

                        />
                    </View>

                </TouchableOpacity>


                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(20)}
                    style={{
                        elevation: 6,
                        backgroundColor: getselectionmode == 20 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                        padding: 8

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
                    onPress={() => updateswichdata(21)}
                    style={{
                        elevation: 6,
                        backgroundColor: getselectionmode == 21 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 9 / 77,
                        marginHorizontal: width / 77,
                        padding: 8

                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('./assets/img/pathology1.png')}
                            resizeMode='contain'

                        />
                    </View>

                </TouchableOpacity>

            </ScrollView>
            <View style={styles.dotView}>
                {Array.from({ length: numOfPages }, (_, index) => {
                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.1, 3, 0.1],
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
        height: 2,
        width: 100,
        marginHorizontal: 3,
        borderRadius: 20,
        backgroundColor: '#06d6a0',

        elevation: 5,


    },
});

export default Customswich_component;
