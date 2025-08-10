import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  AppState,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

  const circleSize = 7;
  const circleTranslateX = useRef(new Animated.Value(state.index * tabWidth + tabWidth / 2 - circleSize / 2)).current;
  const circleTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: state.index * tabWidth + slidingMargin,
      useNativeDriver: true,
      stiffness: 120,
      damping: 20,
    }).start();

    Animated.sequence([
      Animated.parallel([
        Animated.timing(circleTranslateY, {
          toValue: -5,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(circleTranslateX, {
          toValue: state.index * tabWidth + tabWidth / 2 - circleSize / 2,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
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
        marginBottom: 20,
        height: 70,
        elevation: 5,
        overflow: 'hidden',
        alignSelf: 'center',
      }}
    >
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
                fontFamily: 'nazanin',
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
    nazanin: require('../assets/fonts/nazanin.ttf'),
  });

  const [username, setUsername] = useState('');
  const [accumulatedMinutes, setAccumulatedMinutes] = useState(0);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    AsyncStorage.getItem('username').then(name => {
      if (name) setUsername(name);
    });
  }, []);

 useEffect(() => {
  if (!username) return;

  const subscription = AppState.addEventListener('change', nextAppState => {
    appState.current = nextAppState;
  });

  const intervalId = setInterval(() => {
    if (appState.current === 'active') {
      sendUsageTime(username);  // فقط ارسال 60 ثانیه ثابت هر دقیقه
    }
  }, 60000);

  return () => {
    subscription.remove();
    clearInterval(intervalId);
  };
}, [username]);


const sendUsageTime = async (username) => {
  try {
    const response = await fetch('https://draydinv.ir/extra/increment_usage.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        date: new Date().toISOString().slice(0, 10),
        timeInSeconds: 60,  // هر بار 60 ثانیه ارسال شود
      }),
    });
    const data = await response.json();
    console.log('Server response:', data);
  } catch (error) {
    console.error('Error sending usage time:', error);
  }
};


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
