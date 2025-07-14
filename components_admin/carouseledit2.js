import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button, Alert, TextInput, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';


const API_URL = 'http://draydinv.ir/extra/carouseledit2.php';
const DELETE_API_URL = 'http://draydinv.ir/extra/carouseledit3.php';

const Carouseledit2 = () => {
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    fetchCarouselData();
  }, []);

  const fetchCarouselData = () => {
    axios.get(API_URL)
      .then((response) => {
        if (response.data.status === "success") {
          setData(response.data.items);
        } else {
          Alert.alert("Error", response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error", "Failed to fetch data");
      });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const addItem = async () => {
    if (!newTitle.trim() || !selectedImage) {
      Alert.alert('Error', 'Please provide a title and select an image');
      return;
    }

    const formData = new FormData();
    formData.append('title', newTitle.trim());
    formData.append('image', {
      uri: selectedImage,
      name: selectedImage.split('/').pop(),
      type: 'image/jpeg',
    });

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status === "success") {
        Alert.alert('Success', 'New item added');
        setSelectedImage(null);
        setNewTitle('');
        fetchCarouselData();
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add item');
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await axios.post(
        DELETE_API_URL,
        { id },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.status === "success") {
        Alert.alert("Success", "Item deleted successfully");
        fetchCarouselData(); // بروزرسانی لیست
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to delete item");
    }
  };



  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>

        <Text style={styles.text}>{item.title}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteItem(item.id)} style={styles.deleteButton}>
        <Image
          source={require('../assets/image/trash.png')}
          resizeMode='contain'

        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={{ marginVertical: 10, fontWeight: '900', textAlign: 'center', color: '#D20062', verticalAlign: 'center', marginRight: 10 }}>لیست آیتم های اسلایدر را در این قسمت مشاهده می کنید</Text>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.addButtonContainer}>
        <Text style={{ marginVertical: 10, fontWeight: '900', textAlign: 'center', color: 'green', verticalAlign: 'center', marginRight: 10 }}>برای اضافه کردن آیتم جدید به اسلایدر از این قسمت اقدام کنید</Text>

        <TextInput
          style={styles.textInput}
          placeholder="عنوان را وارد کنید"
          value={newTitle}
          onChangeText={setNewTitle}
        />
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
        )}
        <TouchableOpacity title="ورود" onPress={pickImage} style={{ width: width * 4.5 / 5, justifyContent: 'center', backgroundColor: '#06d6a0', height: height / 18, borderRadius: 10, marginTop: 5 }} >

          <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>انتخاب تصویر</Text>

        </TouchableOpacity>
        <TouchableOpacity title="ورود" onPress={addItem} style={{ width: width * 4.5 / 5, justifyContent: 'center', backgroundColor: '#06d6a0', height: height / 18, borderRadius: 10, marginTop: 5 }} >

          <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن آیتم جدید</Text>

        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

  },
  itemContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#ccc',
    justifyContent: 'space-between',
    borderStyle: 'dotted',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,

  },
  text: {
    fontSize: 16,
    textAlign: 'right',
    marginHorizontal: 10,
    marginVertical: 5
  },
  addButtonContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  previewImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    borderStyle: 'dotted',
    padding: 15,
    width: '100%',
    marginBottom: 10,
  },
  addItemButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#EEEEEE',
    padding: 3,
    elevation: 3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Carouseledit2;

