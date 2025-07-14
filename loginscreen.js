import React from 'react';
import { View, TextInput, Button, Alert, Dimensions, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Customswich_component3 from './Customswich3';

class Loginscreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      username1: '',
      password1: '',
      phone1: '',
      showtext: false,
      showtext1: false,
      showtext2: false,
      gamesTab: 1,
    };
    this.timeouthandle = null;
    this.timeouthandle1 = null;

  }

  onSelectSwich = (value) => {
    this.setState({ gamesTab: value });
  }

  componentDidMount() {
    this.checkLoginState();
    if (this.timeouthandle) {
      clearTimeout(this.timeouthandle);
    }
    if (this.timeouthandle1) {
      clearTimeout(this.timeouthandle1);
    }
  }

  checkLoginState = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const username = await AsyncStorage.getItem('username');
      if (username) {
        this.props.navigation.navigate('Bottom_Tabs1', { username: this.state });
      }
    } catch (error) {
      console.error('Error retrieving data', error);
    }
  };

  handleLogin = () => {
    const { username, password } = this.state;
    fetch('https://draydinv.ir/extra/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(async (data) => {
        if (data.success) {
          // If login is successful, save the token and navigate to the next screen
          await AsyncStorage.multiSet([
            ['userToken', data.token],
            ['username',username]
          ]);
         
          this.props.navigation.navigate('Bottom_Tabs1');
        } else {
          {
            this.setState({ showtext: true }, () => {
              this.timeouthandle = setTimeout(() => {
                this.setState({ showtext: false })
              }, 5000);

            })
          }
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  handlesignup = () => {
    const { username1, password1, phone1 } = this.state;


    fetch('https://draydinv.ir/extra/signup.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username1: username1,
        password1: password1,
        phone1: phone1,
      })
    })
      .then((response) => response.json())
      .then((json) => {
        // پردازش پاسخ سرور
        if (json.success) {
          {
            this.setState({ showtext1: true }, () => {
              this.timeouthandle1 = setTimeout(() => {
                this.setState({ showtext: false })
              }, 5000);

            })
          }
        } else {
          {
            this.setState({ showtext2: true }, () => {
              this.timeouthandle1 = setTimeout(() => {
                this.setState({ showtext: false })
              }, 5000);

            })
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };



  render() {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ marginTop: 60 }}>
          <Customswich_component3 selectionmode={1} onselectswitch={this.onSelectSwich} />
        </View>
       
        <View style={{justifyContent:'space-between',flex:1}}>
          {
            this.state.gamesTab == 1 &&
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View >
                <TextInput
                  placeholder="Username"
                  value={this.state.username}
                  onChangeText={(text) => this.setState({ username: text })}
                  style={{ height: 60, borderColor: 'purple', borderWidth: 1, borderRadius: 5, width: width * 4.5 / 5, marginBottom: 20, padding: 5 }}
                />
                <TextInput
                  placeholder="Password"
                  value={this.state.password}
                  onChangeText={(text) => this.setState({ password: text })}
                  secureTextEntry
                  style={{ height: 60, borderColor: 'purple', borderWidth: 1, borderRadius: 5, width: width * 4.5 / 5, marginBottom: 20, padding: 5 }}
                />
                <TouchableOpacity title="ورود" onPress={this.handleLogin} style={{ width: width * 4.5 / 5, justifyContent: 'center', backgroundColor: '#06d6a0', height: height / 13, borderRadius: 10 }} >

                  <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>ورود</Text>

                </TouchableOpacity>

                {this.state.showtext && <Text style={{ textAlign: 'center', color: 'red', fontWeight: '900', marginTop: 10 }}>نام کاربری یا رمز عبور اشتباه است</Text>}


              </View>

            </View>
          }

          {
            this.state.gamesTab == 2 &&
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TextInput
                placeholder="Username"
                value={this.state.username1}
                onChangeText={(text) => this.setState({ username1: text })}
                style={{ height: 60, borderColor: 'purple', borderWidth: 1, borderRadius: 5, width: width * 4.5 / 5, marginBottom: 20, padding: 5 }}
              />
              <TextInput
                placeholder="phone"
                value={this.state.phone1}
                onChangeText={(text) => this.setState({ phone1: text })}
                style={{ height: 60, borderColor: 'purple', borderWidth: 1, borderRadius: 5, width: width * 4.5 / 5, marginBottom: 20, padding: 5 }}
              />
              <TextInput
                placeholder="Password"
                value={this.state.password1}
                onChangeText={(text) => this.setState({ password1: text })}
                secureTextEntry
                style={{ height: 60, borderColor: 'purple', borderWidth: 1, borderRadius: 5, width: width * 4.5 / 5, marginBottom: 20, padding: 5 }}
              />
              <TouchableOpacity title="ثبت نام" onPress={this.handlesignup} style={{ width: width * 4.5 / 5, justifyContent: 'center', backgroundColor: '#ef476f', height: height / 13, borderRadius: 10 }} >

                <Text style={{ textAlign: 'center', color: 'white', fontWeight: '900', }}>ثبت نام</Text>

              </TouchableOpacity>

              {this.state.showtext1 && <Text style={{ textAlign: 'center', color: 'green', fontWeight: '900', marginTop: 10 }}>
                حساب کاربری شما با موفقیت ایجاد شد
              </Text>}
              {this.state.showtext2 && <Text style={{ textAlign: 'center', color: 'red', fontWeight: '900', marginTop: 10 }}>
                خطا در ایجاد حساب کاربری
              </Text>}


            </View>
          }
          <View style={{ flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: 10, alignSelf: 'center' }}>
            <Image
              source={require('./assets/image/med1.png')}
              style={{ width: 30, height: 30, tintColor: '#864AF9' }}
            />
            <Text style={{ margin: 5, fontWeight: '800', color: '#864AF9' }}>DOCTOR</Text>
          </View>
        </View>

      </View>

    );
  }
}

export default Loginscreen;