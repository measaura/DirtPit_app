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
import {Header, Icon, withBadge} from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HTML from 'react-native-render-html'
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils'
import Toast, {DURATION} from 'react-native-easy-toast'
import OptionButton from '../../components/optionbutton.js'
import DeviceInfo from 'react-native-device-info'
var iPhoneX = DeviceInfo.hasNotch()

const {width, height} = Dimensions.get('window')

const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
const navbarHeight = screenHeight - windowHeight + StatusBar.currentHeight;

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
			optionItems: [],
			optionName: [],
			optionSelected: [],
			popupimg:'',
			items:0,
			prodId: this.props.navigation.state.params.prodId,
      radioItems:
        [
          {
            label: 'S',
            size: 30,
            color: 'grey',
            textColor: 'black',
            selected: false
          },

          {
            label: 'M',
            color: 'yellow',
            textColor: 'black',
            size: 30,
            selected: false,
          },

          {
            label: 'L',
            size: 30,
            color: 'yellow',
            textColor: 'black',
            selected: false
          },

          {
            label: 'XL',
            size: 30,
            color: 'yellow',
            textColor: 'black',
            selected: false
          }
        ], 
      selectedItem: ''
		}
		this.toaster = this.toaster.bind(this)
	}

	toaster(message, duration) {
			try {
					this.refs.toast.show(message, duration)
			} catch (err) {
					// alert(err);
			}
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
					}],
					popupimg: responseJson.product[0].popup,
				})
				if(responseJson.product[0].images){
					this.setState({
						prodimg: [ ...this.state.prodimg, ...responseJson.product[0].images]
					});
				}
				if(responseJson.product[0].options){
					this.setState({
						optionName: responseJson.product[0].options[0].name,
						optionItems: responseJson.product[0].options[0].product_option_value,
					})
				}
