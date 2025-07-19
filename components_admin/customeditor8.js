import React, { useEffect, useState, useRef, } from 'react';
import { View, TextInput, Button, ScrollView, Text, Animated, Image, Dimensions, StyleSheet, TouchableOpacity, Platform, } from 'react-native';
import { WebView } from 'react-native-webview';
import { Picker } from '@react-native-picker/picker';
import { parseDOM } from 'htmlparser2';
import Customswich_component12 from '../Customswitch12';
import { Directions } from 'react-native-gesture-handler';

const Editorj = (props) => {
    const [elements, setElements] = useState([]);
    const [htmlContent, setHtmlContent] = useState("");
    const [newTitle, setNewTitle] = useState(""); // عنوان متن جدید
    const [newText, setNewText] = useState(""); // متن زیر عنوان
    const [insertIndex, setInsertIndex] = useState(null); // محل انتخاب برای افزودن متن جدید
    

    const [gamestab, setgamestab] = React.useState(1);
    const onselectswich = (value) => {
        setgamestab(value);
    }

    const height = Dimensions.get('window').height;

    useEffect(() => {
        fetch('https://draydinv.ir/extra/gethtmlforedite3.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            body: JSON.stringify({
              name_en: props.name_en,
              cours_en:props.cours_en
            })
          })
            .then(response => response.json())
            .then(data => {
                let html = data.html_content;
                html = html.replace(/<br\s*\/?>/g, '\n'); // تبدیل <br> به \n برای نمایش بهتر

                const parsedElements = parseDOM(html);
                setElements(parsedElements);
                setHtmlContent(html);
            })
            .catch(error => console.error(error));
    }, []);

    const domToHtml = (dom) => {
        let html = "";
        dom.forEach(element => {
            if (element.type === "tag") {
                let attributes = "";
                if (element.attribs) {
                    for (const [key, value] of Object.entries(element.attribs)) {
                        attributes += ` ${key}="${value}"`;
                    }
                }
                html += `<${element.name}${attributes}>${domToHtml(element.children || [])}</${element.name}>`;
            } else if (element.type === "text") {
                html += element.data;
            }
        });
        return html;
    };

    useEffect(() => {
        const updatedHtml = domToHtml(elements);
        const finalHtml = updatedHtml.replace(/\n/g, '<br>');
        setHtmlContent(finalHtml);
    }, [elements]); // هر بار که elements تغییر کرد، این effect اجرا می‌شود.

    const updateTextInDOM = (dom, index, newText, currentIndex = { value: 0 }) => {
        for (let i = 0; i < dom.length; i++) {
            const element = dom[i];
            if (element.type === "text") {
                if (currentIndex.value === index) {
                    element.data = newText;
                    return true;
                }
                currentIndex.value++;
            } else if (element.type === "tag" && element.children) {
                if (updateTextInDOM(element.children, index, newText, currentIndex)) {
                    return true;
                }
            }
        }
        return false;
    };

    const handleTextChange = (text, index) => {
        const updatedElements = [...elements];
        updateTextInDOM(updatedElements, index, text);
        setElements(updatedElements); // تغییرات به طور خودکار ذخیره خواهند شد
    };


    const isRtl = (text) => {
        const persianRegex = /[\u0600-\u06FF]/;
        return persianRegex.test(text);
    };

    const addNewElement1 = () => {
        if (insertIndex === null) {
            alert('لطفا یک محل برای افزودن متن جدید انتخاب کنید.');
            return;
        }
        const titleDirection = isRtl(newTitle) ? 'rtl' : 'ltr';

        const contentDirection = isRtl(newText) ? 'rtl' : 'ltr';

        // ساخت عنصر جدید با عنوان و متن
        const newElement = {
            type: 'tag',
            name: 'div',
            attribs: {
                dir: titleDirection,
                style: 'display:flex;align-items:center;flex-direction:row;'
            },
            children: [
                {
                    type: 'tag',
                    name: 'img', // عنوان با تگ h2
                    attribs: { style: 'width: 35px; height: 35px;', dir: titleDirection, src: 'http://img.icons8.com/emoji/48/books-emoji.png', float: titleDirection },

                },
                {
                    type: 'tag',
                    name: 'h5', // عنوان با تگ h2
                    attribs: { style: 'color: purple; font-weight: bold;padding-Left:7;padding-Right:7' },

                    children: [{ type: 'text', data: newTitle }],
                },
            ],
        };
        const newElement1 = {
            type: 'tag',
            name: 'div',
            children: [
                {
                    type: 'tag',
                    name: 'p', // متن زیر عنوان
                    attribs: { Dir: contentDirection, style: 'margin-Top:0;color:#326E36' },
                    children: [{ type: 'text', data: newText }],
                },
            ],
        };

        const updatedElements = [...elements];
        if (insertIndex !== null && insertIndex !== undefined) {
            updatedElements.splice(insertIndex + 1, 0, newElement, newElement1);
            setInsertIndex(null); // Reset index after insertion
        } else {
            updatedElements.push(newElement, newElement1);
        }
        setElements(updatedElements); // تغییرات به طور خودکار ذخیره خواهند شد
        setNewTitle(""); // پاک کردن فیلد عنوان
        setNewText(""); // پاک کردن فیلد متن
    };

    const addNewElement2 = () => {
        if (insertIndex === null) {
            alert('لطفا یک محل برای افزودن متن جدید انتخاب کنید.');
            return;
        }
        const titleDirection = isRtl(newTitle) ? 'rtl' : 'ltr';

        const contentDirection = isRtl(newText) ? 'rtl' : 'ltr';

        // ساخت عنصر جدید با عنوان و متن
        const newElement = {
            type: 'tag',
            name: 'div',
            attribs: {
                dir: titleDirection,
                style: 'display:flex;align-items:center;flex-direction:row;'
            },
            children: [
                {
                    type: 'tag',
                    name: 'img', // عنوان با تگ h2
                    attribs: { style: 'width: 35px; height: 35px;', dir: titleDirection, src: 'http://img.icons8.com/plasticine/100/hand-with-pen.png', float: titleDirection },

                },
                {
                    type: 'tag',
                    name: 'h5', // عنوان با تگ h2
                    attribs: { style: 'color: purple; font-weight: bold;padding-Left:7;padding-Right:7' },

                    children: [{ type: 'text', data: newTitle }],
                },
            ],
        };
        const newElement1 = {
            type: 'tag',
            name: 'div',
            children: [
                {
                    type: 'tag',
                    name: 'p', // متن زیر عنوان
                    attribs: { Dir: contentDirection, style: 'margin-Top:0;color:#326E36' },
                    children: [{ type: 'text', data: newText }],
                },
            ],
        };

        const updatedElements = [...elements];
        if (insertIndex !== null && insertIndex !== undefined) {
            updatedElements.splice(insertIndex + 1, 0, newElement, newElement1);
            setInsertIndex(null); // Reset index after insertion
        } else {
            updatedElements.push(newElement, newElement1);
        }
        setElements(updatedElements); // تغییرات به طور خودکار ذخیره خواهند شد
        setNewTitle(""); // پاک کردن فیلد عنوان
        setNewText(""); // پاک کردن فیلد متن
    };

    const addNewElement3 = () => {
        if (insertIndex === null) {
            alert('لطفا یک محل برای افزودن متن جدید انتخاب کنید.');
            return;
        }
        const titleDirection = isRtl(newTitle) ? 'rtl' : 'ltr';

        const contentDirection = isRtl(newText) ? 'rtl' : 'ltr';

        // ساخت عنصر جدید با عنوان و متن
        const newElement = {
            type: 'tag',
            name: 'div',
            attribs: {
                dir: titleDirection,
                style: 'display:flex;align-items:center;flex-direction:row;'
            },
            children: [
                {
                    type: 'tag',
                    name: 'img', // عنوان با تگ h2
                    attribs: { style: 'width: 35px; height: 35px;', dir: titleDirection, src: 'http://img.icons8.com/doodle/35/error.png', float: titleDirection },

                },
                {
                    type: 'tag',
                    name: 'h5', // عنوان با تگ h2
                    attribs: { style: 'color: purple; font-weight: bold;padding-Left:7;padding-Right:7' },

                    children: [{ type: 'text', data: newTitle }],
                },
            ],
        };
        const newElement1 = {
            type: 'tag',
            name: 'div',
            children: [
                {
                    type: 'tag',
                    name: 'p', // متن زیر عنوان
                    attribs: { Dir: contentDirection, style: 'margin-Top:0;color:#326E36' },
                    children: [{ type: 'text', data: newText }],
                },
            ],
        };

        const updatedElements = [...elements];
        if (insertIndex !== null && insertIndex !== undefined) {
            updatedElements.splice(insertIndex + 1, 0, newElement, newElement1);
            setInsertIndex(null); // Reset index after insertion
        } else {
            updatedElements.push(newElement, newElement1);
        }
        setElements(updatedElements); // تغییرات به طور خودکار ذخیره خواهند شد
        setNewTitle(""); // پاک کردن فیلد عنوان
        setNewText(""); // پاک کردن فیلد متن
    };
    const addNewElement4 = () => {
        if (insertIndex === null) {
            alert('لطفا یک محل برای افزودن متن جدید انتخاب کنید.');
            return;
        }
        const titleDirection = isRtl(newTitle) ? 'rtl' : 'ltr';

        const contentDirection = isRtl(newText) ? 'rtl' : 'ltr';

        // ساخت عنصر جدید با عنوان و متن
        const newElement = {
            type: 'tag',
            name: 'div',
            attribs: {
                dir: titleDirection,
                style: 'display:flex;align-items:center;flex-direction:row;'
            },
            children: [
                {
                    type: 'tag',
                    name: 'img', // عنوان با تگ h2
                    attribs: { style: 'width: 35px; height: 35px;', dir: titleDirection, src: 'http://img.icons8.com/fluency/35/states.png', float: titleDirection },

                },
                {
                    type: 'tag',
                    name: 'h5', // عنوان با تگ h2
                    attribs: { style: 'color: purple; font-weight: bold;padding-Left:7;padding-Right:7' },

                    children: [{ type: 'text', data: newTitle }],
                },
            ],
        };
        const newElement1 = {
            type: 'tag',
            name: 'div',
            children: [
                {
                    type: 'tag',
                    name: 'p', // متن زیر عنوان
                    attribs: { Dir: contentDirection, style: 'margin-Top:0;color:#326E36' },
                    children: [{ type: 'text', data: newText }],
                },
            ],
        };

        const updatedElements = [...elements];
        if (insertIndex !== null && insertIndex !== undefined) {
            updatedElements.splice(insertIndex + 1, 0, newElement, newElement1);
            setInsertIndex(null); // Reset index after insertion
        } else {
            updatedElements.push(newElement, newElement1);
        }
        setElements(updatedElements); // تغییرات به طور خودکار ذخیره خواهند شد
        setNewTitle(""); // پاک کردن فیلد عنوان
        setNewText(""); // پاک کردن فیلد متن
    };

    const addNewElement5 = () => {
        if (insertIndex === null) {
            alert('لطفا یک محل برای افزودن متن جدید انتخاب کنید.');
            return;
        }
        const titleDirection = isRtl(newTitle) ? 'rtl' : 'ltr';

        const contentDirection = isRtl(newText) ? 'rtl' : 'ltr';

        // ساخت عنصر جدید با عنوان و متن
        const newElement = {
            type: 'tag',
            name: 'div',
            attribs: {
                dir: titleDirection,
                style: 'display:flex;align-items:center;flex-direction:row;'
            },
            children: [
                {
                    type: 'tag',
                    name: 'img', // عنوان با تگ h2
                    attribs: { style: 'width: 35px; height: 35px;', dir: titleDirection, src: 'http://img.icons8.com/external-wanicon-lineal-color-wanicon/35/external-drug-hospital-wanicon-lineal-color-wanicon.png', float: titleDirection },

                },
                {
                    type: 'tag',
                    name: 'h5', // عنوان با تگ h2
                    attribs: { style: 'color: purple; font-weight: bold;padding-Left:7;padding-Right:7' },

                    children: [{ type: 'text', data: newTitle }],
                },
            ],
        };
        const newElement1 = {
            type: 'tag',
            name: 'div',
            children: [
                {
                    type: 'tag',
                    name: 'p', // متن زیر عنوان
                    attribs: { Dir: contentDirection, style: 'margin-Top:0;color:#326E36' },
                    children: [{ type: 'text', data: newText }],
                },
            ],
        };

        const updatedElements = [...elements];
        if (insertIndex !== null && insertIndex !== undefined) {
            updatedElements.splice(insertIndex + 1, 0, newElement, newElement1);
            setInsertIndex(null); // Reset index after insertion
        } else {
            updatedElements.push(newElement, newElement1);
        }
        setElements(updatedElements); // تغییرات به طور خودکار ذخیره خواهند شد
        setNewTitle(""); // پاک کردن فیلد عنوان
        setNewText(""); // پاک کردن فیلد متن
    };

    const addNewElement6 = () => {
        if (insertIndex === null) {
            alert('لطفا یک محل برای افزودن متن جدید انتخاب کنید.');
            return;
        }
        const titleDirection = isRtl(newTitle) ? 'rtl' : 'ltr';

        const contentDirection = isRtl(newText) ? 'rtl' : 'ltr';

        // ساخت عنصر جدید با عنوان و متن
        const newElement = {
            type: 'tag',
            name: 'div',
            attribs: {
                dir: titleDirection,
                style: 'display:flex;align-items:center;flex-direction:row;'
            },
            children: [
                {
                    type: 'tag',
                    name: 'img', // عنوان با تگ h2
                    attribs: { style: 'width: 35px; height: 35px;', dir: titleDirection, src: 'http://img.icons8.com/3d-fluency/35/thinking-face-2.png', float: titleDirection },

                },
                {
                    type: 'tag',
                    name: 'h5', // عنوان با تگ h2
                    attribs: { style: 'color: purple; font-weight: bold;padding-Left:7;padding-Right:7' },

                    children: [{ type: 'text', data: newTitle }],
                },
            ],
        };
        const newElement1 = {
            type: 'tag',
            name: 'div',
            children: [
                {
                    type: 'tag',
                    name: 'p', // متن زیر عنوان
                    attribs: { Dir: contentDirection, style: 'margin-Top:0;color:#326E36' },
                    children: [{ type: 'text', data: newText }],
                },
            ],
        };

        const updatedElements = [...elements];
        if (insertIndex !== null && insertIndex !== undefined) {
            updatedElements.splice(insertIndex + 1, 0, newElement, newElement1);
            setInsertIndex(null); // Reset index after insertion
        } else {
            updatedElements.push(newElement, newElement1);
        }
        setElements(updatedElements); // تغییرات به طور خودکار ذخیره خواهند شد
        setNewTitle(""); // پاک کردن فیلد عنوان
        setNewText(""); // پاک کردن فیلد متن
    };


    const addNewElement7 = () => {
        if (insertIndex === null) {
            alert('لطفا یک محل برای افزودن متن جدید انتخاب کنید.');
            return;
        }
        const titleDirection = isRtl(newTitle) ? 'rtl' : 'ltr';

        const contentDirection = isRtl(newText) ? 'rtl' : 'ltr';

        // ساخت عنصر جدید با عنوان و متن
        const newElement = {
            type: 'tag',
            name: 'div',
            attribs: {
                dir: titleDirection,
                style: 'display:flex;align-items:center;flex-direction:row;'
            },
            children: [
                {
                    type: 'tag',
                    name: 'img', // عنوان با تگ h2
                    attribs: { style: 'width: 35px; height: 35px;', dir: titleDirection, src: 'http://img.icons8.com/external-wanicon-lineal-color-wanicon/64/external-blood-sample-health-checkup-wanicon-lineal-color-wanicon.png', float: titleDirection },

                },
                {
                    type: 'tag',
                    name: 'h5', // عنوان با تگ h2
                    attribs: { style: 'color: purple; font-weight: bold;padding-Left:7;padding-Right:7' },

                    children: [{ type: 'text', data: newTitle }],
                },
            ],
        };
        const newElement1 = {
            type: 'tag',
            name: 'div',
            children: [
                {
                    type: 'tag',
                    name: 'p', // متن زیر عنوان
                    attribs: { Dir: contentDirection, style: 'margin-Top:0;color:#326E36' },
                    children: [{ type: 'text', data: newText }],
                },
            ],
        };

        const updatedElements = [...elements];
        if (insertIndex !== null && insertIndex !== undefined) {
            updatedElements.splice(insertIndex + 1, 0, newElement, newElement1);
            setInsertIndex(null); // Reset index after insertion
        } else {
            updatedElements.push(newElement, newElement1);
        }
        setElements(updatedElements); // تغییرات به طور خودکار ذخیره خواهند شد
        setNewTitle(""); // پاک کردن فیلد عنوان
        setNewText(""); // پاک کردن فیلد متن
    };


    const addNewElement8 = () => {
        if (insertIndex === null) {
            alert('لطفا یک محل برای افزودن متن جدید انتخاب کنید.');
            return;
        }
        const titleDirection = isRtl(newTitle) ? 'rtl' : 'ltr';

        const contentDirection = isRtl(newText) ? 'rtl' : 'ltr';

        // ساخت عنصر جدید با عنوان و متن
        const newElement = {
            type: 'tag',
            name: 'div',
            attribs: {
                dir: titleDirection,
                style: 'display:flex;align-items:center;flex-direction:row;'
            },
            children: [
                {
                    type: 'tag',
                    name: 'img', // عنوان با تگ h2
                    attribs: { style: 'width: 35px; height: 35px;', dir: titleDirection, src: 'http://img.icons8.com/plasticine/100/coughing.png', float: titleDirection },

                },
                {
                    type: 'tag',
                    name: 'h5', // عنوان با تگ h2
                    attribs: { style: 'color: purple; font-weight: bold;padding-Left:7;padding-Right:7' },

                    children: [{ type: 'text', data: newTitle }],
                },
            ],
        };
        const newElement1 = {
            type: 'tag',
            name: 'div',
            children: [
                {
                    type: 'tag',
                    name: 'p', // متن زیر عنوان
                    attribs: { Dir: contentDirection, style: 'margin-Top:0;color:#326E36' },
                    children: [{ type: 'text', data: newText }],
                },
            ],
        };

        const updatedElements = [...elements];
        if (insertIndex !== null && insertIndex !== undefined) {
            updatedElements.splice(insertIndex + 1, 0, newElement, newElement1);
            setInsertIndex(null); // Reset index after insertion
        } else {
            updatedElements.push(newElement, newElement1);
        }
        setElements(updatedElements); // تغییرات به طور خودکار ذخیره خواهند شد
        setNewTitle(""); // پاک کردن فیلد عنوان
        setNewText(""); // پاک کردن فیلد متن
    };


    const addNewElement9 = () => {
        if (insertIndex === null) {
            alert('لطفا یک محل برای افزودن متن جدید انتخاب کنید.');
            return;
        }
        const titleDirection = isRtl(newTitle) ? 'rtl' : 'ltr';

        const contentDirection = isRtl(newText) ? 'rtl' : 'ltr';

        // ساخت عنصر جدید با عنوان و متن
        const newElement = {
            type: 'tag',
            name: 'div',
            attribs: {
                dir: titleDirection,
                style: 'display:flex;align-items:center;flex-direction:row;'
            },
            children: [
                {
                    type: 'tag',
                    name: 'img', // عنوان با تگ h2
                    attribs: { style: 'width: 35px; height: 35px;', dir: titleDirection, src: 'http://img.icons8.com/color/35/world.png', float: titleDirection },

                },
                {
                    type: 'tag',
                    name: 'h5', // عنوان با تگ h2
                    attribs: { style: 'color: purple; font-weight: bold;padding-Left:7;padding-Right:7' },

                    children: [{ type: 'text', data: newTitle }],
                },
            ],
        };
        const newElement1 = {
            type: 'tag',
            name: 'div',
            children: [
                {
                    type: 'tag',
                    name: 'p', // متن زیر عنوان
                    attribs: { Dir: contentDirection, style: 'margin-Top:0;color:#326E36' },
                    children: [{ type: 'text', data: newText }],
                },
            ],
        };

        const updatedElements = [...elements];
        if (insertIndex !== null && insertIndex !== undefined) {
            updatedElements.splice(insertIndex + 1, 0, newElement, newElement1);
            setInsertIndex(null); // Reset index after insertion
        } else {
            updatedElements.push(newElement, newElement1);
        }
        setElements(updatedElements); // تغییرات به طور خودکار ذخیره خواهند شد
        setNewTitle(""); // پاک کردن فیلد عنوان
        setNewText(""); // پاک کردن فیلد متن
    };



    const addNewElement10 = () => {
        if (insertIndex === null) {
            alert('لطفا یک محل برای افزودن متن جدید انتخاب کنید.');
            return;
        }
        const titleDirection = isRtl(newTitle) ? 'rtl' : 'ltr';

        const contentDirection = isRtl(newText) ? 'rtl' : 'ltr';

        // ساخت عنصر جدید با عنوان و متن
        const newElement = {
            type: 'tag',
            name: 'div',
            attribs: {
                dir: titleDirection,
                style: 'display:flex;align-items:center;flex-direction:row;'
            },
            children: [
                {
                    type: 'tag',
                    name: 'img', // عنوان با تگ h2
                    attribs: { style: 'width: 35px; height: 35px;', dir: titleDirection, src: 'http://img.icons8.com/emoji/35/pill-emoji.png', float: titleDirection },

                },
                {
                    type: 'tag',
                    name: 'h5', // عنوان با تگ h2
                    attribs: { style: 'color: purple; font-weight: bold;padding-Left:7;padding-Right:7' },

                    children: [{ type: 'text', data: newTitle }],
                },
            ],
        };
        const newElement1 = {
            type: 'tag',
            name: 'div',
            children: [
                {
                    type: 'tag',
                    name: 'p', // متن زیر عنوان
                    attribs: { Dir: contentDirection, style: 'margin-Top:0;color:#326E36' },
                    children: [{ type: 'text', data: newText }],
                },
            ],
        };

        const updatedElements = [...elements];
        if (insertIndex !== null && insertIndex !== undefined) {
            updatedElements.splice(insertIndex + 1, 0, newElement, newElement1);
            setInsertIndex(null); // Reset index after insertion
        } else {
            updatedElements.push(newElement, newElement1);
        }
        setElements(updatedElements); // تغییرات به طور خودکار ذخیره خواهند شد
        setNewTitle(""); // پاک کردن فیلد عنوان
        setNewText(""); // پاک کردن فیلد متن
    };


    const addNewElement11 = () => {
        if (insertIndex === null) {
            alert('لطفا یک محل برای افزودن متن جدید انتخاب کنید.');
            return;
        }
        const titleDirection = isRtl(newTitle) ? 'rtl' : 'ltr';

        const contentDirection = isRtl(newText) ? 'rtl' : 'ltr';

        // ساخت عنصر جدید با عنوان و متن
        const newElement = {
            type: 'tag',
            name: 'div',
            attribs: {
                dir: titleDirection,
                style: 'display:flex;align-items:center;flex-direction:row;'
            },
            children: [
                {
                    type: 'tag',
                    name: 'img', // عنوان با تگ h2
                    attribs: { style: 'width: 35px; height: 35px;', dir: titleDirection, src: 'http://img.icons8.com/3d-fluency/35/virus.png', float: titleDirection },

                },
                {
                    type: 'tag',
                    name: 'h5', // عنوان با تگ h2
                    attribs: { style: 'color: purple; font-weight: bold;padding-Left:7;padding-Right:7' },

                    children: [{ type: 'text', data: newTitle }],
                },
            ],
        };
        const newElement1 = {
            type: 'tag',
            name: 'div',
            children: [
                {
                    type: 'tag',
                    name: 'p', // متن زیر عنوان
                    attribs: { Dir: contentDirection, style: 'margin-Top:0;color:#326E36' },
                    children: [{ type: 'text', data: newText }],
                },
            ],
        };

        const updatedElements = [...elements];
        if (insertIndex !== null && insertIndex !== undefined) {
            updatedElements.splice(insertIndex + 1, 0, newElement, newElement1);
            setInsertIndex(null); // Reset index after insertion
        } else {
            updatedElements.push(newElement, newElement1);
        }
        setElements(updatedElements); // تغییرات به طور خودکار ذخیره خواهند شد
        setNewTitle(""); // پاک کردن فیلد عنوان
        setNewText(""); // پاک کردن فیلد متن
    };




    const deleteElement = (indexToDelete) => {
        const updatedElements = elements.filter((_, index) => index !== indexToDelete);
        setElements(updatedElements); // حذف عنصر از array
    };

    const getInputHeight = (text) => {
        const lines = text.split('\n').length;
        return lines * 20 + 30;
    };

    const extractTextContent = (elements) => {
        const textElements = [];

        const recursiveExtract = (element) => {
            if (element.type === 'text') {
                return element.data;
            } else if (element.type === 'tag' && element.children) {
                return element.children.map(child => recursiveExtract(child)).join('');
            }
            return '';
        };

        const addTextElement = (element, indexTracker) => {
            if (element.type === 'text') {
                textElements.push({ text: element.data, index: indexTracker.value });
                indexTracker.value++;
            } else if (element.type === 'tag' && element.children) {
                element.children.forEach(child => addTextElement(child, indexTracker));
            }
        };

        const indexTracker = { value: 0 };
        elements.forEach(element => addTextElement(element, indexTracker));

        return textElements;
    };

    const editableElements = extractTextContent(elements);

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

    const dotPosition = Animated.divide(scrollX, Dimensions.get('window').width);


    const handlechangenoskhecontent = () => {



        fetch('https://draydinv.ir/extra/addnoskhecontent.php',  {
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

    return (
        <ScrollView>

            <View style={{ flexDirection: 'row-reverse', justifyContent: 'center', alignSelf: 'center' }}>
                <Text style={{ marginVertical: 3, fontWeight: '600', color: '#06d6a0', verticalAlign: 'bottom', marginHorizontal: 3, justifyContent: 'center', alignSelf: 'center' }}> ویرایش نسخه {props.name_fa} </Text>
            </View>
            <View style={{ marginBottom: 250, flex: 1, flexDirection: 'column', width: Dimensions.get('window').width * 4.75 / 5, justifyContent: 'center', alignSelf: 'center' }}>
                <View style={{ flex: 1 }}>

                    {/* نمایش TextInput های موجود برای ویرایش */}
                    {editableElements.map((element, index) => (
                        <View key={index} style={{ marginBottom: 20 }}>
                            <TextInput
                                multiline={true}
                                numberOfLines={4}
                                textAlignVertical="top"
                                style={{
                                    borderWidth: 1.75,
                                    padding: 10,
                                    margin: 5,
                                    borderStyle: 'dotted',
                                    borderRadius: 10,
                                    borderColor: 'green',
                                    height: getInputHeight(element.text),
                                    backgroundColor: '#f0f0f0',
                                }}
                                value={element.text}
                                onChangeText={(text) => handleTextChange(text, element.index)} // تغییرات به‌طور خودکار ذخیره خواهند شد
                            />

                            <TouchableOpacity title="ورود" onPress={() => deleteElement(element.index)} style={{ marginHorizontal: 25, justifyContent: 'center', backgroundColor: '#ef476f', height: height / 25, borderRadius: 10 }} >

                                <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>حذف پاراگراف بالا</Text>

                            </TouchableOpacity>
                        </View>
                    ))}


                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Customswich_component12 selectionmode={1} onselectswitch={onselectswich} />

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

                    {
                        gamestab == 1 &&
                        <View>
                            <View style={{ borderWidth: 1.5, borderColor: 'green', borderRadius: 10, borderStyle: 'dotted', height: 50, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 5 }}>
                                <Picker
                                    selectedValue={insertIndex}
                                    onValueChange={(itemValue, itemIndex) => setInsertIndex(itemValue)}
                                    style={{ height: 50, width: '100%', backgroundColor: '#EEEEEE', color: 'green' }}
                                >
                                    <Picker.Item label="بعداز کدام یک از پاراگراف ها اضافه شود؟" value={null} />
                                    {editableElements.map((element, index) => {
                                        const firstLine = element.text.split('\n')[0];
                                        const truncatedText = firstLine.length > 200 ? firstLine.slice(0, 40) + '...' : firstLine;
                                        return (
                                            <Picker.Item
                                                style={{ backgroundColor: '#EEEEEE' }}
                                                key={index}
                                                label={`${truncatedText}`}
                                                value={element.index}
                                            />
                                        );
                                    })}
                                </Picker>


                            </View>
                            <Text style={{ color: 'grey', marginBottom: 15 }}>توجه : سطر اول هر پاراگراف را درلیست بالا مشاهده میکنید</Text>
                            <TextInput
                                placeholder="عنوان متن جدید را وارد کنید"
                                value={newTitle}
                                onChangeText={setNewTitle}
                                style={{
                                    borderWidth: 1,
                                    borderStyle: 'dotted',
                                    borderColor: 'green',
                                    padding: 10,
                                    margin: 5,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: 10
                                }}
                            />
                            <TextInput
                                placeholder="متن جدید را وارد کنید"
                                multiline={true}
                                numberOfLines={12}
                                textAlignVertical="top"
                                value={newText}
                                onChangeText={setNewText}
                                style={{
                                    borderWidth: 1,
                                    borderStyle: 'dotted',
                                    borderColor: 'green',
                                    padding: 10,
                                    margin: 5,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: 10
                                }}
                            />


                            <TouchableOpacity title="افزودن متن جدید" onPress={addNewElement1} style={{ alignSelf: 'center', width: width * 4.5 / 5, justifyContent: 'center', backgroundColor: '#06d6a0', height: height / 20, borderRadius: 10 }} >

                                <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن</Text>

                            </TouchableOpacity>
                        </View>
                    }
                    {
                        gamestab == 2 &&
                        <View>
                            <View style={{ borderWidth: 1.5, borderColor: 'green', borderRadius: 10, borderStyle: 'dotted', height: 50, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 5 }}>
                                <Picker
                                    selectedValue={insertIndex}
                                    onValueChange={(itemValue, itemIndex) => setInsertIndex(itemValue)}
                                    style={{ height: 50, width: '100%', backgroundColor: '#EEEEEE', color: 'green' }}
                                >
                                    <Picker.Item label="بعداز کدام یک از پاراگراف ها اضافه شود؟" value={null} />
                                    {editableElements.map((element, index) => {
                                        const firstLine = element.text.split('\n')[0];
                                        const truncatedText = firstLine.length > 200 ? firstLine.slice(0, 40) + '...' : firstLine;
                                        return (
                                            <Picker.Item
                                                style={{ backgroundColor: '#EEEEEE' }}
                                                key={index}
                                                label={`${truncatedText}`}
                                                value={element.index}
                                            />
                                        );
                                    })}
                                </Picker>


                            </View>
                            <Text style={{ color: 'grey', marginBottom: 15 }}>توجه : سطر اول هر پاراگراف را درلیست بالا مشاهده میکنید</Text>
                            <TextInput
                                placeholder="عنوان متن جدید را وارد کنید"
                                value={newTitle}
                                onChangeText={setNewTitle}
                                style={{
                                    borderWidth: 1,
                                    borderStyle: 'dotted',
                                    borderColor: 'green',
                                    padding: 10,
                                    margin: 5,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: 10
                                }}
                            />
                            <TextInput
                                placeholder="متن جدید را وارد کنید"
                                multiline={true}
                                numberOfLines={12}
                                textAlignVertical="top"
                                value={newText}
                                onChangeText={setNewText}
                                style={{
                                    borderWidth: 1,
                                    borderStyle: 'dotted',
                                    borderColor: 'green',
                                    padding: 10,
                                    margin: 5,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: 10
                                }}
                            />


                            <TouchableOpacity title="افزودن متن جدید" onPress={addNewElement2} style={{ alignSelf: 'center', width: width * 4.5 / 5, justifyContent: 'center', backgroundColor: '#06d6a0', height: height / 20, borderRadius: 10 }} >

                                <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن</Text>

                            </TouchableOpacity>
                        </View>
                    }
                    {
                        gamestab == 3 &&
                        <View>
                            <View style={{ borderWidth: 1.5, borderColor: 'green', borderRadius: 10, borderStyle: 'dotted', height: 50, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 5 }}>
                                <Picker
                                    selectedValue={insertIndex}
                                    onValueChange={(itemValue, itemIndex) => setInsertIndex(itemValue)}
                                    style={{ height: 50, width: '100%', backgroundColor: '#EEEEEE', color: 'green' }}
                                >
                                    <Picker.Item label="بعداز کدام یک از پاراگراف ها اضافه شود؟" value={null} />
                                    {editableElements.map((element, index) => {
                                        const firstLine = element.text.split('\n')[0];
                                        const truncatedText = firstLine.length > 200 ? firstLine.slice(0, 40) + '...' : firstLine;
                                        return (
                                            <Picker.Item
                                                style={{ backgroundColor: '#EEEEEE' }}
                                                key={index}
                                                label={`${truncatedText}`}
                                                value={element.index}
                                            />
                                        );
                                    })}
                                </Picker>


                            </View>
                            <Text style={{ color: 'grey', marginBottom: 15 }}>توجه : سطر اول هر پاراگراف را درلیست بالا مشاهده میکنید</Text>
                            <TextInput
                                placeholder="عنوان متن جدید را وارد کنید"
                                value={newTitle}
                                onChangeText={setNewTitle}
                                style={{
                                    borderWidth: 1,
                                    borderStyle: 'dotted',
                                    borderColor: 'green',
                                    padding: 10,
                                    margin: 5,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: 10
                                }}
                            />
                            <TextInput
                                placeholder="متن جدید را وارد کنید"
                                multiline={true}
                                numberOfLines={12}
                                textAlignVertical="top"
                                value={newText}
                                onChangeText={setNewText}
                                style={{
                                    borderWidth: 1,
                                    borderStyle: 'dotted',
                                    borderColor: 'green',
                                    padding: 10,
                                    margin: 5,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: 10
                                }}
                            />


                            <TouchableOpacity title="افزودن متن جدید" onPress={addNewElement3} style={{ alignSelf: 'center', width: width * 4.5 / 5, justifyContent: 'center', backgroundColor: '#06d6a0', height: height / 20, borderRadius: 10 }} >

                                <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن</Text>

                            </TouchableOpacity>
                        </View>
                    }
                    {
                        gamestab == 4 &&
                        <View>
                            <View style={{ borderWidth: 1.5, borderColor: 'green', borderRadius: 10, borderStyle: 'dotted', height: 50, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 5 }}>
                                <Picker
                                    selectedValue={insertIndex}
                                    onValueChange={(itemValue, itemIndex) => setInsertIndex(itemValue)}
                                    style={{ height: 50, width: '100%', backgroundColor: '#EEEEEE', color: 'green' }}
                                >
                                    <Picker.Item label="بعداز کدام یک از پاراگراف ها اضافه شود؟" value={null} />
                                    {editableElements.map((element, index) => {
                                        const firstLine = element.text.split('\n')[0];
                                        const truncatedText = firstLine.length > 200 ? firstLine.slice(0, 40) + '...' : firstLine;
                                        return (
                                            <Picker.Item
                                                style={{ backgroundColor: '#EEEEEE' }}
                                                key={index}
                                                label={`${truncatedText}`}
                                                value={element.index}
                                            />
                                        );
                                    })}
                                </Picker>


                            </View>
                            <Text style={{ color: 'grey', marginBottom: 15 }}>توجه : سطر اول هر پاراگراف را درلیست بالا مشاهده میکنید</Text>
                            <TextInput
                                placeholder="عنوان متن جدید را وارد کنید"
                                value={newTitle}
                                onChangeText={setNewTitle}
                                style={{
                                    borderWidth: 1,
                                    borderStyle: 'dotted',
                                    borderColor: 'green',
                                    padding: 10,
                                    margin: 5,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: 10
                                }}
                            />
                            <TextInput
                                placeholder="متن جدید را وارد کنید"
                                multiline={true}
                                numberOfLines={12}
                                textAlignVertical="top"
                                value={newText}
                                onChangeText={setNewText}
                                style={{
                                    borderWidth: 1,
                                    borderStyle: 'dotted',
                                    borderColor: 'green',
                                    padding: 10,
                                    margin: 5,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: 10
                                }}
                            />


                            <TouchableOpacity title="افزودن متن جدید" onPress={addNewElement4} style={{ alignSelf: 'center', width: width * 4.5 / 5, justifyContent: 'center', backgroundColor: '#06d6a0', height: height / 20, borderRadius: 10 }} >

                                <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن</Text>

                            </TouchableOpacity>
                        </View>
                    }
                    {
                        gamestab == 5 &&
                        <View>
                            <View style={{ borderWidth: 1.5, borderColor: 'green', borderRadius: 10, borderStyle: 'dotted', height: 50, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 5 }}>
                                <Picker
                                    selectedValue={insertIndex}
                                    onValueChange={(itemValue, itemIndex) => setInsertIndex(itemValue)}
                                    style={{ height: 50, width: '100%', backgroundColor: '#EEEEEE', color: 'green' }}
                                >
                                    <Picker.Item label="بعداز کدام یک از پاراگراف ها اضافه شود؟" value={null} />
                                    {editableElements.map((element, index) => {
                                        const firstLine = element.text.split('\n')[0];
                                        const truncatedText = firstLine.length > 200 ? firstLine.slice(0, 40) + '...' : firstLine;
                                        return (
                                            <Picker.Item
                                                style={{ backgroundColor: '#EEEEEE' }}
                                                key={index}
                                                label={`${truncatedText}`}
                                                value={element.index}
                                            />
                                        );
                                    })}
                                </Picker>


                            </View>
                            <Text style={{ color: 'grey', marginBottom: 15 }}>توجه : سطر اول هر پاراگراف را درلیست بالا مشاهده میکنید</Text>
                            <TextInput
                                placeholder="عنوان متن جدید را وارد کنید"
                                value={newTitle}
                                onChangeText={setNewTitle}
                                style={{
                                    borderWidth: 1,
                                    borderStyle: 'dotted',
                                    borderColor: 'green',
                                    padding: 10,
                                    margin: 5,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: 10
                                }}
                            />
                            <TextInput
                                placeholder="متن جدید را وارد کنید"
                                multiline={true}
                                numberOfLines={12}
                                textAlignVertical="top"
                                value={newText}
                                onChangeText={setNewText}
                                style={{
                                    borderWidth: 1,
                                    borderStyle: 'dotted',
                                    borderColor: 'green',
                                    padding: 10,
                                    margin: 5,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: 10
                                }}
                            />


                            <TouchableOpacity title="افزودن متن جدید" onPress={addNewElement5} style={{ alignSelf: 'center', width: width * 4.5 / 5, justifyContent: 'center', backgroundColor: '#06d6a0', height: height / 20, borderRadius: 10 }} >

                                <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن</Text>

                            </TouchableOpacity>
                        </View>
                    }
                    {
                        gamestab == 6 &&
                        <View>
                            <View style={{ borderWidth: 1.5, borderColor: 'green', borderRadius: 10, borderStyle: 'dotted', height: 50, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 5 }}>
                                <Picker
                                    selectedValue={insertIndex}
                                    onValueChange={(itemValue, itemIndex) => setInsertIndex(itemValue)}
                                    style={{ height: 50, width: '100%', backgroundColor: '#EEEEEE', color: 'green' }}
                                >
                                    <Picker.Item label="بعداز کدام یک از پاراگراف ها اضافه شود؟" value={null} />
                                    {editableElements.map((element, index) => {
                                        const firstLine = element.text.split('\n')[0];
                                        const truncatedText = firstLine.length > 200 ? firstLine.slice(0, 40) + '...' : firstLine;
                                        return (
                                            <Picker.Item
                                                style={{ backgroundColor: '#EEEEEE' }}
                                                key={index}
                                                label={`${truncatedText}`}
                                                value={element.index}
                                            />
                                        );
                                    })}
                                </Picker>


                            </View>
                            <Text style={{ color: 'grey', marginBottom: 15 }}>توجه : سطر اول هر پاراگراف را درلیست بالا مشاهده میکنید</Text>
                            <TextInput
                                placeholder="عنوان متن جدید را وارد کنید"
                                value={newTitle}
                                onChangeText={setNewTitle}
                                style={{
                                    borderWidth: 1,
                                    borderStyle: 'dotted',
                                    borderColor: 'green',
                                    padding: 10,
                                    margin: 5,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: 10
                                }}
                            />
                            <TextInput
                                placeholder="متن جدید را وارد کنید"
                                multiline={true}
                                numberOfLines={12}
                                textAlignVertical="top"
                                value={newText}
                                onChangeText={setNewText}
                                style={{
                                    borderWidth: 1,
                                    borderStyle: 'dotted',
                                    borderColor: 'green',
                                    padding: 10,
                                    margin: 5,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: 10
                                }}
                            />


                            <TouchableOpacity title="افزودن متن جدید" onPress={addNewElement6} style={{ alignSelf: 'center', width: width * 4.5 / 5, justifyContent: 'center', backgroundColor: '#06d6a0', height: height / 20, borderRadius: 10 }} >

                                <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن</Text>

                            </TouchableOpacity>
                        </View>
                    }
                    {
                        gamestab == 7 &&
                        <View>
                            <View style={{ borderWidth: 1.5, borderColor: 'green', borderRadius: 10, borderStyle: 'dotted', height: 50, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 5 }}>
                                <Picker
                                    selectedValue={insertIndex}
                                    onValueChange={(itemValue, itemIndex) => setInsertIndex(itemValue)}
                                    style={{ height: 50, width: '100%', backgroundColor: '#EEEEEE', color: 'green' }}
                                >
                                    <Picker.Item label="بعداز کدام یک از پاراگراف ها اضافه شود؟" value={null} />
                                    {editableElements.map((element, index) => {
                                        const firstLine = element.text.split('\n')[0];
                                        const truncatedText = firstLine.length > 200 ? firstLine.slice(0, 40) + '...' : firstLine;
                                        return (
                                            <Picker.Item
                                                style={{ backgroundColor: '#EEEEEE' }}
                                                key={index}
                                                label={`${truncatedText}`}
                                                value={element.index}
                                            />
                                        );
                                    })}
                                </Picker>


                            </View>
                            <Text style={{ color: 'grey', marginBottom: 15 }}>توجه : سطر اول هر پاراگراف را درلیست بالا مشاهده میکنید</Text>
                            <TextInput
                                placeholder="عنوان متن جدید را وارد کنید"
                                value={newTitle}
                                onChangeText={setNewTitle}
                                style={{
                                    borderWidth: 1,
                                    borderStyle: 'dotted',
                                    borderColor: 'green',
                                    padding: 10,
                                    margin: 5,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: 10
                                }}
                            />
                            <TextInput
                                placeholder="متن جدید را وارد کنید"
                                multiline={true}
                                numberOfLines={12}
                                textAlignVertical="top"
                                value={newText}
                                onChangeText={setNewText}
                                style={{
                                    borderWidth: 1,
                                    borderStyle: 'dotted',
                                    borderColor: 'green',
                                    padding: 10,
                                    margin: 5,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: 10
                                }}
                            />


                            <TouchableOpacity title="افزودن متن جدید" onPress={addNewElement7} style={{ alignSelf: 'center', width: width * 4.5 / 5, justifyContent: 'center', backgroundColor: '#06d6a0', height: height / 20, borderRadius: 10 }} >

                                <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن</Text>

                            </TouchableOpacity>
                        </View>
                    }
                    {
                        gamestab == 8 &&
                        <View>
                            <View style={{ borderWidth: 1.5, borderColor: 'green', borderRadius: 10, borderStyle: 'dotted', height: 50, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 5 }}>
                                <Picker
                                    selectedValue={insertIndex}
                                    onValueChange={(itemValue, itemIndex) => setInsertIndex(itemValue)}
                                    style={{ height: 50, width: '100%', backgroundColor: '#EEEEEE', color: 'green' }}
                                >
                                    <Picker.Item label="بعداز کدام یک از پاراگراف ها اضافه شود؟" value={null} />
                                    {editableElements.map((element, index) => {
                                        const firstLine = element.text.split('\n')[0];
                                        const truncatedText = firstLine.length > 200 ? firstLine.slice(0, 40) + '...' : firstLine;
                                        return (
                                            <Picker.Item
                                                style={{ backgroundColor: '#EEEEEE' }}
                                                key={index}
                                                label={`${truncatedText}`}
                                                value={element.index}
                                            />
                                        );
                                    })}
                                </Picker>


                            </View>
                            <Text style={{ color: 'grey', marginBottom: 15 }}>توجه : سطر اول هر پاراگراف را درلیست بالا مشاهده میکنید</Text>
                            <TextInput
                                placeholder="عنوان متن جدید را وارد کنید"
                                value={newTitle}
                                onChangeText={setNewTitle}
                                style={{
                                    borderWidth: 1,
                                    borderStyle: 'dotted',
                                    borderColor: 'green',
                                    padding: 10,
                                    margin: 5,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: 10
                                }}
                            />
                            <TextInput
                                placeholder="متن جدید را وارد کنید"
                                multiline={true}
                                numberOfLines={12}
                                textAlignVertical="top"
                                value={newText}
                                onChangeText={setNewText}
                                style={{
                                    borderWidth: 1,
                                    borderStyle: 'dotted',
                                    borderColor: 'green',
                                    padding: 10,
                                    margin: 5,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: 10
                                }}
                            />


                            <TouchableOpacity title="افزودن متن جدید" onPress={addNewElement8} style={{ alignSelf: 'center', width: width * 4.5 / 5, justifyContent: 'center', backgroundColor: '#06d6a0', height: height / 20, borderRadius: 10 }} >

                                <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن</Text>

                            </TouchableOpacity>
                        </View>
                    }
                    {
                        gamestab == 9 &&
                        <View>
                            <View style={{ borderWidth: 1.5, borderColor: 'green', borderRadius: 10, borderStyle: 'dotted', height: 50, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 5 }}>
                                <Picker
                                    selectedValue={insertIndex}
                                    onValueChange={(itemValue, itemIndex) => setInsertIndex(itemValue)}
                                    style={{ height: 50, width: '100%', backgroundColor: '#EEEEEE', color: 'green' }}
                                >
                                    <Picker.Item label="بعداز کدام یک از پاراگراف ها اضافه شود؟" value={null} />
                                    {editableElements.map((element, index) => {
                                        const firstLine = element.text.split('\n')[0];
                                        const truncatedText = firstLine.length > 200 ? firstLine.slice(0, 40) + '...' : firstLine;
                                        return (
                                            <Picker.Item
                                                style={{ backgroundColor: '#EEEEEE' }}
                                                key={index}
                                                label={`${truncatedText}`}
                                                value={element.index}
                                            />
                                        );
                                    })}
                                </Picker>


                            </View>
                            <Text style={{ color: 'grey', marginBottom: 15 }}>توجه : سطر اول هر پاراگراف را درلیست بالا مشاهده میکنید</Text>
                            <TextInput
                                placeholder="عنوان متن جدید را وارد کنید"
                                value={newTitle}
                                onChangeText={setNewTitle}
                                style={{
                                    borderWidth: 1,
                                    borderStyle: 'dotted',
                                    borderColor: 'green',
                                    padding: 10,
                                    margin: 5,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: 10
                                }}
                            />
                            <TextInput
                                placeholder="متن جدید را وارد کنید"
                                multiline={true}
                                numberOfLines={12}
                                textAlignVertical="top"
                                value={newText}
                                onChangeText={setNewText}
                                style={{
                                    borderWidth: 1,
                                    borderStyle: 'dotted',
                                    borderColor: 'green',
                                    padding: 10,
                                    margin: 5,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: 10
                                }}
                            />


                            <TouchableOpacity title="افزودن متن جدید" onPress={addNewElement9} style={{ alignSelf: 'center', width: width * 4.5 / 5, justifyContent: 'center', backgroundColor: '#06d6a0', height: height / 20, borderRadius: 10 }} >

                                <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن</Text>

                            </TouchableOpacity>
                        </View>
                    }
                    {
                        gamestab == 10 &&
                        <View>
                            <View style={{ borderWidth: 1.5, borderColor: 'green', borderRadius: 10, borderStyle: 'dotted', height: 50, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 5 }}>
                                <Picker
                                    selectedValue={insertIndex}
                                    onValueChange={(itemValue, itemIndex) => setInsertIndex(itemValue)}
                                    style={{ height: 50, width: '100%', backgroundColor: '#EEEEEE', color: 'green' }}
                                >
                                    <Picker.Item label="بعداز کدام یک از پاراگراف ها اضافه شود؟" value={null} />
                                    {editableElements.map((element, index) => {
                                        const firstLine = element.text.split('\n')[0];
                                        const truncatedText = firstLine.length > 200 ? firstLine.slice(0, 40) + '...' : firstLine;
                                        return (
                                            <Picker.Item
                                                style={{ backgroundColor: '#EEEEEE' }}
                                                key={index}
                                                label={`${truncatedText}`}
                                                value={element.index}
                                            />
                                        );
                                    })}
                                </Picker>


                            </View>
                            <Text style={{ color: 'grey', marginBottom: 15 }}>توجه : سطر اول هر پاراگراف را درلیست بالا مشاهده میکنید</Text>
                            <TextInput
                                placeholder="عنوان متن جدید را وارد کنید"
                                value={newTitle}
                                onChangeText={setNewTitle}
                                style={{
                                    borderWidth: 1,
                                    borderStyle: 'dotted',
                                    borderColor: 'green',
                                    padding: 10,
                                    margin: 5,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: 10
                                }}
                            />
                            <TextInput
                                placeholder="متن جدید را وارد کنید"
                                multiline={true}
                                numberOfLines={12}
                                textAlignVertical="top"
                                value={newText}
                                onChangeText={setNewText}
                                style={{
                                    borderWidth: 1,
                                    borderStyle: 'dotted',
                                    borderColor: 'green',
                                    padding: 10,
                                    margin: 5,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: 10
                                }}
                            />


                            <TouchableOpacity title="افزودن متن جدید" onPress={addNewElement10} style={{ alignSelf: 'center', width: width * 4.5 / 5, justifyContent: 'center', backgroundColor: '#06d6a0', height: height / 20, borderRadius: 10 }} >

                                <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن</Text>

                            </TouchableOpacity>
                        </View>
                    }

                    {
                        gamestab == 11 &&
                        <View>
                            <View style={{ borderWidth: 1.5, borderColor: 'green', borderRadius: 10, borderStyle: 'dotted', height: 50, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 5 }}>
                                <Picker
                                    selectedValue={insertIndex}
                                    onValueChange={(itemValue, itemIndex) => setInsertIndex(itemValue)}
                                    style={{ height: 50, width: '100%', backgroundColor: '#EEEEEE', color: 'green' }}
                                >
                                    <Picker.Item label="بعداز کدام یک از پاراگراف ها اضافه شود؟" value={null} />
                                    {editableElements.map((element, index) => {
                                        const firstLine = element.text.split('\n')[0];
                                        const truncatedText = firstLine.length > 200 ? firstLine.slice(0, 40) + '...' : firstLine;
                                        return (
                                            <Picker.Item
                                                style={{ backgroundColor: '#EEEEEE' }}
                                                key={index}
                                                label={`${truncatedText}`}
                                                value={element.index}
                                            />
                                        );
                                    })}
                                </Picker>


                            </View>
                            <Text style={{ color: 'grey', marginBottom: 15 }}>توجه : سطر اول هر پاراگراف را درلیست بالا مشاهده میکنید</Text>
                            <TextInput
                                placeholder="عنوان متن جدید را وارد کنید"
                                value={newTitle}
                                onChangeText={setNewTitle}
                                style={{
                                    borderWidth: 1,
                                    borderStyle: 'dotted',
                                    borderColor: 'green',
                                    padding: 10,
                                    margin: 5,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: 10
                                }}
                            />
                            <TextInput
                                placeholder="متن جدید را وارد کنید"
                                multiline={true}
                                numberOfLines={12}
                                textAlignVertical="top"
                                value={newText}
                                onChangeText={setNewText}
                                style={{
                                    borderWidth: 1,
                                    borderStyle: 'dotted',
                                    borderColor: 'green',
                                    padding: 10,
                                    margin: 5,
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: 10
                                }}
                            />


                            <TouchableOpacity title="افزودن متن جدید" onPress={addNewElement11} style={{ alignSelf: 'center', width: width * 4.5 / 5, justifyContent: 'center', backgroundColor: '#06d6a0', height: height / 20, borderRadius: 10 }} >

                                <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن</Text>

                            </TouchableOpacity>
                        </View>
                    }
                </View>

                <Text style={{ textAlign: 'center', color: 'grey', marginTop: 25, padding: 15, borderRadius: 10, borderWidth: 1.25, borderColor: 'green', borderStyle: 'dotted', backgroundColor: '#EEEEEE' }}>پیش نمایشی از محتوای نوشته شده را در زیر مشاهده می کنید</Text>
              
                <TouchableOpacity title="ورود" onPress={handlechangenoskhecontent} style={{ marginTop: 10, width: width * 4.75 / 5, justifyContent: 'center', alignSelf: 'center', backgroundColor: '#06d6a0', height: height / 17, borderRadius: 10 }} >

                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>خوبه ! همینو ذخیره کن</Text>

                </TouchableOpacity>

                <View style={{ flex: 1, height: height, marginTop: 10, backgroundColor: 'transparent' }}>
                    <WebView
                        originWhitelist={['*']}
                        scalesPageToFit={false}
                        source={{ html: htmlContent }}
                        scrollEnabled={true}
                        style={{ flex: 1, backgroundColor: 'transparent', borderRadius: 10 }}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const  width = Dimensions.get('window').width;
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
        width: Dimensions.get('window').width * 9 / 10,
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: 'yellow',

        elevation: 5,


    },
});


export default Editorj;

