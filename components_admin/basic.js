import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, View,I18nManager, StatusBar, Button, KeyboardAvoidingView, Platform, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import WebView from 'react-native-webview';

const Basic = () => {
  const editorRef = useRef();
  const [content, setContent] = useState('');
  const [contenthtml, setcontenthtml] = useState('');

  const handlehtml = () => {
    editorRef.current?.getContentHtml().then(html => {
      setcontenthtml(html);
    })
  }

  useEffect(()=>{
  I18nManager.forceRTL(true);
  return ()=>{
  I18nManager.forceRTL(false);

  }

  },[]);

  // تابع برای تغییر جهت متن بر اساس زبان ورودی
  const handleContentChange = (text) => {
    setContent(text);
    const isRTL = /[\u0600-\u06FF]/.test(text);
    editorRef.current?.setDirection(isRTL ? 'RTL' : 'LTR');
  };
  const changetextcolor = (color) => {
    editorRef.current?.setForeColor(color);
  }

  const setsize = (size) => {
    editorRef.current?.setFontSize(size);
  }


  const iconMap = {
    [actions.heading1]: require('../assets/img/child1.png'),
    [actions.heading2]: require('../assets/img/child1.png'),
    [actions.heading3]: require('../assets/img/child1.png'),
    [actions.heading4]: require('../assets/img/child1.png'),
    [actions.heading5]: require('../assets/img/child1.png'),
    [actions.heading6]: require('../assets/img/child1.png'),
    [actions.foreColor]: require('../assets/img/child1.png'),
    [actions.fontSize]: require('../assets/img/child1.png'),

  };


  return (
    <View style={styles.container}>



      <RichToolbar
        style={styles.toolbar}
        getEditor={() => editorRef.current}

        selectedIconTint={'red'}
        actions={[

          actions.setBold,
          actions.setItalic,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertLink,
          actions.setStrikethrough,
          actions.setUnderline,
          actions.setSubscript,
          actions.setSuperscript,

          actions.heading1,
          actions.heading2,
          actions.heading3,
          actions.heading4,
          actions.heading5,
          actions.heading6,
          actions.checkboxList,
          actions.blockquote,
          actions.insertLine,
          actions.line,
          actions.setParagraph,
          actions.indent,
          actions.outdent,
          actions.alignLeft,
          actions.alignCenter,
          actions.alignRight,
          actions.alignFull,
          actions.removeFormat,
          actions.undo,
          actions.redo,



        ]}

        iconMap={iconMap}

      />

      <View style={{ flexDirection: 'row', justifyContent: 'center', borderBottomWidth: 2, borderColor: 'purple', padding: 5 }}>
        <TouchableOpacity

          onPress={() => setsize(1)}
          style={{



            marginHorizontal: width / 77,
            marginHorizontal: 5

          }}
        >

          <Text>1</Text>
        </TouchableOpacity>

        <TouchableOpacity

          onPress={() => setsize(2)}
          style={{



            marginHorizontal: width / 77,
            marginHorizontal: 5

          }}
        >

          <Text>2</Text>
        </TouchableOpacity>


        <TouchableOpacity

          onPress={() => setsize(3)}
          style={{



            marginHorizontal: width / 77,
            marginHorizontal: 5

          }}
        >

          <Text>3</Text>
        </TouchableOpacity>


        <TouchableOpacity

          onPress={() => setsize(4)}
          style={{



            marginHorizontal: width / 77,
            marginHorizontal: 5

          }}
        >

          <Text>4</Text>
        </TouchableOpacity>
        <TouchableOpacity

          onPress={() => setsize(5)}
          style={{



            marginHorizontal: width / 77,
            marginHorizontal: 5

          }}
        >

          <Text>5</Text>
        </TouchableOpacity>

        <TouchableOpacity

          onPress={() => setsize(6)}
          style={{



            marginHorizontal: width / 77,
            marginHorizontal: 5

          }}
        >

          <Text>6</Text>
        </TouchableOpacity>

      </View>



      <View style={{ flexDirection: 'row', justifyContent: 'center', borderBottomWidth: 2, borderColor: 'purple', padding: 5 }}>
        <TouchableOpacity

          onPress={() => changetextcolor('red')}
          style={{
            elevation: 6,
            backgroundColor: 'red',
            borderRadius: 12,
            width: width * 1 / 77,
            marginHorizontal: width / 77,
            padding: 5,
            margin: 5

          }}
        >


        </TouchableOpacity>
        <TouchableOpacity

          onPress={() => changetextcolor('#0097a7')}
          style={{
            elevation: 6,
            backgroundColor: '#0097a7',
            borderRadius: 12,
            width: width * 1 / 77,
            marginHorizontal: width / 77,
            padding: 5,
            margin: 5

          }}
        >


        </TouchableOpacity>
        <TouchableOpacity

          onPress={() => changetextcolor('#0288d1')}
          style={{
            elevation: 6,
            backgroundColor: '#0281d1',
            borderRadius: 12,
            width: width * 1 / 77,
            marginHorizontal: width / 77,
            padding: 5,
            margin: 5

          }}
        >


        </TouchableOpacity>

        <TouchableOpacity

          onPress={() => changetextcolor('#e91e63')}
          style={{
            elevation: 6,
            backgroundColor: '#e91e63',
            borderRadius: 12,
            width: width * 1 / 77,
            marginHorizontal: width / 77,
            padding: 5,
            margin: 5

          }}
        >


        </TouchableOpacity>

        <TouchableOpacity

          onPress={() => changetextcolor('#006064')}
          style={{
            elevation: 6,
            backgroundColor: '#006064',
            borderRadius: 12,
            width: width * 1 / 77,
            marginHorizontal: width / 77,
            padding: 5,
            margin: 5

          }}
        >


        </TouchableOpacity>
        <TouchableOpacity

          onPress={() => changetextcolor('#827717')}
          style={{
            elevation: 6,
            backgroundColor: '#827717',
            borderRadius: 12,
            width: width * 1 / 77,
            marginHorizontal: width / 77,
            padding: 5,
            margin: 5

          }}
        >


        </TouchableOpacity>
        <TouchableOpacity

          onPress={() => changetextcolor('green')}
          style={{
            elevation: 6,
            backgroundColor: '#06d6a0',
            borderRadius: 12,
            width: width * 1 / 77,
            marginHorizontal: width / 77,
            padding: 5,
            margin: 5

          }}
        >


        </TouchableOpacity>
        <TouchableOpacity

          onPress={() => changetextcolor('yellow')}
          style={{
            elevation: 6,
            backgroundColor: 'yellow',
            borderRadius: 12,
            width: width * 1 / 77,
            marginHorizontal: width / 77,
            padding: 5,
            margin: 5

          }}
        >


        </TouchableOpacity>
        <TouchableOpacity

          onPress={() => changetextcolor('blue')}
          style={{
            elevation: 6,
            backgroundColor: 'blue',
            borderRadius: 12,
            width: width * 1 / 77,
            marginHorizontal: width / 77,
            padding: 5,
            margin: 5

          }}
        >


        </TouchableOpacity>
        <TouchableOpacity

          onPress={() => changetextcolor('purple')}
          style={{
            elevation: 6,
            backgroundColor: 'purple',
            borderRadius: 12,
            width: width * 1 / 77,
            marginHorizontal: width / 77,
            padding: 5,
            margin: 5

          }}
        >


        </TouchableOpacity>
        <TouchableOpacity

          onPress={() => changetextcolor('orange')}
          style={{
            elevation: 6,
            backgroundColor: 'orange',
            borderRadius: 12,
            width: width * 1 / 77,
            marginHorizontal: width / 77,
            padding: 5,
            margin: 5

          }}
        >


        </TouchableOpacity>
        <TouchableOpacity

          onPress={() => changetextcolor('pink')}
          style={{
            elevation: 6,
            backgroundColor: 'pink',
            borderRadius: 12,
            width: width * 1 / 77,
            marginHorizontal: width / 77,
            padding: 5,
            margin: 5

          }}
        >


        </TouchableOpacity>
        <TouchableOpacity

          onPress={() => changetextcolor('grey')}
          style={{
            elevation: 6,
            backgroundColor: 'grey',
            borderRadius: 12,
            width: width * 1 / 77,
            marginHorizontal: width / 77,
            padding: 5,
            margin: 5

          }}
        >


        </TouchableOpacity>
        <TouchableOpacity

          onPress={() => changetextcolor('black')}
          style={{
            elevation: 6,
            backgroundColor: 'black',
            borderRadius: 12,
            width: width * 1 / 77,
            marginHorizontal: width / 77,
            padding: 5,
            margin: 5

          }}
        >


        </TouchableOpacity>
        <TouchableOpacity

          onPress={() => changetextcolor('#009688')}
          style={{
            elevation: 6,
            backgroundColor: '#009688',
            borderRadius: 12,
            width: width * 1 / 77,
            marginHorizontal: width / 77,
            padding: 5,
            margin: 5

          }}
        >


        </TouchableOpacity>
        <TouchableOpacity

          onPress={() => changetextcolor('brown')}
          style={{
            elevation: 6,
            backgroundColor: 'brown',
            borderRadius: 12,
            width: width * 1 / 77,
            marginHorizontal: width / 77,
            padding: 5,
            margin: 5

          }}
        >


        </TouchableOpacity>
        <TouchableOpacity

          onPress={() => changetextcolor('#e91e63')}
          style={{
            elevation: 6,
            backgroundColor: '#e91e63',
            borderRadius: 12,
            width: width * 1 / 77,
            marginHorizontal: width / 77,
            padding: 5,
            margin: 5

          }}
        >


        </TouchableOpacity>
        <TouchableOpacity

          onPress={() => changetextcolor('#880e4f')}
          style={{
            elevation: 6,
            backgroundColor: '#880e4f',
            borderRadius: 12,
            width: width * 1 / 77,
            marginHorizontal: width / 77,
            padding: 5,
            margin: 5

          }}
        >


        </TouchableOpacity>
        <TouchableOpacity

          onPress={() => changetextcolor('#ab47bc')}
          style={{
            elevation: 6,
            backgroundColor: '#ab47bc',
            borderRadius: 12,
            width: width * 1 / 77,
            marginHorizontal: width / 77,
            padding: 5,
            margin: 5

          }}
        >


        </TouchableOpacity>

        <TouchableOpacity

          onPress={() => changetextcolor('#827717')}
          style={{
            elevation: 6,
            backgroundColor: '#827717',
            borderRadius: 12,
            width: width * 1 / 77,
            marginHorizontal: width / 77,
            padding: 5,
            margin: 5

          }}
        >


        </TouchableOpacity>


      </View>


      <RichEditor
        ref={editorRef}
        scalesPageToFit={false}
        style={styles.editor}
        placeholder='write dear doctor !'
        onChange={handleContentChange}
        initialContentHTML={content}
      />
      <TouchableOpacity title="ورود" onPress={handlehtml} style={{ width: width * 4.5 / 5, justifyContent: 'center', backgroundColor: '#06d6a0', height: height / 13, borderRadius: 10, alignSelf: 'center' }} >

        <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>اضافه کردن</Text>

      </TouchableOpacity>
      <WebView
            
                style={{ width: '95%', height: '100%', alignSelf: 'center',backgroundColor:'transparent' }}
                originWhitelist={['*']}
                source={{ html: contenthtml }}
                scalesPageToFit={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />







    </View>
  );
};

const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white'
  },
  editorContainer: {
    flex: 1,
    backgroundColor: 'transparent',

  },
  editor: {
    flex: 1,
    backgroundColor: 'transparent', // تنظیم پس‌زمینه شفاف
    borderColor: 'purple',
    // borderLeftWidth:2,
    // borderRightWidth:2,
    borderRadius: 2,
    padding: 0,
    margin: 2,
    textAlign:'right'
    
   
   


  },
  toolbar: {
    backgroundColor: 'transparent',
    borderColor: 'purple',
    // borderLeftWidth:2,
    // borderRightWidth:2,
    borderBottomWidth: 2,
    borderRadius: 2,
    padding: 5,
    marginTop: 20,
    
  }
});

export default Basic;




