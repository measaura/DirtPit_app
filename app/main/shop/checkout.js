import React, {Component} from 'react';
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
import DeviceInfo from 'react-native-device-info'
var iPhoneX = DeviceInfo.hasNotch()

const {width, height} = Dimensions.get('window')

const randomHexColor = () => {
  return '#000000'.replace(/0/g, function() {
    return (~~(Math.random() * 16)).toString(16);
  });
};

export default class CheckoutScreen extends Component {

  constructor(props) {
     super(props);
     this.spinValue = new Animated.Value(0);
     this.state = {
       dataCart:[],
       cartTotal:[],
       isLoading: true,
       shipping_addr:[],
       shipping_addr_save:[],
       payment_addr:[],
       payment_addr_save:[],
       shipping_methods: [],
       payment_methods: [],
       orders: [],
       billplz: [],
       stockErr: [],
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

  componentDidMount() {
  	this.spin()
		this.checkCartItems()
  }

	listCartItems() {
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				var myHeaders = new Headers();
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
					console.log('didmount',JSON.stringify(result[0].products))
			    this.getPaymentAddress()
					})
					.catch(error => console.log('error', error));
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
//     AsyncStorage.getItem('cart').then((cart)=>{
//       if (cart !== null) {
//         // We have data!!
//         const shopcart = JSON.parse(cart)
//         this.setState({dataCart:shopcart})
// 
// 
// //         AsyncStorage.getItem('cart').then((res) => console.log(res))
//       }
//     })
//     .catch((err)=>{
//       alert(err)
//     })

	}
	
	checkCartItems() {
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

				fetch("https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/usercart/products", requestOptions)
					.then(response =>response.json())
					.then(result =>{
						console.log('getCartItems',result)
						console.log('stock error',result.error? true:false)
						if(result.error) {
							    const {  navigation, route  } = this.props;
									navigation.navigate('Cart')
						}else{
							this.listCartItems()
						}
					})
					.catch(error => console.log('error', error));
					
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
    AsyncStorage.getItem('cart').then((cart)=>{
      if (cart !== null) {
        // We have data!!
        const shopcart = JSON.parse(cart)
        this.setState({dataCart:shopcart})


//         AsyncStorage.getItem('cart').then((res) => console.log(res))
      }
    })
    .catch((err)=>{
      alert(err)
    })
  }

	getPaymentAddress(){
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				var myHeaders = new Headers();
				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					redirect: 'follow'
				};

