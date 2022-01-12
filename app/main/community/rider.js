import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text,
  StatusBar,
  Image,
  Modal,
  Linking,
  Animated,
  Easing,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../../NewAppScreen';
import {Header, SocialIcon} from 'react-native-elements'
import { NavigationEvents } from 'react-navigation'
import Toast, {DURATION} from 'react-native-easy-toast'
import Ionicons from 'react-native-vector-icons/Ionicons'

import OptionButton from '../../components/optionbutton.js'
import {showLocation} from 'react-native-map-link'
import DeviceInfo from 'react-native-device-info'
var iPhoneX = DeviceInfo.hasNotch()

const {width, height} = Dimensions.get('window')

const randomHexColor = () => {
  return '#000000'.replace(/0/g, function() {
    return (~~(Math.random() * 16)).toString(16);
  });
};

export default class CommunityRidersScreen extends Component {
	constructor(props) {
		super(props);
     this.spinValue = new Animated.Value(0);
		this.state = {
			loading: true,
			dataSource: [],
			dataRider: [],
			riderInfo: [],
			riderId: "",
			ModalVisibleStatus: false,
		};
	}
	
	spin () {
		this.spinValue.setValue(0)
		Animated.timing(
			this.spinValue,
			{
				toValue: 1,
				duration: 1500,
				useNativeDriver: true,
				easing: Easing.linear
			}
		).start(() => this.spin())
	}

  showModal(visible, riderId) {
    //handler to handle the click on image of Grid
    //and close button on modal
    var riderInfo = this.state.dataRider.filter(item=>item.rider_id == riderId)
//     console.log('riderInfo', riderInfo)
//     console.info('gallery info',this.state.dataRider[riderId-1].gallery)
    if (riderId == ''){
    	this.setState({
    		ModalVisibleStatus: visible
    	})
    }else{
			this.setState({
				ModalVisibleStatus: visible,
				riderGallery: this.state.dataRider[riderId-1].gallery,
				modalimg: this.state.dataRider[riderId-1].image,
				riderSocmed: this.state.dataRider[riderId-1].socmed
			});
    }
  }
  
	getBanner() {
// 	console.log(this.state.segId)
		fetch("https://ftwventures.com.my/index.php?route=api/banner&id=12")
			.then(response => response.json())
			.then((responseJson)=> {
				console.log(responseJson.banner[0])
				this.setState({
					dataSource: responseJson.banner,
					popupimg: responseJson.banner[0].image
				})
			})
		.catch(error=>console.log(error)) //to catch the errors if any
	}
	
	getRiders() {
// 	console.log(this.state.segId)
		fetch("https://ftwventures.com.my/index.php?route=api/community&riders")
			.then(response => response.json())
			.then((responseJson)=> {
// 				console.log(responseJson)
				this.setState({
					loading: false,
					dataRider: responseJson.riders,
					popupimg: responseJson.riders[0].image,
					riderInfo: responseJson.riders[0]
				})
			})
		.catch(error=>console.log(error)) //to catch the errors if any
	}
	
