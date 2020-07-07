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

const {width, height} = Dimensions.get('window')

const randomHexColor = () => {
  return '#000000'.replace(/0/g, function() {
    return (~~(Math.random() * 16)).toString(16);
  });
};

export default class DealersShopScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			dataSource: [],
			storeId: this.props.navigation.state.params.storeId,
			dealersType: this.props.navigation.state.params.dealerType
		};
	}

	componentDidMount(){
		fetch("https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/dealers&"+this.state.dealersType)
			.then(response => response.json())
			.then((responseJson)=> {
			console.log('response',JSON.stringify(responseJson))
				this.setState({
					loading: false,
					dataSource: responseJson
				})
			})
		.catch(error=>console.log(error)) //to catch the errors if any
		
	console.log(this.state.storeId)
// 
// 				this.setState({
// 					loading: false,
// 					dataSource: DATA,
// 				})
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
			return <Image source={require('../../images/DirtPit_logo-180x35.png')} />
	}

  render() {
		if (this.state.loading){
			return(
				<View style={styles.loader}>
					<ActivityIndicator size="large" color="#0c9" />
				</View>
			)
		}else if (this.state.dataSource){
		console.log('datasource',JSON.stringify(this.state.dataSource.filter(item=>item.data[0].retail_name)))
		var list = this.state.dataSource.filter(item =>{})
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
					{list.map((item) => {
						return (
						<View style={styles.mainContainer}>

							<ScrollView
								style={styles.scrollStyle}
								contentContainerStyle={styles.scrollContent}
							>

								<View style={styles.testBox} >
									{this.renderThumbs(item)}
									<Text style={styles.sectionTitle} >{item.name}</Text>
									<Text style={styles.sectionPrice} >{item.price}</Text>
									<View style={styles.decriptionContainer} >
										<Text style={styles.rowDescription}>{item.meta_description}</Text>
									</View>
								</View>
						</ScrollView>
						<View style={styles.footerBar}>
							<TouchableOpacity
								style={{flex:1, flexDirection:'row',justifyContent: 'center', alignItems: 'center',}}
								onPress={() =>
										showLocation({
												dialogTitle: 'Open map application',
												dialogMessage:
														'Get directions to "' +
														item.item.retail_name +
														'" using selected app',
												latitude: item.item.latitude,
												longitude: item.item.longitude,
												title: item.item.retail_name + ', ' + item.item.address,
										})
								}>
									<Text style={{fontFamily: 'Gotham-Bold', fontSize: 18, color: 'black'}}>NAVIGATE TO CONCEPT STORE</Text>
							</TouchableOpacity>
						</View>
					</View>
					)
				})}
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