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
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from "react-native-modal-datetime-picker";
import Toast, {DURATION} from 'react-native-easy-toast'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Moment from "moment";
import MomentTimezone from "moment-timezone";
import * as RNLocalize from 'react-native-localize'
import AwesomeAlert from 'react-native-awesome-alerts'

import {showLocation} from 'react-native-map-link'
import DeviceInfo from 'react-native-device-info'
var iPhoneX = DeviceInfo.hasNotch()

const {width, height} = Dimensions.get('window')

const randomHexColor = () => {
  return '#000000'.replace(/0/g, function() {
    return (~~(Math.random() * 16)).toString(16);
  });
};

var timeZone = RNLocalize.getTimeZone()

const DATA = [
        {
            "store_id":"1",
            "image":"http://demo.shortcircuitworks.com/dirtpit23/image/catalog/app/kuantan.png",
            "parent_id":"0",
            "top":"1",
            "column":"1",
            "sort_order":"0",
            "status":"1",
            "name":"Kuantan Concept Store",
            "description":"Kuantan Concept Store",
            "meta_title":"Kuantan",
            "meta_description":"No 9, \nJalan Bukit Sekilau, \n25300 Kuantan, \nPahang",
            "meta_keyword":"",
            "latitude":"3.814205",
            "longitude":"103.325233",
        },
        {
            "store_id":"2",
            "image":"http://demo.shortcircuitworks.com/dirtpit23/image/catalog/app/johor.jpg",
            "parent_id":"0",
            "top":"1",
            "column":"1",
            "sort_order":"0",
            "status":"1",
            "name":"Johor Bahru Concept Store",
            "description":"Johor Bahru Concept Store",
            "meta_title":"Johor Bahru",
            "meta_description":"Lot L1.23 & L1.24, \nPlaza Angsana, \nJalan Skudai, \nPusat Bandar Tampoi, \n81200 Johor Bharu, \nJohor",
            "meta_keyword":"",
            "latitude":"1.495196",
            "longitude":"103.705745",
        },
        {
            "store_id":"3",
            "image":"http://demo.shortcircuitworks.com/dirtpit23/image/catalog/app/penang.jpg",
            "parent_id":"0",
            "top":"1",
            "column":"1",
            "sort_order":"0",
            "status":"1",
            "name":"Penang Concept Store",
            "description":"Penang Concept Store",
            "meta_title":"Penang",
            "meta_description":"170-01-05/06/07/08, \nPlaza Gurney, \nPersiaran Gurney, \nPulau Tikus, \n10250 George Town, \nPenang",
            "meta_keyword":"",
            "latitude":"5.437492",
            "longitude":"100.309398",
        }
];

