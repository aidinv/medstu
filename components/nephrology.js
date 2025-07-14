import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Sample data
const DATA = [
  { id: '1', title: 'قلب' },
  { id: '2', title: 'کبد' },
  { id: '3', title: 'مغز' },
  { id: '4', title: 'روده' },
  // ... more items
];

// Item component
const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

// Main component
const Nephrology = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(DATA);

  // Search filter
  const handleSearch = (text) => {
    const filteredData = DATA.filter(item =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setSearchQuery(text);
    setData(filteredData);
  };

  // Render item
  const renderItem = ({ item }) => <Item title={item.title} />;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search here..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:10
  },
  title: {
    fontSize: 32,
  },
  searchBar: {
    fontSize: 24,
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius:10,
    
    textAlign:'right'

  },
});

export default Nephrology;

