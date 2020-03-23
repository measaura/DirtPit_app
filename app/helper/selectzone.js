import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import DeviceInfo from "react-native-device-info";
var iPhoneX = DeviceInfo.hasNotch();

class TZFlatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
//     const url = `https://randomuser.me/api/?&results=20`;
    const url = 'https://raw.githubusercontent.com/measaura/timezone/master/timezone.js';
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
//           marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.text.toUpperCase()} ${item.value.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

    handleBackButton(item) {
        this.props.navigation.goBack();
        console.log('Timezone',item.utc[0])
        this.props.navigation.state.params._handleTimeZoneChange(item.utc[0],item.offset);
        return true;
    }

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search timezone..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{
				backgroundColor: '#fff',
				marginTop:  Platform.OS == "ios" ? (iPhoneX ? 50 : 0) : -10,
				top: Platform.OS == "ios" ? (iPhoneX ? -15 : 0) : -5,
       	flex: 1 
      }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
            	onPress={this.handleBackButton.bind(this, item)}
//               leftAvatar={{ source: { uri: item.picture.thumbnail } }}
              title={`${item.text}`}
//               subtitle={(item.offset < 0)?`GMT${item.offset}`:`GMT+${item.offset}`}
            />
          )}
          keyExtractor={item => item.text}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

export default TZFlatList;