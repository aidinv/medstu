import React, { useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native'




function Customswich_component4({


    selectionmode, option1, option2, option3, onselectswitch
}) {

    const [title, settitle] = useState('شکایت های اصلی');
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const [getselectionmode, setselectionmode] = useState(selectionmode);
    const updateswichdata = (value) => {
        setselectionmode(value);
        onselectswitch(value);
        if (value === 1) {
            settitle('شکایت های اصلی');
        } else if (value === 2) {
            settitle('یافته های پاراکلینیک');
        }
    }






    return (

        <View>
            <View style={{ flexDirection: 'row-reverse' }}>
                <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}>تشخیص های افتراقی</Text>
                <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginHorizontal: 3 }}>|  {title}</Text>
            </View>

            <View style={{ flexDirection: 'row-reverse', marginVertical: 10, justifyContent: 'space-evenly' }}>


                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updateswichdata(1)}
                    style={{
                        elevation: 3,
                        backgroundColor: getselectionmode == 1 ? '#06d6a0' : 'white',
                        borderRadius: 12,
                        width: width / 2.5,
                        padding: 8,
                        elevation: 6
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
                        backgroundColor: getselectionmode == 2 ? '#ef476f' : 'white',
                        borderRadius: 12,
                        width: width / 2.5,
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
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        paddingHorizontal: 0,
        marginTop: 10,
        marginBottom: 25,
        flexDirection: 'row-reverse'
    }
});

export default Customswich_component4;