				fetch("https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/checkout/payment_address", requestOptions)
					.then(response =>response.json())
					.then(result =>{

						this.setState({
							payment_addr: result,
						})
					console.log('payment address',result)
					this.savePaymentAddress()
// 							console.log('save address',this.state.payment_addr.address_id);
					})
					.catch(error => console.log('error', error));
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	

	}
	
	savePaymentAddress(){
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				var myHeaders = new Headers();
				var formdata = new FormData();
				formdata.append("payment_address", "existing");
				formdata.append("address_id", this.state.payment_addr.address_id);
				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					body: formdata,
					redirect: 'follow'
				};

				fetch("https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/checkout/payment_address/save", requestOptions)
					.then(response =>response.json())
					.then(result =>{

// 						this.setState({
// 							shipping_addr: result[0].shipping_address,
// 						})
					console.log('payment save',result)
					this.getShippingAddress()
					})
					.catch(error => console.log('error', error));
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	

	}
	
	getShippingAddress(){
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				var myHeaders = new Headers();
				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					redirect: 'follow'
				};

				fetch("https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/checkout/shipping_address", requestOptions)
					.then(response =>response.json())
					.then(result =>{

						this.setState({
							shipping_addr: result,
							shipping_addr_id: result.address_id,
						})
						
					console.log('shipping',result)
					this.saveShippingAddress()
					})
					.catch(error => console.log('error', error));
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
		
	}
	
	saveShippingAddress(){
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				var myHeaders = new Headers();
				var formShip = new FormData();
				formShip.append("shipping_address", "existing");
				formShip.append("address_id", this.state.shipping_addr_id);
				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					body: formShip,
					redirect: 'follow'
				};

				fetch("https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/checkout/shipping_address/save", requestOptions)
					.then(response =>response.json())
					.then(result =>{

						this.setState({
							shipping_addr_save: result.shipping_address,
						})
					console.log('shipping save',result)
					this.getShippingMethod()
					})
					.catch(error => console.log('error', error));
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
		
	}
	
	getShippingMethod(){
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				var myHeaders = new Headers();
				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					redirect: 'follow'
				};

				fetch("https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/checkout/shipping_method", requestOptions)
					.then(response =>response.json())
					.then(result =>{

						this.setState({
							shipping_methods: result.shipping_methods,
// 							shipping: result.shipping_methods.shipping_methods[0].quote.shipping_methods[1]
						})
						let shipmet = result.shipping_methods; //JSON.stringify(result.shipping_methods)
					console.log('shipping methods', shipmet.flat.quote.flat.code)
					this.saveShippingMethod()
					})
					.catch(error => console.log('error', error));
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
		
	}
	
	saveShippingMethod(){
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				var myHeaders = new Headers();
				var formShipM = new FormData();
				formShipM.append("shipping_method", this.state.shipping_methods.flat.quote.flat.code);
				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					body: formShipM,
					redirect: 'follow'
				};

				fetch("https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/checkout/shipping_method/save", requestOptions)
					.then(response =>response.json())
					.then(result =>{

// 						this.setState({
// 							shipping_addr: result[0].shipping_address,
// 						})
					console.log('shipping method save',result)
					this.getPaymentMethod()
					})
					.catch(error => console.log('error', error));
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
		
	}
	
	getPaymentMethod(){
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				var myHeaders = new Headers();
				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					redirect: 'follow'
				};

				fetch("https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/checkout/payment_method", requestOptions)
					.then(response =>response.json())
					.then(result =>{

						this.setState({
							payment_methods: result.payment_methods,
						})
						
					console.log('payment methods',result.payment_methods)
					this.savePaymentMethod()
					})
					.catch(error => console.log('error', error));
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
		
	}
	
	savePaymentMethod(){
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				var myHeaders = new Headers();
				var formPayM = new FormData();
				formPayM.append("payment_method", this.state.payment_methods.billplz.code);
				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					body: formPayM,
					redirect: 'follow'
				};

				fetch("https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/checkout/payment_method/save", requestOptions)
					.then(response =>response.json())
					.then(result =>{

// 						this.setState({
// 							shipping_addr: result[0].shipping_address,
// 						})
					console.log('payment method save',result)
					this.confirmOrder()
					})
					.catch(error => console.log('error', error));
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
	}
	
	confirmOrder(){
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				var myHeaders = new Headers();
				var formShip = new FormData();
				formShip.append("shipping_address", "existing");
				formShip.append("address_id", this.state.shipping_addr.address_id);
				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					body: formShip,
					redirect: 'follow'
				};

				fetch("https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/checkout/confirm", requestOptions)
					.then(response =>response.json())
					.then(result =>{

						this.setState({
							orders: result,
							cartTotal: result.totals,
							isLoading: false,
						})
					console.log('confirm order',JSON.stringify(result.totals))
					})
					.catch(error => console.log('error', error));
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
	}
	
  renderOptions(item) {
  	if (item.option.length > 0) {
  	console.log(item.option[0].name)
			return(
					<Text allowFontScaling={false} style={styles.rowQty}>
						{item.option[0].name}{': '}{item.option[0].value}
					</Text>
			)
		}
	
	}
	
	makePayment(){
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				var myHeaders = new Headers();
				var formShip = new FormData();
				formShip.append("shipping_address", "existing");
				formShip.append("address_id", this.state.shipping_addr.address_id);
				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					redirect: 'follow'
				};

				fetch("https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/payment/billplz/proceed", requestOptions)
					.then(response =>response.json())
					.then(result =>{

						this.setState({
							billplz: result,
						})
					console.log('billplz',result.url)
					this.goPayment()
					})
					.catch(error => console.log('error', error));
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
	}

  goBack() {
    const {  navigation, route  } = this.props;
    navigation.goBack()
//     navigation.state.params.updateCount({itemCount:4});
  }
  
  goPayment() {
  	AsyncStorage.setItem('payment_url',this.state.billplz.url )
    const {  navigation, route  } = this.props;
    navigation.navigate('Payment')
//     navigation.state.params.updateCount({itemCount:4});
  }
  
  renderShippingAddress(){
  console.log('render shipping', this.state.shipping_addr_save)
//   var shipping = this.state.shipping_addr.filter(item => item === this.state.shipping_addr_id)
  let shipping = this.state.shipping_addr_save;
  console.log('selected shipping', shipping.address_1)
  	return(
			<View style={{height:100,  backgroundColor:'#accecd'}}>
				<ImageBackground source={require('../../images/airmail_border.png')} style={{ resizeMode: 'cover',justifyContent:'center'}}>
					<Text style={{fontFamily:'Gotham-Bold',color:"black",fontSize:10, paddingLeft:10}}>Shipping Address:</Text>
					<Text style={{fontFamily:'Gotham-Bold',color:"black",fontSize:12, paddingLeft:10, paddingTop:2}}>{shipping.firstname} {shipping.lastname}</Text>
					<Text style={{fontFamily:'Gotham-Bold',color:"black",fontSize:12, paddingLeft:10}}>{shipping.address_1}, {shipping.address_2}</Text>
					<Text style={{fontFamily:'Gotham-Bold',color:"black",fontSize:12, paddingLeft:10}}>{shipping.postcode} {shipping.city}</Text>
					<Text style={{fontFamily:'Gotham-Bold',color:"black",fontSize:12, paddingLeft:10}}>{shipping.country}</Text>
				</ImageBackground>
			</View>
  	)
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
//   var rmTotal=this.state.cartTotal.toFixed(2)
 const grandTotal = []

console.log('newCart',this.state.newCart)
if (!this.state.isLoading){
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

         <View style={{flex:1}}>
							<NavigationEvents
                onDidFocus={() => console.log('Refreshed')}
              />
          	{this.renderShippingAddress()}
           <ScrollView>

             {

               this.state.newCart.map((item,i)=>{
               	var price = Number(item.price*item.quantity);
               	var itemprice = price.toFixed(2);
								const total = {
									prodTot: itemprice,
								}

								grandTotal.push(total)
								console.log(grandTotal)
							const productsTotal = grandTotal.reduce((itemTotal, meal) => itemTotal + Number(meal.prodTot), 0)
		console.log('total '+productsTotal); // 45 calories
// 		rmTotal = productsTotal.toFixed(2)
                 return(
                   <View style={{width:width-20, height:90,backgroundColor:'transparent', flexDirection:'row', borderBottomWidth:2, borderColor:"#cccccc", paddingBottom:2}}>
                     <Image resizeMode={"contain"} style={{width: 70, height:70, marginTop:3}} source={{uri: item.thumb}} />
                     <View style={{flex:1, backgroundColor:'trangraysparent', padding:10, justifyContent:"space-between"}}>
                       <View>
                         <Text style={{fontWeight:"bold", fontSize:16, fontFamily: "Gotham-Bold"}}>{item.name}</Text>
                         {this.renderOptions(item)}
                       </View>
                       <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                         <Text style={{fontWeight:'bold',color:"#33c37d",fontSize:14}}>{item.total}</Text>
                         <View style={{flexDirection:'row', alignItems:'center'}}>
                           <Text style={{paddingHorizontal:8, fontWeight:'bold', fontSize:16}}>x {item.quantity}</Text>
                         </View>
                       </View>
                     </View>
                   </View>
                 )

		this.setState({cartTotal:productsTotal})
               })

             }

           </ScrollView>
						<View style={styles.footerBar}>
							{this.state.cartTotal.map((item)=>{
								return(
									<View style={{flex:1, width: width+3, height:40,  flexDirection:'row', alignItems: 'center', justifyContent: 'flex-end', marginBottom:-1, marginLeft:-1, borderWidth:1, borderColor: 'black'}} >
										<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Medium', color: 'black', alignItems: 'center',justifyContent: 'flex-end', paddingRight: 10}}>{item.title}: </Text>
										<View style={{width:width*0.25,flexDirection:'row', alignItems: 'center', justifyContent: 'flex-end',}}>										
											<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', color: 'black', alignItems: 'center',justifyContent: 'flex-end', paddingRight: 10, }}>{item.text}</Text>
										</View>
									</View>
								)
							})}
							<View style={{ width: width, height:50, flexDirection:'row',justifyContent: 'space-around', alignItems: 'center',}} >
								<TouchableOpacity 
									onPress={()=>this.makePayment()} >
																<View style={{flex:1, width: width,  flexDirection:'row',justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'yellow',width:width+4, borderWidth: 2, borderColor: 'black'}} >

										<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', color: 'black'}}>PROCEED</Text>
																</View>
								</TouchableOpacity>
							</View>
						</View>

         </View>

      </View>
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
        height: '25%',
        backgroundColor: '#ffffff',
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    rowIcon: {
        width: 100,
        height: 100,
        marginLeft: 20,
    },
    rowBg: {
        flexGrow:1, 
        width: width,
        paddingBottom: 15,
    },
    rowTextContent: {
        alignSelf: 'stretch',
        flex:1,
        justifyContent: 'flex-end',
    },
    rowMessage: {
        color: '#ffffff',
        fontFamily: 'Gotham-Bold',
        fontSize: 18,
        paddingLeft: 25,
        paddingTop: 40,
        paddingBottom: 40,
        width: width*0.8,
    },
    rowTime: {
        color: '#fff',
        fontSize: 13,
        paddingLeft: 25,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
		footerBar: {
			left: 0,
			bottom: 0,
			height: Platform.OS == 'ios' ? 120 : 150,
			flexDirection: 'column',
		},
});