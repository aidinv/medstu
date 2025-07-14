import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const columns = [
  { key: 'name1', label: ' دارو' },
  { key: 'name2', label: '' },
  { key: 'cat', label: 'دسته دارویی' },
  { key: 'code', label: 'کدژنریک' },
];

const rowsPerPage = 15;
const cityColorCache = {};
function getColorForCity(city) {
  if (cityColorCache[city]) {
    return cityColorCache[city];
  }
  let hash = 0;
  for (let i = 0; i < city.length; i++) {
    hash = city.charCodeAt(i) + ((hash << 5) - hash);
  }

  const color = `hsl(${hash % 360}, 70%, 60%)`;
  cityColorCache[city] = color;
  return color;
}

export default function Postscreen({navigation}) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [ascending, setAscending] = useState(true);
  const [page, setPage] = useState(0);
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  const [username, setusername] = useState(null);
  const [active, setactive] = useState(null);

  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);

  const [data, setData] = useState([]);

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

  useEffect(() => {
    const loadusername = async () => {
      try {
        const storedusername = await AsyncStorage.getItem('username');
        if (storedusername) {
          setusername(storedusername);
          fetch('http://draydinv.ir/extra/status.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: storedusername, func: 'osce' }),
          })
            .then((response) => response.json())
            .then((data) => {
              setactive(data.status);
            });
        }
      } catch (error) {
        console.error('error', error);
      }
    };

    loadusername();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://draydinv.ir/extra/drugslist.php');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    let result = [...data];

    if (search.trim()) {
      result = result.filter((row) =>
        columns.some((col) =>
          String(row[col.key]).toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    result.sort((a, b) => {
      const A = a[sortBy] || '';
      const B = b[sortBy] || '';
      return ascending ? A.localeCompare(B) : B.localeCompare(A);
    });

    return result;
  }, [data, search, sortBy, ascending]);

  const columnWidths = useMemo(() => {
    const widths = {};
    const charWidth = 8; // px per character
    const padding = 20;

    columns.forEach((col) => {
      const headerLength = col.label.length;
      const maxContentLength = data.reduce((max, item) => {
        const len = String(item[col.key] || '').length;
        return Math.max(max, len);
      }, 0);

      const width = Math.max(headerLength, maxContentLength) * charWidth + padding;
      widths[col.key] = width;
    });

    return widths;
  }, [data]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const start = page * rowsPerPage;
  const pageData = filteredData.slice(start, start + rowsPerPage);

  const handleSort = (key) => {
    if (key === sortBy) {
      setAscending(!ascending);
    } else {
      setSortBy(key);
      setAscending(true);
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 15 }}>
      <View style={styles.container1}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row' }}>
            <Pressable onPress={toggleAccordion3}>
              <Image resizeMode='contain' source={require('../assets/image/bag.png')} style={styles.icon} />
            </Pressable>
            <Pressable onPress={toggleAccordion4}>
              <Image resizeMode='contain' source={require('../assets/image/message.png')} style={styles.icon} />
            </Pressable>
          </View>

          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>سلام دکتر {username}  خوش اومدی </Text>
            <Image resizeMode='contain' source={require('../assets/image/like.png')} style={styles.likeIcon} />
          </View>

          <Pressable onPress={toggleAccordion2}>
            <Image resizeMode='contain' source={require('../assets/image/dot2.png')} style={styles.icon} />
          </Pressable>
        </View>

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

      <View style={{ flexDirection: 'row-reverse', }}>
        <View style={{ backgroundColor: '#06d6a0', width: 10, height: 10, borderRadius: 3, justifyContent: 'center', alignSelf: 'center', marginRight: 10, marginTop: 10 }}></View>
        <Text style={{ marginTop: 15, fontWeight: '900', color: 'grey', verticalAlign: 'bottom', marginRight: 10, }}>داروخانه</Text>
      </View>

      <View style={styles.container}>
        <TextInput
          placeholder="جستجو در داروخانه ..."
          value={search}
          onChangeText={(text) => {
            setSearch(text);
            setPage(0);
          }}
          style={styles.input}
        />

        <ScrollView horizontal contentContainerStyle={{ flexDirection: 'row-reverse' }} showsHorizontalScrollIndicator={false}>
          <View>
            <View style={styles.headerRow}>
              {columns.map((col) => (
                <TouchableOpacity
                  key={col.key}
                  onPress={() => handleSort(col.key)}
                  style={[styles.headerCell, { minWidth: columnWidths[col.key] }]}
                >
                  <Text style={styles.headerText}>
                    {col.label} {sortBy === col.key ? (ascending ? '↑' : '↓') : ''}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <FlatList
              data={pageData}
              showsVerticalScrollIndicator={false}
              keyExtractor={(_, idx) => idx.toString()}
              renderItem={({ item }) => (
                
                <TouchableOpacity style={styles.dataRow} 
                
                onPress={() => navigation.navigate('Post1',
                {
                  name1: item.name1,
                  name2: item.name2,
                  cat: item.cat,
                  time :  item.time,
                  writer : item.writer,
                  likes:item.likes,
                  username:username,
                  code:item.code
                })}
                
                >
                  {columns.map((col) => (
                    <View key={col.key} style={[styles.dataCell, { minWidth: columnWidths[col.key], backgroundColor: '#EEEEEE', margin: 3, borderRadius: 5, padding: 8, }]}>
                      {col.key === 'cat' ? (
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center' }}>
                          <View style={{
                            width: 7,
                            height: 5,
                            borderRadius: 6,
                            backgroundColor: getColorForCity(item[col.key]),
                            marginLeft: 6,
                            textAlign: 'center'
                          }} />
                          <Text style={{ textAlign: 'Right' }}>{item[col.key]}</Text>
                        </View>
                      ) : (
                        <Text style={col.key === 'name1' ? { fontWeight: '900',color:'grey' } : {}}>
                          {item[col.key]}
                        </Text>
                      )}
                    </View>
                  ))}
                </TouchableOpacity>
              )}
            />
          </View>
        </ScrollView>

        <View style={styles.pagination}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setPage(i)}
              style={[
                styles.pageBtn,
                { backgroundColor: i === page ? '#06d6a0' : '#ccc' },
              ]}
            >
              <Text style={{ color: i === page ? '#fff' : '#000' }}>{i + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#f0f0f0',
    flex: 1,
    marginTop: 5
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
    textAlign: 'right',
  },
  headerRow: {
    flexDirection: 'row-reverse',
    backgroundColor: '#EEEEEE',
    borderRadius: 6,
    paddingVertical: 4,
    marginBottom: 4,
    elevation: 2,
    margin: 2
  },
  headerCell: {
    paddingHorizontal: 6,
    paddingVertical: 10,
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    marginHorizontal: 2,
    borderRadius: 6,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    alignSelf: 'center',
    color: 'grey'
  },
  dataRow: {
    flexDirection: 'row-reverse',
    backgroundColor: '#EEEEEE',
    borderRadius: 2,
    margin: 1,
    paddingVertical: 2,
    borderColor: '#06d6a0',
    borderRightWidth: 4,
  },
  dataCell: {
    paddingHorizontal: 6,
    alignSelf: 'center',
    alignItems: 'center',


  },
  pagination: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    marginTop: 12,
    flexWrap: 'wrap',
  },
  pageBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    margin: 4,
    borderRadius: 8,
  },
  container1: {
    width: width * 9.5 / 10,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#EEEEEE',
    elevation: 2,
    alignSelf: 'center',
  },
  header: {
    justifyContent: 'space-between',
    paddingBottom: 0,
    flexDirection: 'row',
  },
  icon: {
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    margin: 5,
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
    padding: 5,
    fontFamily: 'dast',
  },
  likeIcon: {
    borderRadius: 10,
    width: 20,
    alignSelf: 'center',
  },
});
