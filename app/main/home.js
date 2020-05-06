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
} from '../NewAppScreen';

import AsyncStorage from '@react-native-community/async-storage'
// import {StackActions, NavigationActions} from 'react-navigation'
import {StackActions, NavigationActionscreateAppContainer, createSwitchNavigator} from 'react-navigation'
// import {createStackNavigator} from 'react-navigation-stack'
// import {createBottomTabNavigator} from 'react-navigation-tabs'

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props)
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
						<Header />
						<View style={styles.body}>
							<View style={styles.sectionContainer}>

								<ImageBackground
									source={require('../images/MotoManiac08.png')}
									style={{width: '100%', height: '95%'}}
									imageStyle={{opacity: 0.3}}
								>
								<View style={{flexDirection: 'row', justifyContent: 'center', paddingTop: 30 }}>
									<TouchableOpacity
											style={styles.logOutBut}
											onPress={()=>navigate('Segment')}
									>							
										<View style={styles.menuBox} >
											<Image source={require('../images/menu-icon-01.png')}
												style={styles.menuButton} />
											<Text style={styles.menuText}>
												Store
											</Text>
										</View>
									</TouchableOpacity>
									<TouchableOpacity
											style={styles.logOutBut}
											onPress={()=>navigate('Tour')}
									>							
										<View style={styles.menuBox} >
											<Image source={require('../images/menu-icon-02.png')}
												style={styles.menuButton} />
											<Text style={styles.menuText}>
												Tour
											</Text>
										</View>
									</TouchableOpacity>
									<TouchableOpacity
											style={styles.logOutBut}
											onPress={()=>console.log('Cafe')}
									>							
										<View style={styles.menuBox} >
											<Image source={require('../images/menu-icon-03.png')}
												style={styles.menuButton} />
											<Text style={styles.menuText}>
												Cafe
											</Text>
										</View>
									</TouchableOpacity>
								</View>
								<View style={{flexDirection: 'row', justifyContent: 'center',  paddingTop: 20,}}>
									<TouchableOpacity
											style={styles.logOutBut}
											onPress={()=>console.log('Bike')}
									>							
										<View style={styles.menuBox} >
											<Image source={require('../images/menu-icon-05.png')}
												style={styles.menuButton} />
											<Text style={styles.menuText}>
												Moto Garage
											</Text>
										</View>
									</TouchableOpacity>
									<TouchableOpacity
											style={styles.logOutBut}
											onPress={()=>console.log('Bike')}
									>							
										<View style={styles.menuBox} >
											<Image source={require('../images/menu-icon-04.png')}
												style={styles.menuButton} />
											<Text style={styles.menuText}>
												Bike Garage
											</Text>
										</View>
									</TouchableOpacity>
									<TouchableOpacity
											style={styles.logOutBut}
											onPress={()=>console.log('Bike')}
									>							
										<View style={styles.menuBox} >
											<Image source={require('../images/menu-icon-08.png')}
												style={styles.menuButton} />
											<Text style={styles.menuText}>
												Dealers
											</Text>
										</View>
									</TouchableOpacity>
								</View>
								<View style={{flexDirection: 'row', justifyContent: 'center',  paddingTop: 20 }}>
									<TouchableOpacity
											style={styles.logOutBut}
											onPress={()=>console.log('Bike')}
									>							
										<View style={styles.menuBox} >
											<Image source={require('../images/menu-icon-07.png')}
												style={styles.menuButton} />
											<Text style={styles.menuText}>
												Community
											</Text>
										</View>
									</TouchableOpacity>
									<TouchableOpacity
											style={styles.logOutBut}
											onPress={()=>console.log('Bike')}
									>							
										<View style={styles.menuBox} >
											<Image source={require('../images/menu-icon-06.png')}
												style={styles.menuButton} />
											<Text style={styles.menuText}>
												Concept Store
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
  menuButton: {
  	width: 100,
  	height: 100,
  },
  menuBox: {
  	width: 100,
  	flexDirection: 'column',
  	alignItems: 'center',
  },
  menuText: {
  	fontSize: 14,
  	fontWeight: 'bold',
  	marginTop: -10,
  }
});

