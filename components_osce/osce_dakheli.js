import React, { Component } from 'react';
import {
  ActivityIndicator, FlatList, Text, View, StyleSheet,
  Dimensions, Image, TouchableOpacity, SafeAreaView, TextInput
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default class Osce_dakheli extends Component {



  width = Dimensions.get('window').width;

  constructor(props) {
    super(props);
    this.state = {
      DATA: [],
      isLoading: true,
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 7,
    };
  }


  async getMovies() {
    try {
      const response = await fetch('https://draydinv.ir/extra/osce_dakheli.php');
      const json = await response.json();
      this.setState({ DATA: json });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.getMovies();
  }

  handleSearch = (text) => {
    this.setState({ searchQuery: text, currentPage: 1 });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getFilteredAndPaginatedData = () => {
    const { DATA, searchQuery, currentPage, itemsPerPage } = this.state;

    const filteredData = DATA.filter(item =>
      item.name_fa.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return { paginatedData, totalPages: Math.ceil(filteredData.length / itemsPerPage) };
  };

  renderPagination = (totalPages) => {
    const { currentPage } = this.state;

    return (
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
          onPress={() => {
            if (currentPage > 1) this.handlePageChange(currentPage - 1);
          }}
          disabled={currentPage === 1}
        >
          <Image
            style={{
              width: 10,
              height: 10,
              transform: [{ rotate: '180deg' }],
              tintColor: 'grey',
              alignSelf: 'center'
            }}
            source={require('../assets/img/next.png')}
            resizeMode='contain'

          />
        </TouchableOpacity>

        <Text style={{
          color: 'black',
          fontWeight: '600',
          backgroundColor: '#EEEEEE',
          padding: 10,
          borderRadius: 10,
          paddingHorizontal: 30,
          fontFamily: 'nazanin',
        }}>
          فهرست فصل ها - صفحه  {currentPage}  از  {totalPages}
        </Text>


        <TouchableOpacity
          style={[styles.pageButton, currentPage === totalPages && styles.disabledButton]}
          onPress={() => {
            if (currentPage < totalPages) this.handlePageChange(currentPage + 1);
          }}
          disabled={currentPage === totalPages}
        >
          <Image
            style={{
              width: 10,
              height: 10,

              tintColor: 'grey',
              alignSelf: 'center'
            }}
            source={require('../assets/img/next.png')}
            resizeMode='contain'

          />
        </TouchableOpacity>
      </View>
    );
  };

  emptymessage = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
      <Text style={{ fontWeight: '800', color: 'green' }}>محتوایی برای نمایش یافت نشد !</Text>
    </View>
  );
  render() {
    const { isLoading, searchQuery } = this.state;
    const { navigation, username } = this.props;

    const ListItem = ({ text, onPress, text1, likes, view }) => (
      <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.9}>

        <View style={{ flexDirection: 'row-reverse' }}>
          <Image source={require('../assets/image/osce.png')} style={{ width: 30, height: 30, marginLeft: 5, justifyContent: 'center', alignSelf: 'center' }} />
          <View>
            <Text style={styles.text}>{text}</Text>
            <Text style={styles.text1}>( {text1} )</Text>
          </View>
        </View>
        <View style={{ justifyContent: 'space-between' }}>
          <Image
            style={{
              width: 12,
              height: 12,
              transform: [{ rotate: '180deg' }],
              tintColor: 'grey',
              alignSelf: 'flex-start',
              marginHorizontal: 10
            }}
            source={require('../assets/img/next.png')}
            resizeMode='contain'

          />
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
              <Image
                style={{
                  width: 10,
                  height: 10,

                  tintColor: 'gray',
                  alignSelf: 'flex-center'
                }}
                source={require('../assets/img/view3.png')}
                resizeMode='contain'

              />
              <Text style={{
                color: 'gray',
                fontSize: 10,
                textAlignVertical: 'center',
                fontFamily: 'nazanin',
                marginLeft: 5
              }}> {view} </Text>

            </View>
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={{
                  width: 10,
                  height: 10,

                  tintColor: 'grey',
                  alignSelf: 'flex-center'
                }}
                source={require('../assets/image/heart1.png')}
                resizeMode='contain'

              />
              <Text style={{
                color: 'grey',
                fontSize: 10,
                textAlignVertical: 'center',
                fontFamily: 'nazanin',
                marginLeft: 5
              }}> {likes} </Text>

            </View>
          </View>
        </View>

      </TouchableOpacity>
    );

    const { paginatedData, totalPages } = this.getFilteredAndPaginatedData();

    return (
      <View style={{ flex: 1, marginTop: 10 }}>
        {isLoading ? (
          <View>
            <ActivityIndicator size={'large'} color={'#E59BE9'} />
            <Text style={{ alignSelf: 'center', marginTop: 5 }}>در حال بارگذاری</Text>
          </View>
        ) : (
          <SafeAreaView style={{ flex: 1 }}>


            <TextInput
              placeholder="جستجوی اوردر "
              value={searchQuery}
              onChangeText={this.handleSearch}
              style={styles.searchInput}
            />
            {this.renderPagination(totalPages)}
            <GestureHandlerRootView style={{ flex: 1 }}>
              <FlatList
                nestedScrollEnabled={true}
                data={paginatedData}
                contentContainerStyle={{ paddingBottom: 80 }}
                renderItem={({ item }) =>
                  <ListItem
                    text={item.name_fa}
                    text1={item.name_en}
                    likes={item.likes}
                    view={item.view}

                    onPress={() => navigation.navigate('Osce1', {
                      name_en: item.name_en,
                      name_fa: item.name_fa,

                      cat_fa: item.cat_fa,
                      time: item.time,
                      writer: item.writer,
                      likes: item.likes,
                      username: username,
                    })}
                  />
                }
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={this.emptymessage}
              />
            </GestureHandlerRootView>


          </SafeAreaView>
        )}
      </View>
    );
  }
}






const styles = StyleSheet.create({
  item: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 15,
    elevation: 1,
    borderRadius: 7,
    borderRightWidth: 0,
    borderRightColor: '',
    borderLeftWidth: 0,
    borderLeftColor: '',
  },
  text: {
    fontSize: 15,
    marginRight: 15,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'nazanin',
    color: 'green'


  }, text1: {
    fontSize: 10,
    marginRight: 15,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'nazanin',
    color: 'grey',
    marginTop: 7
  }
  , searchInput: {

    marginVertical: 15,
    marginHorizontal: 25,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 20,
    textAlign: 'right'
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  pageButton: {
    backgroundColor: '#EEEEEE',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 6,

  },
  disabledButton: {
    backgroundColor: '#fff',

  },
  activePage: {
    backgroundColor: '#E59BE9',
  },
  pageText: {
    color: 'grey',
    fontSize: 5,
    fontFamily: 'nazanin',

  }
});