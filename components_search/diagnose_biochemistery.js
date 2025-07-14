
import { NavigationContainer } from '@react-navigation/native';

import React, { Component, useState } from 'react';

import {
  ActivityIndicator, FlatList, Text, View, StyleSheet,
  Dimensions, Image, TouchableOpacity, SafeAreaView,
  ScrollView
} from 'react-native';

import { SwipeableFlatList } from 'react-native-swipe-list';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const width =Dimensions.get('window').width;

export default class Diagnose_biochemistery extends Component {




  constructor(props) {
    super(props);

    this.state = {
      DATA: [],
      isLoading: true,
      isLoading1: true,
    };
  }

  async getMovies() {
    try {
      const response = await fetch('https://draydinv.ir/extra/diagnose_biochemistery.php');
      const json = await response.json();
      this.setState({
        DATA: json.map(item => ({
          ...item, likes: 0
        })), isLoading1: false
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
      this.setState({ isLoading1: false });
    }
  }

  componentDidMount() {
    this.getMovies();
  }

  handlelike = id => {
    const newdata = this.state.DATA.map(item => {
      if (item.id === id) {
        const updatedlikes = item.likes + 1;
        fetch('https://draydinv.ir/extra/login.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
            likes:updatedlikes}),
        });
        return {...item,likes:updatedlikes};
      }
      return item;
    });
    this.setState({DATA:newdata});
  };

  emptymessage = () => {
    return (

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <Text style={{fontWeight:'800' , color:'green'}}>محتوایی برای نمایش یافت نشد !</Text>
      </View>
    )
  }


  render() {
    const { DATA, isLoading } = this.state;
    const { navigation } = this.props;

    const ListItem = ({ text1, onPress, text2 }) => (
      <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.9}>

      <View style={{ flexDirection: 'row-reverse' }}>
        <Image source={require('../assets/image/noskhe1.png')} style={{ width: 35, height: 35, marginLeft: 5 }} />
        <Text style={styles.text1}>{text1}</Text>
      </View>
      
        <Text style={styles.text2}>{text2}</Text>

    </TouchableOpacity>
    );

    const SwipeableItem = ({ item }) => (
      <GestureHandlerRootView>
        <FlatList
          data={item}
          renderItem={({ item }) =>
            <ListItem text1={item.name_fa} text2={item.name_en} 
              onPress={() => navigation.navigate('Diagnose1',
                {
                  name_fa: item.name_fa,
                  name_en: item.name_en,
                  
                 
                })}
            />}
          
          ListEmptyComponent={this.emptymessage}

        />
      </GestureHandlerRootView>
    );


    return (


      <ScrollView style={{ marginTop: 0 }}>
        {isLoading ?
          <View>
            <ActivityIndicator size={'large'} color={'#E59BE9'} />
            <Text style={{ alignSelf: 'center', marginTop: 5 }}>در حال بارگذاری</Text>
          </View>
          : (
            <SafeAreaView >
              <SwipeableItem
                item={DATA}
              />
            </SafeAreaView>
          )}
      </ScrollView>

    );
  }



};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    marginTop: 5,
    marginBottom: 10,

    marginHorizontal: 10
  },
  welcome: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
    marginHorizontal: 0,
    color: '#2B4865',
    backgroundColor: '#F5F8FA',
    padding: 10,
    borderRadius: 5,

  },
  item: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 8,
    margin: 10,
    elevation: 6,
    borderRadius: 8,

    borderRightWidth: 2,
    borderRightColor: '#FFCDEA',
    borderLeftWidth: 2,
    borderLeftColor: '#FFCDEA',
    width: width * 5.8 / 6,


  },
  text: {
    fontSize: 15,
  
    alignSelf: 'center'
  },
  text1: {
    fontSize: 15,
    alignSelf:'center',
    fontWeight: '700',
    textAlign: 'center'

  },
  text2: {
    fontSize: 15,
    alignSelf:'center',
    fontWeight: '700',
    textAlign: 'center'

  },
  rightAction1: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 12,
    marginHorizontal: 5,
    elevation: 10,

  },
  actionText: {
    color: 'black',
    fontWeight: '700',
    padding: 20
  },
});