export default class BikeTourScreen extends Component {
	constructor(props) {
		super(props);
     this.spinValue = new Animated.Value(0);
		this.state = {
			loading: true,
			dataSource: [],
			countryoption: [],
			submitBtn: true,
			isDatePickerVisible: false,
			isTimePickerVisible: false,
			selectedDateStar: 'Select Date',
			selectedTimeStar: 'Select Time',
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

    _showDatePicker = () =>
        this.setState({ isDatePickerVisible: true });

    _hideDatePicker = () =>
        this.setState({ isDatePickerVisible: false });

    _showTimePicker = () =>
        this.setState({ isTimePickerVisible: true });

    _hideTimePicker = () =>
        this.setState({ isTimePickerVisible: false });
        
    _handleDatePicked = date => {
    console.log('ok click')
//         var todayDate = MomentTimezone.tz(date, Moment.tz.guess()).format();
        var todayDate = MomentTimezone.tz(date, timeZone).format();
        var today = Moment(todayDate)
            .add(1, "minutes")
            .format("DD-MM-YYYY");
//         this.setState({
//             startDate: today,
//             endDate: today
//         });
        console.log(this.state.startDate);
        console.log(this.state.endDate);
        this.setState(
            {
                selectedDateStar: today,
                isDatePickerVisible: false
            },
        );
//         this._hideDateTimePicker();
    };
    
    _handleTimePicked = date => {
    console.log('ok click')
//         var todayDate = MomentTimezone.tz(date, Moment.tz.guess()).format();
        var todayDate = MomentTimezone.tz(date, timeZone).format();
        var today = Moment(todayDate)
            .format("hh:mm a");
//         this.setState({
//             startDate: today,
//             endDate: today
//         });
        console.log(this.state.startDate);
        console.log(this.state.endDate);
        this.setState(
            {
                selectedTimeStar: today,
                isTimePickerVisible: false
            },
        );
//         this._hideDateTimePicker();
    };

		showAlert() {
			this.setState({
				showAlert: true
			});
		};

		hideAlert() {
			const {navigate} = this.props.navigation
			this.setState({
				showAlert: false
			});
			navigate('Home')
		};

    filterField() {
        let passedSlot = this.state.timeslotfield;
        let passedDate = this.state.selectedDateStar;

			console.log('zonedone',this.state.selectedDateStar)

				if (passedDate == "Select Date") {
            Alert.alert("Please select Date.");
        } else if (passedSlot == "") {
            Alert.alert("Please select Time Slot.");
        } else {
        	this.validate()
        }
    }

    validate() {
        let passedFirstname = this.state.firstnamefield;
        let passedLastname = this.state.lastnamefield;
        let passedEmail = this.state.emailfield;
        let passedPhone = this.state.phonefield;
        let passedPassword = this.state.passwordfield;
        let passedCoPassword = this.state.copasswordfield;
        let passedAddress1 = this.state.address1field;
        let passedAddress2 = this.state.address2field;
        let passedCity = this.state.cityfield;
        let passedPostcode = this.state.postcodefield;
        let passedCountry = this.state.countryfield;
        let passedState = this.state.statefield;

				var formdata = new FormData();
				formdata.append("firstname", passedFirstname);
				formdata.append("lastname", passedLastname);
				formdata.append("email", passedEmail);
				formdata.append("telephone", passedPhone);
				formdata.append("address_1", passedAddress1);
				formdata.append("address_2", passedAddress2);
				formdata.append("city", passedCity);
				formdata.append("postcode", passedPostcode);
				formdata.append("country_id", passedCountry);
				formdata.append("zone_id", passedState);
				formdata.append("password", passedPassword);
				formdata.append("confirm", passedCoPassword);
				formdata.append("agree", true);

				var myHeaders = new Headers();
				myHeaders.append("Cookie", "language=en-gb;");

				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					body: formdata,
					redirect: 'follow'
				};
console.log('submit', formdata)
				fetch("https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/booking/bookslot", requestOptions)
					.then(response => response.json())
					.then(result =>{
						console.log(result)
						if (result.success) {
							console.log(result.success)
							this.setState({
								showAlert: true,
								alertMessage: result.success,
							})
							
						}
					})
					.catch(error => console.log('error', error));

    }
    getTimeslot = () => {
//         return fetch("https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/country/countries", {
			fetch('https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/booking/service&tour=mtb')
			.then(response => response.json())
			.then(json => {
			console.log('json',json)
				const countrytemp = json.tour.map(
					(item) => ({
							label: item.name,
							value: item.time_from
					})
				)
				console.log('countrytemp',countrytemp)
				this.setState({
					countryoption: countrytemp 
				})
			})
    }


	componentDidMount(){
		this.spin()
    console.log("componentDidMount")
  
        var dateGen = Moment.utc().format();
        var todayDate = MomentTimezone.tz(
            dateGen,
            timeZone
        ).format();

        var today = Moment(todayDate)
            .add(1, "minutes")
            .format("D-MM-YYYY");
            
        var todaySelect = Moment(todayDate)
            .add(1, "minutes")
            .format("YYYY/MM/D");
            
        this.setState({
            todayDate: todaySelect,
            startDate: today,
            endDate: today
        });

console.log("TZ: ", timeZone)
console.log("today date: ",today)  
// 
//         this.setState({
//             selectedDateStar: today
//         });
// 
//         this.setState(
//             {
//                 startDate: today,
//                 endDate: today
//             },
//         );

// 	console.log(this.state.segId)
		fetch("https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/banner&id=11")
			.then(response => response.json())
			.then((responseJson)=> {
				console.log(responseJson.banner[0])
				this.setState({
					loading: false,
					dataSource: responseJson.banner,
					popupimg: responseJson.banner[0].image
				})
			})
		.catch(error=>{console.err(error)}) //to catch the errors if any


    	this.getTimeslot()
    	
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

	renderContent() {
		this.state.dataSource.map((item) => {
				console.log(item.image)
					return (
					<View style={styles.mainContainer}>
						<ScrollView
							style={styles.scrollStyle}
						>
						<Image
								source={{uri: this.state.popupimg}}
								style={styles.imageLarge}
						/>
						<View style={{height:(height*0.15)+10}} >
							<FlatList
									style={{flex:1, flexDirection: 'row', width: width, paddingTop: 0, paddingBottom: 0, backgroundColor: "#ffffff"}}
									horizontal={true}
									data={this.state.dataSource}
									renderItem={({item,index}) => 
										<TouchableOpacity 
											onPress={()=>this.renderPopup(item,index)}>
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
							<View style={{justifyContent: 'center'}} >

								<Image 
										source={{uri: "https://demo.shortcircuitworks.com/dirtpit23/image/catalog/app/cafe/menu7.jpg"}}
										style={styles.imageMenu}
								/>
								<Image 
										source={{uri: "https://demo.shortcircuitworks.com/dirtpit23/image/catalog/app/cafe/menu8.jpg"}}
										style={styles.imageMenu}
								/>
								<Image 
										source={{uri: "https://demo.shortcircuitworks.com/dirtpit23/image/catalog/app/cafe/menu9.jpg"}}
										style={styles.imageMenu}
								/>
							</View>
					</ScrollView>						
				</View>
				)
			})
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
			return <Image source={require('../../images/DirtPit_logo-180x35.png')} />
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
			return(
				<View style={styles.container}>
					<DateTimePicker
							mode={"date"}
							date={new Date(this.state.todayDate)}
							isVisible={this.state.isDatePickerVisible}
							onConfirm={this._handleDatePicked}
							onCancel={this._hideDateTimePicker}
					/>
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
							<Image
									source={{uri: this.state.popupimg}}
									style={styles.imageLarge}
							/>

							<View style={{height:(height*0.15)}} >
								<FlatList
										style={{flex:1, flexDirection: 'row', width: width, paddingTop: 0, paddingBottom: 0, backgroundColor: "#ffffff"}}
										horizontal={true}
										data={this.state.dataSource}
										renderItem={({item,index}) => 
                    	<TouchableOpacity 
                    		onPress={()=>this.renderPopup(item,index)}>
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
																height: (height*0.15),
																width: 1,
																backgroundColor: "#fff",

																}}
														/>
												);
										}}

										keyExtractor={(item, index) => index.toString()}
								/>
							</View>
							<View style={{height:350}}>
											<Text style={{alignSelf: 'center', fontFamily:'Gotham-Bold', fontSize: 20, marginTop: 10}}>MTB Tours</Text>
											<TouchableOpacity
													onPress={this._showDatePicker}
													style={styles.optionBut}
											>
													<Text style={styles.changeDateContent}>
															{this.state.selectedDateStar}
													</Text>
											</TouchableOpacity>
										<DropDownPicker
												ref="countryfieldRef"
												items={this.state.countryoption}
												placeholder="Select Tour Package"
												containerStyle={{height:50, width: 300, marginTop: 10, alignSelf: 'center'}}
												style={{backgroundColor:'#cdcdcd',zIndex:1000,borderTopLeftRadius: 25, borderTopRightRadius: 25, borderBottomLeftRadius: 25, borderBottomRightRadius: 25}}
												dropDownStyle={{backgroundColor: '#cdcdcd'}}
												labelStyle={{
														fontFamily: 'Gotham-Bold',
														fontSize: 18,
														textAlign: 'left',
														color: 'dark-grey'
												}}
												onChangeItem={item => {this.setState({
														timeslotfield: item.value,
														zonedone: false,
														submitBtn: false
												})
												console.log(item)}
												}
										/>

                    <TouchableOpacity
                    		disabled={this.state.submitBtn}
                        style={styles.signInBut}
                        onPress={this.filterField.bind(this)}
                    >
                        <Text style={styles.signInText}>BOOK NOW</Text>
                    </TouchableOpacity>
                </View>
						</ScrollView>						
        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title="Thank you!"
          message={this.state.alertMessage}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="    OK    "
          confirmButtonColor="green"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
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
    height: height*0.15,
    width: height*0.15,
    padding: 2,
    marginTop: 5,
    borderWidth: 5,
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
    scrollStyle: {
        height: 900,
    },
    optionBut: {
        marginTop: 10,
        backgroundColor: "#cdcdcd",
        height: 50,
        borderRadius: 25,
        alignSelf: "stretch",
        marginLeft: 30,
        marginRight: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    signInBut: {
        marginTop: 20,
        backgroundColor: "yellow",
        height: 50,
        borderRadius: 25,
        alignSelf: "stretch",
        marginLeft: 30,
        marginRight: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    signInText: {
        fontSize: 16,
        fontFamily: "Gotham-Bold",
        color: "black"
    },
    changeDateContent: {
        marginTop: 2,
        fontSize: 19,
        fontFamily: "Gotham-Bold",
        marginBottom: 5
    },
});