import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';

const levelCount = 50;
const maxThreshold = 20000;
const stepWidth = 50; // عرض هر مرحله شامل margin (برای محاسبات عرض پس‌زمینه)

const generateLevelThresholds = () => {
    let thresholds = [];
    for (let i = 0; i < levelCount; i++) {
        if (i < 10) {
            thresholds.push(50 + i * 50);
        } else if (i < 25) {
            thresholds.push(550 + (i - 10) * 250);
        } else if (i < 40) {
            thresholds.push(4250 + (i - 25) * 400);
        } else {
            thresholds.push(10250 + (i - 40) * 700);
        }
    }
    return thresholds;
};


const levelThresholds = generateLevelThresholds();

export default function LevelProgressBar({ totalMinutes }) {
    const animatedValues = useRef(levelThresholds.map(() => new Animated.Value(0))).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    const currentLevelIndex = levelThresholds.findIndex((threshold) => totalMinutes < threshold);
    const validLevelIndex = currentLevelIndex === -1 ? levelCount - 1 : currentLevelIndex;

    const minutesToNext =
        validLevelIndex < levelCount - 1 ? levelThresholds[validLevelIndex] - totalMinutes : 0;

    useEffect(() => {
        let remainingPercent = Math.min(totalMinutes / maxThreshold, 1) * 100;
        const stepPercent = 100 / levelCount;

        const animations = animatedValues.map((anim, idx) => {
            const fill = Math.min(remainingPercent, stepPercent);
            remainingPercent -= fill;
            return Animated.timing(anim, {
                toValue: fill / stepPercent,
                duration: 300,
                useNativeDriver: false,
            });
        });

        Animated.sequence(animations).start();
    }, [totalMinutes]);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.3,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

      const [fontsLoaded] = useFonts({
        nazanin: require('../assets/fonts/nazanin.otf'),
      });

    return (
        <View style={styles.container}>

            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-around',alignItems:'center', }}>

              
                <Text style={styles.infoText}>
                      مجموع زمان مطالعه شما    :  {totalMinutes} دقیقه                 سطح فعلی  : {validLevelIndex + 1}
                </Text>

            </View>


            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.stepsContainer}
                ref={(ref) => {
                    if (ref && validLevelIndex >= 0) {
                        setTimeout(() => {
                            ref.scrollTo({ x: stepWidth * validLevelIndex - 100, animated: true });
                        }, 200);
                    }
                }}
            >
                {/* لایه بک‌گراند سبز پشت دایره‌های سپری شده */}
                <View
                    style={[
                        styles.completedBackground,
                        { width: stepWidth * (validLevelIndex + 1) },
                    ]}
                />

                {levelThresholds.map((threshold, idx) => {
                    const isCompleted = totalMinutes >= threshold;
                    const isCurrent = idx === validLevelIndex;

                    const circle = (
                        <Animated.View
                            style={[
                                styles.stepCircle,
                                {
                                    backgroundColor: isCompleted ? '#06d6a0' : '#eee',
                                    borderWidth: isCurrent ? 2 : 1,
                                    borderColor: isCurrent ? '#06d6a0' : '#aaa',
                                },
                            ]}
                        >
                            <Text style={[styles.stepLabel, { color: isCompleted ? '#fff' : '#666' }]}>
                                {isCompleted ? '✓' : idx + 1}
                            </Text>
                        </Animated.View>
                    );

                    return (
                        <View key={idx} style={styles.stepWrapper}>
                            {isCurrent ? (
                                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                                    {circle}
                                </Animated.View>

                            ) : (
                                circle
                            )}
                            <Text
                                style={[
                                    styles.thresholdLabel,
                                    isCurrent && {
                                        backgroundColor: '',
                                        borderRadius: 10,

                                        color: 'black',
                                        width: 80,
                                        paddingHorizontal: 6,
                                        paddingVertical: 8,
                                    },
                                ]}
                            >
                                {isCurrent ? `سطح بعدی: ${minutesToNext} دقیقه` : ''}
                            </Text>

                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginTop: 10,
    },
    infoText: {
        fontSize: 13,
        backgroundColor: '#EEEEEE',
        padding: 12,
        borderRadius: 10,
        marginBottom: 5,
        fontFamily: 'nazanin',
        color: '#444',
    },
    stepsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        paddingTop: 15,
        position: 'relative', // برای لایه بک‌گراند
    },
    completedBackground: {
        position: 'absolute',
        left: 0,
        top: 20, // وسط دایره‌ها (تقریباً)
        height: 40, // ارتفاع دایره‌ها
        backgroundColor: '#d0f0e8', // رنگ سبز روشن دلخواه برای پس‌زمینه سپری شده
        borderRadius: 10,
        zIndex: 0,
    },
    stepWrapper: {
        alignItems: 'center',
        marginHorizontal: 6,
        width: stepWidth - 10,
        zIndex: 1, // بالاتر از بک‌گراند
    },
    stepCircle: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepLabel: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    thresholdLabel: {
        marginTop: 10,
        fontSize: 10,
        color: 'white',
        fontFamily: 'nazanin',
        textAlign: 'center',

    },
});
