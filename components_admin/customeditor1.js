import React, { useRef, useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Platform, ScrollView, Animated, Image, Dimensions } from 'react-native';
import WebView from 'react-native-webview';
import Customswich_component8 from '../Customswich8';



import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';



const Editorb = (props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [htmlContent, setHtmlContent] = useState('');
    const [gamestab, setgamestab] = React.useState(1);
    const onselectswich = (value) => {
        setgamestab(value);
    }

    const height = Dimensions.get('window').height;

    const pickImage = async () => {
        // درخواست دسترسی به گالری
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("خطا", "دسترسی به گالری لازم است.");
            return;
        }

        // انتخاب تصویر
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            uploadImage(imageUri);
        }
    };

    const uploadImage = async (imageUri) => {
        try {
            const formData = new FormData();
            const imageName = imageUri.split("/").pop(); // نام فایل
            formData.append("file", {
                uri: imageUri,
                name: imageName,
                type: "image/jpeg", // یا نوع فایل مناسب
            });

            // ارسال تصویر به سرور
            const response = await fetch("https://draydinv.ir/extra/imageupload2.php", {
                method: "POST",
                body: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const data = await response.json();
            if (response.ok && data.imageUrl) {
                addImageToHtml(data.imageUrl);
            } else {
                Alert.alert("خطا", "آپلود تصویر ناموفق بود.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("خطا", "مشکلی پیش آمد.");
        }
    };

    const addImageToHtml = (imageUrl) => {
            let newHtmlContent = `${htmlContent}<img src="${imageUrl}" alt="Uploaded Image" style="width:100vw;border-radius:10px ; height:100vw;"/>`;
            setHtmlContent(newHtmlContent);
    };

    const handleaddcontent = () => {



        fetch('https://draydinv.ir/extra/addnoskhecontent.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({

                name_fa: props.name_fa,
                name_en:props.name_en,
                cours_en:props.cours_en,
                content: htmlContent,


            })
        })
            .then(response => response.json())
            .then(async (data) => {
                if (data.success == true) {


                } else {


                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const isRtl = (text) => {
        const persianRegex = /[\u0600-\u06FF]/;
        return persianRegex.test(text);
    };



    const saveContent = () => {
        const titleDirection = isRtl(title) ? 'rtl' : 'ltr';
        const imageAlignment = isRtl(title) ? 'left' : 'right'; // تعیین جهت تصویر بر اساس جهت عنوان
        const contentDirection = isRtl(content) ? 'rtl' : 'ltr';
        const formattedContent = content.split('\n').join('<br>')
        let newHtmlContent;
        if (title.trim() === '') {
            newHtmlContent = `${htmlContent}<p style="direction: ${contentDirection};margin-Top:0;color:#326E36">${formattedContent}</p>`;

        } else if (content.trim() === '') {
            newHtmlContent = `${htmlContent}<div style="direction: ${titleDirection}; display:flex;align-items:center;margin-bottom:0"><img src="http://img.icons8.com/emoji/48/books-emoji.png" style="float: ${imageAlignment}; width: 35px; height: 35px;" /><h5 style="color: purple; font-weight: bold;padding-Left:7;padding-Right:7">${title}</h5></div>`;
        } else {
            newHtmlContent = `${htmlContent}<div style="direction: ${titleDirection}; display:flex;align-items:center;margin-bottom:0"><img src="http://img.icons8.com/emoji/48/books-emoji.png" style="float: ${imageAlignment}; width: 35px; height: 35px;" /><h5 style="color: purple; font-weight: bold;padding-Left:7;padding-Right:7">${title}</h5></div><p style="direction: ${contentDirection};margin-Top:0;color:#326E36">${formattedContent}</p>`;
        }
        setHtmlContent(newHtmlContent);
        setTitle('');
        setContent('');
    };

    const saveContent1 = () => {
        const titleDirection = isRtl(title) ? 'rtl' : 'ltr';
        const imageAlignment = isRtl(title) ? 'left' : 'right'; // تعیین جهت تصویر بر اساس جهت عنوان
        const contentDirection = isRtl(content) ? 'rtl' : 'ltr';
        const formattedContent = content.split('\n').join('<br>')
        let newHtmlContent;
        if (title.trim() === '') {
            newHtmlContent = `${htmlContent}<p style="direction: ${contentDirection};margin-Top:0;color:#326E36">${formattedContent}</p>`;

        } else if (content.trim() === '') {
            newHtmlContent = `${htmlContent}<div style="direction: ${titleDirection}; display:flex;align-items:center;margin-bottom:0"><img src="http://img.icons8.com/plasticine/100/hand-with-pen.png" style="float: ${imageAlignment}; width: 35px; height: 35px;" /><h5 style="color: purple; font-weight: bold;padding-Left:7;padding-Right:7">${title}</h5></div>`;
        } else {
            newHtmlContent = `${htmlContent}<div style="direction: ${titleDirection}; display:flex;align-items:center;margin-bottom:0"><img src="http://img.icons8.com/plasticine/100/hand-with-pen.png" style="float: ${imageAlignment}; width: 35px; height: 35px;" /><h5 style="color: purple; font-weight: bold;padding-Left:7;padding-Right:7">${title}</h5></div><p style="direction: ${contentDirection};margin-Top:0;color:#326E36">${formattedContent}</p>`;
        }
        setHtmlContent(newHtmlContent);
        setTitle('');
        setContent('');
    };

    const saveContent2 = () => {
        const titleDirection = isRtl(title) ? 'rtl' : 'ltr';
        const imageAlignment = isRtl(title) ? 'left' : 'right'; // تعیین جهت تصویر بر اساس جهت عنوان
        const contentDirection = isRtl(content) ? 'rtl' : 'ltr';
        const formattedContent = content.split('\n').join('<br>')
        let newHtmlContent;
        if (title.trim() === '') {
            newHtmlContent = `${htmlContent}<p style="direction: ${contentDirection};margin-Top:0;color:#326E36">${formattedContent}</p>`;

        } else if (content.trim() === '') {
            newHtmlContent = `${htmlContent}<div style="direction: ${titleDirection}; display:flex;align-items:center;margin-bottom:0"><img src="http://img.icons8.com/doodle/35/error.png" style="float: ${imageAlignment}; width: 35px; height: 35px;" /><h5 style="color: purple; font-weight: bold;padding-Left:7;padding-Right:7">${title}</h5></div>`;
        } else {
            newHtmlContent = `${htmlContent}<div style="direction: ${titleDirection}; display:flex;align-items:center;margin-bottom:0"><img src="http://img.icons8.com/doodle/35/error.png" style="float: ${imageAlignment}; width: 35px; height: 35px;" /><h5 style="color: purple; font-weight: bold;padding-Left:7;padding-Right:7">${title}</h5></div><p style="direction: ${contentDirection};margin-Top:0;color:#326E36">${formattedContent}</p>`;
        }
        setHtmlContent(newHtmlContent);
        setTitle('');
        setContent('');
    };

    const saveContent3 = () => {
        const titleDirection = isRtl(title) ? 'rtl' : 'ltr';
        const imageAlignment = isRtl(title) ? 'left' : 'right'; // تعیین جهت تصویر بر اساس جهت عنوان
        const contentDirection = isRtl(content) ? 'rtl' : 'ltr';
        const formattedContent = content.split('\n').join('<br>')
        let newHtmlContent;
        if (title.trim() === '') {
            newHtmlContent = `${htmlContent}<p style="direction: ${contentDirection};margin-Top:0;color:#326E36">${formattedContent}</p>`;

        } else if (content.trim() === '') {
            newHtmlContent = `${htmlContent}<div style="direction: ${titleDirection}; display:flex;align-items:center;margin-bottom:0;margin-Left:20;margin-Right:20"><img src="http://img.icons8.com/fluency/35/states.png" style="float: ${imageAlignment}; width: 20px; height: 20px;" /><h5 style="color: purple; font-weight: bold;padding-Left:7;padding-Right:7">${title}</h5></div>`;
        } else {
            newHtmlContent = `${htmlContent}<div style="direction: ${titleDirection}; display:flex;align-items:center;margin-bottom:0;margin-Left:20;margin-Right:20"><img src="http://img.icons8.com/fluency/35/states.png" style="float: ${imageAlignment}; width: 20px; height: 20px;" /><h5 style="color: purple; font-weight: bold;padding-Left:7;padding-Right:7">${title}</h5></div><p style="direction: ${contentDirection};margin-Top:0;color:#326E36">${formattedContent}</p>`;
        }
        setHtmlContent(newHtmlContent);
        setTitle('');
        setContent('');
    };

    const saveContent4 = () => {
        const titleDirection = isRtl(title) ? 'rtl' : 'ltr';
        const imageAlignment = isRtl(title) ? 'left' : 'right'; // تعیین جهت تصویر بر اساس جهت عنوان
        const contentDirection = isRtl(content) ? 'rtl' : 'ltr';
        const formattedContent = content.split('\n').join('<br>')
        let newHtmlContent;
        if (title.trim() === '') {
            newHtmlContent = `${htmlContent}<p style="direction: ${contentDirection};margin-Top:0;color:#326E36">${formattedContent}</p>`;

        } else if (content.trim() === '') {
            newHtmlContent = `${htmlContent}<div style="direction: ${titleDirection}; display:flex;align-items:center;margin-bottom:0"><img src="http://img.icons8.com/external-wanicon-lineal-color-wanicon/35/external-drug-hospital-wanicon-lineal-color-wanicon.png" style="float: ${imageAlignment}; width: 35px; height: 35px;" /><h5 style="color: purple; font-weight: bold;padding-Left:7;padding-Right:7">${title}</h5></div>`;
        } else {
            newHtmlContent = `${htmlContent}<div style="direction: ${titleDirection}; display:flex;align-items:center;margin-bottom:0"><img src="http://img.icons8.com/external-wanicon-lineal-color-wanicon/35/external-drug-hospital-wanicon-lineal-color-wanicon.png" style="float: ${imageAlignment}; width: 35px; height: 35px;" /><h5 style="color: purple; font-weight: bold;padding-Left:7;padding-Right:7">${title}</h5></div><p style="direction: ${contentDirection};margin-Top:0;color:#326E36">${formattedContent}</p>`;
        }
        setHtmlContent(newHtmlContent);
        setTitle('');
        setContent('');
    };

    const saveContent5 = () => {
        const titleDirection = isRtl(title) ? 'rtl' : 'ltr';
        const imageAlignment = isRtl(title) ? 'left' : 'right'; // تعیین جهت تصویر بر اساس جهت عنوان
        const contentDirection = isRtl(content) ? 'rtl' : 'ltr';
        const formattedContent = content.split('\n').join('<br>')
        let newHtmlContent;
        if (title.trim() === '') {
            newHtmlContent = `${htmlContent}<p style="direction: ${contentDirection};margin-Top:0;color:#326E36">${formattedContent}</p>`;

        } else if (content.trim() === '') {
            newHtmlContent = `${htmlContent}<div style="direction: ${titleDirection}; display:flex;align-items:center;margin-bottom:0"><img src="http://img.icons8.com/3d-fluency/35/thinking-face-2.png" style="float: ${imageAlignment}; width: 35px; height: 35px;" /><h5 style="color: purple; font-weight: bold;padding-Left:7;padding-Right:7">${title}</h5></div>`;
        } else {
            newHtmlContent = `${htmlContent}<div style="direction: ${titleDirection}; display:flex;align-items:center;margin-bottom:0"><img src="http://img.icons8.com/3d-fluency/35/thinking-face-2.png" style="float: ${imageAlignment}; width: 35px; height: 35px;" /><h5 style="color: purple; font-weight: bold;padding-Left:7;padding-Right:7">${title}</h5></div><p style="direction: ${contentDirection};margin-Top:0;color:#326E36">${formattedContent}</p>`;
        }
        setHtmlContent(newHtmlContent);
        setTitle('');
        setContent('');
    };

    const saveContent6 = () => {
        const titleDirection = isRtl(title) ? 'rtl' : 'ltr';
        const imageAlignment = isRtl(title) ? 'left' : 'right'; // تعیین جهت تصویر بر اساس جهت عنوان
        const contentDirection = isRtl(content) ? 'rtl' : 'ltr';
        const formattedContent = content.split('\n').join('<br>')
        let newHtmlContent;
        if (title.trim() === '') {
            newHtmlContent = `${htmlContent}<p style="direction: ${contentDirection};margin-Top:0;color:#326E36">${formattedContent}</p>`;

        } else if (content.trim() === '') {
            newHtmlContent = `${htmlContent}<div style="direction: ${titleDirection}; display:flex;align-items:center;margin-bottom:0"><img src="http://img.icons8.com/external-wanicon-lineal-color-wanicon/64/external-blood-sample-health-checkup-wanicon-lineal-color-wanicon.png" style="float: ${imageAlignment}; width: 35px; height: 35px;" /><h5 style="color: purple; font-weight: bold;padding-Left:7;padding-Right:7">${title}</h5></div>`;
        } else {
            newHtmlContent = `${htmlContent}<div style="direction: ${titleDirection}; display:flex;align-items:center;margin-bottom:0"><img src="http://img.icons8.com/external-wanicon-lineal-color-wanicon/64/external-blood-sample-health-checkup-wanicon-lineal-color-wanicon.png" style="float: ${imageAlignment}; width: 35px; height: 35px;" /><h5 style="color: purple; font-weight: bold;padding-Left:7;padding-Right:7">${title}</h5></div><p style="direction: ${contentDirection};margin-Top:0;color:#326E36">${formattedContent}</p>`;
        }
        setHtmlContent(newHtmlContent);
        setTitle('');
        setContent('');
    };

    const saveContent7 = () => {
        const titleDirection = isRtl(title) ? 'rtl' : 'ltr';
        const imageAlignment = isRtl(title) ? 'left' : 'right'; // تعیین جهت تصویر بر اساس جهت عنوان
        const contentDirection = isRtl(content) ? 'rtl' : 'ltr';
        const formattedContent = content.split('\n').join('<br>')
        let newHtmlContent;
        if (title.trim() === '') {
            newHtmlContent = `${htmlContent}<p style="direction: ${contentDirection};margin-Top:0;color:#326E36">${formattedContent}</p>`;

        } else if (content.trim() === '') {
            newHtmlContent = `${htmlContent}<div style="direction: ${titleDirection}; display:flex;align-items:center;margin-bottom:0"><img src="http://img.icons8.com/plasticine/100/coughing.png" style="float: ${imageAlignment}; width: 35px; height: 35px;" /><h5 style="color: purple; font-weight: bold;padding-Left:7;padding-Right:7">${title}</h5></div>`;
        } else {
            newHtmlContent = `${htmlContent}<div style="direction: ${titleDirection}; display:flex;align-items:center;margin-bottom:0"><img src="http://img.icons8.com/plasticine/100/coughing.png" style="float: ${imageAlignment}; width: 35px; height: 35px;" /><h5 style="color: purple; font-weight: bold;padding-Left:7;padding-Right:7">${title}</h5></div><p style="direction: ${contentDirection};margin-Top:0;color:#326E36">${formattedContent}</p>`;
        }
        setHtmlContent(newHtmlContent);
        setTitle('');
        setContent('');
    };

    const saveContent8 = () => {
        const titleDirection = isRtl(title) ? 'rtl' : 'ltr';
        const imageAlignment = isRtl(title) ? 'left' : 'right'; // تعیین جهت تصویر بر اساس جهت عنوان
        const contentDirection = isRtl(content) ? 'rtl' : 'ltr';
        const formattedContent = content.split('\n').join('<br>')
        let newHtmlContent;
        if (title.trim() === '') {
            newHtmlContent = `${htmlContent}<p style="direction: ${contentDirection};margin-Top:0;color:#326E36">${formattedContent}</p>`;

        } else if (content.trim() === '') {
            newHtmlContent = `${htmlContent}<div style="direction: ${titleDirection}; display:flex;align-items:center;margin-bottom:0"><img src="http://img.icons8.com/color/35/world.png" style="float: ${imageAlignment}; width: 35px; height: 35px;" /><h5 style="color: purple; font-weight: bold;padding-Left:7;padding-Right:7">${title}</h5></div>`;
        } else {
            newHtmlContent = `${htmlContent}<div style="direction: ${titleDirection}; display:flex;align-items:center;margin-bottom:0"><img src="http://img.icons8.com/color/35/world.png" style="float: ${imageAlignment}; width: 35px; height: 35px;" /><h5 style="color: purple; font-weight: bold;padding-Left:7;padding-Right:7">${title}</h5></div><p style="direction: ${contentDirection};margin-Top:0;color:#326E36">${formattedContent}</p>`;
        }
        setHtmlContent(newHtmlContent);
        setTitle('');
        setContent('');
    };

    const saveContent9 = () => {
        const titleDirection = isRtl(title) ? 'rtl' : 'ltr';
        const imageAlignment = isRtl(title) ? 'left' : 'right'; // تعیین جهت تصویر بر اساس جهت عنوان
        const contentDirection = isRtl(content) ? 'rtl' : 'ltr';
        const formattedContent = content.split('\n').join('<br>')
        let newHtmlContent;
        if (title.trim() === '') {
            newHtmlContent = `${htmlContent}<p style="direction: ${contentDirection};margin-Top:0;color:#326E36">${formattedContent}</p>`;

        } else if (content.trim() === '') {
            newHtmlContent = `${htmlContent}<div style="direction: ${titleDirection}; display:flex;align-items:center;margin-bottom:0"><img src="http://img.icons8.com/emoji/35/pill-emoji.png" style="float: ${imageAlignment}; width: 35px; height: 35px;" /><h5 style="color: purple; font-weight: bold;padding-Left:7;padding-Right:7">${title}</h5></div>`;
        } else {
            newHtmlContent = `${htmlContent}<div style="direction: ${titleDirection}; display:flex;align-items:center;margin-bottom:0"><img src="http://img.icons8.com/emoji/35/pill-emoji.png" style="float: ${imageAlignment}; width: 35px; height: 35px;" /><h5 style="color: purple; font-weight: bold;padding-Left:7;padding-Right:7">${title}</h5></div><p style="direction: ${contentDirection};margin-Top:0;color:#326E36">${formattedContent}</p>`;
        }
        setHtmlContent(newHtmlContent);
        setTitle('');
        setContent('');
    };

    const saveContent10 = () => {
        const titleDirection = isRtl(title) ? 'rtl' : 'ltr';
        const imageAlignment = isRtl(title) ? 'left' : 'right'; // تعیین جهت تصویر بر اساس جهت عنوان
        const contentDirection = isRtl(content) ? 'rtl' : 'ltr';
        const formattedContent = content.split('\n').join('<br>')
        let newHtmlContent;
        if (title.trim() === '') {
            newHtmlContent = `${htmlContent}<p style="direction: ${contentDirection};margin-Top:0;color:#326E36">${formattedContent}</p>`;

        } else if (content.trim() === '') {
            newHtmlContent = `${htmlContent}<div style="direction: ${titleDirection}; display:flex;align-items:center;margin-bottom:0"><img src="http://img.icons8.com/3d-fluency/35/virus.png" style="float: ${imageAlignment}; width: 35px; height: 35px;" /><h5 style="color: purple; font-weight: bold;padding-Left:7;padding-Right:7">${title}</h5></div>`;
        } else {
            newHtmlContent = `${htmlContent}<div style="direction: ${titleDirection}; display:flex;align-items:center;margin-bottom:0"><img src="http://img.icons8.com/3d-fluency/35/virus.png" style="float: ${imageAlignment}; width: 35px; height: 35px;" /><h5 style="color: purple; font-weight: bold;padding-Left:7;padding-Right:7">${title}</h5></div><p style="direction: ${contentDirection};margin-Top:0;color:#326E36">${formattedContent}</p>`;
        }
        setHtmlContent(newHtmlContent);
        setTitle('');
        setContent('');
    };


    const isweb = Platform.OS === 'web';
    const pre3 = `<style>#wrap {transform:scale(0.8);transform-origin:top left;display:block;overflow:hidden;width:calc(100%*1.20);height:calc(100%*1.25)}</style><div id="wrap">`;
    const pre4 = '</div>'

    const numOfPages = 1; // تعداد صفحات را بر اساس نیاز خود تنظیم کنید


    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentPage, setCurrentPage] = useState(0);

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
    );

    const dotPosition = Animated.divide(scrollX, width);

    return (
        <View style={{ height:height,marginTop: 30, marginHorizontal: 5, marginBottom: 60 }} showsVerticalScrollIndicator={false}>

            <View style={{ flexDirection: 'row-reverse', justifyContent: 'center', alignSelf: 'center' }}>
                <Text style={{ marginVertical: 3, fontWeight: '600', color: '#06d6a0', verticalAlign: 'bottom', marginRight: 10, justifyContent: 'center', alignSelf: 'center' }}>  اضافه کردن نسخه به {props.name_fa}</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Customswich_component8 selectionmode={1} onselectswitch={onselectswich} />

            </ScrollView>

            <View style={styles.dotView}>
                {Array.from({ length: numOfPages }, (_, index) => {
                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0, 1, 0],
                        extrapolate: 'clamp',
                    });
                    return (
                        <Animated.View
                            key={index}
                            style={[styles.dot, { opacity }]}
                        />
                    );
                })}
            </View>

            <View>
                {
                    gamestab == 1 &&
                    <View>
                        <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}>عنوان پاراگراف را بنویسید:</Text>

                        <TextInput
                            style={[styles.titleInput, isRtl(title) ? styles.rtlText : styles.ltrText]}
                            onChangeText={setTitle}
                            value={title}
                            placeholder=""
                        />

                        <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> محتوای پاراگراف را وارد کنید:</Text>

                        <TextInput
                            style={[styles.contentInput, isRtl(content) ? styles.rtlText : styles.ltrText]}
                            onChangeText={setContent}
                            value={content}
                            placeholder=""
                            multiline
                        />

                        <TouchableOpacity title="ورود" onPress={saveContent} style={{ marginTop: 3, width: width * 4.5 / 5, justifyContent: 'center', alignSelf: 'center', backgroundColor: '#06d6a0', height: height / 17, borderRadius: 10 }} >

                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن پاراگراف</Text>

                        </TouchableOpacity>


                    </View>

                }

                {
                    gamestab == 2 &&
                    <View>
                        <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}>عنوان پاراگراف را بنویسید:</Text>

                        <TextInput
                            style={[styles.titleInput, isRtl(title) ? styles.rtlText : styles.ltrText]}
                            onChangeText={setTitle}
                            value={title}
                            placeholder=""
                        />

                        <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> محتوای پاراگراف را وارد کنید:</Text>

                        <TextInput
                            style={[styles.contentInput, isRtl(content) ? styles.rtlText : styles.ltrText]}
                            onChangeText={setContent}
                            value={content}
                            placeholder=""
                            multiline
                        />
                        <TouchableOpacity title="ورود" onPress={saveContent1} style={{ marginTop: 3, width: width * 4.5 / 5, justifyContent: 'center', alignSelf: 'center', backgroundColor: '#06d6a0', height: height / 17, borderRadius: 10 }} >

                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن نکته</Text>

                        </TouchableOpacity>

                    </View>
                }

                {
                    gamestab == 3 &&
                    <View>
                        <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}>عنوان پاراگراف را بنویسید:</Text>

                        <TextInput
                            style={[styles.titleInput, isRtl(title) ? styles.rtlText : styles.ltrText]}
                            onChangeText={setTitle}
                            value={title}
                            placeholder=""
                        />

                        <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> محتوای پاراگراف را وارد کنید:</Text>

                        <TextInput
                            style={[styles.contentInput, isRtl(content) ? styles.rtlText : styles.ltrText]}
                            onChangeText={setContent}
                            value={content}
                            placeholder=""
                            multiline
                        />

                        <TouchableOpacity title="ورود" onPress={saveContent2} style={{ marginTop: 3, width: width * 4.5 / 5, justifyContent: 'center', alignSelf: 'center', backgroundColor: '#06d6a0', height: height / 17, borderRadius: 10 }} >

                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن توجه</Text>

                        </TouchableOpacity>

                    </View>
                }

                {
                    gamestab == 4 &&
                    <View>
                        <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}>عنوان پاراگراف را بنویسید:</Text>

                        <TextInput
                            style={[styles.titleInput, isRtl(title) ? styles.rtlText : styles.ltrText]}
                            onChangeText={setTitle}
                            value={title}
                            placeholder=""
                        />

                        <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> محتوای پاراگراف را وارد کنید:</Text>

                        <TextInput
                            style={[styles.contentInput, isRtl(content) ? styles.rtlText : styles.ltrText]}
                            onChangeText={setContent}
                            value={content}
                            placeholder=""
                            multiline
                        />
                        <TouchableOpacity title="ورود" onPress={saveContent3} style={{ marginTop: 3, width: width * 4.5 / 5, justifyContent: 'center', alignSelf: 'center', backgroundColor: '#06d6a0', height: height / 17, borderRadius: 10 }} >

                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن زیر تیتر</Text>

                        </TouchableOpacity>

                    </View>
                }

                {
                    gamestab == 5 &&
                    <View>
                        <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}>عنوان پاراگراف را بنویسید:</Text>

                        <TextInput
                            style={[styles.titleInput, isRtl(title) ? styles.rtlText : styles.ltrText]}
                            onChangeText={setTitle}
                            value={title}
                            placeholder=""
                        />

                        <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> محتوای پاراگراف را وارد کنید:</Text>

                        <TextInput
                            style={[styles.contentInput, isRtl(content) ? styles.rtlText : styles.ltrText]}
                            onChangeText={setContent}
                            value={content}
                            placeholder=""
                            multiline
                        />

                        <TouchableOpacity title="ورود" onPress={saveContent4} style={{ marginTop: 3, width: width * 4.5 / 5, justifyContent: 'center', alignSelf: 'center', backgroundColor: '#06d6a0', height: height / 17, borderRadius: 10 }} >

                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن تیتر نسخه درمانی</Text>

                        </TouchableOpacity>

                    </View>
                }

                {
                    gamestab == 6 &&
                    <View>
                        <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}>عنوان پاراگراف را بنویسید:</Text>

                        <TextInput
                            style={[styles.titleInput, isRtl(title) ? styles.rtlText : styles.ltrText]}
                            onChangeText={setTitle}
                            value={title}
                            placeholder=""
                        />

                        <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> محتوای پاراگراف را وارد کنید:</Text>

                        <TextInput
                            style={[styles.contentInput, isRtl(content) ? styles.rtlText : styles.ltrText]}
                            onChangeText={setContent}
                            value={content}
                            placeholder=""
                            multiline
                        />

                        <TouchableOpacity title="ورود" onPress={saveContent5} style={{ marginTop: 3, width: width * 4.5 / 5, justifyContent: 'center', alignSelf: 'center', backgroundColor: '#06d6a0', height: height / 17, borderRadius: 10 }} >

                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن تیتر تشخیص</Text>

                        </TouchableOpacity>
                    </View>
                }

                {
                    gamestab == 7 &&
                    <View>
                        <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}>عنوان پاراگراف را بنویسید:</Text>

                        <TextInput
                            style={[styles.titleInput, isRtl(title) ? styles.rtlText : styles.ltrText]}
                            onChangeText={setTitle}
                            value={title}
                            placeholder=""
                        />

                        <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> محتوای پاراگراف را وارد کنید:</Text>

                        <TextInput
                            style={[styles.contentInput, isRtl(content) ? styles.rtlText : styles.ltrText]}
                            onChangeText={setContent}
                            value={content}
                            placeholder=""
                            multiline
                        />

                        <TouchableOpacity title="ورود" onPress={saveContent6} style={{ marginTop: 3, width: width * 4.5 / 5, justifyContent: 'center', alignSelf: 'center', backgroundColor: '#06d6a0', height: height / 17, borderRadius: 10 }} >

                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن تیتر آزمایشگاهی</Text>

                        </TouchableOpacity>

                    </View>
                }

                {
                    gamestab == 8 &&
                    <View>
                        <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}>عنوان پاراگراف را بنویسید:</Text>

                        <TextInput
                            style={[styles.titleInput, isRtl(title) ? styles.rtlText : styles.ltrText]}
                            onChangeText={setTitle}
                            value={title}
                            placeholder=""
                        />

                        <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> محتوای پاراگراف را وارد کنید:</Text>

                        <TextInput
                            style={[styles.contentInput, isRtl(content) ? styles.rtlText : styles.ltrText]}
                            onChangeText={setContent}
                            value={content}
                            placeholder=""
                            multiline
                        />
                        <TouchableOpacity title="ورود" onPress={saveContent7} style={{ marginTop: 3, width: width * 4.5 / 5, justifyContent: 'center', alignSelf: 'center', backgroundColor: '#06d6a0', height: height / 17, borderRadius: 10 }} >

                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن تیتر علایم بالینی</Text>

                        </TouchableOpacity>

                    </View>
                }

                {
                    gamestab == 9 &&
                    <View>
                        <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}>عنوان پاراگراف را بنویسید:</Text>

                        <TextInput
                            style={[styles.titleInput, isRtl(title) ? styles.rtlText : styles.ltrText]}
                            onChangeText={setTitle}
                            value={title}
                            placeholder=""
                        />

                        <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> محتوای پاراگراف را وارد کنید:</Text>

                        <TextInput
                            style={[styles.contentInput, isRtl(content) ? styles.rtlText : styles.ltrText]}
                            onChangeText={setContent}
                            value={content}
                            placeholder=""
                            multiline
                        />

                        <TouchableOpacity title="ورود" onPress={saveContent8} style={{ marginTop: 3, width: width * 4.5 / 5, justifyContent: 'center', alignSelf: 'center', backgroundColor: '#06d6a0', height: height / 17, borderRadius: 10 }} >

                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن تیتر اپیدمیولوژی</Text>

                        </TouchableOpacity>

                    </View>
                }

                {
                    gamestab == 10 &&
                    <View>
                        <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}>عنوان پاراگراف را بنویسید:</Text>

                        <TextInput
                            style={[styles.titleInput, isRtl(title) ? styles.rtlText : styles.ltrText]}
                            onChangeText={setTitle}
                            value={title}
                            placeholder=""
                        />

                        <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> محتوای پاراگراف را وارد کنید:</Text>

                        <TextInput
                            style={[styles.contentInput, isRtl(content) ? styles.rtlText : styles.ltrText]}
                            onChangeText={setContent}
                            value={content}
                            placeholder=""
                            multiline
                        />
                        <TouchableOpacity title="ورود" onPress={saveContent9} style={{ marginTop: 3, width: width * 4.5 / 5, justifyContent: 'center', alignSelf: 'center', backgroundColor: '#06d6a0', height: height / 17, borderRadius: 10 }} >

                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن تیتر درمان</Text>

                        </TouchableOpacity>

                    </View>
                }

                {
                    gamestab == 11 &&
                    <View>
                        <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}>عنوان پاراگراف را بنویسید:</Text>

                        <TextInput
                            style={[styles.titleInput, isRtl(title) ? styles.rtlText : styles.ltrText]}
                            onChangeText={setTitle}
                            value={title}
                            placeholder=""
                        />

                        <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> محتوای پاراگراف را وارد کنید:</Text>

                        <TextInput
                            style={[styles.contentInput, isRtl(content) ? styles.rtlText : styles.ltrText]}
                            onChangeText={setContent}
                            value={content}
                            placeholder=""
                            multiline
                        />

                        <TouchableOpacity title="ورود" onPress={saveContent10} style={{ marginTop: 3, width: width * 4.5 / 5, justifyContent: 'center', alignSelf: 'center', backgroundColor: '#06d6a0', height: height / 17, borderRadius: 10 }} >

                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن تیتر اتیولوژی</Text>

                        </TouchableOpacity>

                    </View>
                }

