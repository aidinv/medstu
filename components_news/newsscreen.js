import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

const Newsscreen = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState(null);
    const [expandedItems, setExpandedItems] = useState([]);

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
                    setMessages(data.news);
                } else {
                    setMessages([]);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    const renderItem = ({ item }) => {
        const iconUri = iconMap[item.type] || iconMap.default;
        const bgColor = backgroundColorMap[item.type] || backgroundColorMap.default;

        let timeText = '';
        if (item.days_passed === 'امروز') {
            timeText = `${item.hours_passed} ساعت پیش`;
        } else if (item.days_passed) {
            timeText = `${item.days_passed} روز پیش`;
        } else {
            timeText = item.shamsi_date || '';
        }

        const isExpanded = expandedItems.includes(item.id);

        return (
            <TouchableOpacity
                onPress={() => {
                    setExpandedItems(prev =>
                        prev.includes(item.id)
                            ? prev.filter(id => id !== item.id)
                            : [...prev, item.id]
                    );
                }}
            >
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
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const filteredMessages = selectedType
        ? messages.filter(msg => msg.type === selectedType)
        : messages;

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filterBar}
                contentContainerStyle={{
                    flexDirection: 'row-reverse',
                    alignItems: 'center',
                    paddingHorizontal: 10, // فاصله از ابتدا و انتها
                }}
            >
                <TouchableOpacity
                    onPress={() => setSelectedType(null)}
                    style={[styles.filterButton, !selectedType && styles.activeFilter]}
                >
                    <Text style={styles.filterText}>همه</Text>
                </TouchableOpacity>

                {filterOptions.map(type => (
                    <TouchableOpacity
                        key={type}
                        onPress={() => setSelectedType(type)}
                        style={[
                            styles.filterButton,
                            selectedType === type && styles.activeFilter,
                        ]}
                    >
                        <Text style={styles.filterText}>{typeLabels[type]}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>



            <FlatList
                data={filteredMessages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        padding: 10,
        marginTop: 10,
    },
    itemContainer: {
        flexDirection: 'row-reverse',
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
        elevation: 2,
        alignItems: 'flex-start',
    },
    icon: {
        width: 60,
        height: 60,
        marginLeft: 10,
        marginTop: 5,
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
        writingDirection: 'rtl',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
        textAlign: 'right',
        writingDirection: 'rtl',
    },
    body: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
        textAlign: 'right',
        writingDirection: 'rtl',
    },
    mainImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        resizeMode: 'cover',
        marginTop: 8,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterBar: {
        paddingVertical: 6,
        backgroundColor: '',
        borderBottomWidth: 0,
        borderBottomColor: '',
        maxHeight: 50,
        marginTop: 40,
    },
    filterButton: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        backgroundColor: '#eee',
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 70, // برای دید کامل آیتم‌ها
    },
    activeFilter: {
        backgroundColor: '#007bff',
    },
    filterText: {
        color: '#000',
        fontSize: 14,
    },
});

export default Newsscreen;
