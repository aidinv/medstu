import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ActivityIndicator, Dimensions, StyleSheet, Platform } from 'react-native';
import WebView from 'react-native-webview';
import RenderHtml from 'react-native-render-html';
import { ScrollView } from 'react-native-virtualized-view';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import * as Font from 'expo-font';
class Orderdetailscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,

      name_en: this.props.route.params.name_en,
      name_fa: this.props.route.params.name_fa,
      type: this.props.route.params.type,
      content: this.props.route.params.content,
      cours_en: this.props.route.params.cours_en,
      time: this.props.route.params.time,
      writer: this.props.route.params.writer,
      likes: this.props.route.params.likes,
      username: this.props.route.params.username,
      ispressed: '',
      // data: [],
      // isLoading: true,
      // selectedId: null,

    };

    // this.webViewRef = React.createRef();

  }
  screenWidth = Dimensions.get('window').width;
  

  async componentDidMount() {
   
    this.handleislike();
    await Font.loadAsync({
      'dast': require('../assets/fonts/dast.otf'),

    });
    this.setState({ fontsLoaded: true });

    Font.loadAsync({
      'morvarid': require('../assets/fonts/morvarid.ttf'),

    });
  }


  handlepressin = () => {
    if (this.state.ispressed == false) {
      this.setState({ ispressed: true });
      this.setState((prevState) => ({
        likes: prevState.likes * 1 + 1,
      }))

      fetch('https://draydinv.ir/extra/noskhelike.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          likes: this.state.likes * 1 + 1,
          name_fa: this.state.name_fa,
          cours_en: this.state.cours_en,
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


      fetch('https://draydinv.ir/extra/noskhelike.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          likes: this.state.likes * 1 - 1,
          name_fa: this.state.name_fa,
          cours_en: this.state.cours_en,
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
    const { username, name_fa, cours_en, ispressed } = this.state;
    fetch('https://draydinv.ir/extra/getlikenoskhe.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        name_fa: name_fa,
        cours_en: cours_en,
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
    const isweb = Platform.OS === 'web';


    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    // const selectItem = this.state.data.find(item => item.id === this.state.selectedId);
    // const pre1 = '<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>body { font-size: 10%; }</style></head><body>';
    // const pre2 = '</body></html>'

    const pre3 = `<style>#wrap {transform:scale(0.8);transform-origin:top left;display:block;overflow:hidden;width:calc(100%*1.20);height:calc(100%*1.25)}</style><div id="wrap">`;
    const pre4 = '</div>'
    const pre5 = "<style>@font-face{font-family:'roboto';src:url('https://draydinv.ir/font1/morvarid.ttf')}body{font-size:16px;font-family:'roboto';}p{line-height:1.8}</style>"
    return (
      <View style={{ marginTop: 10, flex: 1 }}>

        <View style={{ flexDirection: 'row-reverse', borderRadius: 10, marginTop: 10, backgroundColor: '', elevation: 3, shadowColor: 'white', marginHorizontal: 0, alignItems: 'center', padding: 5, borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'white', elevation: 10 }}>


          <View style={{ flexDirection: 'column', backgroundColor: '', width: this.width, flexGrow: 1 }}>



            {this.state.cours_en == 'dakheli' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../assets/img/nephrology1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درمانگاه :  داخلی</Text>

              </View>
            }

            {this.state.cours_en == 'atfal' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../assets/img/child1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درمانگاه :  اطفال و نوزادان</Text>

              </View>
            }
            {this.state.cours_en == 'gyneacology' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../assets/img/gyneacology1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درمانگاه : زنان وزایمان</Text>

              </View>
            }


            {this.state.cours_en == 'urology' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../assets/img/urology1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درمانگاه : اورولوژی</Text>

              </View>
            }



            {this.state.cours_en == 'eye' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../assets/img/eye1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درمانگاه : چشم </Text>

              </View>
            }
            {this.state.cours_en == 'infection' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../assets/img/infection1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درمانگاه : عفونی </Text>

              </View>
            }

            {this.state.cours_en == 'neurology' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../assets/img/neurology1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درمانگاه : نورولوژی</Text>

              </View>
            }

            {this.state.cours_fa == 'ent' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../assets/img/ear1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درمانگاه : گوش حلق بینی</Text>

              </View>
            }
            {this.state.cours_en == 'skin' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../assets/img/skin1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درمانگاه : پوست</Text>

              </View>
            }

            {this.state.cours_en == 'psychiatrics' &&
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image resizeMode='contain' source={require('../assets/img/psychiatrics1.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '', }} />

                <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>درمانگاه : روانپزشکی</Text>

              </View>
            }


            <View style={{ flexDirection: 'row-reverse', justifyContent: 'right', alignItems: 'center', borderColor: 'green', borderTopWidth: 0.5, borderStyle: 'dotted' }}>
              <Image resizeMode='contain' source={require('../assets/image/chapter.png')} style={{ width: 30, height: 20, borderRadius: 15, tintColor: '#06d6a0', }} />

              <Text style={{ color: 'black', borderColor: 'green', borderStyle: 'dotted', borderWidth: 0.5, backgroundColor: '', borderRadius: 5, padding: 5, fontSize: 12, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>نسخه  :  {this.state.name_fa}</Text>

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



        <View style={{ flex: 1 }}>
          {isweb ? (<iframe srcDoc={pre3 + this.state.content + pre4} style={{ border: 'none', width: '100%', height: '100%' }} height={height} width={width} />) : (
            <WebView
              ref={this.webViewRef}
              style={{ width: '95%', height: '100%', alignSelf: 'center', backgroundColor: 'transparent', }}
              originWhitelist={['*']}
              source={{ html: pre5 + this.state.content }}
              scalesPageToFit={false}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />

          )}
        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({

  item: {
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
  text: {
    fontSize: 15,

    alignSelf: 'center'
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
});

export default Orderdetailscreen;