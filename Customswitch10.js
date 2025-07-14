import React, { useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'




function Customswich_component10({ sendxtoparent, selectionmode, option1, option2, option3, option4, option5, option6, option7, option8, option9, option10, option11, option12, option13, option14, option15, option16, option17, option18, onselectswitch }) {



    const [title, settitle] = useState('شکایت های اصلی');
    const width = Dimensions.get('window').width;
    const [getselectionmode, setselectionmode] = useState(selectionmode);
    const updateswichdata = (value) => {
        sendxtoparent(value);
        setselectionmode(value);
        onselectswitch(value);
        if (value === 1) {
            settitle('تظاهرات بالینی');
        } else if (value === 2) {
            settitle('تظاهرات بیوشیمیایی');
        }
    }

    const numOfPages = 0; // تعداد صفحات را بر اساس نیاز خود تنظیم کنید


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
            <View style={{ flexDirection: 'row-reverse' }}>
                <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}>مدیریت تشخیص های افتراقی</Text>
                <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginHorizontal: 3 }}>|  {title}</Text>
            </View>

            <View style={{ flexDirection: 'row-reverse', marginVertical: 10, justifyContent: 'space-evenly' }}>


                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(1)}
                    style={{

                        backgroundColor: getselectionmode == 1 ? 'yellow' : 'white',
                        borderRadius: 12,
                        width: width * 1 / 2.5,
                        marginHorizontal: width / 77,
                        padding: 8,
                        elevation: 6,
                        alignSelf: 'center'
                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                        <Image
                            source={require('./assets/img/examination.png')}
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
                        width: width * 1 / 2.5,
                        marginHorizontal: width / 77,
                        padding: 8,
                        alignSelf: 'center'

                    }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('./assets/img/lab.png')}
                            resizeMode='contain'
                        />
                    </View>

                </TouchableOpacity>




            </View>
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
        height: 5,
        width: 10,
        borderRadius: 20,
        backgroundColor: '#864AF9',

        elevation: 5,


    },
});

export default Customswich_component10;
