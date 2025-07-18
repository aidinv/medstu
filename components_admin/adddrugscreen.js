import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Dimensions,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ScrollView
} from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';

const { width, height } = Dimensions.get('window');

export default class Add_drugscreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cat: '',
            name1: '',
            name2: '',
            code: '',
            showtext1: false,
            showtext2: false,
            dropdownItems: []
        };
    }

    componentDidMount() {
        this.fetchCategories();
    }

    fetchCategories = () => {
        fetch('https://draydinv.ir/extra/getdrugscat.php')
            .then(response => response.json())
            .then(data => {
                const formatted = data.map(item => ({
                    label: item.cat, // ← بر اساس ساختار API شما
                    value: item.id
                }));
                this.setState({ dropdownItems: formatted });
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    };

    handleAddDrug = () => {
        const { cat, name1, name2, code } = this.state;

        fetch('https://draydinv.ir/extra/adddrug.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cat: cat,
                name1: name1,
                name2: name2,
                code: code
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success === true) {
                    this.setState({ showtext1: true, showtext2: false });
                } else {
                    this.setState({ showtext1: false, showtext2: true });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                this.setState({ showtext1: false, showtext2: true });
            });
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ alignItems: 'center', paddingTop: 60 }}>

                    {/* Header */}
                    <View style={{
                        flexDirection: 'row-reverse',
                        marginBottom: 10,
                        justifyContent: 'space-around',
                        width: width * 0.95,
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontWeight: '900',
                            color: '#D20062',
                            textAlign: 'center',
                        }}>اضافه کردن داروی جدید</Text>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Admin')}
                            style={{
                                width: width * 0.15,
                                height: height / 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'transparent'
                            }}
                        >
                            <Image
                                source={require('../assets/icons/back.png')}
                                resizeMode='contain'
                                style={{ width: 24, height: 24 }}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Notice */}
                    <View style={{
                        flexDirection: 'row-reverse',
                        alignItems: 'center',
                        width: width * 0.9,
                        marginBottom: 20
                    }}>
                        <Image
                            source={require('../assets/image/notice.png')}
                            resizeMode='contain'
                            style={{ width: 24, height: 24, marginLeft: 10 }}
                        />
                        <Text style={{
                            fontWeight: '900',
                            color: 'grey',
                        }}>اطلاعات داروی جدید را وارد کنید</Text>
                    </View>

                    {/* Dropdown با react-native-element-dropdown */}

                   
                    <Dropdown
                        style={{
                            width: width * 0.9,
                            height: 55,
                            borderColor: 'purple',
                            borderWidth: 1.5,
                            borderRadius: 12,
                            paddingHorizontal: 12,
                            backgroundColor: '#fff',
                            marginBottom: 20,
                            alignSelf: 'center',
                        }}
                        containerStyle={{
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: 'purple',
                            backgroundColor: '#EEEEEE',
                            paddingBottom: 5,
                            paddingTop: 0,
                           
                        }}
                        selectedTextStyle={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#4B0082',
                            textAlign:'center',
                        }}
                        placeholderStyle={{
                            color: '#999',
                            fontSize: 15,
                            fontStyle: 'italic',
                            textAlign:'center'
                        }}
                        itemTextStyle={{
                            color: '#333',
                            fontSize: 15,
                            textAlign:'center',
                            elevation:0
                        }}
                        itemContainerStyle={{
                            paddingVertical: 5,
                            paddingHorizontal: 15,
                            borderWidth: 0.75,
                            borderColor: 'green',
                            borderStyle:'dotted',
                            backgroundColor:'',
                            borderRadius: 8,
                            margin:5
                        }}
                        activeColor="#06d6a0"
                        
                        data={this.state.dropdownItems}
                        labelField="label"
                        valueField="value"
                        placeholder="انتخاب دسته دارو"
                        search
                        searchPlaceholder="جستجو..."
                        inputSearchStyle={{
                            textAlign:'center',
                            borderRadius:10,
                            
                        }}
                        
                        value={this.state.cat}
                        onChange={item => {
                            this.setState({ cat: item.label });
                        }}
                    />



                    {/* Inputs */}
                    <TextInput
                        placeholder="نام فارسی داروی جدید را بنویسید"
                        value={this.state.name1}
                        onChangeText={(text) => this.setState({ name1: text })}
                        style={{
                            height: 60,
                            borderColor: 'purple',
                            borderWidth: 1,
                            borderRadius: 5,
                            width: width * 0.9,
                            marginBottom: 20,
                            paddingHorizontal: 10
                        }}
                    />
                    <TextInput
                        placeholder="نام انگلیسی داروی جدید را بنویسید"
                        value={this.state.name2}
                        onChangeText={(text) => this.setState({ name2: text })}
                        style={{
                            height: 60,
                            borderColor: 'purple',
                            borderWidth: 1,
                            borderRadius: 5,
                            width: width * 0.9,
                            marginBottom: 20,
                            paddingHorizontal: 10
                        }}
                    />
                        <TextInput
                        placeholder="کد ژنریک دارو را وارد کنید"
                        value={this.state.code}
                        onChangeText={(text) => this.setState({ code: text })}
                        style={{
                            height: 60,
                            borderColor: 'purple',
                            borderWidth: 1,
                            borderRadius: 5,
                            width: width * 0.9,
                            marginBottom: 20,
                            paddingHorizontal: 10
                        }}
                    />

                    {/* Submit Button */}
                    <TouchableOpacity
                        onPress={this.handleAddDrug}
                        style={{
                            width: width * 0.9,
                            backgroundColor: '#06d6a0',
                            height: height / 13,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 20
                        }}
                    >
                        <Text style={{ color: 'white', fontWeight: '900' }}>
                            اضافه کردن داروی جدید
                        </Text>
                    </TouchableOpacity>

                    {/* Feedback Messages */}
                    {this.state.showtext1 && (
                        <Text style={{ color: 'green', fontWeight: '900', textAlign: 'center' }}>
                            دارو با موفقیت اضافه شد
                        </Text>
                    )}
                    {this.state.showtext2 && (
                        <Text style={{ color: 'red', fontWeight: '900', textAlign: 'center' }}>
                            خطا در اضافه کردن دارو
                        </Text>
                    )}

                </ScrollView>
            </SafeAreaView>
        );
    }
}
