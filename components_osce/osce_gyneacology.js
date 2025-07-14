
import { NavigationContainer } from '@react-navigation/native';

import React, { Component, useState } from 'react';

import {
  ActivityIndicator, FlatList, Text, View, StyleSheet,
  Dimensions, Image, TouchableOpacity, SafeAreaView
} from 'react-native';

import { SwipeableFlatList } from 'react-native-swipe-list';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-virtualized-view';

export default class Osce_gyneacology extends Component {



  width = Dimensions.get('window').width;

  constructor(props) {

    super(props);

    this.state = {
      DATA: [],
      isLoading: true
    };
  }

  async getMovies() {
    try {
      const response = await fetch('https://draydinv.ir/extra/osce_gyneacology.php');
      const json = await response.json();
      this.setState({ DATA: json });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.getMovies();
  }

  emptymessage = () => {
    return (

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <Text style={{ fontWeight: '800', color: 'green' }}>محتوایی برای نمایش یافت نشد !</Text>
      </View>
    )
  }



  render() {
    const { DATA, isLoading } = this.state;
    const { navigation } = this.props;
    const {username}=this.props;
    
    const ListItem = ({ text, onPress }) => (
      <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.9}>

      <View style={{ flexDirection: 'row-reverse' }}>
      <Image source={require('../assets/image/osce.png')} style={{ width: 35, height: 35, marginLeft: 15 }} />
        <Text style={styles.text1}>{text}</Text>
      </View>
     


    </TouchableOpacity>
    );

    const SwipeableItem = ({ item }) => (
      <GestureHandlerRootView>
        <FlatList
          data={item}
          renderItem={({ item }) =>
            <ListItem text={item.name_fa}
              onPress={() => navigation.navigate('Osce1',
                {
                  name_en: item.name_en,
                  name_fa: item.name_fa,
                  cat_fa: item.cat_fa,
                  time :  item.time,
                  writer : item.writer,
                  likes:item.likes,
                  username:username,
                })}
            />}
       
          ListEmptyComponent={this.emptymessage}
        />
      </GestureHandlerRootView>
    );



    return (

      <ScrollView style={{ marginTop: 10 }}>
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
    flexDirection:'row-reverse',
    justifyContent:'space-between',
    backgroundColor: 'white',
    padding: 8,
    margin: 5,
    elevation: 2,
    borderRadius: 4,
    borderRightWidth:2,
    borderRightColor:'#ffdb00',
    borderLeftWidth:2,
    borderLeftColor:'#ffdb00',


  },
  text: {
    fontSize: 15,
    marginRight: 15

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
});