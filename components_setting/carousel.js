import React, { useRef, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';

const { width } = Dimensions.get('window');
const API_URL = 'https://draydinv.ir/extra/carousel.php'; // آدرس API خود را اینجا وارد کنید

const Carousel = () => {
  const flatListRef = useRef(null);
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // دریافت داده‌ها از API
    fetch(API_URL)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false); // اتمام بارگذاری
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex === data.length - 1 ? 0 : prevIndex + 1;
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 3000); // هر 3 ثانیه به اسلاید بعدی بروید

    return () => clearInterval(interval); // پاک کردن تایمر در هنگام پاک شدن کامپوننت
  }, [data]);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode='stretch'/>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </View>
  );

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { opacity: index === currentIndex ? 1 : 0.3 }
            ]}
          />
        ))}
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />
      {renderDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:30,
    
  },
  image: {
    width: width * 0.8,
    height: 200,
    borderRadius: 10,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 15,
    alignSelf:'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    width:width*0.8
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign:'right'
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom:20
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#333',
    marginHorizontal: 5,
  },
});

export default Carousel;
	