{
                    gamestab == 12 &&
                    <View>
                        <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}>عنوان پاراگراف را بنویسید:</Text>

                        <TextInput
                            style={[styles.titleInput, isRtl(title) ? styles.rtlText : styles.ltrText]}
                            onChangeText={setTitle}
                            value={title}
                            placeholder=""
                            readOnly={true}
                        />

                        <Text style={{ marginVertical: 10, fontWeight: '900', color: '#D20062', verticalAlign: 'bottom', marginRight: 10 }}> محتوای پاراگراف را وارد کنید:</Text>

                        <TextInput
                            style={[styles.contentInput, isRtl(content) ? styles.rtlText : styles.ltrText]}
                            onChangeText={setContent}
                            value={content}
                            placeholder=""
                            multiline
                            readOnly={true}
                        />

                        <TouchableOpacity title="انتخاب تصویر از گالری" onPress={pickImage} style={{ marginTop: 3, width: width * 4.5 / 5, justifyContent: 'center', alignSelf: 'center', backgroundColor: '#06d6a0', height: height / 17, borderRadius: 10 }} >

                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن عکس</Text>

                        </TouchableOpacity>

                    </View>
                }







            </View>



            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{ marginVertical: 10, fontWeight: '600', color: 'grey', verticalAlign: 'bottom', justifyContent: 'center', alignSelf: 'center' }}>پیش نمایشی از مطالب را دراین قسمت مشاهده می کنید </Text>





                {isweb ? (<iframe srcDoc={pre3 + htmlContent + pre4} style={{ border: 'none', width: '100%', minHeight:200, paddingBottom: 0, marginBottom: 0 }} width={width} />) : (
                    <WebView
                       
                        style={{ width: '98%',minHeight:200, alignSelf: 'center', backgroundColor: 'transparent' }}
                        originWhitelist={['*']}
                        source={{ html: htmlContent }}
                        scalesPageToFit={false}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />

                )}




                <TouchableOpacity title="ورود" onPress={handleaddcontent} style={{ marginTop: 3, width: width * 4.5 / 5, justifyContent: 'center', alignSelf: 'center', backgroundColor: '#06d6a0', height: height / 17, borderRadius: 10 }} >

                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن محتوا</Text>

                </TouchableOpacity>
            </ScrollView>






        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginTop: 30
    },
    titleInput: {
        height: 50,
        borderWidth: 1,
        marginBottom: 5,
        padding: 10,
        borderColor: 'purple',
        borderRadius: 8
    },
    contentInput: {
        height: 200,
        borderWidth: 1,
        marginBottom: 5,
        padding: 10,
        borderColor: 'purple',
        borderRadius: 8,
        alignContent: 'flex-start',
        textAlignVertical: 'top',

    },
    rtlText: {
        textAlign: 'right',
    },
    ltrText: {
        textAlign: 'left',
    }, dotView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 5,
        backgroundColor: 'white',


    },
    dot: {
        height: 1,
        width: width * 9 / 10,
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: 'yellow',

        elevation: 5,


    },
});

export default Editorb;