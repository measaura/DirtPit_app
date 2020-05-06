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
import {WebView} from 'react-native-webview'
import DeviceInfo from 'react-native-device-info'
var iPhoneX = DeviceInfo.hasNotch()

const {width, height} = Dimensions.get('window')

const randomHexColor = () => {
  return '#000000'.replace(/0/g, function() {
    return (~~(Math.random() * 16)).toString(16);
  });
};

export default class ProductScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			dataSource: [],
			prodId: this.props.navigation.state.params.prodId
		};
	}

	componentDidMount(){
	console.log(this.state.segId)
		fetch("http://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/product&id="+this.state.prodId)
			.then(response => response.json())
			.then((responseJson)=> {
				this.setState({
					loading: false,
					dataSource: responseJson.products
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
					<ScrollView
							style={styles.scrollStyle}
							contentContainerStyle={styles.scrollContent}
					>
					{this.state.dataSource.map((item) => {
						return (
							<View style={styles.testBox} >
								{this.renderThumbs(item)}
								<Text style={styles.sectionTitle} >{item.name}</Text>
									<WebView
										originWhitelist={['*']}
										source={{html: item.description_raw}}
										style={{flex: 1, marginTop: 0, height: 100, fontSize: 20}}
									/>
								<Text style={styles.sectionPrice} >{item.price}</Text>
							</View>
						)
					})}
				</ScrollView>
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
		
//     return (
//     	<ScrollView >
//       <View style={styles.flexContainer}>
//         <View style={styles.testBox} >
//         	<Text style={styles.sectionTitle} > title </Text>
//         </View>
//         <View style={styles.testBox} >
//         	<Text style={styles.sectionTitle} > title </Text>
//         </View>
//         <View style={styles.testBox} >
//         	<Text style={styles.sectionTitle} > title </Text>
//         </View>
//         <View style={styles.testBox} >
//         	<Text style={styles.sectionTitle} > title </Text>
//         </View>
//         <View style={styles.testBox} >
//         	<Text style={styles.sectionTitle} > title </Text>
//         </View>
//         <View style={styles.testBox} >
//         	<Text style={styles.sectionTitle} > title </Text>
//         </View>
//         <View style={styles.testBox} >
//         	<Text style={styles.sectionTitle} > title </Text>
//         </View>
//       </View>
//       </ScrollView>
//     );


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
    fontWeight: '600',
    color: Colors.black,
    margin: 10,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
    marginLeft: 8,
  },
  sectionPrice: {
    marginTop: 8,
    marginLeft: 8,
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
    scrollStyle: {
        alignSelf: "stretch"
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: "center"
    },
});