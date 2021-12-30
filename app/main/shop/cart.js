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
						console.log('getCartItems',JSON.stringify(result))
						console.log('stock error',result.error? true:false)
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
    navigation.goBack()
//     navigation.state.params.updateCount({itemCount:4});
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

         <View style={{flex:1}}>
							<NavigationEvents
                onDidFocus={() => console.log('Refreshed')}
              />
            <View style={{backgroundColor: 'red'}}>
            	<Text style={{fontSize: 14, fontFamily: "Gotham-Bold", color:'white', marginLeft: 5, marginRight: 5,}} >Products marked with *** are not available in the desired quantity or not in stock!</Text>
            </View>
           <ScrollView>

             {

               this.state.dataCart.map((item,i)=>{
														 if (item.stock == false){
																var stockErr = '***';
														 }else{
																var stockErr = '';
														 }
               	var price = Number(item.price.replace(/^RM|,/g,""))*Number(item.quantity);
                 console.log('price '+Number(item.price.replace(/^RM|,/g,"")))
               	var itemprice = price.toFixed(2);
								const total = {
									prodTot: itemprice,
								}

								grandTotal.push(total)
								console.log('graTotal '+JSON.stringify(grandTotal))
                const productsTotal = grandTotal.reduce((total, meal) => total + Number(meal.prodTot), 0)
                console.log('total '+productsTotal); // 45 calories
                rmTotal = productsTotal.toFixed(2);
                console.log('rmTotal: '+rmTotal);
                // console.log(this.state.cartTotal);
                 return(
                   <View style={{width:width-20,margin:10,backgroundColor:'transparent', flexDirection:'row', borderBottomWidth:2, borderColor:"#cccccc", paddingBottom:10}}>
                     <Image resizeMode={"contain"} style={{width:width/3,height:width/3}} source={{uri: item.thumb}} />
                     <View style={{flex:1, backgroundColor:'transparent', padding:10, justifyContent:"space-between"}}>
                       <View>
                       		<View style={{flexDirection:'row'}}>
													 <Text style={{fontWeight:"bold", fontSize:16, fontFamily: "Gotham-Bold"}}>{item.name}</Text>
													 <Text style={{ fontSize:20, fontFamily: "Gotham-Bold", color:"red"}}> {stockErr}</Text>
                         </View>
                         <Text>Options: </Text>
                       </View>
                       <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                         <Text style={{fontWeight:'bold',color:"#33c37d",fontSize:14}}>{item.price}</Text>
                         <View style={{flexDirection:'row', alignItems:'center'}}>
                           <TouchableOpacity onPress={()=>this.onChangeQuan(i,false)}>
                             <Ionicons name="ios-remove-circle" size={30} color={"#33c37d"} />
                           </TouchableOpacity>
                           <Text style={{paddingHorizontal:8, fontWeight:'bold', fontSize:16}}>{item.quantity}</Text>
                           <TouchableOpacity onPress={()=>this.onChangeQuan(i,true)}>
                             <Ionicons name="ios-add-circle" size={30} color={"#33c37d"} />
                           </TouchableOpacity>
                         </View>
                       </View>
                     </View>
                   </View>
                 )

               })
             }

           </ScrollView>
						<View style={styles.footerBar}>
						<View style={{flex:1, width: width*0.7,  flexDirection:'row',justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white', borderColor: 'black'}} >
							<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', color: 'black'}}>TOTAL: RM{rmTotal}</Text>
						</View>
						<TouchableOpacity 
							onPress={()=>console.log('checkout')} >
							<View style={{flex:1, width: width*0.3,  flexDirection:'row',justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'yellow', borderWidth: 2, borderColor: 'black'}} >
								<Text allowFontScaling={false} style={{fontFamily: 'Gotham-Bold', color: 'black'}}>CHECKOUT</Text>
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
			height: Platform.OS == 'ios' ? 70 : 50,
			flexDirection: 'row',
			justifyContent: 'space-between',
			backgroundColor: 'green',
		},
});