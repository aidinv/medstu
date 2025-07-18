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

class Diagnosedetailscreen extends Component {
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
      const response = await fetch('https://draydinv.ir/extra/diagnose_detail.php', {
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
      <html dir="rtl">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            @font-face {
              font-family: 'morvarid';
              src: url('https://draydinv.ir/font1/morvarid.ttf');
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

      fetch('https://draydinv.ir/extra/diagnosefasllike.php', {
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


      fetch('https://draydinv.ir/extra/diagnosefasllike.php', {
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
    fetch('https://draydinv.ir/extra/getlikediagnosefasl.php', {
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



            {this.state.cat_fa == 'تظاهرات بالینی' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../assets/img/nephrology1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>مهارت بالینی  :  {this.state.cat_fa}</Text>

              </View>
            }

            {this.state.cat_fa == 'تظاهرات بیوشیمیایی' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../assets/img/child1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>مهارت بالینی   :  {this.state.cat_fa}</Text>

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
    marginHorizontal: 15,
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

export default Diagnosedetailscreen;