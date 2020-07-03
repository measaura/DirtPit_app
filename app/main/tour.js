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
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import { Colors } from '../NewAppScreen';
import { Header } from "react-native-elements";

import AsyncStorage from '@react-native-community/async-storage'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DeviceInfo from 'react-native-device-info'
var iPhoneX = DeviceInfo.hasNotch()

const {width, height} = Dimensions.get('window')

export default class TourScreen extends React.Component  {

	renderLeft() {
			const {navigate} = this.props.navigation
			return (
					<TouchableOpacity onPress={() => navigate('Home')}>
							<Ionicons name={'ios-home'} size={30} color={'yellow'} style={{paddingTop: 0}} />
					</TouchableOpacity>
			);
	}

	renderCenter() {
			return <Image source={require('../images/DirtPit_logo-180x35.png')} />
	}

  render() {  
		const {navigate} = this.props.navigation
    return (
      <>
        <StatusBar barStyle="light-content" />
				<View style={{backgroundColor: 'black',}}>
        <SafeAreaView>
          <View
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
						<Header
								innerContainerStyles={styles.headerInnerContainer}
								outerContainerStyles={styles.headerOuterContainer}
								leftComponent={this.renderLeft()}
								centerComponent={this.renderCenter()}
								containerStyle={{
										backgroundColor: '#000',
										marginTop:
												Platform.OS == 'ios' ? 0 : -20,
										top:
												Platform.OS == 'ios' ? (iPhoneX ? -10 : 0) : -5,
										height: Platform.OS == 'ios' ? (iPhoneX ? 90 : 0) : 70,
								}}
						/>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>

                <ImageBackground
                  source={require('../images/MotoManiac08.png')}
                  style={{width: '100%', height: '95%'}}
                  imageStyle={{opacity: 0.3}}
                >
                <View style={styles.menuContainer}>
                  <TouchableOpacity
                      style={styles.logOutBut}
                      onPress={()=>navigate('BikeTour')}
                  >							
                    <View style={styles.menuBox} >
                      <Image source={require('../images/menu-icon-09.png')}
                        style={styles.menuButton} />
                      <Text style={styles.menuText}>
                        Bike Tour
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={styles.logOutBut}
                      onPress={()=>navigate('MotoTour')}
                  >							
                    <View style={styles.menuBox} >
                      <Image source={require('../images/menu-icon-10.png')}
                        style={styles.menuButton} />
                      <Text style={styles.menuText}>
                        Moto Tour
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={styles.logOutBut}
                      onPress={()=>navigate('FourByFourTour')}
                  >							
                    <View style={styles.menuBox} >
                      <Image source={require('../images/menu-icon-11.png')}
                        style={styles.menuButton} />
                      <Text style={styles.menuText}>
                        4x4 Tour
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                
                </ImageBackground>

              </View>

            </View>
          </View>
        </SafeAreaView>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
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
  }
});