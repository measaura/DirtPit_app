import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    TextInput,
    ScrollView,
    Alert,
		Dimensions,
    ActivityIndicator
} from "react-native";
import { Header } from "react-native-elements";
import Ionicons from 'react-native-vector-icons/Ionicons'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from "moment";
import MomentTimezone from "moment-timezone";
import * as RNLocalize from 'react-native-localize'
import AwesomeAlert from 'react-native-awesome-alerts'
import DeviceInfo from 'react-native-device-info'
var notch = DeviceInfo.hasNotch()

var timeZone = RNLocalize.getTimeZone()

const {width, height} = Dimensions.get('window')

export default class SeerviceListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceType: this.props.navigation.state.params.serviceType,
            serviceId: this.props.navigation.state.params.serviceId,
            serviceName: this.props.navigation.state.params.serviceName,
            serviceDesc: this.props.navigation.state.params.serviceDesc,
            serviceImg: this.props.navigation.state.params.serviceImg,
            showAlert: false,
            alertMessage: '',
            timeslotfield:'',
            statefield: '',
            zonedone: false,
            countrybefore: '',
            countryoption: [],
            submitBtn: true,
            isDatePickerVisible: false,
            isTimePickerVisible: false,
            selectedDateStar: 'Select Date',
            selectedTimeStar: 'Select Time',
        };
//     	this.testFetch()
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
//         var todayDate = MomentTimezone.tz(date, Moment.tz.guess()).format();
        var todayDate = MomentTimezone.tz(date, timeZone).format();
        var today = Moment(todayDate)
            .add(1, "minutes")
            .format("DD-MM-YYYY");
