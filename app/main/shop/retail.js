/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Header} from 'react-native-elements'
import {Colors} from '../../NewAppScreen';

import AsyncStorage from '@react-native-community/async-storage'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'

export default class ShopScreen extends React.Component  {


	renderCenter() {
			return <Text style={styles.headerNavTitle}>DIRT PIT SHOP</Text>
	}
    
  render() {  
    return (
    	<View style={{ flex: 1}}>
				<Header
						innerContainerStyles={styles.headerInnerContainer}
						centerContainerStyle={styles.headerInnerContainer}
						outerContainerStyles={styles.headerOuterContainer}
						centerComponent={this.renderCenter()}
						containerStyle={{
								backgroundColor: '#fff',
								marginTop:
										Platform.OS == 'ios' ? (iPhoneX ? 20 : 0) : -10,
								top:
										Platform.OS == 'ios' ? (iPhoneX ? -15 : 0) : -5,
								height: 70,
						}}
				/>
				<WebView
					source={{uri: 'http://ftwventures.com.my/index.php?route=product/category&path=59'}}
					style={{flex: 1, marginTop: 0, height: 100}}
				/>
			</View>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
  	flex: 1,
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 0,
    paddingHorizontal: 0,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  menuContainer: {
  	flexDirection: 'column',
  	justifyContent: 'center',
  	alignItems: 'center',
  	paddingTop: 40,
  	paddingBottom: 20
  },
  menuButton: {
  	width: 100,
  	height: 100,
  },
  menuBox: {
  	width: 100,
  	paddingBottom: 20,
  	flexDirection: 'column',
  	alignItems: 'center',
  },
  menuText: {
  	fontSize: 16,
  	fontWeight: 'bold',
  	marginTop: -10,
  },
	headerOuterContainer: {
			borderBottomWidth: 1,
			borderColor: '#5b5b5b',
			backgroundColor: '#ffffff',
	},
	headerInnerContainer: {
			backgroundColor: '#ffffff',
	},
	headerNavTitle: {
			color: '#c40d42',
			fontSize: 16,
			fontFamily: 'CircularStd-Bold',
			textAlign: 'center',
	}
});