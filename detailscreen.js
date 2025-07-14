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

class Detailscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fasl_name_en: this.props.route.params.fasl_name_en,
      data: [],
      isLoading: true,
      fontLoaded: false,

      fasl_name_fa: this.props.route.params.fasl_name_fa,
      img: this.props.route.params.img,
      cours_fa: this.props.route.params.cours_fa,
      time: this.props.route.params.time,
      writer: this.props.route.params.writer,
      likes: this.props.route.params.likes,
      username: this.props.route.params.username,
      data: [],
      isLoading: true,
      selectedId: null,
      ispressed: '',
      webViewHeights: {},
      expandedItemId: null
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'morvarid': require('./assets/fonts/morvarid.ttf'),
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
      const response = await fetch('http://draydinv.ir/extra/detail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        body: JSON.stringify({
          fasl_name_en: this.state.fasl_name_en,
        })
      });

      const json = await response.json();
      this.setState({ data: json, isLoading: false });
    } catch (error) {
      console.error(error);
    }
  };


  handlepressin = () => {
    if (this.state.ispressed == false) {
      this.setState({ ispressed: true });
      this.setState((prevState) => ({
        likes: prevState.likes * 1 + 1,
      }))

      fetch('http://draydinv.ir/extra/fasllike.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          likes: this.state.likes * 1 + 1,
          fasl_name_fa: this.state.fasl_name_fa,
          cours_fa: this.state.cours_fa,
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


      fetch('http://draydinv.ir/extra/fasllike.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          likes: this.state.likes * 1 - 1,
          fasl_name_fa: this.state.fasl_name_fa,
          cours_fa: this.state.cours_fa,
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
    const { username, fasl_name_fa, cours_fa, ispressed } = this.state;
    fetch('http://draydinv.ir/extra/getlikefasl.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        fasl_name_fa: fasl_name_fa,
        cours_fa: cours_fa,
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
      <html dir="rtl">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            @font-face {
              font-family: 'morvarid';
              src: url('http://draydinv.ir/font1/morvarid.ttf');
            }
            body {
              font-size: 16px;
              font-family: 'morvarid';
              padding: 10px;
              line-height: 1.8;
              direction: rtl;
              margin: 0;
              background-color: transparent;
            }
          </style>
        </head>
        <body>${item.content}
          <script>
            function sendHeight() {
              const height = document.body.scrollHeight;
              window.${Platform.OS === 'web' ? 'parent' : 'ReactNativeWebView'}.postMessage(
                ${Platform.OS === 'web'
        ? `JSON.stringify({ type: 'iframeHeight', id: '${item.id}', height })`
        : `height.toString()`});
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
            backgroundColor: '#EEEEEE', padding: 10,
            borderRadius: 5, flexDirection: 'row-reverse', alignItems: 'center',
            elevation: 2,
            shadowColor: 'green',
            shadowOpacity: 1,
          }}
          onPress={() => this.handleToggleExpand(item.id)}>
          <View style={{ backgroundColor: '#06d6a0', width: 10, height: 10, borderRadius: 3, justifyContent: 'center', alignSelf: 'center', marginRight: 5, marginLeft: 5 }}></View>
          <Text style={styles.subject}>مبحث : {item.subject}</Text>
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
                marginTop:5,
                
              }}
            />
          )
        )}
      </View>
    );
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
        <View style={{ flexDirection: 'row-reverse', borderRadius: 10, marginTop: 40, backgroundColor: '', elevation: 3, shadowColor: 'white', marginHorizontal: 0, alignItems: 'center', padding: 5, borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'white', elevation: 10 }}>


          <View style={{ flexDirection: 'column', backgroundColor: '', width: this.width, flexGrow: 1 }}>

            {this.state.cours_fa == 'ارتوپدی' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('./assets/img/orthopaedic1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درس : {this.state.cours_fa}</Text>

              </View>
            }

            {this.state.cours_fa == 'نفرولوژی' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('./assets/img/nephrology1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درس :  {this.state.cours_fa}</Text>

              </View>
            }

            {this.state.cours_fa == 'اطفال' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('./assets/img/child1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درس :  {this.state.cours_fa}</Text>

              </View>
            }
            {this.state.cours_fa == 'زنان وزایمان' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('./assets/img/gyneacology1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درس :  {this.state.cours_fa}</Text>

              </View>
            }
            {this.state.cours_fa == 'جراحی' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('./assets/img/surgery1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درس :  {this.state.cours_fa}</Text>

              </View>
            }
            {this.state.cours_fa == 'قلب وعروق' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('./assets/img/heart1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درس :  {this.state.cours_fa}</Text>

              </View>
            }
            {this.state.cours_fa == 'اورولوژی' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('./assets/img/urology1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درس :  {this.state.cours_fa}</Text>

              </View>
            }
            {this.state.cours_fa == 'روماتولوژی' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('./assets/img/rhuematology1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درس :  {this.state.cours_fa}</Text>

              </View>
            }
            {this.state.cours_fa == 'رادیولوژی' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('./assets/img/radiology1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درس :  {this.state.cours_fa}</Text>

              </View>
            }
            {this.state.cours_fa == 'فارماکولوژی' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('./assets/img/pharmacology1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درس :  {this.state.cours_fa}</Text>

              </View>
            }
            {this.state.cours_fa == 'چشم' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('./assets/img/eye1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درس :  {this.state.cours_fa}</Text>

              </View>
            }
            {this.state.cours_fa == 'عفونی' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('./assets/img/infection1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درس :  {this.state.cours_fa}</Text>

              </View>
            }
            {this.state.cours_fa == 'ریه' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('./assets/img/lung1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درس :  {this.state.cours_fa}</Text>

              </View>
            }
            {this.state.cours_fa == 'نورولوژی' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('./assets/img/neurology1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درس :  {this.state.cours_fa}</Text>

              </View>
            }
            {this.state.cours_fa == 'گوارش' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('./assets/img/digestive1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درس :  {this.state.cours_fa}</Text>

              </View>
            }
            {this.state.cours_fa == 'گوش گلوبینی' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('./assets/img/ear1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درس :  {this.state.cours_fa}</Text>

              </View>
            }
            {this.state.cours_fa == 'پوست' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('./assets/img/skin1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درس :  {this.state.cours_fa}</Text>

              </View>
            }
            {this.state.cours_fa == 'غدد' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('./assets/img/endocrinology1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درس :  {this.state.cours_fa}</Text>

              </View>
            }
            {this.state.cours_fa == 'هماتولوژی' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('./assets/img/hematology1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درس :  {this.state.cours_fa}</Text>

              </View>
            }
            {this.state.cours_fa == 'روانپزشکی' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('./assets/img/psychiatrics1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درس :  {this.state.cours_fa}</Text>

              </View>
            }
            {this.state.cours_fa == 'پاتولوژی' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('./assets/img/pathology1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درس :  {this.state.cours_fa}</Text>

              </View>
            }

            <View style={{ flexDirection: 'row-reverse', justifyContent: 'right', alignItems: 'center', borderColor: 'green', borderTopWidth: 0.5, borderStyle: 'dotted' }}>
              <Image resizeMode='contain' source={require('./assets/image/chapter.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '#06d6a0', }} />

              <Text style={{ color: 'black', borderColor: 'green', borderStyle: 'dotted', borderWidth: 0.5, backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>فصل :  {this.state.fasl_name_fa}</Text>

            </View>

          </View>



          <View style={{ flexDirection: 'column', backgroundColor: '', width: this.width, flexGrow: 1, paddingRight: 7 }}>

            <View style={{ flexDirection: 'row-reverse', justifyContent: 'center', alignSelf: 'flex-end' }}>
              <Image resizeMode='contain' source={require('./assets/image/watch.png')} style={{ width: 20, height: 15, borderRadius: 5, tintColor: '#06d6a0', backgroundColor: '' }} />

              <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 0, fontSize: 11, fontWeight: '600', marginTop: 0, textAlign: 'left', marginHorizontal: 0, fontFamily: 'morvarid', alignSelf: 'flex-start', textAlign: 'right', marginTop: 2 }}>زمان مطالعه :  {this.state.time}</Text>

            </View>

            <View style={{ marginTop: 5, flexDirection: 'row-reverse', justifyContent: 'center', alignSelf: 'flex-end', }}>
              <Image resizeMode='contain' source={require('./assets/image/writer1.png')} style={{ width: 20, height: 15, borderRadius: 5, tintColor: '#06d6a0', backgroundColor: '' }} />

              <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 0, fontSize: 11, fontWeight: '600', marginTop: 0, textAlign: 'left', marginHorizontal: 0, fontFamily: 'morvarid', alignSelf: 'flex-start', textAlign: 'right', marginTop: 2 }}> نویسنده :  {this.state.writer}</Text>

            </View>


            <TouchableOpacity

              onPress={this.handlepressin}

            >
              <View style={{ marginTop: 5, flexDirection: 'row-reverse', justifyContent: 'right', alignSelf: 'right', }}>
                <Image resizeMode='contain' source={require('./assets/image/heart1.png')} style={{ width: 20, height: 15, tintColor: this.state.ispressed ? '#FF69B4' : 'grey', backgroundColor: '' }} />

                <Text style={{ color: this.state.ispressed ? '#FF69B4' : 'grey', backgroundColor: '', borderRadius: 5, padding: 0, fontSize: 11, fontWeight: '600', marginTop: 0, textAlign: 'left', marginHorizontal: 0, fontFamily: 'morvarid', alignSelf: 'flex-start', textAlign: 'right', marginTop: 2, marginHorizontal: 5 }}>{this.state.likes}  نفر این مطلب را پسندیدند</Text>

              </View>


            </TouchableOpacity>


          </View>



        </View>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 110 }}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    margin: 4,
    padding: 4,
    backgroundColor: 'transparent',
    elevation: 0,
    borderRadius: 10,



  },
  subject: {
    fontFamily: 'morvarid',
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

export default Detailscreen;
