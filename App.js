import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, ScrollView } from 'react-native';




import * as React from 'react';
import 'react-native-gesture-handler';
import Bottom_Tabs from './navigation/TabNavigator';
import Loginscreen from './loginscreen';
import { createStackNavigator } from '@react-navigation/stack';

import Adminscreen from './components_admin/adminscreen'
import Admin_cours from './components_admin/admin_cours';
import Addfaslscreen from './components_admin/addfaslscreen';
import Editfaslscreen from './components_admin/editfaslscreen';
import Addcontentscreen from './components_admin/addcontentscreen';
import Admin_noskhe from './components_admin/admin_noskhe';
import Addnoskhescreen from './components_admin/addnoskhescreen';
import Addcontentnoskhescreen from './components_admin/addcontentnoskhescreen';
import Admin_diagnose from './components_admin/admin_diagnose';
import Adddiagnosefaslscreen from './components_admin/Adddiagnosefaslscreen';
import Editdiagnosefaslscreen from './components_admin/editdiagnosefaslscreen';
import Addcontentdiagnosescreen from './components_admin/addcontentdiagnosescreen';
import Addoscefaslscreen from './components_admin/addoscefaslscreen';
import Admin_osce from './components_admin/admin_osce';
import Editoscefaslscreen from './components_admin/editoscefaslscreen';
import Addcontentoscescreen from './components_admin/addcontentoscescreen';
import Usercreen from './component_user/userscreen';
import Aboutscreen from './component_about/aboutscreen';

import Changecontentscreen from './components_admin/changecontentscreen';
import Changeoscecontentscreen from './components_admin/changeoscecontentscreen';
import Changecontentdiagnosescreen from './components_admin/changediagnosecontentscreen';
import Changecontentnoskhescreen from './components_admin/changenoskhecontentscreen';
import Admin_pharmacy from './components_admin/admin_pharmacy';
import Add_drugscreen from './components_admin/adddrugscreen';
import Editdrugscreen from './components_admin/editdrugscreen';
import Addcontentdrugscreen from './components_admin/addcontentdrugscreen';
import Newsscreen from './components_news/newsscreen';
import Admin_news from './components_admin/admin_news';
import Add_newscreen from './components_admin/addnewsscreen';

const Stack = createStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Group>
          <Stack.Screen name="Login" component={Loginscreen} options={{ headerShown: false }} />
          <Stack.Screen name="Bottom_Tabs1" component={Bottom_Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="Admin" component={Adminscreen} options={{ headerShown: false }} />
          <Stack.Screen name="Admincours" component={Admin_cours} options={{ headerShown: false }} />
          <Stack.Screen name="Addfasl" component={Addfaslscreen} options={{ headerShown: false }} />
          <Stack.Screen name="Editfasl" component={Editfaslscreen} options={{ headerShown: false }} />
          <Stack.Screen name="Addcontent" component={Addcontentscreen} options={{ headerShown: false }} />
          <Stack.Screen name="Admin_noskhe1" component={Admin_noskhe} options={{ headerShown: false }} />
          <Stack.Screen name="Changecontent" component={Changecontentscreen} options={{ headerShown: false }} />
          <Stack.Screen name="Changeoscecontent" component={Changeoscecontentscreen} options={{ headerShown: false }} />
          <Stack.Screen name="Changediagnosecontent" component={Changecontentdiagnosescreen} options={{ headerShown: false }} />
          <Stack.Screen name="Changenoskhecontent" component={Changecontentnoskhescreen} options={{ headerShown: false }} />

          <Stack.Screen name="User" component={Usercreen} options={{ headerShown: false }} />
          <Stack.Screen name="About" component={Aboutscreen} options={{ headerShown: false }} />

          <Stack.Screen name="Add_noskhe1" component={Addnoskhescreen} options={{ headerShown: false }} />
          <Stack.Screen name="Add_contentnoskhe" component={Addcontentnoskhescreen} options={{ headerShown: false }} />

          <Stack.Screen name="Admindiagnose" component={Admin_diagnose} options={{ headerShown: false }} />
          <Stack.Screen name="Adddiagnosefasl" component={Adddiagnosefaslscreen} options={{ headerShown: false }} />
          <Stack.Screen name="Editdiagnosefasl" component={Editdiagnosefaslscreen} options={{ headerShown: false }} />
          <Stack.Screen name="Adddiagnosecontent" component={Addcontentdiagnosescreen} options={{ headerShown: false }} />

          <Stack.Screen name="adminosce" component={Admin_osce} options={{ headerShown: false }} />
          <Stack.Screen name="Addoscefasl" component={Addoscefaslscreen} options={{ headerShown: false }} />
          <Stack.Screen name="Editoscefasl" component={Editoscefaslscreen} options={{ headerShown: false }} />
          <Stack.Screen name="Addoscecontent" component={Addcontentoscescreen} options={{ headerShown: false }} />

          <Stack.Screen name="Adminpharmacy" component={Admin_pharmacy} options={{ headerShown: false }} />
          <Stack.Screen name="Adddrug1" component={Add_drugscreen} options={{ headerShown: false }} />
           <Stack.Screen name="Editdrug1" component={Editdrugscreen} options={{ headerShown: false }} />
            <Stack.Screen name="Adddrugcontent1" component={Addcontentdrugscreen} options={{ headerShown: false }} />
            <Stack.Screen name="News1" component={Newsscreen} options={{ headerShown: false }} />
          
         <Stack.Screen name="Adminnews" component={Admin_news} options={{ headerShown: false }} />
          <Stack.Screen name="Addnews1" component={Add_newscreen} options={{ headerShown: false }} />

        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>



  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

