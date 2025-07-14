import { useState } from 'react';
import { Button, Image, View, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // گرفتن تصویر از گالری
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // ارسال تصویر به سرور
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    const formData = new FormData();
    const localUri = uri;
    const filename = localUri.split('/').pop();
    const type = `image/${filename.split('.').pop()}`;
    const imageFile = {
      uri: localUri,
      name: filename,
      type: type,
    };
    
    formData.append('file', imageFile);

    try {
      let response = await fetch('https://draydinv.ir/extra/uploader.php', {
        method: 'POST',
        body: formData,
      });
      
      let result = await response.json();
      
      if (response.ok) {
        Alert.alert('Image uploaded successfully!', `Image URL: ${result.imageUrl}`);
      } else {
        Alert.alert('Image upload failed!', result.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'There was an error uploading the image.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
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
  image: {
    width: 300,
    height: 300,
  },
});