// 				console.log('response prodimg iamges '+ JSON.stringify(responseJson.product[0].images))
			})
		.catch(error=>console.log(error)) //to catch the errors if any

	this.updateCount()

    this.state.radioItems.map((item) => {
      if (item.selected == true) {
        this.setState({ selectedItem: item.label });
      }
    });		 
    
	}

	updateCount =() =>{
		AsyncStorage.getItem('cart').then((datacart)=>{
			 if (datacart !== null) {
				 // We have data!!
				 const cart = JSON.parse(datacart)
				const itemCount = cart.reduce((itemTotal, item) => itemTotal + Number(item.quantity), 0)
// 				console.log('items: '+itemCount)
				this.setState({items:itemCount})
			 }
			 else{

			 }

		 })
		 .catch((err)=>{
			 alert(err)
		 })	
	}
  
	FlatListItemSeparator = () => {
		return (
			<View style={{
				 height: .5,
				 width:"100%",
				 backgroundColor:"#fff",
				}}
			/>
		);
	}
	
	addToCart(data){
		var currency = data.price;
		var number = Number(currency.replace(/[^\d\.]/g,""));
		var itemprice = (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&');
		const itemcart = {
			shop: data,
			quantity:  1,
			price: itemprice
		}

		AsyncStorage.getItem('cart').then((datacart)=>{
			 if (datacart !== null) {
				 // We have data!!
				 const cart = JSON.parse(datacart)
					const existingItem = cart.find((item) => {
						return itemcart.shop.product_id === item.shop.product_id;
					});

					if(existingItem) {
						 existingItem.quantity++;
					} else {
						// Push the item into the cart
						cart.push(itemcart);
					}
					
// 				 cart.push(itemcart)
				 AsyncStorage.setItem('cart',JSON.stringify(cart));
// 				 			 console.log(JSON.stringify(cart))
			 }else{
				 const cart  = []
				 cart.push(itemcart)
				 AsyncStorage.setItem('cart',JSON.stringify(cart));
			 }
			 
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				let mySession = AsyncStorage.getItem('tokenKey');
				var formdata = new FormData();
				formdata.append(data.product_id);
				formdata.append(data.quanitiy);
				
				
				var myHeaders = new Headers();
				myHeaders.append("Cookie", "language=en-gb;");
				myHeaders.append("Cookie", "default="+mySession+";");
				console.log(AsyncStorage.getItem('tokenKey'))
				console.log(myHeaders)

				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					body: formdata,
					redirect: 'follow'
				};

				fetch("https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/usercart/add", requestOptions)
					.then(response => response.text())
					.then(result =>{
						console.log(result)
// 						if (result.firstname) {
// 							console.log(result.firstname)
// 						}
					})
					.catch(error => console.log('error', error));
					
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++					
				this.updateCount()
				this.toaster(
						'Added to cart',
						2000,
				)
		 })
		 .catch((err)=>{
			 alert(err)
		 })
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
// 		console.warn(item)
		this.setState({
			popupimg: item.popup,
		})
	}
	
	renderThumbs() {
// console.log('renderThumb: '+this.state.prodimg)

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
	
	renderOptions(item){
		console.log(JSON.stringify(item.options))
// 		if(item.options[0]){
// 		
// 			console.warn(item.options[0].name)
// 			return(
// 				<Text allowFontScaling={false} style={styles.sectionPrice} style={{paddingBottom:30, paddingLeft: 15,}}>Options: {'\n'}{item.options[0].name}{': '}{item.options[0].product_option_value[0].name}</Text>
// 			);
// 		}
// console.info(this.state.optionName.length)
			if (this.state.optionName.length > 0) {			
				return (
					<View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 10,alignItems:'center'}} >
						<Text style={{fontSize:18,}}>{this.state.optionName}</Text>
						{
							this.state.optionItems.map((item, key) =>
								(
									<OptionButton key={key} button={item} style={{height:30, color:'yellow'}} onClick={this.changeActiveRadioButton.bind(this, key)} />
								))
						}
					</View>
				);
			}
	}

  changeActiveRadioButton(index) {
    this.state.optionItems.map((item) => {
      item.selected = false;
    });

    this.state.optionItems[index].selected = true;

    this.setState({ optionItems: this.state.optionItems }, () => {
      this.setState({ 
      	selectedItem: this.state.optionItems[index].name,
      	optionSelected: this.state.optionItems[index] 
      });
    });
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

	renderRight() {
			const {navigate} = this.props.navigation
			const BadgedIcon = withBadge(this.state.items)(Icon)
			if (this.state.isMonitor) {
					return ''
			} else {
					return (
							<TouchableOpacity
									onPress={() =>
											navigate('Cart')
									}>
									<View style={{ paddingRight: 15}} >

										<BadgedIcon type='ionicon' name="ios-cart" size={28} color={"yellow"} />
									</View>
							</TouchableOpacity>
					)
			}
	}

  render() {
		const {navigate} = this.props.navigation
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
console.warn('selected: '+ JSON.stringify(this.state.optionSelected))
			return(

				<View style={styles.container}>
					<Header
							innerContainerStyles={styles.headerInnerContainer}
							outerContainerStyles={styles.headerOuterContainer}
							leftComponent={this.renderLeft()}
							centerComponent={this.renderCenter()}
							rightComponent={this.renderRight()}
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
							<Toast ref="toast" position="top" />
							<ScrollView
								style={styles.scrollStyle}
								contentContainerStyle={styles.scrollContent}
							>
							<Image
									source={{uri: this.state.popupimg}}
									style={styles.imageLarge}
							/>
							<View style={{height:(height*0.15)+10}} >
								<FlatList
										style={{flex:1, flexDirection: 'row', width: width, paddingTop: 0, paddingBottom: 0, backgroundColor: "#ffffff"}}
										horizontal={true}
										data={this.state.prodimg}
										renderItem={({item,index}) => 
                    	<TouchableOpacity 
                    		onPress={()=>this.renderPopup(item,index)}>
																			<Image
																					source={{uri: item.thumb}}
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
								<View style={styles.testBox} >
									<Text allowFontScaling={false} style={styles.sectionTitle} >{item.heading_title}</Text>
									<Text allowFontScaling={false} style={styles.rowPrice} >{item.manufacturer}</Text>
									<Text allowFontScaling={false} style={styles.sectionPrice} >{item.price}</Text>
									{this.renderOptions(this.state.optionItems)}

									<View style={styles.decriptionContainer} >
										<HTML
											html={item.description?item.description:'No description.'}
											containerStyle={{paddingLeft:5, paddingRight:5, paddingBottom:15}}
											ignoredStyles={['height', 'width', 'font-family', 'letter-spacing', 'font-style', 'font-variant', 'font-weight', 'font-stretch', 'line-height']}
											allowFontScaling={false}
										/>
									</View>
								</View>
						</ScrollView>
						<View style={styles.footerBar}>
						<TouchableOpacity 
							onPress={()=>this.addToCart(item)} >
							<View style={{flex:1, width: width,  flexDirection:'row',justifyContent: 'space-around', alignItems: 'center',}} >
								<Text allowFontScaling={false} style={{fontFamily: 'Gotham Bold', color: 'white'}}>ADD TO CART</Text>
							</View>
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
    height: height*0.15,
    width: height*0.15,
    padding: 2,
    marginTop: 5,
    borderWidth: 5,
    borderColor: '#fff',
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
    fontFamily: 'Gotham Bold',
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
    marginBottom: 5,
    fontFamily: 'Gotham Bold',
    fontSize: 18,
    fontWeight: '800',
    color: 'black',
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
        fontFamily: 'Gotham Bold',
        fontSize: 15,
        paddingLeft: 8,
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
			paddingBottom: 20,
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