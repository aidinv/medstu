import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SwipeableFlatList } from 'react-native-swipe-list';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:15,
    marginHorizontal:10
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    elevation: 3,
    borderRadius: 15,
    alignItems: 'center',


  },
  text: {
    fontSize: 15,
    
  },
  rightAction1: {
    backgroundColor: '#E59BE9',
    borderRadius: 10,
    margin: 12,
    marginHorizontal: 5,
    elevation: 10,
   
  },
  actionText: {
    color: 'white',
    fontWeight: '700',
   padding:20
  },
});

const DATA = [
  { id: '1', title: 'غربالگری درزنان' },
  { id: '2', title: 'خونریزی بعد زایمان' },
  { id: '3', title: 'مراقبت های حین زایمان' },
  
];

const ListItem = ({ text }) => (
  <View style={styles.item}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const SwipeableItem = ({ item }) => (
  <GestureHandlerRootView>
    <SwipeableFlatList
      data={item}
      renderItem={({ item }) => <ListItem text={item.title} />}
      renderRightActions={() => (
        
          <TouchableOpacity style={styles.rightAction1} >
            <View >
              <Text style={styles.actionText}>یادداشت</Text>
            </View>
          </TouchableOpacity>
      

      )}
      renderLeftActions={() => (
        
        <TouchableOpacity style={styles.rightAction1} >
          <View >
            <Text style={styles.actionText}>دانلود</Text>
          </View>
        </TouchableOpacity>
    

    )}
    />
  </GestureHandlerRootView>
);


const Swip = () => {
  const [data1, setData] = useState(DATA);

 
  return (
    <SafeAreaView style={styles.container}>
      <SwipeableItem
        item={data1}
      />
    </SafeAreaView>
  );
};

export default Swip;