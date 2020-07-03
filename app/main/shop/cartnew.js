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
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../../NewAppScreen';
import { Header } from "react-native-elements";
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-community/async-storage'
import NumberFormat from 'react-number-format'
import { NavigationEvents } from 'react-navigation'
import API from "../../helper/APIController";
import DeviceInfo from 'react-native-device-info'
var iPhoneX = DeviceInfo.hasNotch()

const {width, height} = Dimensions.get('window')

const randomHexColor = () => {
  return '#000000'.replace(/0/g, function() {
    return (~~(Math.random() * 16)).toString(16);
  });
};

const list =[
  {
    "totals": [
      {
        "text": "RM3,109.00", 
        "title": "Sub-Total"
      }, 
      {
        "text": "RM3,109.00", 
        "title": "Total"
      }
    ], 
    "products": [
      {
        "total": "RM96.00", 
        "option": [], 
        "price": "RM48.00", 
        "thumb": "https://demo.shortcircuitworks.com/dirtpit23/image/cache/catalog/Motorex/Bike%20Clean%20500ml-47x47.jpg", 
        "model": "CLEAN AND CARE", 
        "quantity": "2", 
        "recurring": "", 
        "cart_id": "47", 
        "name": "MOTOREX BIKE CLEAN 500ml"
      }, 
      {
        "total": "RM1,998.00", 
        "option": [
          {
            "type": "select", 
            "name": "Size", 
            "value": "11 - 13"
          }
        ], 
        "price": "RM999.00", 
        "thumb": "https://demo.shortcircuitworks.com/dirtpit23/image/cache/catalog/LIFESTYLE/JACKET/LEGION%20JACKET%20[BLK]%20-1-47x47.jpeg", 
        "model": "JACKETS", 
        "quantity": "2", 
        "recurring": "", 
        "cart_id": "53", 
        "name": "LEGION JACKET [BLK] "
      }, 
      {
        "total": "RM516.00", 
        "option": [], 
        "price": "RM129.00", 
        "thumb": "https://demo.shortcircuitworks.com/dirtpit23/image/cache/catalog/LIFESTYLE/TEES/TLD/ADDICT%20TEE;%20ONYX%20SNOW/ADDICT%20TEE-47x47.jpg", 
        "model": "SHORT SLEEVES", 
        "quantity": "4", 
        "recurring": "", 
        "cart_id": "56", 
        "name": "ADDICT TEE; ONYX SNOW LG"
      }, 
      {
        "total": "RM499.00", 
        "option": [], 
        "price": "RM499.00", 
        "thumb": "https://demo.shortcircuitworks.com/dirtpit23/image/cache/catalog/MX%20APPARELS/HELMET/FLY/FLY%20KINETIC%20FLEX%20PINK.BK.WH/Untitled-1-07-47x47.jpg", 
        "model": "FLY KINETIC", 
        "quantity": "1", 
        "recurring": "", 
        "cart_id": "57", 
        "name": "FLY KINETIC FLEX PINK/BK/WH "
      }
    ], 
    "vouchers": [], 
    "text_items": "9 item(s) - RM3,109.00", 
    "item_count": 9
  }
];
export default class CartNewScreen extends Component {
  constructor(props) {
     super(props);
     this.state = {
       dataCart:[],
       newCart:[],
       cartTotal:[],
       email:'',
       password:'',
     };
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
	
	reLogin() {
		const formData = new FormData();
console.log(this.state.my)
		formData.append("email", this.state.email);
		formData.append("password", this.state.password);
		API.login(formData).then(response => {
			console.log('API.login',response)
			this.setState({
					isLogin: true,
					tokenKey: response.access_token,
			})
			AsyncStorage.setItem('tokenKey', response.access_token)
			AsyncStorage.setItem('myLogin', JSON.stringify(response))
// 			this.fetchProfile()
// 			navigate('Home', {prevScreenTitle: 'Home'})
		})
	}

	checkLogin() {
		AsyncStorage.getItem("myLogin", (err, value) => {
				if (!err && value != null) {
					let thisLogin = JSON.parse(value);
					this.setState({
						email: thisLogin.email,
						password: thisLogin.password, 
					});

					console.warn('myLogin', thisLogin )
				} else {
				}
		});
		
		AsyncStorage.getItem("tokenKey", (err, value) => {
				if (!err && value != null) {
						this.setState({ tokenKey: value });
					console.log('tokenKey', value)
				} else {
				}
		});
		const dataForm = new FormData();
		dataForm.append("access_token", this.state.tokenKey)
// 		console.log('loginInfo',myLogin)
		API.userDetail(dataForm).then(response => {
// 			data = response;
// 			this.setState({
// 					fetchedName: data.firstname+' '+data.lastname,
// 					fetchedEmail: data.email,
// 					fetchedPhone: data.telephone
// 			});

			if (response.customer_id === null) {
				this.reLogin()
			}
			
			console.log('checkLogin userDetail',response.customer_id)
		});
	}
	
	getCartItems() {
	
		this.checkLogin();
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 				let mySession = AsyncStorage.getItem('tokenKey');
				var myHeaders = new Headers();
// 				myHeaders.append("Cookie", "language=en-gb;");
// 				myHeaders.append("Cookie", "default="+mySession+";");
// 				myHeaders.append("Cookie", "language=en-gb; currency=MYR; PHPSESSID=473df23cb16c59c23d61cf2254bc32e0; default=ab3122bd90780f42debb797e1de4449a");
// 				console.log(AsyncStorage.getItem('tokenKey'))
// 				console.log(myHeaders)

				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					redirect: 'follow'
				};

				fetch("https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/showcart", requestOptions)
					.then(response =>response.json())
					.then(result =>{

						this.setState({
							newCart: result[0].products,
							cartTotal: result[0].totals,
						})
					console.log(result[0].products)
					})
					.catch(error => console.log('error', error));
					
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
    AsyncStorage.getItem('cart').then((cart)=>{
      if (cart !== null) {
        // We have data!!
//         console.log('cart not null', cart)
        const shopcart = JSON.parse(cart)
        this.setState({dataCart:shopcart})


//         AsyncStorage.getItem('cart').then((res) => console.log(res))
      }
    }) 
    .catch((err)=>{
      alert(err)
    })
  }

