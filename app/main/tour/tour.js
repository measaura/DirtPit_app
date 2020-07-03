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

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from '../../NewAppScreen';

import AsyncStorage from '@react-native-community/async-storage'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'

export default class TourScreen extends React.Component  {
  render() {  
    return (
      <>
        <StatusBar barStyle="light-content" />
				<View style={{backgroundColor: 'black',}}>
        <SafeAreaView>
          <View
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header style={{height: 150,}}/>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>

                <ImageBackground
                  source={require('../../images/MotoManiac08.png')}
                  style={{width: '100%', height: '95%'}}
                  imageStyle={{opacity: 0.3}}
                >
                <View style={styles.menuContainer}>
                  <TouchableOpacity
                      style={styles.logOutBut}
                      onPress={()=>navigate('BikeTour')}
                  >							
                    <View style={styles.menuBox} >
                      <Image source={require('../../images/menu-icon-09.png')}
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
                      <Image source={require('../../images/menu-icon-10.png')}
                        style={styles.menuButton} />
                      <Text style={styles.menuText}>
                        Moto Tour
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={styles.logOutBut}
                      onPress={()=>console.log('4x4 Tour')}
                  >							
                    <View style={styles.menuBox} >
                      <Image source={require('../../images/menu-icon-11.png')}
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