import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    Alert,
    ActivityIndicator
} from "react-native";
import { Header } from "react-native-elements";
import Ionicons from 'react-native-vector-icons/Ionicons'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from "moment";
import MomentTimezone from "moment-timezone";
import * as RNLocalize from 'react-native-localize'
import DeviceInfo from 'react-native-device-info'
var notch = DeviceInfo.hasNotch()

var timeZone = RNLocalize.getTimeZone()

export default class GarageScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstnamefield: "",
            lastnamefield: "",
            emailfield: "",
            phonefield: "",
            passwordfield: "",
            copasswordfield: "",
            companyfield: "",
            address1field:"",
            address2field: "",
            cityfield: "",
            postcodefield: "",
            countryoption:[],
            countrytemp: [],
            stateoption: [],
            statetemp: [],
            countryfield:'',
            statefield: '',
            zonedone: false,
            countrybefore: '',
            submitBtn: true,
            isDateTimePickerVisible: false,
            selectedDateStar: 'Select Date',
        };
    }

    _showDateTimePicker = () =>
        this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () =>
        this.setState({ isDateTimePickerVisible: false });

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
                isDateTimePickerVisible: false
            },
        );
//         this._hideDateTimePicker();
    };

		validateEmail = email => {
			var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		};

    filterField() {
        let passedFirstname = this.state.firstnamefield;
        let passedLastname = this.state.lastnamefield;
        let passedEmail = this.state.emailfield;
        let passedPhone = this.state.phonefield;
        let passedPassword = this.state.passwordfield;
        let passedCoPassword = this.state.copasswordfield;
        let passedAddress1 = this.state.address1field;
        let passedCity = this.state.cityfield;
        let passedCountry = this.state.countryfield;
        let passedState = this.state.statefield;

console.log('zonedone',this.state.zonedone)
        if (passedFirstname == "") {
            Alert.alert("Please enter your first name.");
            this.refs.firstnamefieldRef.focus();
        } else if (passedLastname == "") {
            Alert.alert("Please enter your last name.");
            this.refs.lastnamefieldRef.focus();
        } else if (passedEmail == "") {
            Alert.alert("Please enter your email.");
            this.refs.emailfieldRef.focus();
        } else if (!this.validateEmail(passedEmail)) {
						Alert.alert("Please enter a valid email address")
				}else if (passedPhone == "") {
            Alert.alert("Please enter your phone number.");
            this.refs.phonefieldRef.focus();
        } else if (passedPassword == "") {
            Alert.alert("Please enter your password.");
            this.refs.passwordfieldRef.focus();
        } else if (passedCoPassword == "") {
            Alert.alert("Please confirm your password.");
            this.refs.copasswordfieldRef.focus();
        } else if (passedPassword != passedCoPassword) {
            Alert.alert("Password entered does not match!");
        } else if (passedPassword.length < 4 || passedPassword.length >20) {
            Alert.alert("Password must be between 4 and 20 characters!");
            this.refs.passwordfieldRef.focus();
        } else if (passedAddress1 == "") {
            Alert.alert("Please enter your address.");
            this.refs.address1fieldRef.focus();
        } else if (passedAddress1.length < 3 || passedAddress1.length >128) {
            Alert.alert("Address 1 must be between 3 and 128 characters!");
            this.refs.address1fieldRef.focus();
        } else if (passedCity == "") {
            Alert.alert("Please enter your city.");
            this.refs.cityfieldRef.focus();
        } else if (passedCity.length < 2 || passedCity.length >128) {
            Alert.alert("City must be between 2 and 128 characters!");
            this.refs.cityfieldRef.focus();
        } else if (passedCountry == "") {
            Alert.alert("Please select your country.");
        } else if ((this.state.stateoption.length > 0) && passedState == "") {
            Alert.alert("Please select your state.");
        } else {
        		this.validateEmail(passedEmail);
            this.validate();
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
				fetch("https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/userregister", requestOptions)
					.then(response => response.text())
					.then(result =>{
						console.log(result)
						if (result.success) {
							console.log(result.success)
							
						}
					})
					.catch(error => console.log('error', error));

    }
    
    getCountries = () => {
//         return fetch("https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/country/countries", {
			fetch('https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/country/countries')
			.then(response => response.json())
			.then(json => {
				const countrytemp = json.map(
					(item) => ({
							label: item.name,
							value: item.country_id
					})
				)
// 				console.log(countrytemp)
				this.setState({
					countryoption: countrytemp 
				})
			})
    }
    
		renderZone() {
		console.log('countryfield',this.state.countryfield)

		let country_id = this.state.countryfield
		if ((country_id != this.state.countrybefore) && !this.state.zonedone){
				fetch('https://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/country/country&country_id='+this.state.countryfield)
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
												dropDownStyle={{backgroundColor: '#cdcdcd'}}
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

    	this.getCountries()
    }
    

    
	renderLeft() {
			const {navigate} = this.props.navigation
			return (
					<TouchableOpacity onPress={() => navigate('Login')}>
							<Ionicons name={'ios-arrow-back'} size={35} color={'yellow'} style={{paddingTop: 0}} />
					</TouchableOpacity>
			);
	}
	
	renderCenter() {
			return <Image source={require('../images/dirtpit-logo-181x43.png')} />
	}

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <DateTimePicker
                    mode={"date"}
										date={new Date(this.state.todayDate)}
                    isVisible={this.state.isDateTimePickerVisible}
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
												Platform.OS == 'ios' ? (notch ? -10 : 0) : 0,
										height: Platform.OS == 'ios' ? (notch ? 90 : 0) : 70,
								}}
						/>
                <ScrollView
                    style={styles.scrollStyle}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.headerLogo}>
											<Text style={{alignSelf: 'center', fontFamily:'Gotham-Bold', fontSize: 20}}>Service Booking</Text>
                    </View>	
											<TouchableOpacity
													onPress={this._showDateTimePicker}
													style={styles.signInBut}
											>
													<Text style={styles.changeDateContent}>
															{this.state.selectedDateStar}
													</Text>
											</TouchableOpacity>
										<DropDownPicker
												ref="countryfieldRef"
												items={this.state.countryoption}
												defaultValue={this.state.countryfield}
												placeholder="Select Country"
												containerStyle={{height:50, width: 300, marginTop: 10, }}
												style={{backgroundColor:'#cdcdcd',borderTopLeftRadius: 25, borderTopRightRadius: 25, borderBottomLeftRadius: 25, borderBottomRightRadius: 25}}
												dropDownStyle={{backgroundColor: '#cdcdcd'}}
												labelStyle={{
														fontFamily: 'Gotham-Bold',
														fontSize: 18,
														textAlign: 'left',
														color: 'dark-grey'
												}}
												onChangeItem={item => this.setState({
														countryfield: item.value,
														zonedone: false
												})}
										/>
										
										{this.renderZone()}

                    <TouchableOpacity
                    		disabled={this.state.submitBtn}
                        style={styles.signInBut}
                        onPress={this.filterField.bind(this)}
                    >
                        <Text style={styles.signInText}>REGISTER</Text>
                    </TouchableOpacity>
                    <Text style={styles.doesntText}>
                        By clicking REGISTER, I agree to the
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigate("", { screen: "" })}
                    >
                        <Text style={styles.signUpButton}>
                            Terms and Conditions
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
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
    signInBut: {
        marginTop: 30,
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