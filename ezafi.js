import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, Pressable, Text, TouchableOpacity, FlatList, Image, ActivityIndicator, Dimensions, StyleSheet, Platform } from 'react-native';
import WebView from 'react-native-webview';
import * as Font from 'expo-font';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Detailscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fasl_name_en: this.props.route.params.fasl_name_en,
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





    };

    this.webViewRef = React.createRef();


  }
  screenWidth = Dimensions.get('window').width;
  componentDidMount() {
    this.fetchData();
    this.handleislike();
    const script = "const meta=ducument.creatElement('meta');meta.setAttribute('content','width=device-width,initial-scale=1.0,maximum-scale=1.0,use-scalable=0');meta.setAtribute('name','viewport');meta.setAttribute('Dir','rtl');document.head.appendChild(meta);true";
    if (this.webViewRef.current) {
      this.webViewRef.current.injectJavaScript(script);
    }
    Font.loadAsync({
      'morvarid': require('./assets/fonts/morvarid.ttf'),

    });

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

  selectItem = async (id) => {
    this.setState({ selectedId: id });
  };

  renderItem = ({ item }) => {
    const bottomborder = item.id === this.state.selectedId ? '#06d6a0' : 'white';
    const backgroundColor = item.id === this.state.selectedId ? 'white' : '';
    const textcolor = item.id === this.state.selectedId ? '#06d6a0' : 'black';
    return (
      <TouchableOpacity
        onPress={() => this.selectItem(item.id)}
        activeOpacity={0.7}
        style={{

          elevation: 0,
          shadowColor: 'grey',
          justifyContent: 'center',
          alignItems: 'center',
          width: width,
          backgroundColor: backgroundColor,
          height: width / 9,
          paddingHorizontal: 0,
         
          marginVertical: 15,
          borderBottomWidth: 1,
           
          borderBottomColor: bottomborder,
          transform: [{ scaleX: -1 }],
        }}

      >
        <Text style={{ color: textcolor, fontFamily: 'morvarid' }}>{item.subject}</Text>
      </TouchableOpacity>
    );
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






  render() {
    const isweb = Platform.OS === 'web';

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    const selectItem = this.state.data.find(item => item.id === this.state.selectedId);
    const pre1 = '<!DOCTYPE html><html dir="rtl"><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>body { font-size: 80%; }</style></head><body><div id="ckeditor-content">';
    const pre2 = '</div></body></html>'

    const pre3 = `<style>#wrap {transform:scale(0.8);transform-origin:top left;display:block;overflow:hidden;width:calc(100%*1.20);height:calc(100%*1.25)}</style><div id="wrap">`;
    const pre4 = '</div>'
    const pre5 = "<style>@font-face{font-family:'roboto';src:url('http://draydinv.ir/font1/morvarid.ttf')}body{font-size:16px;font-family:'roboto';}p{line-height:1.8}</style>"


    return (
      <View style={{ marginTop: 10, flex: 1, }}>

        <View style={{  flexDirection: 'row-reverse', borderRadius: 10, marginTop: 30, backgroundColor: '', elevation: 3, shadowColor: 'white', marginHorizontal: 0, alignItems: 'center', padding: 5, borderTopWidth: 1,borderBottomWidth:1, borderColor: 'white', elevation: 10 }}>


          <View style={{ flexDirection: 'column', backgroundColor: '',width:this.width,flexGrow:1}}>

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



          <View style={{ flexDirection: 'column', backgroundColor: '', width:this.width ,flexGrow:1,paddingRight:7}}>

            <View style={{ flexDirection: 'row-reverse', justifyContent: 'center', alignSelf: 'flex-end' }}>
              <Image resizeMode='contain' source={require('./assets/image/watch.png')} style={{ width: 20, height: 15, borderRadius: 5, tintColor: '#06d6a0', backgroundColor: '' }} />

              <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 0, fontSize: 11, fontWeight: '600', marginTop: 0, textAlign: 'left', marginHorizontal: 0, fontFamily: 'morvarid', alignSelf: 'flex-start', textAlign: 'right', marginTop: 2 }}>زمان مطالعه :  {this.state.time}</Text>

            </View>

            <View style={{ marginTop: 5, flexDirection: 'row-reverse', justifyContent: 'center', alignSelf: 'flex-end',  }}>
              <Image resizeMode='contain' source={require('./assets/image/writer1.png')} style={{ width: 20, height: 15, borderRadius: 5, tintColor: '#06d6a0', backgroundColor: '' }} />

              <Text style={{ color: 'grey', backgroundColor: '', borderRadius: 5, padding: 0, fontSize: 11, fontWeight: '600', marginTop: 0, textAlign: 'left', marginHorizontal: 0, fontFamily: 'morvarid', alignSelf: 'flex-start', textAlign: 'right', marginTop: 2 }}> نویسنده :  {this.state.writer}</Text>

            </View>


            <TouchableOpacity

              onPress={this.handlepressin}

            >
              <View style={{ marginTop: 5, flexDirection: 'row-reverse', justifyContent: 'right', alignSelf: 'right',  }}>
                <Image resizeMode='contain' source={require('./assets/image/heart1.png')} style={{ width: 20, height: 15, tintColor: this.state.ispressed ? '#FF69B4' : 'grey', backgroundColor: '' }} />

                <Text style={{ color: this.state.ispressed ? '#FF69B4' : 'grey', backgroundColor: '', borderRadius: 5, padding: 0, fontSize: 11, fontWeight: '600', marginTop: 0, textAlign: 'left', marginHorizontal: 0, fontFamily: 'morvarid', alignSelf: 'flex-start', textAlign: 'right', marginTop: 2, marginHorizontal: 5 }}>{this.state.likes}  نفر این مطلب را پسندیدند</Text>

              </View>


            </TouchableOpacity>


          </View>



        </View>


        <View style={{ marginBottom: 5 }}>
          <FlatList
          
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            extraData={this.state.selectedId}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ transform: [{ scaleX: -1 }] ,}}
          />
        </View>

        {selectItem && (
          <View style={{ flex: 1 }}>

            {isweb ? (<iframe srcDoc={pre3 + selectItem.content + pre4} style={{ border: 'none', width: '100%', height: '100%' }} height={height} width={width} />) : (
              <WebView
                ref={this.webViewRef}
                style={{ width: '98%', height: '100%', alignSelf: 'center', backgroundColor: 'transparent' }}
                originWhitelist={['*']}
                source={{ html: pre5 + selectItem.content }}
                scalesPageToFit={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />

            )}

          </View>
        )}
      </View>
    );
  }
}


const styles = StyleSheet.create({

  item: {
    backgroundColor: 'transparent',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 2,
    backgroundColor: '#EEEEEE',
    flexWrap: 'wrap',
    margin: 10,
    marginTop: 0,
    shadowColor: '#06d6a0'




  },
  text: {
    fontSize: 15,
    alignSelf: 'center',
    fontWeight: '700',
    textAlign: 'center',
    marginHorizontal: 5
  }
});

export default Detailscreen;