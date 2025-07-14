import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, ScrollView } from 'react-native';

import { useFonts } from 'expo-font';

const Count = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [counts, setCounts] = useState({});

    let [fontsLoaded] = useFonts({
        'dast': require('../assets/fonts/dast.otf'),
      
    });






    useEffect(() => {
        // دریافت داده از سرور
        fetch('https://draydinv.ir/extra/getcount.php')
            .then(response => response.json())
            .then(jsonData => {
                setData(jsonData); // فرض می‌کنیم jsonData به صورت آرایه‌ای از اشیاء است
                setLoading(false);
                initializeCounters(jsonData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const initializeCounters = (items) => {
        const initialCounts = {};
        items.forEach((item, index) => {
            const key = Object.keys(item)[0]; // گرفتن کلید (مثلاً count_noskhe)
            initialCounts[key] = 0;
            let currentCount = 0;

            const interval = setInterval(() => {
                if (currentCount < item[key]) {
                    currentCount += 1;
                    setCounts(prevCounts => ({
                        ...prevCounts,
                        [key]: currentCount,
                    }));
                } else {
                    clearInterval(interval);
                }
            }, 30); // سرعت شمارش را با تغییر این مقدار کنترل کنید
        });
    };

    if (loading) {
        return <Text>در حال بارگذاری...</Text>;
    }

    return (
        <ScrollView style={{ flexDirection: 'row', marginVertical: 10 ,transform: [{ scaleX: -1 }] }} horizontal showsHorizontalScrollIndicator={false} inverted={false}>

            {data.map((item, index) => {
                const key = Object.keys(item)[0]; // گرفتن کلید (مثلاً count_noskhe)
                return (
                    <View key={index}
                        style={{
                            backgroundColor: '#EEEEEE',
                            borderWidth:0.75,
                            borderStyle:'dotted',
                            elevation: 0,
                            margin: 5,
                            padding: 10,
                            width: Dimensions.get('window').width * 1.5 / 5,
                            borderRadius: 10, marginHorizontal: 5,
                            transform: [{ scaleX: -1 }] 
                        }}

                    >
                        <Text style={{ fontSize: 15, fontFamily: 'dast', textAlign: 'center',color:'green' ,fontWeight:'600'}}>
                            {key}
                        </Text>
                        <Text style={{color:'purple', fontSize: 15, fontFamily: 'dast', textAlign: 'center' ,marginTop:5}}>
                            {counts[key] || 0}
                        </Text>
                    </View>
                );
            })}
        </ScrollView>
    );
};

export default Count;

