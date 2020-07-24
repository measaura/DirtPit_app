import React, {Component, createRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  Animated,
  Easing,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../../NewAppScreen';
import {Header} from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HTML from 'react-native-render-html'
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils'
import {showLocation} from 'react-native-map-link'
import DeviceInfo from 'react-native-device-info'
var iPhoneX = DeviceInfo.hasNotch()

let CurrentSlide = 0;
let IntervalTime = 4000;

const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
// const navbarHeight = screenHeight - windowHeight + Constants.statusBarHeight;

const {width, height} = Dimensions.get('window')
const softNavBar = Platform.OS == 'ios' ? notch ? 116 :68 : 50;
const bottomTab = 48;
const sliderHeight = height*0.8;
const smallScreen = height-width < 300 ? true : false;
const statusBarHeight = StatusBar.currentHeight;
const navbarHeight = Platform.OS == 'android'? screenHeight > windowHeight? 0:48 :0;


const randomHexColor = () => {
  return '#000000'.replace(/0/g, function() {
    return (~~(Math.random() * 16)).toString(16);
  });
};

export default class DealersShopScreen extends Component {
	constructor(props) {
		super(props);
     this.spinValue = new Animated.Value(0);
		this.state = {
			loading: true,
			dataSource: [],
			images: [],
			storeId: this.props.navigation.state.params.storeId,
			bannerId: this.props.navigation.state.params.bannerId,
			dealersType: this.props.navigation.state.params.dealerType
		};
	}
	
	spin () {
		this.spinValue.setValue(0)
		Animated.timing(
			this.spinValue,
			{
				toValue: 1,
				duration: 1500,
				easing: Easing.linear
			}
		).start(() => this.spin())
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
  	this.spin()
	console.log('\nwidth: '+width+'\nheight: '+height+'\nStatusBar: '+statusBarHeight)
// 	console.log('statusbar height '+StatusBar.currentHeight+', navbarHeight: '+navbarHeight)

		fetch("https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/banner&id="+this.state.bannerId)
			.then(response => response.json())
			.then((responseJson)=> {
// 			console.info(responseJson)
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
	console.warn(item.image); 
		return <Image source={{uri: item.image}} style={{ width: width, height: sliderHeight, resizeMode: 'center'}} />
	}
	// TODO _keyExtractor()
	_keyExtractor(item, index) {
		// console.log(item);
		return index.toString();
	}
	
	renderSlider() {
		if(this.state.images){
			return(<FlatList
							data={this.state.images}
							keyExtractor={this._keyExtractor.bind(this)}
							renderItem={this._renderItem.bind(this)}
							horizontal={true}
							flatListRef={React.createRef()}
							ref={this.flatList}
						/>
			)
		}else{
			const spin = this.spinValue.interpolate({
				inputRange: [0, 1],
				outputRange: ['0deg', '360deg']
			})
	
			return(
					<View style={{flex:1,alignItems: 'center', justifyContent: 'center',backgroundColor:'black'}}>
							<Animated.Image
						style={{
							width: 100,
							height: 100,
							transform: [{rotate: spin}] }}
							source={require('../../images/DirtPit_icon_1024.png')}
					/>
					</View>
			)
		}
	}
	
	FlatListItemSeparator = () => {
		return (
			<View style={{
				 height: .5,
				 width:"100%",
				 backgroundColor:"rgba(0,0,0,0.5)",
				}}
			/>
		);
	}

	renderThumbs(item) {
		if (item.image == 'placeholder.png'){
			return (
			<Image
					source={require('../../images/no-image-icon.png')}
					style={styles.imageLarge}
			/>
		)}else{
			return (
			<Image
					source={{uri: item.image}}
					style={styles.imageLarge}
			/>
		)}
	}
	
	renderLeft() {
			const {navigate} = this.props.navigation
			return (
					<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
							<Ionicons name={'ios-arrow-dropleft-circle'} size={30} color={'yellow'} style={{paddingTop: 0}} />
					</TouchableOpacity>
			);
	}

	renderCenter() {
			return <Image source={require('../../images/dirtpit-logo-181x43.png')} />
	}

  render() {
		if (this.state.loading){
			const spin = this.spinValue.interpolate({
				inputRange: [0, 1],
				outputRange: ['0deg', '360deg']
			})
	
			return(
					<View style={{flex:1,alignItems: 'center', justifyContent: 'center',backgroundColor:'black'}}>
							<Animated.Image
						style={{
							width: 100,
							height: 100,
							transform: [{rotate: spin}] }}
							source={require('../../images/DirtPit_icon_1024.png')}
					/>
					</View>
			)
		}else if (this.state.dataSource){
		console.warn('datasource',JSON.stringify(this.state.dataSource.filter(item=>item.data.store_id == this.state.storeId)))
		var list = this.state.dataSource.filter(item=>item.data[0].store_id == this.state.storeId)
// 		console.log('-------------------- ')
		console.log('list',JSON.stringify(list))
// 		console.log('=====================')
			return(

				<View style={styles.container}>
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


						<View style={styles.mainContainer}>
						<View style={{alignItems:'center'}}>
						<Text style={{fontFamily:'Gotham-Bold', fontSize: 30}}>PROMOTIONS</Text>
						</View>
						{this.renderSlider()}
					</View>
				</View>

			)
		}else{
            return (
                <View style={styles.container}>
										<Header
												innerContainerStyles={styles.headerInnerContainer}
												outerContainerStyles={styles.headerOuterContainer}
												leftComponent={this.renderLeft()}
												centerComponent={this.renderCenter()}
												containerStyle={{
														backgroundColor: '#000',
														marginTop:
																Platform.OS == 'ios' ? (iPhoneX ? 20 : 0) : -20,
														top:
																Platform.OS == 'ios' ? (iPhoneX ? -15 : 0) : -5,
														height: 70,
												}}
										/>
                    <View style={styles.cantLocate}>
                        <Image
                            source={require('../../images/noNoti.png')}
                            style={styles.cantLocateImg}
                        />
                        <Text style={styles.cantLocateText}>
                            More Categories soon...
                        </Text>
                    </View>
                </View>
            )
		}
		
  }
};

const styles = StyleSheet.create({
	MainContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
    width: (width/2)-5,
    padding: 2
  },
  imageLarge: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '95%',
    padding: 2,
    margin: 8
  },
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
    fontWeight: 'bold',
    color: Colors.black,
    marginLeft: 8,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
    marginLeft: 8,
  },
  sectionPrice: {
    marginLeft: 8,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '800',
    color: 'green',
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
  flexContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		height: 'auto',
	},
  testBox: {
		width: '100%',
		height: '50%',
	},
    cantLocate: {
        width: width,
        height: 250,
        zIndex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 40,
        paddingRight: 40,
    },
    cantLocateImg: {
        width: 70,
        height: 70,
        marginBottom: 15,
    },
    cantLocateText: {
        color: '#3f3f3f',
        fontSize: 18,
        textAlign: 'center',
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
        color: '#000',
        fontSize: 16,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    flatContent: {
        flex: 1,
    },
    rowArrow: {
        width: 16,
        height: 16,
        marginRight: 20,
    },
    rowWrap: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#dedede',
        height: 105,
        backgroundColor: '#ffffff',
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    rowIcon: {
        width: 100,
        height: 100,
        marginLeft: 20,
    },
    rowTextContent: {
        alignSelf: 'stretch',
        height: 105,
        marginLeft: 10,
        justifyContent: 'center',
        flex: 1,
    },
    rowMessage: {
        color: '#3f3f3f',
        fontSize: 18,
        paddingRight: 10,
    },
    rowPrice: {
        color: '#3f3f3f',
        fontSize: 13,
        paddingRight: 10,
        color: 'green',
    },
    rowTime: {
        color: '#a0abba',
        fontSize: 13,
    },
    rowDescription: {
        color: '#3f3f3f',
        fontSize: 18,
        paddingRight: 10,
        paddingLeft: 10,
    },
    scrollStyle: {
        alignSelf: "stretch"
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: "center"
    },
    descriptionContainer: {
    	paddingLeft: 10,
    },
    ul: {
    	marginTop: 10,
    	marginBottom: 10,
    	paddingTop: 10,
    	paddingBottom: 0,
    	paddingLeft: 5,
    	fontSize: 14,
    },
    li: {
    	paddingTop: 0,
    	paddingBottom: 0,
    	paddingLeft: 5,
			fontSize: 14,
    },
		p: {
				marginTop: 10,
				marginBottom: 10,
		},
		footerBar: {
			left: 0,
			bottom: 0,
			height: Platform.OS == 'ios' ? 70 : 50,
			flexDirection: 'row',
			justifyContent: 'space-between',
			backgroundColor: 'yellow',
			borderWidth: 3,
			borderColor: 'black',
		},
		mainContainer: {
			height:Platform.OS == 'ios' ? height-80 : height-40,
			top:Platform.OS == 'ios' ? (iPhoneX ? -10 : 0) : -8,
		},
});