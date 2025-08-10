import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, LayoutAnimation, UIManager, Dimensions, StyleSheet, Platform, Image, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import * as Font from 'expo-font';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

class Oscedetailscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name_en: this.props.route.params.name_en,
      name_fa: this.props.route.params.name_fa,
      cat_fa: this.props.route.params.cat_fa,
      time: this.props.route.params.time,
      writer: this.props.route.params.writer,
      likes: this.props.route.params.likes,
      username: this.props.route.params.username,

      data: [],
      isLoading: true,
      selectedId: null,
      webViewHeights: {},
      expandedItemId: null,
      ispressed: '',

    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

  }
  async componentDidMount() {
    await Font.loadAsync({
      'morvarid': require('../assets/fonts/morvarid.ttf'),
    });
    this.setState({ fontLoaded: true });

    this.fetchData();
    this.handleislike();
    if (Platform.OS === 'web') {
      window.addEventListener('message', this.handleIframeMessage);
    }
  }

  fetchData = async () => {
    try {
      const response = await fetch('https://draydinv.ir/extra/osce_detail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        body: JSON.stringify({
          name_en: this.state.name_en,
        })
      });
      const json = await response.json();
      this.setState({ data: json, isLoading: false });
    } catch (error) {
      console.error(error);
    }
  };


  handleToggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState(prevState => ({
      expandedItemId: prevState.expandedItemId === id ? null : id
    }));
  };
  handleWebViewMessage = (event, id) => {
    const height = Number(event.nativeEvent.data);
    this.setState(prev => ({
      webViewHeights: {
        ...prev.webViewHeights,
        [id]: height
      }
    }));
  };

  handleIframeMessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === 'iframeHeight') {
        this.setState(prev => ({
          webViewHeights: {
            ...prev.webViewHeights,
            [data.id]: data.height
          }
        }));
      }
    } catch (e) { }
  };
  renderItem = ({ item }) => {
    const isExpanded = this.state.expandedItemId === item.id;
    const webViewHeight = this.state.webViewHeights[item.id] || 0;

const htmlContent = `
<html dir="rtl" lang="fa">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    @font-face {
      font-family: 'Nazanin';
      src: url('https://draydinv.ir/font1/nazanin.woff2') format('woff2'),
           url('https://draydinv.ir/font1/nazanin.woff') format('woff'),
           url('https://draydinv.ir/font1/nazanin.otf') format('opentype');
      font-display: swap;
    }

    body {
      font-family: 'Nazanin', sans-serif;
      direction: rtl;
      line-height: 1.8;
      margin: 0;
      padding: 10px;
      background: transparent;
      unicode-bidi: embed;
    }

    .fa-num {
      font-family: 'Nazanin', sans-serif !important;
      unicode-bidi: bidi-override;
    }

    .en-num {
      font-family: Arial, sans-serif !important;
      direction: ltr;
      unicode-bidi: bidi-override;
    }

    .en-text {
      direction: ltr;
      unicode-bidi: embed;
      font-family: Arial, sans-serif;
    }
  </style>
</head>
<body>
  <div id="content">${item.content}</div>

  <script>
    (function() {
      function toFarsiNumber(str) {
        return str.replace(/[0-9]/g, function(d) {
          return String.fromCharCode(d.charCodeAt(0) + 1728);
        });
      }

      function toEnglishNumber(str) {
        return str.replace(/[\\u06F0-\\u06F9]/g, function(d) {
          return String.fromCharCode(d.charCodeAt(0) - 1728);
        });
      }

      var contentDiv = document.getElementById('content');

      function processNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
          var parentDir = window.getComputedStyle(node.parentElement).direction;
          var text = node.textContent;

          if (parentDir === 'rtl') {
            // در متن فارسی، کلمات انگلیسی به همراه اعداد انگلیسی را جدا می‌کنیم
            // ابتدا کلمات انگلیسی و اعداد انگلیسی را با هم انتخاب می‌کنیم
            // سپس آنها را در span.en-text می‌گذاریم، و اعداد را در داخل همان کلمه به صورت fa-num یا en-num درست می‌کنیم

            var parts = text.split(/([a-zA-Z0-9@./#&+-]+)/g);
            var newText = parts.map(part => {
              if (/^[a-zA-Z0-9@./#&+-]+$/.test(part)) {
                // کلمه یا عدد انگلیسی
                // اعداد داخل این بخش به en-num تبدیل شوند
                var wrapped = part.replace(/[0-9]+/g, num => '<span class="en-num">' + num + '</span>');
                return '<span class="en-text">' + wrapped + '</span>';
              } else {
                // متن فارسی: اعداد انگلیسی را به فارسی تبدیل و در span.fa-num بگذار
                var converted = part.replace(/[0-9]+/g, num => '<span class="fa-num">' + toFarsiNumber(num) + '</span>');
                return converted;
              }
            }).join('');
            text = newText;

          } else {
            // متن انگلیسی: تبدیل اعداد فارسی به انگلیسی
            text = text.replace(/[\\u06F0-\\u06F9]+/g, function(num) {
              return '<span class="en-num">' + toEnglishNumber(num) + '</span>';
            });

            // اعداد انگلیسی را هم در span.en-num بگذار
            text = text.replace(/[0-9]+/g, function(num) {
              return '<span class="en-num">' + num + '</span>';
            });
          }

          var temp = document.createElement('span');
          temp.innerHTML = text;
          node.replaceWith(...temp.childNodes);

        } else if (node.nodeType === Node.ELEMENT_NODE) {
          node.childNodes.forEach(processNode);
        }
      }

      processNode(contentDiv);
    })();

    function sendHeight() {
      var h = document.body.scrollHeight || document.documentElement.scrollHeight;
      if (${Platform.OS === 'web'}) {
        window.parent.postMessage(JSON.stringify({type:'iframeHeight', id:'${item.id}', height: h}));
      } else {
        window.ReactNativeWebView.postMessage(h.toString());
      }
    }

    window.onload = sendHeight;
    window.addEventListener('resize', sendHeight);
  </script>
</body>
</html>
`;




    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={{
            backgroundColor: 'white', padding: 15,
            borderRadius: 5, flexDirection: 'row-reverse', alignItems: 'center',
            elevation: 2,
            shadowColor: 'green',
            shadowOpacity: 1,
            justifyContent: 'space-between'
          }}
          onPress={() => this.handleToggleExpand(item.id)}>
          <View style={{ flexDirection: 'row-reverse' }}>
            <View style={{ backgroundColor: '#06d6a0', width: 10, height: 10, borderRadius: 15, justifyContent: 'center', alignSelf: 'center', marginRight: 5, marginLeft: 5 }}></View>
            <Text style={styles.subject}>مبحث : {item.subject}</Text>
          </View>
          <Image
            style={{
              width: 12,
              height: 12,
              transform: [{ rotate: '80deg' }],
              tintColor: 'grey',
              alignSelf: 'flex-start',
              marginHorizontal: 10
            }}
            source={require('../assets/img/next.png')}
            resizeMode='contain'

          />
        </TouchableOpacity>

        {isExpanded && (
          Platform.OS === 'web' ? (
            <iframe
              srcDoc={htmlContent}
              style={{
                border: 'none',
                width: '100%',
                height: webViewHeight,
                transition: 'height 0.3s ease',
              }}
            />
          ) : (
            <WebView
              originWhitelist={['*']}
              source={{ html: htmlContent }}
              javaScriptEnabled={true}
              scrollEnabled={false}

              onMessage={(event) => this.handleWebViewMessage(event, item.id)}
              style={{
                width: '100%',
                height: webViewHeight,
                backgroundColor: '#EEEEEE',
                marginTop: 5,

              }}
            />
          )
        )}
      </View>
    );
  };

  handlepressin = () => {
    if (this.state.ispressed == false) {
      this.setState({ ispressed: true });
      this.setState((prevState) => ({
        likes: prevState.likes * 1 + 1,
      }))

      fetch('https://draydinv.ir/extra/oscefasllike.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          likes: this.state.likes * 1 + 1,
          name_fa: this.state.name_fa,
          cat_fa: this.state.cat_fa,
          username: this.state.username,
          type: 1,

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

    }


    else if (this.state.ispressed == true) {
      this.setState({ ispressed: false });
      this.setState((prevState) => ({
        likes: prevState.likes * 1 - 1,
      }))


      fetch('https://draydinv.ir/extra/oscefasllike.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          likes: this.state.likes * 1 - 1,
          name_fa: this.state.name_fa,
          cat_fa: this.state.cat_fa,
          username: this.state.username,
          type: 0,

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
    }



  }

  handleislike = () => {
    const { username, name_fa, cat_fa, ispressed } = this.state;
    fetch('https://draydinv.ir/extra/getlikeoscefasl.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        name_fa: name_fa,
        cat_fa: cat_fa,
      }),
    })
      .then(response => response.json())
      .then(async (data) => {
        if (data.success == true) {

          this.setState({ ispressed: true });

        } else {
          this.setState({ ispressed: false });
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


  render() {
    if (this.state.isLoading || !this.state.fontLoaded) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <View>
        <View style={{ flexDirection: 'row-reverse', borderRadius: 10, marginTop: 10, backgroundColor: '', elevation: 3, shadowColor: 'white', marginHorizontal: 0, alignItems: 'center', padding: 5, borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'white', elevation: 10 }}>


          <View style={{ flexDirection: 'column', backgroundColor: '', width: this.width, flexGrow: 1 }}>



            {this.state.cat_fa == 'داخلی وجراحی' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../assets/img/nephrology1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}> اورژانس  :  {this.state.cat_fa}</Text>

              </View>
            }

            {this.state.cat_fa == 'اطفال' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../assets/img/child1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}> اورژانس  :  {this.state.cat_fa}</Text>

              </View>
            }
            {this.state.cat_fa == 'زنان وزایمان' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../assets/img/gyneacology1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}> اورژانس  :  {this.state.cat_fa}</Text>

              </View>
            }


            {this.state.cat_fa == 'اورولوژی' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../assets/img/urology1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}> اورژانس  :  {this.state.cat_fa}</Text>

              </View>
            }


            {this.state.cat_fa == 'چشم' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../assets/img/eye1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>  اورژانس  :  {this.state.cat_fa}</Text>

              </View>
            }
            {this.state.cat_fa == 'عفونی' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../assets/img/infection1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}> اورژانس :  {this.state.cat_fa}</Text>

              </View>
            }

            {this.state.cat_fa == 'مغزواعصاب' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../assets/img/neurology1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>  اورژانس :  {this.state.cat_fa}</Text>

              </View>
            }

            {this.state.cat_fa == 'گوش گلوبینی' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../assets/img/ear1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}> اورژانس :  {this.state.cat_fa}</Text>
              </View>
            }
            {this.state.cat_fa == 'پوست' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../assets/img/skin1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}> اورژانس :  {this.state.cat_fa}</Text>
              </View>
            }


            {this.state.cat_fa == 'روانپزشکی' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../assets/img/psychiatrics1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}> اورژانس :  {this.state.cat_fa}</Text>
              </View>
            }


            <View style={{ flexDirection: 'row-reverse', justifyContent: 'right', alignItems: 'center', borderColor: 'green', borderTopWidth: 0.5, borderStyle: 'dotted' }}>
              <Image resizeMode='contain' source={require('../assets/image/chapter.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '#06d6a0', }} />

              <Text style={{ color: 'black', borderColor: 'green', borderStyle: 'dotted', borderWidth: 0.5, backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>  {this.state.name_fa}</Text>

            </View>

          </View>



          <View style={{ flexDirection: 'column', backgroundColor: '', width: this.width, flexGrow: 1, paddingRight: 7 }}>

            <View style={{ flexDirection: 'row-reverse', justifyContent: 'center', alignSelf: 'flex-end' }}>
              <Image resizeMode='contain' source={require('../assets/image/watch.png')} style={{ width: 20, height: 15, borderRadius: 5, tintColor: '#06d6a0', backgroundColor: '' }} />

              <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 0, fontSize: 11, fontWeight: '600', marginTop: 0, textAlign: 'left', marginHorizontal: 0, fontFamily: 'morvarid', alignSelf: 'flex-start', textAlign: 'right', marginTop: 2 }}>زمان مطالعه :  {this.state.time}</Text>

            </View>

            {/* <View style={{ marginTop: 5, flexDirection: 'row-reverse', justifyContent: 'center', alignSelf: 'flex-end', }}>
              <Image resizeMode='contain' source={require('../assets/image/writer1.png')} style={{ width: 20, height: 15, borderRadius: 5, tintColor: '#06d6a0', backgroundColor: '' }} />

              <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 0, fontSize: 11, fontWeight: '600', marginTop: 0, textAlign: 'left', marginHorizontal: 0, fontFamily: 'morvarid', alignSelf: 'flex-start', textAlign: 'right', marginTop: 2 }}> نویسنده :  {this.state.writer}</Text>

            </View> */}


            <TouchableOpacity

              onPress={this.handlepressin}

            >
              <View style={{ marginTop: 5, flexDirection: 'row-reverse', justifyContent: 'right', alignSelf: 'right', }}>
                <Image resizeMode='contain' source={require('../assets/image/heart1.png')} style={{ width: 20, height: 15, tintColor: this.state.ispressed ? '#FF69B4' : 'grey', backgroundColor: '' }} />

                <Text style={{ color: this.state.ispressed ? '#FF69B4' : 'grey', backgroundColor: '', borderRadius: 5, padding: 0, fontSize: 11, fontWeight: '600', marginTop: 0, textAlign: 'left', marginHorizontal: 0, fontFamily: 'morvarid', alignSelf: 'flex-start', textAlign: 'right', marginTop: 2, marginHorizontal: 5 }}>{this.state.likes}  نفر این مطلب را پسندیدند</Text>

              </View>


            </TouchableOpacity>


          </View>



        </View>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 110,marginTop:10 }}
        />
      </View>

    );
  }

}


