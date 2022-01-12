import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
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

export default class CartScreen extends Component {

  constructor(props) {
     super(props);
     this.state = {
       dataCart:[],
       cartTotal:0,
       showCart:[],
       stockCheck:[],
     };
  }
	
	checkCartItems() {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        console.log('Cart checkCartItems')
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
    
            fetch("https://ftwventures.com.my/index.php?route=api/usercart/products", requestOptions)
              .then(response =>response.json())
              .then(result =>{
                console.log('Cart checkCartItems',result)
                console.log('Cart check stock error',result.error? true:false)
                if(result.error) {
                  return Alert.alert(
                    "Stock Error",
                    "Please chek your cart for low / empty stock items"
                  );
                }else{
                  console.log('No error. Navigate to Checkout')
                  const {  navigation, route  } = this.props;  
                  // navigation.navigate('CartNew');
                  navigation.navigate('Checkout');
                }
              })
              .catch(error => console.log('error', error));
              
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
      }

	getCartItems() {
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

				fetch("https://ftwventures.com.my/index.php?route=api/usercart/products", requestOptions)
					.then(response =>response.json())
					.then(result =>{
						console.log('Cart getCartItems',JSON.stringify(result))
						console.log('Cart stock error',result.error? true:false)
// 						if(result.error) {
// 							    const {  navigation, route  } = this.props;
// 									navigation.navigate('Cart')
// 						}
						this.setState({
							dataCart: result.products,
							// cartTotal: result.totals
						})
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
  
  componentDidMount() {
  	this.getCartItems() 

  }


  
  goBack() {
    const {  navigation, route  } = this.props;
    navigation.navigate('CartNew')
//     navigation.state.params.updateCount({itemCount:4});
  }
  
  saveCart() {
    const {  navigation, route  } = this.props;
    
    // console.log('saveCart items', item)
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
	
  renderOptions(item) {
    // console.log('options' ,item.item)
  	if (item.option.length > 0) {
  	// console.log(item.item.option[0].name)
			return(
					<Text allowFontScaling={false} style={styles.rowQty}>
						{item.option[0].name}{': '}{item.option[0].value}
					</Text>
			)
		}
	
	}

  render() {
  var rmTotal=0
 const grandTotal = []
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
                onDidFocus={() => console.log('Refreshed')}
              />
            <View style={{backgroundColor: 'red'}}>
            	<Text style={{fontSize: 14, fontFamily: "Gotham-Bold", color:'white', marginLeft: 5, marginRight: 5,}} >
                Products with RED text are in limited quantity or not in stock!
              </Text>
            </View>
           <ScrollView>

             {

               this.state.dataCart.map((item,i)=>{
														 if (item.stock == false){
																var stockErr = true;
														 }else{
																var stockErr = false;
														 }
               	var price = Number(item.price.replace(/^RM|,/g,""))*Number(item.quantity);
                 console.log('price '+Number(item.price.replace(/^RM|,/g,"")))
               	var itemprice = price;
								const total = {
									prodTot: itemprice,
								}

								grandTotal.push(total)
								console.log('graTotal '+JSON.stringify(grandTotal))
                const productsTotal = grandTotal.reduce((total, meal) => total + Number(meal.prodTot), 0)
                console.log('total '+productsTotal); // 45 calories
                rmTotal = productsTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                console.log('rmTotal: '+rmTotal);

                return (
                  <View>
                    <View
                        style={styles.rowWrap}>
                        <Image
                            source={{uri: item.thumb}}
                            style={styles.rowIcon}
                        />
                        <View style={styles.rowTextContent}>
                            <Text allowFontScaling={false} style={[styles.rowMessage,stockErr?styles.stockErr:styles.stockGood]}>
                              {item.name}{' '}
                            </Text>

                      <View style={{flexDirection:'row'}}>
                            <Text allowFontScaling={false} style={{ fontSize:15, color:'black',textAlignVertical:'center'}}>
                              Quantity: {' '}
                            </Text>
                        <TouchableOpacity onPress={()=>this.onChangeQuan(i,false)}>
                          <Ionicons name="ios-remove-circle-outline" size={20} color={"#33c37d"} />
                        </TouchableOpacity>
                        <Text style={{paddingHorizontal:6,fontSize:16}}>{item.quantity}</Text>
                        <TouchableOpacity onPress={()=>this.onChangeQuan(i,true)}>
                          <Ionicons name="ios-add-circle-outline" size={20} color={"#33c37d"} />
                        </TouchableOpacity>
                      </View>

                            {this.renderOptions(item)}
                            <Text allowFontScaling={false} style={styles.rowTime}>
                              RM{itemprice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{' '}
                            </Text>
                        </View>

                    </View>
                    <View style={{
                      height: .5,
                      width:"100%",
                      backgroundColor:"rgba(0,0,0,0.5)",
                      }}
                    />
                  </View>

                )
               })
             }

           </ScrollView>
						<View style={styles.footerBar}>
						<View style={{flex:1, width: width*0.7,  flexDirection:'column',justifyContent: 'center', alignItems: 'flex-end', paddingRight:10, backgroundColor: 'white', borderColor: 'black'}} >
							<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', color: 'grey', fontSize: 12, paddingBottom: 5,}}>TOTAL PAYMENT</Text>
              <Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', color: 'black', fontSize:18}}>RM{rmTotal}</Text>
						</View>
						<TouchableOpacity 
							onPress={()=>this.checkCartItems()} >
							<View style={{flex:1, width: width*0.3,  flexDirection:'row',justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'yellow', borderWidth: 2, borderColor: 'black'}} >
								<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', color: 'black'}}>PLACE ORDER</Text>
							</View>
						</TouchableOpacity>
						</View>

         </View>

      </View>
    );

  }

  onChangeQuan(i,type)
  {
    const dataCar = this.state.dataCart
    let cantd = dataCar[i].quantity;

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
        fontSize: 16,
    },
    stockGood: {
        color: '#3f3f3f',
    },
    stockErr: {
        color: 'red',
    },
    rowQty: {
        color: 'black',
        fontSize: 15,
    },
    rowTime: {
        color: '#a0abba',
        fontSize: 15,
    },
    rowBg: {
        flexGrow:1, 
        width: width,
        paddingBottom: 15,
    },
		footerBar: {
			left: 0,
			bottom: 0,
			height: Platform.OS == 'ios' ? 70 : 50,
			flexDirection: 'row',
			justifyContent: 'space-between',
			backgroundColor: 'green',
		},
});