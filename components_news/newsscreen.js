import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Pressable
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const Newsscreen = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
    const [expandedItems, setExpandedItems] = useState([]);
    const [username, setUsername] = useState(null);
    const [readIds, setReadIds] = useState([]);
    const [searchText, setSearchText] = useState('');



    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;
    const [active, setactive] = React.useState(null);
    const [gamestab, setgamestab] = React.useState(1);
    const onselectswich = (value) => {
        setgamestab(value);
    }

    const [unreadCount, setUnreadCount] = useState(0);

    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);


    const toggleAccordion2 = () => {
        setIsOpen2(!isOpen2);
        setIsOpen3(false);
        setIsOpen4(false);
    };

    const toggleAccordion3 = () => {
        setIsOpen2(false);
        setIsOpen3(!isOpen3);
        setIsOpen4(false);
    };

    const toggleAccordion4 = () => {
        setIsOpen2(false);
        setIsOpen3(false);
        setIsOpen4(!isOpen4);
    };



    const toggleTypeSelection = (type) => {
        setSelectedTypes((prev) =>
            prev.includes(type)
                ? prev.filter((t) => t !== type)
                : [...prev, type]
        );
    };

    const iconMap = {
        general: 'https://img.icons8.com/?size=100&id=116722&format=png&color=000000',
        financial: 'https://img.icons8.com/?size=100&id=64723&format=png&color=000000',
        noskhe: 'https://img.icons8.com/?size=100&id=117343&format=png&color=000000',
        cours: 'https://img.icons8.com/?size=100&id=113802&format=png&color=000000',
        order: 'https://img.icons8.com/?size=100&id=lP2D-tBpnh85&format=png&color=000000',
        osce: 'https://img.icons8.com/?size=100&id=123637&format=png&color=000000',
        pharmacy: 'https://img.icons8.com/?size=100&id=121193&format=png&color=000000',
        alert: 'https://img.icons8.com/?size=100&id=110240&format=png&color=000000',
        default: 'https://img.icons8.com/color/48/info--v1.png',
    };

    const backgroundColorMap = {
        general: '#e0f7fa',
        financial: '#fce4ec',
        noskhe: '#e8f5e9',
        cours: '#fff3e0',
        order: '#ffebee',
        osce: '#ede7f6',
        pharmacy: '#e0f2f1',
        alert: '#fff8e1',
        default: '#f5f5f5',
    };

    const filterOptions = [
        'general',
        'financial',
        'noskhe',
        'cours',
        'order',
        'osce',
        'pharmacy',
        'alert',
    ];

    const typeLabels = {
        general: 'عمومی',
        financial: 'مالی',
        noskhe: 'نسخه',
        cours: 'درس',
        order: 'اورژانس',
        osce: 'مهارت بالینی',
        pharmacy: 'داروخانه',
        alert: 'هشدار',
    };

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('https://draydinv.ir/extra/news.php');
                const data = await response.json();
                if (data.news && Array.isArray(data.news)) {
                    // مرتب سازی از جدید به قدیم بر اساس id یا تاریخ شمسی (اینجا فرض id)
                    const sortedNews = data.news.sort((a, b) => b.id - a.id);
                    setMessages(sortedNews);

                    const stored = await AsyncStorage.getItem('readNewsIds');
                    const readIdArray = stored ? JSON.parse(stored) : [];

                    // محاسبه تعداد پیام های امروز که خوانده نشده اند
                    const unreadTodayCount = sortedNews.filter(item => item.days_passed === 'امروز' && !readIdArray.includes(item.id)).length;
                    await AsyncStorage.setItem('newMessageCount', unreadTodayCount.toString());
                } else {
                    setMessages([]);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally {
                setLoading(false);
            }
        };

        const loadUsername = async () => {
            try {
                const storedUsername = await AsyncStorage.getItem('username');
                if (storedUsername) {
                    setUsername(storedUsername);
                }
            } catch (error) {
                console.error('Error loading username', error);
            }
        };

        const loadReadIds = async () => {
            try {
                const stored = await AsyncStorage.getItem('readNewsIds');
                if (stored) {
                    setReadIds(JSON.parse(stored));
                }
            } catch (e) {
                console.error('Error loading read IDs:', e);
            }
        };

        fetchMessages();
        loadUsername();
        loadReadIds();
    }, []);

    const handlePressMessage = async (id) => {
        setExpandedItems((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );

        if (!readIds.includes(id)) {
            const updated = [...readIds, id];
            setReadIds(updated);
            await AsyncStorage.setItem('readNewsIds', JSON.stringify(updated));

            if (username) {
                try {
                    await fetch('http://draydinv.ir/extra/reduceread.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: username,
                            decrease: 1,
                        }),
                    });
                } catch (error) {
                    console.error('Error decreasing unread count:', error);
                }
            }
        }


    };

    // دکمه علامت‌گذاری همه به‌عنوان خوانده شده
    const markAllRead = async () => {
        try {
            const allIds = messages.map(msg => msg.id);
            setReadIds(allIds);
            await AsyncStorage.setItem('readNewsIds', JSON.stringify(allIds));
        } catch (error) {
            console.error('Error marking all read:', error);
        }
    };

    // فیلتر کردن با توجه به نوع و جستجو
    const filteredMessages =
        messages
            .filter(msg =>
                (selectedTypes.length === 0 || selectedTypes.includes(msg.type)) &&
                (msg.title.includes(searchText) || msg.content.includes(searchText))
            );

    const renderItem = ({ item }) => {
        const iconUri = iconMap[item.type] || iconMap.default;
        const bgColor = backgroundColorMap[item.type] || backgroundColorMap.default;
        const isExpanded = expandedItems.includes(item.id);
        const isRead = readIds.includes(item.id);

        let timeText = '';
        if (item.days_passed === 'امروز') {
            timeText = `${item.hours_passed} ساعت پیش`;
        } else if (item.days_passed) {
            timeText = `${item.days_passed} روز پیش`;
        } else {
            timeText = item.shamsi_date || '';
        }

        return (
            <TouchableOpacity onPress={() => handlePressMessage(item.id)}>
                <View style={[styles.itemContainer, { backgroundColor: bgColor }]}>
                    <Image source={{ uri: iconUri }} style={styles.icon} />
                    <View style={styles.textContainer}>
                        <View style={styles.timeRow}>
                            <Image
                                source={{ uri: 'https://img.icons8.com/ios-filled/20/777777/clock.png' }}
                                style={styles.timeIcon}
                            />
                            <Text style={styles.time}>{timeText}</Text>
                        </View>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text
                            style={styles.body}
                            numberOfLines={isExpanded ? undefined : 2}
                            ellipsizeMode="tail"
                        >
                            {item.content}
                        </Text>
                        {isExpanded && item.img && item.img !== 'null' && item.img !== '' && (
                            <Image source={{ uri: item.img }} style={styles.mainImage} />
                        )}
                        {isRead && (
                            <View style={styles.readCheck}>
                                <Image source={{ uri: 'https://img.icons8.com/ios-glyphs/30/4caf50/checkmark.png' }} style={{ width: 16, height: 16 }} />
                                <Text style={{ fontSize: 12, color: '#4caf50', marginLeft: 4 }}>خوانده شده</Text>
                            </View>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, marginTop: 5 }}>

            <View style={styles.container}>

                {/* Header Section */}

                <View style={styles.header}>
                    <View style={{ flexDirection: 'row' }}>

                        <View style={{ position: 'relative' }}>
                            <Pressable onPress={() => navigation.navigate('News1')}>
                                <Image resizeMode='contain' source={require('../assets/image/message.png')} style={styles.icon} />
                            </Pressable>
                            {unreadCount > 0 && (
                                <View style={{
                                    position: 'absolute',
                                    right: -5,
                                    top: 5,
                                    backgroundColor: '#06d6a0',
                                    borderRadius: 100,
                                    paddingHorizontal: 5,
                                    paddingVertical: 2,
                                    elevation: 10,
                                    shadowColor: '#06d6a0',
                                    alignItems: 'center',

                                    justifyContent: 'center',
                                }}>
                                    <Text style={{ color: 'white', fontSize: 12, fontFamily: 'nazanin', textAlign: 'center', }}>  {unreadCount}  </Text>
                                </View>
                            )}
                        </View>

                    </View>

                    {/* Greeting Section */}
                    <View style={styles.greetingContainer}>
                        <Text style={styles.greetingText}>سلام دکتر {username}  خوش اومدی </Text>
                        <Image resizeMode='contain' source={require('../assets/image/like.png')} style={styles.likeIcon} />
                    </View>

                    {/* Dot Icon */}
                    <Pressable onPress={toggleAccordion2}>
                        <Image resizeMode='contain' source={require('../assets/image/dot2.png')} style={styles.icon} />
                    </Pressable>
                </View>
                {/* Accordion 2 Content */}
                {isOpen2 && (
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between', width: width * 9.5 / 10, marginTop: 5, padding: 5 }}
                    >
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.scrollItem}>
                            <View style={styles.iconContainer}>
                                <Image source={require('../assets/image/logout.png')} resizeMode='contain' />
                            </View>
                        </TouchableOpacity>

                        <View style={styles.scrollItemsRow}>
                            <TouchableOpacity onPress={() => navigation.navigate('About')} style={styles.scrollItem}>
                                <View style={styles.iconContainer}>
                                    <Image source={require('../assets/image/about.png')} resizeMode='contain' />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.scrollItem}>
                                <View style={styles.iconContainer}>
                                    <Image source={require('../assets/image/instagram.png')} resizeMode='contain' />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.scrollItem}>
                                <View style={styles.iconContainer}>
                                    <Image source={require('../assets/image/telegram1.png')} resizeMode='contain' />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('User')} style={styles.scrollItem}>
                                <View style={styles.iconContainer}>
                                    <Image source={require('../assets/image/user.png')} resizeMode='contain' />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {/* Accordion 3 Content */}
                {isOpen3 && (
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between', width: width * 9.5 / 10, marginTop: 5, padding: 5 }}
                    >
                        <View style={styles.scrollItemsRow}>
                            <TouchableOpacity onPress={() => navigation.navigate('About')} style={styles.scrollItem}>
                                <View style={styles.iconContainer}>
                                    <Image source={require('../assets/image/about.png')} resizeMode='contain' />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {/* Accordion 4 Content */}
                {isOpen4 && (
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'flex-end', width: width * 9.5 / 10, marginTop: 5, padding: 5 }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => navigation.navigate('About')} style={{ flexDirection: 'row-reverse' }}>
                                <Image source={require('../assets/image/message1.gif')} resizeMode='contain' style={styles.messageImage} />
                                <View style={{ flexDirection: 'column', }}>
                                    <Text style={styles.messageText}>سلام</Text>
                                    <Text style={styles.messageSubText}>برای مشاهده پیامها و تیکت هایتان کلیک کنید</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

            </View>
            {/* فیلتر پیام‌ها */}
            <View style={{ paddingHorizontal: 15, marginVertical: 30 }}>
                <TouchableOpacity
                    onPress={() => setFilterDropdownVisible(!filterDropdownVisible)}
                    style={{ backgroundColor: '#06d6a0', padding: 20, borderRadius: 8 }}
                >
                    <Text style={{ textAlign: 'center', fontWeight: '600', color: 'black' }}>
                        {selectedTypes.length > 0
                            ? `فیلتر: ${selectedTypes.map((type) => typeLabels[type]).join(', ')}`
                            : 'فیلتر پیام ها'}
                    </Text>
                </TouchableOpacity>

                {filterDropdownVisible && (
                    <View style={{ backgroundColor: '#f9f9f9', marginTop: 5, padding: 10, borderRadius: 8 }}>
                        <View style={{ flexDirection: 'row-reverse', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            {filterOptions.map((type) => (
                                <TouchableOpacity
                                    key={type}
                                    onPress={() => toggleTypeSelection(type)}
                                    style={{ flexBasis: '23%', marginVertical: 6, alignItems: 'center', flexDirection: 'row-reverse' }}
                                >
                                    <View
                                        style={{
                                            height: 20,
                                            width: 20,
                                            borderRadius: 4,
                                            borderWidth: 1,
                                            borderColor: '#999',
                                            marginLeft: 6,
                                            backgroundColor: selectedTypes.includes(type) ? '#007bff' : 'white',
                                        }}
                                    />
                                    <Text style={{ fontSize: 13 }}>{typeLabels[type]}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TouchableOpacity
                            onPress={() => setSelectedTypes([])}
                            style={{ marginTop: 10, alignSelf: 'center', padding: 6, backgroundColor: '#eee', borderRadius: 4 }}
                        >
                            <Text style={{ fontSize: 12, color: '#333', width: width * 8 / 10, textAlign: 'center', padding: 10 }}>پاک کردن فیلترها</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* نوار جستجو */}
            <View style={{ paddingHorizontal: 15, marginBottom: 10,flexDirection:'row-reverse' }}>
                <TextInput
                    placeholder="جستجو در پیام‌ها ..."
                    value={searchText}
                    onChangeText={setSearchText}
                    style={styles.searchInput}
                    clearButtonMode="while-editing"
                />
                 <TouchableOpacity
                    onPress={markAllRead}
                    style={{ backgroundColor: '#06d6a0', padding: 4, borderRadius: 8 ,flexGrow:0.2,alignItems:'center',justifyContent:'center'}}
                >
                    <Text style={{textAlign:'center'}}>علامت گذاری همه</Text>
                </TouchableOpacity>
            </View>

          

            <FlatList
                data={filteredMessages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                keyboardShouldPersistTaps="handled"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        padding: 20,
        paddingBottom: 200,
    },
    itemContainer: {
        flexDirection: 'row-reverse',
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
        elevation: 0,
        alignItems: 'flex-start',
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 10,
        margin: 5,
        backgroundColor: '#fff',
    },
    textContainer: {
        flex: 1,
    },
    timeRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginBottom: 4,
    },
    timeIcon: {
        width: 14,
        height: 14,
        marginLeft: 6,
        tintColor: '#777',
    },
    time: {
        fontSize: 12,
        color: '#777',
        textAlign: 'right',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
        textAlign: 'right',
    },
    body: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
        textAlign: 'right',
    },
    mainImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        resizeMode: 'stretch',
        marginTop: 8,
        alignSelf: 'center'
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    readCheck: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingVertical: 10,
        margin:2,
        paddingHorizontal: 12,
        fontSize: 14,
        textAlign: 'right',
        backgroundColor: 'white'
        ,flexGrow:2
    }, container: {
        width: width * 9.5 / 10,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: '#EEEEEE',
        elevation: 2,
        alignSelf: 'center',
    },
    header: {
        justifyContent: 'space-between',
        borderBottomWidth: 0,
        borderBottomColor: 'white',
        paddingBottom: 0,
        flexDirection: 'row',
    },
    greetingContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'center',
    },
    greetingText: {
        color: 'grey',
        fontSize: 14,
        marginTop: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 5,
        fontFamily: 'nazanin',
    },
        iconContainer: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        scrollItemsRow: {
            flexDirection: 'row',
            borderTopColor: 'white',
            borderTopWidth: 1,
        },
        likeIcon: {
            borderRadius: 10,
            width: 20,
            alignSelf: 'center',
        },
});

export default Newsscreen;