const styles = StyleSheet.create({

  item: {
    flexDirection: 'row-reverse',
    backgroundColor: 'white',
    padding: 8,
    alignSelf: 'center',
    marginTop: 10,
    elevation: 6,
    borderRadius: 8,
    borderRightWidth: 2,
    borderRightColor: '#FFCDEA',
    borderLeftWidth: 2,
    borderLeftColor: '#FFCDEA',
    width: width * 5.8 / 6,

  },
  text: {
    fontSize: 15,
    alignSelf: 'center',
    fontWeight: '700',
    textAlign: 'center',
    marginHorizontal: 5
  },

  item1: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 8,
    margin: 10,
    elevation: 6,
    borderRadius: 8,

    borderRightWidth: 2,
    borderRightColor: '#FFCDEA',
    borderLeftWidth: 2,
    borderLeftColor: '#FFCDEA',
    width: width * 5.8 / 6,
  },
  text1: {
    fontSize: 15,
    alignSelf: 'center',
    fontWeight: '700',
    textAlign: 'center'

  },
  text2: {
    fontSize: 15,
    alignSelf: 'center',
    fontWeight: '700',
    textAlign: 'center'

  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginHorizontal: 2,
    padding: 4,
    backgroundColor: 'transparent',
    elevation: 0,
    borderRadius: 10,



  },
  subject: {
    fontFamily: 'nazanin',
    fontSize: 14,
    textAlign: 'right',
    color: '#333',

    textAlignVertical: 'center'
  },
  webviewContainer: {
    height: 300,
    overflow: 'hidden',
  },
});

export default Oscedetailscreen;