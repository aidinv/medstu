import react from "react";
import { Text, View, TouchableOpacity, Dimensions,Button } from 'react-native'
import Setting1 from "./Setting1";
import { ScrollView } from "react-native-virtualized-view";
export default function Settingscreen({ navigation }) {

    width = Dimensions.get('window').width;
    height = Dimensions.get('window').height
    return (

      
            <Setting1 navigation={navigation}/>
        

    );
}
