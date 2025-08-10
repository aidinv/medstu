import React, { useState } from 'react';
import { Button, Image, View, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Imageuploader() {
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("اجازه دسترسی به گالری داده نشد");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    let formData = new FormData();
    formData.append('image', {
      uri: uri,
      type: 'image/jpeg',
      name: 'upload.jpg',
    });

    try {
      const response = await fetch("https://draydinv.ir/extra/upload.php", {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();

      if (data.success) {
        setImageUri(data.url);
        
      } else {
        Alert.alert("آپلود ناموفق بود");
      }
    } catch (error) {
      Alert.alert("خطا در آپلود", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="انتخاب عکس از گالری" onPress={pickImage} />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
        
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  image: {
    width: 400,
    height: 400,
    marginTop: 20,
    borderRadius: 10,
    resizeMode:'contain'
  }
});
