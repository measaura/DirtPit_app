import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
  FlatList,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../NewAppScreen';
import {Header} from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {showLocation} from 'react-native-map-link'
import DeviceInfo from 'react-native-device-info'
var iPhoneX = DeviceInfo.hasNotch()

const {width, height} = Dimensions.get('window')

const randomHexColor = () => {
  return '#000000'.replace(/0/g, function() {
    return (~~(Math.random() * 16)).toString(16);
  });
};

export default class BikeGarageScreen extends Component {
	constructor(props) {
		super(props);
     this.spinValue = new Animated.Value(0);
		this.state = {
			loading: true,
			dataSource: [],
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

	componentDidMount(){
		this.spin()
// 	console.log(this.state.segId)
		fetch("https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/garage&bike")
			.then(response => response.json())
			.then((responseJson)=> {
				this.setState({
					loading: false,
					dataSource: responseJson.dealers
				})
			})
		.catch(error=>console.log(error)) //to catch the errors if any
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

	renderLeft() {
			const {navigate} = this.props.navigation
			return (
					<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
							<Ionicons name={'ios-arrow-dropleft-circle'} size={30} color={'yellow'} style={{paddingTop: 0}} />
					</TouchableOpacity>
			);
	}

	renderCenter() {
			return <Image source={require('../images/dirtpit-logo-181x43.png')} />
	}

  render() {
		const {navigate} = this.props.navigation
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
							source={require('../images/DirtPit_icon_1024.png')}
					/>
					</View>
			)
		}else if (this.state.dataSource){
// 		var list = this.state.dataSource.filter(item => item.top === "1")
// 		console.log('-------------------- ')
// 		console.log(list)
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
					<FlatList
						data={this.state.dataSource}
// 						renderItem={item => this.renderItem(item)}
						renderItem={item => (
// 							if ({item.item.top} == 1){
									<TouchableOpacity
											onPress={() =>
												showLocation({
														dialogTitle: 'Open map application',
														dialogMessage:
																'Get directions to "' +
																item.item.dealer_name +
																'" using selected app',
														latitude: item.item.latitude,
														longitude: item.item.longitude,
												})
											}
											style={styles.rowWrap}>
											<View style={styles.rowTextContent}>
													<Text allowFontScaling={false} style={styles.rowMessage}>
														{item.item.dealer_name}
													</Text>
													<Text allowFontScaling={false} style={styles.rowTime}>
														{item.item.address}
													</Text>
													<Text allowFontScaling={false} style={styles.rowTime}>
														{item.item.in_charge}{': '}{item.item.contact_no}
													</Text>
											</View>

									</TouchableOpacity>
// 								}									
									
							)}
						keyExtractor={item=>item.store_id.toString()}
					/>
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
                            source={require('../images/DirtPit_icon_1024.png')}
                            style={styles.cantLocateImg}
                        />
                        <Text allowFontScaling={false} style={styles.cantLocateText}>
                            More Contents soon...
                        </Text>
                    </View>
                </View>
            )
		}
		
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
  flexContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		height: 'auto',
	},
  testBox: {
		width: 150,
		height: 200,
		borderWidth: 1,
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
        height: 125,
        backgroundColor: '#ffffff',
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    rowIcon: {
        width: 120,
        height: 120,
        marginLeft: 20,
    },
    rowTextContent: {
        alignSelf: 'stretch',
        height: 125,
        marginLeft: 10,
        justifyContent: 'center',
        flex: 1,
    },
    rowMessage: {
        color: '#3f3f3f',
        fontSize: 25,
    },
    rowTime: {
        color: '#a0abba',
        fontSize: 15,
    },
});