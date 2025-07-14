import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ActivityIndicator, Dimensions, StyleSheet, Platform } from 'react-native';
import WebView from 'react-native-webview';

import * as Font from 'expo-font';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Diagnosedetailscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name_en: this.props.route.params.name_en,
      name_fa: this.props.route.params.name_fa,
      data: [],
      isLoading: true,
      selectedId: null,

    };

    this.webViewRef = React.createRef();

  }
  screenWidth = Dimensions.get('window').width;
  componentDidMount() {
    this.fetchData();
    const script = "const meta=ducument.creatElement('meta');meta.setAttribute('content','width=device-width,initial-scale=1.0,maximum-scale=1.0,use-scalable=0');meta.setAtribute('name','viewport');meta.setAttribute('Dir','rtl');document.head.appendChild(meta);true";
    if (this.webViewRef.current) {
      this.webViewRef.current.injectJavaScript(script);
    }
    Font.loadAsync({
      'morvarid': require('../assets/fonts/morvarid.ttf'),

    });
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

  selectItem = async (id) => {
    this.setState({ selectedId: id });
  };

  renderItem = ({ item }) => {
    const bottomborder = item.id === this.state.selectedId ? '#864AF9' : 'white';
    const textcolor = item.id === this.state.selectedId ? '#864AF9' : 'black';
    return (
      <TouchableOpacity
        onPress={() => this.selectItem(item.id)}
        activeOpacity={0.7}
        style={{
          flex: 1,
          elevation: 0,
          shadowColor: 'grey',
          justifyContent: 'center',
          alignItems: 'center',
          width: width / 3,
          backgroundColor: 'transparent',
          height: width / 9,
          paddingHorizontal: 3,
          marginHorizontal: 3,
          marginVertical: 3,
          borderBottomWidth: 2,
          borderBottomColor: bottomborder,
          transform: [{ scaleX: -1 }],
        }}

      >
        <Text style={{ color: textcolor, fontWeight: 700 }}>{item.subject}</Text>
      </TouchableOpacity>
    );
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
    const pre5 = "<style>@font-face{font-family:'roboto';src:url('https://draydinv.ir/font1/morvarid.ttf')}body{font-size:16px;font-family:'roboto';}p{line-height:1.8}</style>"


    return (
      <View style={{ marginTop: 10, flex: 1, }}>

        <View style={{ width: this.width, flexDirection: 'row-reverse', borderRadius: 10, marginTop: 10, backgroundColor: '#EEEEEE', elevation: 3, shadowColor: '#06d6a0', marginHorizontal: 10, alignItems: 'center' }}>


          <Image resizeMode='contain' source={require('../assets/image/tabib.png')} style={{ width: 40, height: 25, borderRadius: 15, tintColor: 'grey' }} />

          <Text style={{ color: 'grey', fontSize: 16, marginTop: 3, textAlign: 'right', textAlignVertical: 'center', marginHorizontal: 0, padding: 5, fontFamily: 'morvarid', }}>فصل :  {this.state.name_fa}</Text>


        </View>


        <View style={{ marginBottom: 5 }}>
          <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            extraData={pre5 + this.state.selectedId}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ transform: [{ scaleX: -1 }] }}
          />
        </View>

        {selectItem && (
          <View style={{ flex: 1 }}>

            {isweb ? (<iframe srcDoc={pre3 + selectItem.content + pre4} style={{ border: 'none', width: '100%', height: '100%' }} height={height} width={width} />) : (
              <WebView
                ref={this.webViewRef}
                style={{ width: '95%', height: '100%', alignSelf: 'center', backgroundColor: 'transparent' }}
                originWhitelist={['*']}
                source={{ html: selectItem.content }}
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
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
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

export default Diagnosedetailscreen;