  componentDidMount() {
		AsyncStorage.getItem("tokenKey", (err, value) => {
				if (!err && value != null) {
						this.setState({ tokenKey: value }, this.connectAPI);
				} else {
				}
		});
		this.getCartItems()
  }

  cartCheckout() {
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 				let mySession = AsyncStorage.getItem('tokenKey');
				var myHeaders = new Headers();
// 				myHeaders.append("Cookie", "language=en-gb;");
// 				myHeaders.append("Cookie", "default="+mySession+";");
// 				myHeaders.append("Cookie", "language=en-gb; currency=MYR; PHPSESSID=473df23cb16c59c23d61cf2254bc32e0; default=ab3122bd90780f42debb797e1de4449a");
// 				console.log(AsyncStorage.getItem('tokenKey'))
// 				console.log(myHeaders)

				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					redirect: 'follow'
				};

				fetch("https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/showcart", requestOptions)
					.then(response =>response.json())
					.then(result =>{

						this.setState({
							newCart: result[0].products,
							cartTotal: result[0].totals,
						})
					console.log(result[0].products)
					})
					.catch(error => console.log('error', error));
					
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
  }
  
  goBack() {
    const {  navigation, route  } = this.props;
    navigation.goBack()
//     navigation.state.params.updateCount({itemCount:4});
  }
  
  renderOptions(item) {
  	if (item.item.option.length > 0) {
  	console.log(item.item.option[0].name)
			return(
					<Text allowFontScaling={false} style={styles.rowQty}>
						{item.item.option[0].name}{': '}{item.item.option[0].value}
					</Text>
			)
		}
	
	}
	
	renderLeft() {
			const {navigate} = this.props.navigation
			return (
					<TouchableOpacity onPress={()=>this.goBack()}>
							<Ionicons name={'ios-arrow-dropleft-circle'} size={30} color={'yellow'} style={{paddingTop: 0}} />
					</TouchableOpacity>
			);
	}
	
	renderCenter() {
			return <Image source={require('../../images/dirtpit-logo-181x43.png')} />
	}
	
  render() {
	const {navigate} = this.props.navigation
//   var rmTotal=this.state.cartTotal.toFixed(2)
 const grandTotal = []
//  var list = this.state.newCart.filter(item => item.products)
	if (this.state.newCart.length >0){
    return (
    
      <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
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

         <View style={{flex:1, width: width}}>
							<NavigationEvents
                onDidFocus={() => this.getCartItems()}
              />
					<FlatList
						data={this.state.newCart}
						contentContainerStyle={{ flexGrow: 1 }}
						ItemSeparatorComponent = { this.FlatListItemSeparator }
						keyExtractor={item=>item.cart_id}
						renderItem={item => (
// 							if ({item.item.top} == 1){
									<TouchableOpacity
											onPress={() =>
													console.log(item.item.name)
											}
											style={styles.rowWrap}>
											<Image
													source={{uri: item.item.thumb}}
													style={styles.rowIcon}
											/>
											<View style={styles.rowTextContent}>
													<Text allowFontScaling={false} style={styles.rowMessage}>
														{item.item.name}{' '}
													</Text>
													<Text allowFontScaling={false} style={styles.rowQty}>
														Quantity: {item.item.quantity}{' '}
													</Text>
													{this.renderOptions(item)}
													<Text allowFontScaling={false} style={styles.rowTime}>
														{item.item.total}{' '}
													</Text>
											</View>

									</TouchableOpacity>							

							)}
					/>
						<View style={styles.footerBar}>
							{this.state.cartTotal.map((item)=>{
								return(
									<View style={{flex:1, width: width, height:40,  flexDirection:'row',justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#a0a0a0', borderColor: 'black'}} >
										<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', color: 'black'}}>{item.title}: {item.text}</Text>
									</View>
								)
							})}
							<View style={{ width: width, height:50, flexDirection:'row',justifyContent: 'space-around', alignItems: 'center',}} >
								<TouchableOpacity 
									onPress={()=>navigate('Checkout')} >
																<View style={{flex:1, width: width,  flexDirection:'row',justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'yellow', borderWidth: 2, borderColor: 'black'}} >

										<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', color: 'black'}}>CHECKOUT</Text>
																</View>
								</TouchableOpacity>
							</View>
						</View>

         </View>

      </View>
    )}else{
			return (
				<View style={{flex:1,alignItems: 'center'}}>
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
						<NavigationEvents
							onDidFocus={() => this.getCartItems()}
						/>

						<View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
							<Text style={{alignSelf: 'center', paddingLeft: 10, paddingRight: 10, paddingBottom: 30, fontSize: 16, fontFamily: 'Gotham-Bold'}}>Your cart is empty. Add some products before you can see it here.</Text>
							<Image source={require('../../images/empty-cart.png')} style={{width: 200, height:200}}/>
						</View>
    		</View>
    )}
  }

  onChangeQuan(i,type)
  {
    const dataCar = this.state.dataCart
    let cantd = dataCar[i].quantity;

    if (type) {
     cantd = cantd + 1
     dataCar[i].quantity = cantd
     this.setState({dataCart:dataCar})
    }
    else if (type==false&&cantd>=2){
     cantd = cantd - 1
     dataCar[i].quantity = cantd
     this.setState({dataCart:dataCar})
    }
    else if (type==false&&cantd==1){
     dataCar.splice(i,1)
     this.setState({dataCart:dataCar})
    }
	 AsyncStorage.setItem('cart',JSON.stringify(dataCar));
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
        height: 105,
        backgroundColor: '#ffffff',
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    rowIcon: {
        width: 100,
        height: 100,
        marginLeft: 10,
    },
    rowTextContent: {
        alignSelf: 'stretch',
        height: 100,
        marginLeft: 10,
        justifyContent: 'center',
        flex: 1,
    },
    rowMessage: {
        color: '#3f3f3f',
        fontSize: 16,
    },
    rowQty: {
        color: 'black',
        fontSize: 15,
    },
    rowTime: {
        color: '#a0abba',
        fontSize: 15,
    },
		footerBar: {
			left: 0,
			bottom: 0,
			height: Platform.OS == 'ios' ? 70 : 120,
			flexDirection: 'column',
		},
});