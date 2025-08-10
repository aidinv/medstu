import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const Count = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    'nazanin': require('../assets/fonts/nazanin.otf'),
  });

  useEffect(() => {
    fetch('https://draydinv.ir/extra/getcount.php')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, []);

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#6A1B9A" />
        <Text style={styles.loadingText}>در حال بارگذاری...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {data.map((item, index) => {
          const key = Object.keys(item)[0];
          const value = item[key];

          return (
            <View key={index} style={styles.card}>
              <Text style={styles.label}>{value}  {key}</Text>
            
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Count;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  loadingContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 5,
    fontSize: 13,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: (Dimensions.get('window').width - 36) / 1, // دو ستون
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 6,
    marginBottom: 8,
    alignItems: 'center',
  },
  label: {
    fontFamily: 'nazanin',
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  value: {
    fontFamily: 'nazanin',
    fontSize: 14,
    color: '#6A1B9A',
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
  },
});
