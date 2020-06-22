/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, createRef} from 'react';
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
  FlatList,
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from '../NewAppScreen';

import { Header } from "react-native-elements";
import { SliderBox } from "react-native-image-slider-box"
import Ionicons from 'react-native-vector-icons/Ionicons'
import Dots from 'react-native-dots-pagination';
import AsyncStorage from '@react-native-community/async-storage'
// import {StackActions, NavigationActions} from 'react-navigation'
import {StackActions, NavigationActionscreateAppContainer, createSwitchNavigator} from 'react-navigation'
// import {createStackNavigator} from 'react-navigation-stack'
// import {createBottomTabNavigator} from 'react-navigation-tabs'
import DeviceInfo from "react-native-device-info";
var notch = DeviceInfo.hasNotch();

let CurrentSlide = 0;
let IntervalTime = 4000;

const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
const navbarHeight = screenHeight - windowHeight + StatusBar.currentHeight;

const {width, height} = Dimensions.get('window')

console.log('\nwidth: '+width+'\nheight: '+height)
console.log('statusbar height'+StatusBar.currentHeight+', navbarHeight: '+navbarHeight)
export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props)
    this.state = {
    	loading: true,
      images: []
    };
	}
	
	renderLeft() {
			const {navigate} = this.props.navigation
			return (
					<TouchableOpacity onPress={() => navigate('Home')}>
							<Ionicons name={'ios-home'} size={30} color={'yellow'} style={{paddingTop: 0}} />
					</TouchableOpacity>
			);
	}
	
	flatList = createRef();
	// TODO _goToNextPage()
	_goToNextPage = () => {
		if (CurrentSlide >= this.state.images.length){
			CurrentSlide = 0;

		}
// 		console.log(CurrentSlide); 
		this.flatList.current.scrollToIndex({
			index: CurrentSlide++,
			animated: true,
		});
	};
	
	_startAutoPlay = () => {
		this._timerId = setInterval(this._goToNextPage, IntervalTime);
	};
	
	_stopAutoPlay = () => {
		if (this._timerId) {
			clearInterval(this._timerId);
			this._timerId = null;
		}
	};
	
	componentDidMount() {
		fetch("https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/banner&id=9")
			.then(response => response.json())
			.then((responseJson)=> {
				this.setState({
					loading: false,
					images: responseJson.banner
				})
						this._stopAutoPlay();
		this._startAutoPlay();
			})
		.catch(error=>console.log(error)) //to catch the errors if any
		


	}
	
	componentWillUnmount() {
		this._stopAutoPlay();
	}
	// TODO _renderItem()
	_renderItem({item, index}) {
// 	console.warn(item.image); 
		return <Image source={{uri: item.image}} style={{ width: width}} />
	}
	// TODO _keyExtractor()
	_keyExtractor(item, index) {
		// console.log(item);
		return index.toString();
	}
	
	renderCenter() {
			return <Image source={require('../images/dirtpit-logo-181x43.png')} />
	}

	
	render() {
// 	console.log('image',this.state.images['image'])
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
								centerComponent={this.renderCenter()}
								containerStyle={{
										backgroundColor: '#000',
										marginTop:
												Platform.OS == 'ios' ? 0 : -20,
										top:
												Platform.OS == 'ios' ? (notch ? -10 : 0) : 0,
										height: Platform.OS == 'ios' ? (notch ? 90 : 0) : 70,
								}}
						/>
						<View style={styles.body}>
			<View style={{height:width}} >
				<FlatList
					data={this.state.images}
					keyExtractor={this._keyExtractor.bind(this)}
					renderItem={this._renderItem.bind(this)}
					horizontal={true}
					flatListRef={React.createRef()}
					ref={this.flatList}
				/>
				
			</View>
							<View style={{ height: navbarHeight < 100 ?  (windowHeight-width-navbarHeight-48):(windowHeight-width-navbarHeight+6), justifyContent: 'space-around', backgroundColor: '#ffffff',}}>

								<View style={{flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap',}}>
									<TouchableOpacity
											style={styles.logOutBut}
											onPress={()=>navigate('Segment')}
									>							
										<View style={styles.menuBox} >
											<Image source={require('../images/menu-icon-01.png')}
												style={styles.menuButton} />
											<Text allowFontScaling={false} style={styles.menuText}>
												Store
											</Text>
										</View>
									</TouchableOpacity>
									<TouchableOpacity
											style={styles.logOutBut}
											onPress={()=>navigate('Concept')}
									>							
										<View style={styles.menuBox} >
											<Image source={require('../images/menu-icon-06.png')}
												style={styles.menuButton} />
											<Text allowFontScaling={false} style={styles.menuText} numberOfLines={2}>
												Concept Store
											</Text>
										</View>
									</TouchableOpacity>
									<TouchableOpacity
											style={styles.logOutBut}
											onPress={()=>navigate('Dealers')}
									>							
										<View style={styles.menuBox} >
											<Image source={require('../images/menu-icon-08.png')}
												style={styles.menuButton} />
											<Text allowFontScaling={false} style={styles.menuText}>
												Dealers
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
											<Text allowFontScaling={false} style={styles.menuText}>
												Tour
											</Text>
										</View>
									</TouchableOpacity>
									<TouchableOpacity
											style={styles.logOutBut}
											onPress={()=>navigate('MotoGarage')}
									>							
										<View style={styles.menuBox} >
											<Image source={require('../images/menu-icon-05.png')}
												style={styles.menuButton} />
											<Text allowFontScaling={false} style={styles.menuText}>
												Moto Garage
											</Text>
										</View>
									</TouchableOpacity>
									<TouchableOpacity
											style={styles.logOutBut}
											onPress={()=>navigate('BikeGarage')}
									>							
										<View style={styles.menuBox} >
											<Image source={require('../images/menu-icon-04.png')}
												style={styles.menuButton} />
											<Text allowFontScaling={false} style={styles.menuText}>
												Bike Garage
											</Text>
										</View>
									</TouchableOpacity>
									<TouchableOpacity
											style={styles.logOutBut}
											onPress={()=>navigate('Cafe')}
									>							
										<View style={styles.menuBox} >
											<Image source={require('../images/menu-icon-03.png')}
												style={styles.menuButton} />
											<Text allowFontScaling={false} style={styles.menuText}>
												Cafe
											</Text>
										</View>
									</TouchableOpacity>
									<TouchableOpacity
											style={styles.logOutBut}
											onPress={()=>navigate('Community')}
									>							
										<View style={styles.menuBox} >
											<Image source={require('../images/menu-icon-07.png')}
												style={styles.menuButton} />
											<Text allowFontScaling={false} style={styles.menuText}>
												Community
											</Text>
										</View>
									</TouchableOpacity>
								</View>

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
    height: height,
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 0,
    paddingHorizontal: 0,
  },
  sectionTitle: {
  	fontFamily: 'Gotham Bold',
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
  	width: 80,
  	height: 80,
  },
  menuBox: {
  	width: 80,
  	marginLeft: 5,
  	marginRight: 5,
  	flexDirection: 'column',
  	alignItems: 'center',
  },
  menuText: {
  	fontFamily: 'Gotham Bold',
  	fontSize: 14,
  	fontWeight: 'bold',
  	marginTop: -10,
  	textAlign: 'center',
  },
  sliderItems: {
		marginLeft: 0,
		marginRight: 0,
		height: 500,
		width: width,
	},
});

