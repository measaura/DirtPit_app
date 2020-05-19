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
			prodimg: [],
			prodId: this.props.navigation.state.params.prodId
		};
	}

	componentDidMount(){
	console.log(this.state.prodId)
// 		fetch("http://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/product&id="+this.state.prodId)
		fetch("http://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/productdetails&product_id="+this.state.prodId)
			.then(response => response.json())
			.then((responseJson)=> {
				this.setState({
					loading: false,
					dataSource: responseJson.product,
					prodimg: [{
						popup: responseJson.product[0].popup,
						thumb: responseJson.product[0].thumb,
					}]
				})
				if(responseJson.product[0].images){
					this.setState({
						prodimg: responseJson.product[0].images,
					})
				}
// 				console.log('response prodimg iamges '+ JSON.stringify(responseJson.product[0].images))
			})
		.catch(error=>console.log(error)) //to catch the errors if any
		if(this.state.dataSo)
		this.setState({
			prodimg: [{
				popup: this.state.dataSource.popup,
				thumb: this.state.dataSource.thumb,
			}]
		})
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

	itemSeparatorComponent = () => {
			return <View style = {
					{
							height: '100%',
							width: 5,
							backgroundColor: 'red',
					}
			}
			/>
	}

	renderPopup(item) {
		if (item.popup == 'placeholder.png'||item.popup == ''){
			return (
			<Image
					source={require('../../images/no-image-icon.png')}
					style={styles.imageLarge}
			/>
		)}else{
			return (
			<Image
					source={{uri: item.popup}}
					style={styles.imageLarge}
			/>
		)}
	}
	
	renderThumbs() {
console.log('renderThumb: '+this.state.prodimg)

// 		if (item.image == 'placeholder.png'){
// 			return (
// 			<Image
// 					source={require('../../images/no-image-icon.png')}
// 					style={styles.imageLarge}
// 			/>
// 		)}else{
		if(this.state.prodimg){
			return (
					<FlatList
						horizontal
						data={this.state.prodimg}
// 						renderItem={item => this.renderItem(item)}
						renderItem={item => (
// 							if ({item.item.top} == 1){
									<TouchableOpacity
											onPress={() =>
// 													navigate('Product', {
// 															prevScreenTitle: 'Product',
// 															catId: item.item.category_id,
// 													})
											console.log(item.thumb)
											}
											// style={styles.rowWrap}
											>
											<Image
													source={{uri: item.thumb}}
													style={styles.imageThumb}
											/>

									</TouchableOpacity>
// 								}									
									
							)}
							keyExtractor={item=>item.product_id}
						/>
// 
// 			<Image
// 					source={{uri: item.thumb}}
// 					style={styles.imageThumb}
// 			/>
		)}
// 		}
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
// console.warn(this.state.images)
// 			this.setState({
// 					images: [{
// 						popup: this.state.dataSource.popup,
// 						thumb: this.state.dataSource.thumb,
// 					}]
// 			})
// console.log(this.state.prodimg)
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
					{this.state.dataSource.map((item) => {
						return (
						<View style={styles.mainContainer}>

							<ScrollView
								style={styles.scrollStyle}
								contentContainerStyle={styles.scrollContent}
							>
							{this.renderPopup(item)}
							<View style={{height:80}} >
								<FlatList
										style={{flex:1, flexDirection: 'row', width: width, paddingTop: 0, paddingBottom: 0, backgroundColor: "#CED0CE"}}
										horizontal={true}
										data={this.state.prodimg}
										renderItem={({item}) => 
																			<Image
																					source={{uri: item.thumb}}
																					style={styles.imageThumb}
																			/>
										}

										ItemSeparatorComponent={() => {
												return (
														<View
																style={{
																height: 80,
																width: 5,
																backgroundColor: "red",

																}}
														/>
												);
										}}

										keyExtractor={(item, index) => index.toString()}
								/>
							</View>
								<View style={styles.testBox} >
									<Text allowFontScaling={false} style={styles.sectionTitle} >{item.heading_title}</Text>
									<Text allowFontScaling={false} style={styles.sectionPrice} >{item.manufacturer}</Text>
									<Text allowFontScaling={false} style={styles.sectionPrice} >{item.price}</Text>
									<View style={styles.decriptionContainer} >
										<HTML
											html={item.description}
											ignoredTags={[ ...IGNORED_TAGS, 'blockquote', 'h1', 'br']}
											containerStyle={{padding: 10}}
											ignoredStyles={['font-family','margin-bottom','font-size','outline']}
											allowFontScaling={false}
										/>
									</View>
								</View>
						</ScrollView>
						<View style={styles.footerBar}>
							<View style={{flex:1, flexDirection:'row',justifyContent: 'center', alignItems: 'center',}} >
								<Text allowFontScaling={false} style={{color: 'white'}}>ADD TO CART</Text>
							</View>
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
                        <Text allowFontScaling={false} style={styles.cantLocateText}>
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
    height: height*0.5,
    width: '95%',
    padding: 2,
    margin: 8
  },
  imageThumb: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height*0.1,
    width: height*0.1,
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
		marginTop: 0,
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
    descriptionContainer: {
    	paddingLeft: 10,
        flexGrow: 1,
        alignItems: "center",
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
				marginTop: 5,
				marginBottom: 0,
				paddingLeft: 10,
		},
		footerBar: {
			left: 0,
			bottom: 0,
			height: Platform.OS == 'ios' ? 70 : 50,
			flexDirection: 'row',
			justifyContent: 'space-between',
			backgroundColor: 'green',
		},
		mainContainer: {
			height:Platform.OS == 'ios' ? height-80 : height-40,
			top:Platform.OS == 'ios' ? (iPhoneX ? -10 : 0) : -8,
		},
});