import React, { useRef, useEffect, useState } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import Carouseledit2 from './carouseledit2';

const { width } = Dimensions.get('window');
const API_URL = 'https://draydinv.ir/extra/carousel.php'; // آدرس فایل JSON
const UPLOAD_URL = 'https://draydinv.ir/extra/carouseledit.php'; // آدرس API برای آپلود تصویر جدید

const Carouseledit = () => {
    const flatListRef = useRef(null);
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // دریافت داده‌ها از فایل JSON
        axios.get(API_URL)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const changeImage = async (item) => {
        // درخواست مجوز دسترسی به گالری
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Permission to access gallery is required!");
            return;
        }

        // انتخاب تصویر جدید از گالری
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1, // حداکثر کیفیت تصویر
        });

        if (!pickerResult.canceled) {
            const localUri = pickerResult.assets[0].uri;
            const filename = localUri.split('/').pop();
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : `image`;

            const formData = new FormData();
            formData.append('image', { uri: localUri, name: filename, type });
            formData.append('id', item.id);

            // آپلود تصویر به سرور
            axios.post(UPLOAD_URL, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
                .then((res) => {
                    // جایگزینی تصویر جدید
                    const newData = data.map((d) => (d.id === item.id ? { ...d, image: res.data.image_url } : d));
                    setData(newData);
                    Alert.alert('Success', 'Image updated successfully');
                })
                .catch((error) => {
                    console.error(error);
                    Alert.alert('Error', 'Failed to upload image');
                });
        }
    };

    const updateTitle = (id, newTitle) => {
        // ارسال عنوان جدید به سرور
        axios.post(UPLOAD_URL, { id, title: newTitle })
            .then((res) => {
                // به‌روزرسانی عنوان در لیست محلی
                const newData = data.map((d) => (d.id === id ? { ...d, title: newTitle } : d));
                setData(newData);
                Alert.alert('Success', 'Title updated successfully');
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('Error', 'Failed to update title');
            });
    };

    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            <TouchableOpacity onPress={() => changeImage(item)}>
                <Image source={{ uri: item.image }} style={styles.image} resizeMode='stretch' />
            </TouchableOpacity>
            <TextInput
                style={styles.title}
                value={item.title}
                onChangeText={(text) => updateTitle(item.id, text)}
            />
        </View>
    );

    return (
        <View>
            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
            />
            <Carouseledit2 />
        </View>

    );
};

const styles = StyleSheet.create({
    slide: {
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:25
    },
    image: {
        width: width * 0.8,
        height: 200,
        borderRadius: 10,
    },
    title: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
        backgroundColor: '#f1f1f1',
        padding: 5,
        borderRadius: 5,
        width: '80%',
    },
});

export default Carouseledit;

