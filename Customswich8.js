import React, { useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native'




function Customswich_component8({


    selectionmode, option1, option2, option3, option4, option5, option6, option7, option8, option9, option10, option11, option12, option13, option14, option15, option16, option17, option18, onselectswitch
}) {

    const [title, settitle] = useState('اضافه کردن پاراگراف معمولی');
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const [getselectionmode, setselectionmode] = useState(selectionmode);
    const updateswichdata = (value) => {
        setselectionmode(value);
        onselectswitch(value);
        if (value === 1) {
            settitle('اضافه کردن پاراگراف معمولی');
        } else if (value === 2) {
            settitle('اضافه کردن نکته');
        } else if (value === 3) {
            settitle('اضافه کردن توجه');
        } else if (value === 4) {
            settitle('اضافه کردن زیر تیتر');
        } else if (value === 5) {
            settitle('اضافه کردن تیتر نسخه درمانی');
        } else if (value === 6) {
            settitle('اضافه کردن تیتر تشخیص');
        } else if (value === 7) {
            settitle('اضافه کردن تیتر آزمایشگاهی');
        } else if (value === 8) {
            settitle('اضافه کردن تیتر علایم بالینی');
        } else if (value === 9) {
            settitle('اضافه کردن تیتر اپیدمیولوژی');
        } else if (value === 10) {
            settitle('اضافه کردن تیتر درمان');
        } else if (value === 11) {
            settitle('اضافه کردن تیتر اتیولوژی');
        } else if (value === 12) {
            settitle('اضافه کردن عکس ');
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




        <View style={{ alignSelf: 'center', paddingVertical: 0, marginVertical: 10, flexDirection: 'row-reverse',}}>
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
                    backgroundColor: getselectionmode == 2 ? 'yellow' : 'white',
                    borderRadius: 12,
                    width: width * 9 / 77,
                    marginHorizontal: width / 77,
                    padding: 8

                }}
            >
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={require('./assets/image/pen1.png')}
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
                        source={require('./assets/image/notice.png')}
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

                        source={require('./assets/image/dot.png')}
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

                        source={require('./assets/image/equip.png')}
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
                        source={require('./assets/image/think.png')}
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
                        source={require('./assets/img/lab.png')}
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
                        source={require('./assets/image/cough.png')}
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
                        source={require('./assets/image/world.png')}
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
                        source={require('./assets/img/pharmacology1.png')}
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
                        source={require('./assets/image/about.png')}
                        resizeMode='contain'
                    />
                </View>

            </TouchableOpacity>



















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
        marginTop: 5,
        backgroundColor: 'white',


    },
    dot: {
        height: 1,
        width: width * 9 / 10,
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: 'yellow',

        elevation: 5,


    },
});

export default Customswich_component8;