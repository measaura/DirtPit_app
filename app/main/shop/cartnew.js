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
  Alert,
  Animated,
  Easing,
} from 'react-native';
import {Colors} from '../../NewAppScreen';
import { Header } from "react-native-elements";
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-community/async-storage'
import NumberFormat from 'react-number-format'
import { NavigationEvents } from 'react-navigation'
import API from "../../helper/APIController";
import DeviceInfo from 'react-native-device-info'
import { isTemplateMiddle } from 'typescript';
var iPhoneX = DeviceInfo.hasNotch()

const {width, height} = Dimensions.get('window')

const randomHexColor = () => {
  return '#000000'.replace(/0/g, function() {
    return (~~(Math.random() * 16)).toString(16);
  });
};

export default class CartNewScreen extends Component {
  constructor(props) {
     super(props);
     this.spinValue = new Animated.Value(0);
     this.state = {
       dataCart:[],
       newCart:[],
       cartTotal:[],
       email:'',
       password:'',
       isLoading: true,
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
    console.log('relogin '+this.state.my);
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
          this.getCartItems()
		})
    return true;
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
		
		const dataForm = new FormData();
		AsyncStorage.getItem("tokenKey", (err, value) => {
				if (!err && value != null) {
          this.setState({ tokenKey: value });
					console.log('tokenKey', value)
          dataForm.append("access_token", value)
          console.log('dataForm',dataForm);
          API.userDetail(dataForm).then(response => {
            // 			data = response;
            // 			this.setState({
            // 					fetchedName: data.firstname+' '+data.lastname,
            // 					fetchedEmail: data.email,
            // 					fetchedPhone: data.telephone
            // 			});
            console.info('response:',response);
            if (response.customer_id === null) {
              this.reLogin()
            }
            
            console.log('checkLogin userDetail',response.customer_id)
          });
				} else {
				}
		});

