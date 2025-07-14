import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import Homescreen from "../homescreen";

import PostScreen from "../components_post/Postscreen";
import Orderscreen from "../components_message/orderscreen";
import Detailscreen from "../detailscreen";
import Orderdetailscreen from "../components_message/orderdetailscreen";
import Diagnosescreen from "../components_search/diagnosescreen";
import Diagnosedetailscreen from "../components_search/diagnosedetaiscreen";

import Oscescreen from "../components_osce/oscescreen";
import Oscedetailscreen from "../components_osce/oscedetailscreen";
import Settingscreen from "../components_setting/Settingscreen";
import Postdetailscreen from "../components_post/postdetailscreen";







const Stack = createStackNavigator();



const HomeStackNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Group>
        <Stack.Screen name="Home" component={Homescreen} options={{ headerShown: false }} />
        <Stack.Screen name="Detail" component={Detailscreen} options={{ headerShown: false }} />
      </Stack.Group>
    </Stack.Navigator>
  );
}




const SettingStackNavigator = () => {
  return (

    <Stack.Navigator>

      <Stack.Group>
        <Stack.Screen name="Setting" component={Settingscreen} options={{ headerShown: false }} />
      </Stack.Group>

    </Stack.Navigator>

  );
}

const DiagnoseStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Diagnose" component={Diagnosescreen} options={{ headerShown: false }} />
      <Stack.Screen name="Diagnose1" component={Diagnosedetailscreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const PostStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Post" component={PostScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Post1" component={Postdetailscreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const OrderStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Order" component={Orderscreen} options={{ headerShown: false }} />
      <Stack.Screen name="Order1" component={Orderdetailscreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const OsceStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Osce" component={Oscescreen} options={{ headerShown: false }} />
      <Stack.Screen name="Osce1" component={Oscedetailscreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}



export { HomeStackNavigator, OsceStackNavigator, OrderStackNavigator, PostStackNavigator, DiagnoseStackNavigator, SettingStackNavigator };