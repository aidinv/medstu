import React, { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import axios from 'axios';

export default function ImagePickerExample() {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    if (Constants.platform.ios) {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('برای دسترسی به تصاویر، اجازه دسترسی به کتابخانه رسانه را بدهید.');
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      // آپلود تصویر به سرور با استفاده از fetch
      await uploadImage(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append('photo', {
      name: 'photo.jpg',
      type: 'image/jpeg',
      uri,
    });

    try {
      const response = await axios.post('http://draydinv.ir/extra/imageupload.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // URL تصویر آپلود شده را دریافت کنید
      const imageUrl = response.imageUrl;
      // تصویر را در قسمت نمایش تصویر نمایش دهید
      setSelectedImage({ uri: imageUrl });
    } catch (error) {
      console.log('errore internet')
    }
  };

  return (
    <View style={styles.container}>
      <Button title="انتخاب عکس" onPress={pickImage} />
      {/* نمایش تصویر در WebView با استفاده از کد HTML */}
      {selectedImage && (
        <WebView
          originWhitelist={['*']}
          source={{ html: `<img src="${selectedImage.uri}" style="width: 100%; height: auto;" />` }}
          style={styles.webview}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webview: {
    width: 300,
    height: 300,
  },
});

