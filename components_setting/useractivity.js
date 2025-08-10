import React, { useState, useCallback } from 'react';
import {
    View,
    Dimensions,
    ActivityIndicator,
    Text,
    StyleSheet,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
import LevelProgressBar from './levelprogress';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#EEEEEE',
    color: () => `#06d6a0`,
    labelColor: () => 'transparent',
    strokeWidth: 2,
    decimalPlaces: 1,
};

export default function UsageChart({ username }) {
    const [data, setData] = useState({ datasets: [], persianLabels: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalMinutes, setTotalMinutes] = useState(0);

    const fetchUsage = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(
                'http://draydinv.ir/extra/get_week_data.php',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username }),
                }
            );

            if (!response.ok) throw new Error('خطا در دریافت داده‌ها');

            const json = await response.json();

            if (!json.usage || !Array.isArray(json.usage))
                throw new Error('داده‌های نامعتبر از سرور دریافت شد');

            setData({
                datasets: [{ data: json.usage, strokeWidth: 2 }],
                persianLabels: json.dates || [],
            });

            // گرفتن مجموع کل فعالیت از خروجی API
            setTotalMinutes(json.totalMinutes || 0);

        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            if (username) fetchUsage();
        }, [username])
    );

    if (loading)
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );

    if (error)
        return (
            <View style={{ padding: 16 }}>
                <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
            </View>
        );

    if (!data.datasets.length) return null;

    return (
        <View>
            <View style={{ flexDirection: 'row-reverse', }}>
                <View style={{ backgroundColor: '#06d6a0', width: 10, height: 10, borderRadius: 3, justifyContent: 'center', alignSelf: 'center', marginRight: 5 }}></View>
                 <Text style={styles.infoText}> نمودار میزان مطالعه روزانه شما در یک هفته اخیر</Text>
            </View>
            <LineChart
                data={{
                    datasets: data.datasets,
                }}
                width={screenWidth - 50}
                height={120}
                chartConfig={chartConfig}
                bezier
                withDots={true}
                withInnerLines={false}
                withVerticalLines={false}
                withHorizontalLabels={false}
                withVerticalLabels={false}
                style={styles.chart}
                withOuterLines={false}
            />

            <LevelProgressBar totalMinutes={totalMinutes} />
        </View>
    );
}

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    chart: {
        marginVertical: 5,
        borderRadius: 16,
        marginHorizontal: 5,
        alignSelf: 'center',
    },
    infoText: {
        fontSize: 13,
        padding: 12,
        borderRadius: 10,
        marginBottom: 2,
        marginTop: 10,
        fontFamily: 'nazanin',
        color: '#444',
        alignSelf: 'center'
    }
});