	componentDidMount(){
		this.spin()
		this.getRiders()
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

	openSocmed(socmed) {
	console.log('socmed',socmed.type)
		var url
		if (socmed.type == 'twitter') {
			url = 'https://twitter.com/'+socmed.link
		}else if (socmed.type == 'instagram') {
			url = 'https://www.instagram.com/'+socmed.link+'/?hl=en' 
		}else if (socmed.type == 'facebook') {
			url = 'fb://facewebmodal/f?href=https://www.facebook.com/'+socmed.link+'/'
		}
		console.log(url)
		Linking.openURL(url)
      .then(data => {
//         alert('Twitter Opened');
      })
      .catch(() => {
        alert('Something went wrong');
      });
	}
	
	renderSocmed(items) {
		return (
			<View style={{ flexDirection: 'row', marginLeft: 10,alignItems:'center'}} >
				{
					items.map((item, key) =>
						(
			<SocialIcon
				type={item.type}
				style={{width:30, height: 30}}
				iconSize={20}
				onPress={(ref) => {
					this.openSocmed(item)
				}}
			/>
						))
				}
			</View>
		);

	}
	
	renderGearTitle(items){
		if (items.length > 0){
			return (
				<View style={{justifyContent: 'center', alignItems:'center',paddingTop: 5, paddingBottom: 5,marginLeft:-5, backgroundColor: 'yellow'}}>
					<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', fontSize: 20,}}>FAVOURITE GEAR</Text>
				</View>
			)
		}
	}
	
	renderGear(items) {
	console.log(items)

			if (items.length > 0){
				return(
					items.map((item, key) =>
						(
							<Text>
								<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Book', fontSize: 16}}>{item.type} : </Text>
								<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', fontSize: 16}}>{item.detail}</Text>
							</Text>
						))
				
				)
			}

	}
	
	renderAchievementTitle(items){
		if (items.length > 0){
			return (
				<View style={{justifyContent: 'center', alignItems:'center',paddingTop: 5, paddingBottom: 5,marginLeft:-5, backgroundColor: 'yellow'}}>
					<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', fontSize: 20,}}>ACHIEVEMENTS</Text>
				</View>
			)
		}
	}
	
	renderAchievements(items) {
	console.log(items)

			if (items.length > 0){
				return(
					items.map((item, key) =>
						(
							<Text>
								<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', fontSize: 16}}>{item.year} : </Text>
								<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', fontSize: 16}}>{item.achievement}</Text>
							</Text>
						))
				
				)
			}

// 		return (
// 			<View style={{justifyContent: 'center', alignItems:'center',paddingTop: 5, paddingBottom: 5}}>
// 				<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', fontSize: 20,}}>ACHIEVEMENTS</Text>
// 			</View>
// 
// 				{
// 					items.map((item, key) =>
// 						
// 							{
// 							<Text>
// 								<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Book', fontSize: 16}}>
// 										{item.year}: 
// 								</Text>
// 								<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', fontSize: 16}}>
// 										{item.achievement}
// 								</Text>
// 							</Text>
// 							}
// 						)
// 				}
// 
// 		);
// 
	}
	
	renderPopup(item) {
		console.warn(item)
		console.info('nickname',item.nickname)
		this.setState({
			popupimg: item.image,
			riderId: item.rider_id,
			riderInfo: item,
		})
	}

	renderPopupModal(item) {
		console.warn(item)
		console.info('nickname',item.nickname)
		this.setState({
			modalimg: item.image,
		})
	}
	
	renderLeft() {
			const {navigate} = this.props.navigation
			return (
					<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
							<Ionicons name={'ios-arrow-back-circle'} size={30} color={'yellow'} style={{paddingTop: 0}} />
					</TouchableOpacity>
			);
	}

	renderCenter() {
			return <Image source={require('../../images/dirtpit-logo-181x43.png')} />
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
							source={require('../../images/DirtPit_icon_1024.png')}
					/>
					</View>
			)
		}else if (this.state.ModalVisibleStatus) {
// 		console.info('gallery',this.state.dataRider[0].gallery)
				//Modal to show full image with close button 
				return (
					<Modal
						transparent={false}
						animationType={'fade'}
						visible={this.state.ModalVisibleStatus}
						onRequestClose={() => {
							this.ShowModalFunction(!this.state.ModalVisibleStatus,'');
						}}>
						<View style={styles.modelStyle}>
							<ScrollView
								style={styles.scrollStyle}
							>
							<Image
									source={{uri: this.state.modalimg}}
									style={styles.imageLarge}
							/>
							<View style={{height:(height*0.15)}} >
								<FlatList
										style={{flex:1, flexDirection: 'row', width: width, paddingTop: 0, paddingBottom: 0, backgroundColor: "#ccc"}}
										horizontal={true}
										data={this.state.riderGallery}
										renderItem={({item,index}) => 
                    	<TouchableOpacity 
                    		onPress={()=>this.renderPopupModal(item,index)}>
																			<Image
																					source={{uri: item.image}}
																					style={styles.imageThumb}
																			/>
                      </TouchableOpacity>
										}

										ItemSeparatorComponent={() => {
												return (
														<View
																style={{
																height: (height*0.15)+10,
																width: 5,
																backgroundColor: "#fff",

																}}
														/>
												);
										}}

										keyExtractor={(item, index) => index.toString()}
								/>
							</View>
							<View style={{justifyContent: 'flex-start', marginBottom: 10,  marginLeft: 5}} >
								<View style={{flexDirection: 'row'}}>
									<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', fontSize: 30}}>
											{this.state.riderInfo.nickname}
									</Text>

										{this.renderSocmed(this.state.riderInfo.socmed)}

								</View>
								<Text>
									<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Book', fontSize: 16}}>NAME: </Text>
									<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', fontSize: 16}}>{this.state.riderInfo.full_name}</Text>
								</Text>
								<Text>
									<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Book', fontSize: 16}}>D.O.B: </Text>
									<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', fontSize: 16}}>{this.state.riderInfo.dob}</Text>
								</Text>
								<Text>
									<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Book', fontSize: 16}}>BIRTH PLACE: </Text>
									<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', fontSize: 16}}>{this.state.riderInfo.birth_place}</Text>
								</Text>
								<Text>
									<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Book', fontSize: 16}}>FAVOURITE NUMBER: </Text>
									<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', fontSize: 16}}>
											{this.state.riderInfo.fav_no}
									</Text>
								</Text>
								{this.renderGearTitle(this.state.riderInfo.fav_gear)}
								{this.renderGear(this.state.riderInfo.fav_gear)}
								<View style={{justifyContent: 'center', alignItems:'center',paddingTop: 5, paddingBottom: 5,marginLeft:-5, backgroundColor: 'yellow'}}>
									<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', fontSize: 20,}}>CAREER</Text>
								</View>
								<Text>
									<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Book', fontSize: 16}}>RIDE: </Text>
									<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', fontSize: 16}}>
											{this.state.riderInfo.ride}
									</Text>
								</Text>
								<Text>
									<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Book', fontSize: 16}}>PRINCIPLE: </Text>
									<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', fontSize: 16}}>
											{this.state.riderInfo.principle}
									</Text>
								</Text>
								<Text>
									<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Book', fontSize: 16}}>TEAM: </Text>
									<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', fontSize: 16}}>
											{this.state.riderInfo.team}
									</Text>
								</Text>
								<Text>
									<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Book', fontSize: 16}}>YEARS ACTIVE: </Text>
									<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', fontSize: 16}}>
											{this.state.riderInfo.years_active}
									</Text>
								</Text>
								<Text>
									<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Book', fontSize: 16}}>YEARS PRO: </Text>
									<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', fontSize: 16}}>
											{this.state.riderInfo.year_pro}
									</Text>
								</Text>
								<Text>
									<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Book', fontSize: 16}}>FTW RACING TEAM: </Text>
									<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', fontSize: 16}}>
											{this.state.riderInfo.ftw_rider_year}
									</Text>
								</Text>
								{this.renderAchievementTitle(this.state.riderInfo.career)}
								{this.renderAchievements(this.state.riderInfo.career)}
							</View>
						</ScrollView>				
							<TouchableOpacity
								activeOpacity={0.5}
								style={styles.closeButtonStyle}
								onPress={() => {
									this.showModal(!this.state.ModalVisibleStatus,'');
								}}>
								<Ionicons name={'ios-close-circle'} size={40} color={'yellow'} style={{ width: 40, height: 40,  right: -4, alignItem: 'center', justifyContent: 'center',  }} />
							</TouchableOpacity>
						</View>
					</Modal>
				);
			}else if (this.state.dataSource){
		var list = this.state.dataRider.filter(item => item.rider_id === "1")
// 		var list = this.state.dataSource.filter(item => item.top === "1")
// 		console.log('-------------------- ')
// 		console.log(list)
// 		console.log('=====================')
// console.log(this.state.dataSource[0].image)
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
									height: Platform.OS == 'ios' ? (iPhoneX ? 90 : 95) : 70,
							}}
					/>

						<View style={styles.mainContainer}>
							<ScrollView
								style={styles.scrollStyle}
							>
							<Image
									source={{uri: this.state.popupimg}}
									style={styles.imageLarge}
							/>
							<View style={{height:(height*0.15)+10}} >
								<FlatList
										style={{flex:1, flexDirection: 'row', width: width, paddingTop: 0, paddingBottom: 0, backgroundColor: "#ffffff"}}
										horizontal={true}
										data={this.state.dataRider}
										renderItem={({item,index}) => 
                    	<TouchableOpacity 
                    		onPress={()=>this.renderPopup(item,index)}>
																			<Image
																					source={{uri: item.image}}
																					style={styles.imageThumb}
																			/>
                      </TouchableOpacity>
										}

										ItemSeparatorComponent={() => {
												return (
														<View
																style={{
																height: (height*0.15)+10,
																width: 5,
																backgroundColor: "#fff",

																}}
														/>
												);
										}}

										keyExtractor={(item, index) => index.toString()}
								/>
							</View>
							<View style={{justifyContent: 'flex-start', marginBottom: 60, height: 100, marginLeft: 5}} >
								<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', fontSize: 30}}>
										{this.state.riderInfo.nickname}
								</Text>
								<Text>
									<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Book', fontSize: 18}}>RIDE: </Text>
									<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', fontSize: 18}}>
											{this.state.riderInfo.ride}
									</Text>
								</Text>
								<Text>
									<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Book', fontSize: 18}}>PRINCIPLE: </Text>
									<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', fontSize: 18}}>
											{this.state.riderInfo.principle}
									</Text>
								</Text>
								<TouchableOpacity onPress={() => this.showModal(true, this.state.riderInfo.rider_id)}>
									<View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
										<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', fontSize: 16, paddingTop: 20, paddingRight: 5}}>
												MORE...
										</Text>
										<Ionicons name={'ios-arrow-forward-circle'} size={30} color={'black'} style={{top: -6, paddingTop: 20, paddingRight:10}} />
									</View>
								</TouchableOpacity>
							</View>
						</ScrollView>						
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
                            source={require('../../images/DirtPit_icon_1024.png')}
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
  imageLarge: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height*0.5,
    width: '98%',
    padding: 2,
    margin: 4
  },
  imageThumb: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height*0.15,
    width: height*0.15,
    padding: 1,
    marginTop: 0,
    borderWidth: 1,
    borderColor: '#fff',
  },
  imageMenu: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 600,
    width: width*0.95,
    padding: 2,
    margin: 8
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Gotham-Bold',
    fontWeight: 'bold',
    color: Colors.black,
    marginLeft: 8,
  },
  fullImageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '98%',
    resizeMode: 'contain',
  },
  modelStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
	top: 35,
  },
  closeButtonStyle: {
    width: 40,
    height: 40,
    top: 9,
    right: 9,
    position: 'absolute',
  },
});