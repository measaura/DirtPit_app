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
  Animated,
  Easing,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../../NewAppScreen';
import {Header} from 'react-native-elements'
import { NavigationEvents } from 'react-navigation'
import Toast, {DURATION} from 'react-native-easy-toast'
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

export default class CommunityActivityScreen extends Component {
	constructor(props) {
		super(props);
     this.spinValue = new Animated.Value(0);
		this.state = {
			loading: true,
			dataSource: [],
			imageuri: '',
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
				easing: Easing.linear
			}
		).start(() => this.spin())
	}

	componentDidMount(){
		this.spin()
// 	console.log(this.state.segId)
		fetch("https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/banner&id=13")
			.then(response => response.json())
			.then((responseJson)=> {
				console.log(responseJson.banner[0])
				this.setState({
					loading: false,
					dataSource: responseJson.banner,
					popupimg: responseJson.banner[0].image
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

  showModal(visible, imageURL) {
    //handler to handle the click on image of Grid
    //and close button on modal
    this.setState({
      ModalVisibleStatus: visible,
      imageuri: imageURL.image,
    });
  }
  
	renderPopup(item) {
		console.warn(item)
		this.setState({
			popupimg: item.image,
		})
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
		}else if (this.state.dataSource){
// 		var list = this.state.dataSource.filter(item => item.top === "1")
// 		console.log('-------------------- ')
// 		console.log(list)
// 		console.log('=====================')
console.log(this.state.dataSource[0].image)
			if (this.state.ModalVisibleStatus) {
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
							<Image
								style={styles.fullImageStyle}
								source={{ uri: this.state.imageuri }}
							/>
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
			} else {
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

								<ScrollView
									style={styles.scrollStyle}
								>
								<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', fontSize: 20, textAlign: 'center'}}>
										SHERCO PLAYDAY
								</Text>


								<View style={{width: width}} >
									<FlatList
											style={{flex:1, flexDirection: 'row', width: width, paddingTop: 0, paddingBottom: 0, backgroundColor: "#ffffff"}}
											numColumns={3}
											data={this.state.dataSource}
											renderItem={({item,index}) => 
												<TouchableOpacity 
													onPress={()=>this.showModal(true, item)}>
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
																	height:5,
																	width: 5,
																	backgroundColor: "#fff",

																	}}
															/>
													);
											}}

											keyExtractor={(item, index) => index.toString()}
									/>
								</View>

							</ScrollView>						

					</View>
				)
			}
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
    width: '95%',
    padding: 2,
    margin: 8
  },
  imageThumb: {
    justifyContent: 'center',
    alignItems: 'center',
    height: (width/3)-8,
    width: (width/3)-8,
    marginLeft: 5,
    paddingRight: 5,
    marginTop: 2,
    borderWidth: 0,
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
    backgroundColor: '#000',
  },
  closeButtonStyle: {
    width: 40,
    height: 40,
    top: 9,
    right: 9,
    position: 'absolute',
  },
});