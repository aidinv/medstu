import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';

import {
  HomeStackNavigator,
  OrderStackNavigator,
  OsceStackNavigator,
  PostStackNavigator,
  DiagnoseStackNavigator,
  SettingStackNavigator,
} from './StackNavigator';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const TAB_COUNT = 6;
const tabBarWidth = width * 0.9;
const tabWidth = tabBarWidth / TAB_COUNT;

const slidingWidth = tabWidth * 0.8;
const slidingMargin = (tabWidth - slidingWidth) / 2;

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const translateX = useRef(new Animated.Value(state.index * tabWidth + slidingMargin)).current;

  // موقعیت دایره سبز
  const circleSize = 7;
  const circleTranslateX = useRef(new Animated.Value(state.index * tabWidth + tabWidth / 2 - circleSize / 2)).current;
  const circleTranslateY = useRef(new Animated.Value(0)).current;  // برای پرش عمودی

  useEffect(() => {
    // انیمیشن حرکت sliding background
    Animated.spring(translateX, {
      toValue: state.index * tabWidth + slidingMargin,
      useNativeDriver: true,
      stiffness: 120,
      damping: 20,
    }).start();

    // انیمیشن پرش دایره به صورت قوس‌دار (arc)

    Animated.sequence([
      Animated.parallel([
        // بالا رفتن دایره (پرش)
        Animated.timing(circleTranslateY, {
          toValue: -5,  // ارتفاع پرش
          duration: 500,
          useNativeDriver: true,
        }),
        // حرکت افقی به سمت آیتم جدید
        Animated.timing(circleTranslateX, {
          toValue: state.index * tabWidth + tabWidth / 2 - circleSize / 2,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      // پایین آمدن دایره (نشستن روی آیتم)
      Animated.timing(circleTranslateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

  }, [state.index]);

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#E6F2EA',
        borderRadius: 15,
        width: tabBarWidth,
        marginBottom: 40,
        height: 70,
        elevation: 5,
        overflow: 'hidden',
        alignSelf: 'center',
      }}
    >
      {/* Sliding background */}
      <Animated.View
        style={{
          position: 'absolute',
          width: slidingWidth,
          height: 50,
          backgroundColor: '#fff',
          borderRadius: 15,
          top: 10,
          transform: [{ translateX }],
          zIndex: 0,
          shadowColor: '#06d6a0',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          elevation: 1,
        }}
      />

      {/* دایره سبز با انیمیشن پرش */}
      <Animated.View
        style={{
          position: 'absolute',
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
          backgroundColor: '#06d6a0',
          top: 5,
          transform: [
            { translateX: circleTranslateX },
            { translateY: circleTranslateY },
          ],
          zIndex: 10,
          elevation: 6,
          shadowColor: '#06d6a0',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.7,
          shadowRadius: 3,
        }}
      />

      {/* Tab items */}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const focused = state.index === index;

        const icon = options.tabBarIconSource;
        const label = options.tabBarLabel;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={{
              width: tabWidth,
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}
            activeOpacity={0.7}
          >
            <Image
              source={icon}
              style={{
                width: focused ? 24 : 20,
                height: focused ? 24 : 20,
                tintColor: focused ? '#06d6a0' : 'grey',
                marginBottom: 4,
                resizeMode: 'contain',
              }}
            />
            <Text
              style={{
                fontSize: 10,
                fontFamily: 'morvarid',
                color: focused ? '#06d6a0' : 'grey',
                textAlign: 'center',
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Bottom_Tabs = () => {
  const [fontsLoaded] = useFonts({
    morvarid: require('../assets/fonts/morvarid.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Home11"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'دانشگاه',
          tabBarIconSource: require('../assets/image/article.png'),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Order11"
        component={OrderStackNavigator}
        options={{
          tabBarLabel: 'درمانگاه',
          tabBarIconSource: require('../assets/image/field.png'),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Osce11"
        component={OsceStackNavigator}
        options={{
          tabBarLabel: 'اورژانس',
          tabBarIconSource: require('../assets/image/ambulance1.png'),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Drug11"
        component={PostStackNavigator}
        options={{
          tabBarLabel: 'داروخانه',
          tabBarIconSource: require('../assets/image/drug.png'),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Diagnose11"
        component={DiagnoseStackNavigator}
        options={{
          tabBarLabel: 'مهارت بالینی',
          tabBarIconSource: require('../assets/image/tabib.png'),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Setting11"
        component={SettingStackNavigator}
        options={{
          tabBarLabel: 'صفحه اصلی',
          tabBarIconSource: require('../assets/image/hearticon1.gif'),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default Bottom_Tabs;