    return true;
	}
	
	getCartItems() {
    console.log('cartnew getCartItem');
		// this.checkLogin();
    console.warn('lepas checkLogin dalam getCartItems')
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    				let mySession = AsyncStorage.getItem('tokenKey');
				var myHeaders = new Headers();
    				// myHeaders.append("Cookie", "language=en-gb;");
    				// myHeaders.append("Cookie", "default="+mySession+";");
    // 				myHeaders.append("Cookie", "language=en-gb; currency=MYR; PHPSESSID=473df23cb16c59c23d61cf2254bc32e0; default=ab3122bd90780f42debb797e1de4449a");
    // 				console.log(AsyncStorage.getItem('tokenKey'))
    // 				console.log(myHeaders)

				var requestOptions = {
					method: 'POST',
					// headers: myHeaders,
					redirect: 'follow'
				};

				fetch("https://ftwventures.com.my/index.php?route=api/showcart", requestOptions)
					.then(response =>response.json())
					.then(result =>{
            // console.log('ewcart getcartitem', result)
						this.setState({
              asyncCart: result[0].products,
							// newCart: result[0].products,
							cartTotal: result[0].totals,
              isLoading: false,
						})
					console.log('fetch showcart',result[0].products)
					})
					.catch(error => console.log('error', error));
					
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
    AsyncStorage.getItem('cart').then((cart)=>{
      if (cart !== null) {
        // We have data!!
    //         console.log('cart not null', cart)
        const shopcart = JSON.parse(cart)
        console.info('shopcart',shopcart[0].products)
        this.setState({dataCart:shopcart})


    //         AsyncStorage.getItem('cart').then((res) => console.log(res))
      }
    }) 
    .catch((err)=>{
      alert(err)
    })
  }

  componentDidMount() {
		// this.getCartItems()
  	this.spin()
		// this.checkLogin();
    // console.warn('componentDidMount');
    AsyncStorage.getItem('cart', (err,value) => {
      if(!err && value != null){
        const asCart = JSON.parse(value)
        // console.log('cart', asCart[0].products)
        this.setState({
          isLoading: false,
          asyncCart: asCart[0].products,
        })
      }
    });
		AsyncStorage.getItem("tokenKey", (err, value) => {
				if (!err && value != null) {
          // console.log('tokenKey: '+value);
						this.setState({ tokenKey: value });
				} else {
				}
		});
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

				fetch("https://ftwventures.com.my/index.php?route=api/showcart", requestOptions)
					.then(response =>response.json())
					.then(result =>{

						this.setState({
							newCart: result[0].products,
							cartTotal: result[0].totals,
						})
					// console.log(result[0].products)
					})
					.catch(error => console.log('error', error));
					
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
  }
  
  goBack() {
    const {  navigation, route  } = this.props;
    navigation.goBack()
  //     navigation.state.params.updateCount({itemCount:4});
  }
  
  saveCart(item) {
    const {  navigation, route  } = this.props;
    
    console.log('saveCart items', item)
    navigation.navigate('Checkout')
  }

  editCart(cart_id, quantity){
    console.log('cart_id',cart_id)
    console.log('quantity',quantity)
    var dataForm = new FormData();
    if(quantity==0){
      func="remove";
      dataForm.append("key", cart_id);
    }else{
      func="edit";
      dataForm.append("key", cart_id);
      dataForm.append("quantity", quantity);
    }
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
			
      var myHeaders = new Headers();
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: dataForm
      };

      fetch("https://ftwventures.com.my/index.php?route=api/usercart/"+func, requestOptions)
        .then(response =>response.json())
        .then(result =>{

          // this.setState({
          //   newCart: result[0].products,
          //   cartTotal: result[0].totals,
          // })
        console.log(result)
        })
        .catch(error => console.log('error', error));
            
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
  }

  renderOptions(item) {
    // console.log('options' ,item.item)
  	if (item.item.option.length > 0) {
  	// console.log(item.item.option[0].name)
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
							<Ionicons name={'ios-arrow-back-circle'} size={30} color={'yellow'} style={{paddingTop: 0}} />
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
 const grandQtyTotal = []
//  var qtyTotal = 0
  //  var list = this.state.newCart.filter(item => item.products)
    if(!this.state.isLoading){
      if (this.state.asyncCart.length >0){
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
                      height: Platform.OS == 'ios' ? (iPhoneX ? 90 : 95) : 70,
                  }}
              />

            <View style={{flex:1, width: width}}>
                  <NavigationEvents
                    onDidFocus={() => this.getCartItems()}
                  />
              <FlatList
                data={this.state.asyncCart}
                contentContainerStyle={{ flexGrow: 1 }}
                ItemSeparatorComponent = { this.FlatListItemSeparator }
                keyExtractor={(item,index)=>item.cart_id}
                renderItem={(item, index) => {
                    var price = Number(item.item.price.replace(/^RM|,/g,""))*Number(item.item.quantity);
                    // console.log('price '+Number(item.item.price.replace(/^RM|,/g,"")))
                    var itemprice = price;
                    const total = {
                      prodTot: itemprice,
                    }

                    grandTotal.push(total)
                    // console.log('graTotal '+JSON.stringify(grandTotal))
                    const productsTotal = grandTotal.reduce((total, meal) => total + Number(meal.prodTot), 0)
                    // console.log('total '+productsTotal); // 45 calories
                    rmTotal = productsTotal.toFixed(2);
                    // console.log('rmTotal: '+rmTotal.replace(/\B(?=(\d{3})+(?!\d))/g, ","));

                    // AsyncStorage.setItem('totalQty',qtyTotal)
                    return (
                      <View
                          style={styles.rowWrap}>
                          <Image
                              source={{uri: item.item.thumb}}
                              style={styles.rowIcon}
                          />
                          <View style={styles.rowTextContent}>
                              <Text allowFontScaling={false} style={styles.rowMessage}>
                                {item.item.name}{' '}
                              </Text>

                         <View style={{flexDirection:'row'}}>
                              <Text allowFontScaling={false} style={{ fontSize:15, color:'black',textAlignVertical:'center'}}>
                                Quantity: {' '}
                              </Text>
                           <TouchableOpacity onPress={()=>this.onChangeQuan(item.index,false)}>
                             <Ionicons name="ios-remove-circle-outline" size={20} color={"#33c37d"} />
                           </TouchableOpacity>
                           <Text style={{paddingHorizontal:6,fontSize:16}}>{item.item.quantity}</Text>
                           <TouchableOpacity onPress={()=>this.onChangeQuan(item.index,true)}>
                             <Ionicons name="ios-add-circle-outline" size={20} color={"#33c37d"} />
                           </TouchableOpacity>
                         </View>

                              {this.renderOptions(item)}
                              <Text allowFontScaling={false} style={styles.rowTime}>
                                RM{itemprice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{' '}
                              </Text>
                          </View>

                      </View>							

                  )}}
              />
                <View style={styles.footerBar}>
                  {this.state.asyncCart.map((item)=>{
                    // console.log('syncCart', this.state.asyncCart.length)
                    var itemcount = Number(item.quantity);
                    // console.log('itemcout',itemcount)
                    const qtyCount = {qtyTot: itemcount,}
                    grandQtyTotal.push(qtyCount)
                    // console.log('grandQtyTotal',JSON.stringify(grandQtyTotal))
                    const qtyTotal = grandQtyTotal.reduce((qtotal, basket) => qtotal + Number(basket.qtyTot), 0)
                    // console.log('qtyTotal '+qtyTotal);
                    if(grandQtyTotal.length == this.state.asyncCart.length){return(
                      <View>
                        <View key={item.title} style={{flex:1, width: width+3, height:40,  flexDirection:'row', alignItems: 'center', justifyContent: 'flex-end', marginBottom:-1, marginLeft:-1, borderWidth:1, borderColor: 'black'}} >
                          <Text allowFontScaling={false} style={{fontFamily: 'Gotham-Medium', color: 'black', justifyContent: 'flex-start', paddingRight: 10}}>{item.title}: </Text>
                          <Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', color: 'black', justifyContent: 'flex-end', paddingRight: 10}}>{item.text}</Text>
                        </View>
                        <View style={{ width: width, height:50, flexDirection:'row',justifyContent: 'space-around', alignItems: 'center',bottom:0,}} >
                          <TouchableOpacity 
                            onPress={()=>this.saveCart(item)} >
                              <View style={{flex:1, width: width+5, marginLeft:1,  flexDirection:'row',justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'yellow', borderWidth: 2, borderColor: 'black'}} >
                                <Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold',fontSize: 18, color: 'black'}}>CHECKOUT ({qtyTotal})</Text>
                              </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  })}
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
                        height: Platform.OS == 'ios' ? (iPhoneX ? 90 : 95) : 70,
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
    } else {
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
    const dataCar = this.state.asyncCart
    // console.log('i',i)
    let cantd = Number(dataCar[i].quantity);

    if (type) {
     cantd = cantd + 1
     dataCar[i].quantity = cantd
     this.setState({dataCart:dataCar})
     this.editCart(dataCar[i].cart_id,cantd)
    }
    else if (type==false&&cantd>=2){
     cantd = cantd - 1
     dataCar[i].quantity = cantd
     this.setState({dataCart:dataCar})
     this.editCart(dataCar[i].cart_id,cantd)
    }
    else if (type==false&&cantd==1){
      return Alert.alert(
        "Confirm",
        "Are you sure you want to remove this item from your cart?",
        [
          // The "Yes" button
          {
            text: "Yes",
            onPress: () => {
              cantd = 0
              this.editCart(dataCar[i].cart_id,cantd)
              dataCar.splice(i,1)
              this.setState({dataCart:dataCar})
            },
          },
          // The "No" button
          // Does nothing but dismiss the dialog when tapped
          {
            text: "No",
          },
        ]
      );
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
			height: Platform.OS == 'ios' ? iPhoneX ? 100:50 : 120,
			flexDirection: 'column',
      backgroundColor: 'green',
		},
});