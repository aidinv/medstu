import React, { useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native'




function Customswich_component3({


    selectionmode, option1, option2,onselectswitch
}) {


    const width = Dimensions.get('window').width;
    const height =Dimensions.get('window').height;
    const [getselectionmode, setselectionmode] = useState(selectionmode);
    const updateswichdata = (value) => {
        setselectionmode(value);
        onselectswitch(value);
    }

    
    



    return (

        <View style={{flexDirection:'row-reverse',marginVertical:15 ,justifyContent:'center'}}>
         
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => updateswichdata(1)}
            style={{
                elevation: 3,
                backgroundColor: getselectionmode == 1 ? 'white' : 'white',
                borderBottomWidth:4,
                borderBottomColor:getselectionmode == 1 ? '#06d6a0' : 'white',
                borderTopRightRadius:12,
                width: width /2.2,
                padding: 15,
                elevation: 6
            }}
        >
            <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{fontWeight:'700'}}>ورود</Text>
            </View>


        </TouchableOpacity>



        <TouchableOpacity
            activeOpacity={1}
            onPress={() => updateswichdata(2)}
            style={{
                elevation: 6,
                backgroundColor: getselectionmode == 2 ? 'white' : 'white',
                borderBottomColor:getselectionmode == 2 ? '#ef476f' : 'white',
                borderBottomWidth:4,
                borderTopLeftRadius:12,
                width: width/2.2,
                padding: 15

            }}
        >
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{fontWeight:'700'}}>ثبت نام</Text>
            </View>

        </TouchableOpacity>
   
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

export default Customswich_component3;