//         this.setState({
//             startDate: today,
//             endDate: today
//         });
        console.log('Date picked', today)
        // console.log(this.state.startDate);
        // console.log(this.state.endDate);
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
	
		validateEmail = email => {
			var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
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

		testFetch(){
				var myHeaders = new Headers();
				myHeaders.append("Cookie", "language=en-gb;");

				var formdata = new FormData();

				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					body: formdata,
					redirect: 'follow'
				};
				console.log('type',this.state.serviceType)
				fetch("https://ftwventures.com.my/index.php?route=api/booking/service&garage="+this.state.serviceType)
					.then(response => response.text())
					.then(result =>{
						console.log(result)
						if (result.success) {
							console.log(result.success)
							
						}
					})
					.catch(error => console.log('error in testFetch', error));
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
				fetch("https://ftwventures.com.my/index.php?route=api/booking/bookslot", requestOptions)
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
//         return fetch("https://ftwventures.com.my/index.php?route=api/country/countries", {
			fetch('https://ftwventures.com.my/index.php?route=api/booking/timeslot/timeslots')
			.then(response => response.json())
			.then(json => {
			console.log('json',json)
				const countrytemp = json.map(
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
    
		renderZone() {
		console.log('countryfield',this.state.countryfield)

		let country_id = this.state.countryfield
		if ((country_id != this.state.countrybefore) && !this.state.zonedone){
				fetch('https://ftwventures.com.my/index.php?route=api/country/country&country_id='+this.state.countryfield)
				.then(response => response.json())
				.then(json => {
					console.log(json.zone)
					const zonetemp = json.zone.map(
						(item) => ({
								label: item.name,
								value: item.zone_id
						})
					)
console.log('zone',zonetemp.length)

					this.setState({
						stateoption: zonetemp,
						zonedone: true 
					})
				})
			}
			
			if (this.state.stateoption.length > 0 && this.state.zonedone){
							return(<DropDownPicker
												ref="statefieldRef"
												items={this.state.stateoption}
												defaultValue={this.state.statefield}
												placeholder="Select Region / State"
												containerStyle={{height:50, width: 300, marginTop: 10, }}
												style={{backgroundColor:'#cdcdcd',borderTopLeftRadius: 25, borderTopRightRadius: 25, borderBottomLeftRadius: 25, borderBottomRightRadius: 25}}
												dropDownStyle={{backgroundColor: '#fff'}}
												labelStyle={{
														fontFamily: 'Gotham-Bold',
														fontSize: 18,
														textAlign: 'left',
														color: 'dark-grey'
												}}
												onChangeItem={item => this.setState({
														statefield: item.value,
														submitBtn: false
												})}
										/>
							)
							this.setState({countrybefore: country_id})
			}
		}
		
    componentDidMount(){

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

    	this.getTimeslot()
    }
    

    
	renderLeft() {
			const {navigate} = this.props.navigation
			return (
					<TouchableOpacity onPress={() =>  this.props.navigation.goBack()}>
							<Ionicons name={'ios-arrow-back'} size={35} color={'yellow'} style={{paddingTop: 0}} />
					</TouchableOpacity>
			);
	}
	
	renderCenter() {
			return <Image source={require('../../images/dirtpit-logo-181x43.png')} />
	}

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <DateTimePicker
                    mode={"date"}
                    date={new Date(this.state.todayDate)}
                    isVisible={this.state.isDatePickerVisible}
                    display={Platform.OS === 'ios' ? 'inline' : 'spinner'}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDatePicker}
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
												Platform.OS == 'ios' ? (notch ? -10 : 0) : 0,
										height: Platform.OS == 'ios' ? (notch ? 90 : 95) : 70,
								}}
						/>
                <ScrollView
                    style={styles.scrollStyle}
                    contentContainerStyle={styles.scrollContent}
                >


											<Image
													source={{uri: this.state.serviceImg}}
													style={{width: width, height: 200, resizeMode: 'stretch'}}
											/>
                    	<View style={{backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 10}}>
												<Text style={{alignSelf: 'center', fontFamily:'Gotham-Bold', fontSize: 20}}>{this.state.serviceName}</Text>
												<Text style={{alignSelf: 'center', fontFamily:'Gotham-Bold', fontSize: 16, marginLeft: 10, marginRight: 10}}>{this.state.serviceDesc}</Text>
											</View>

										
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
												placeholder="Select Time Slot"
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
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa"
    },
    backButton: {
        width: 25,
        height: 25,
        marginTop: Platform.OS == "ios" ? 30 : 0,
        top: 20,
        left: 15,
        position: "absolute"
    },
    backImg: {
        width: 22,
        height: 22
    },
    scrollStyle: {
        alignSelf: "stretch"
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: "center"
    },
    headerLogo: {
        marginTop: Platform.OS == "ios" ? 150 : 20,
        marginRight: 30,
        marginLeft: 30,
        marginBottom: 0,
        alignSelf: "center",
        height: 48,
        width: 300,
    },
    headerImg: {
        flex: 1,
        width: null,
        height: null
    },
    wrapField: {
        height: 50,
        borderRadius: 25,
        flexDirection: "row",
        alignSelf: "stretch",
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
        alignItems: "center",
        elevation: 1
    },
    fieldIco: {
        width: 20,
        height: 20,
        marginLeft: 20
    },
    inputStyles: {
        flex: 2,
        fontFamily: "Gotham-Bold",
        fontSize: 17,
        color: "black",
        paddingLeft: 15,
        paddingRight: 15
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
    doesntText: {
        marginTop: 30,
        fontFamily: "Gotham-Light",
        fontSize: 16,
        color: "#a0abba"
    },
    signUpButton: {
        marginTop: 4,
        marginBottom: 40,
        fontFamily: "Gotham-Bold",
        fontSize: 16,
        color: "#a0abba"
    },
    floatingView: {
        marginLeft: 30,
        marginRight: 30,
        height: 50,
        borderRadius: 25,
        backgroundColor: "yellow",
        justifyContent: "center",
        alignItems: "center"
    },
    changeDateContent: {
        marginTop: 2,
        fontSize: 19,
        fontFamily: "Gotham-Bold",
        marginBottom: 5
    },
});