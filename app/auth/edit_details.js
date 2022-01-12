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
    Animated,
    Easing,
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback
} from "react-native";
import { Header } from "react-native-elements";
import Ionicons from 'react-native-vector-icons/Ionicons'
import DropDownPicker from 'react-native-dropdown-picker';
import { NavigationEvents } from 'react-navigation'
import DeviceInfo from "react-native-device-info";
import AsyncStorage from '@react-native-community/async-storage'
var notch = DeviceInfo.hasNotch();

export default class EditDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0);
        this.state = {
            prevScreen: this.props.navigation.state.params.prevScreenTitle,
            firstnamefield: "",
            lastnamefield: "",
            emailfield: "",
            phonefield: "",
            passwordfield: "",
            copasswordfield: "",
            company: "",
            address_1:"",
            address_2: "",
            city: "",
            postcode: "",
            countryoption:[],
            countrytemp: [],
            stateoption: [],
            statetemp: [],
            countryfield:'',
            statefield: '',
            zonedone: false,
            countrybefore: '',
            submitBtn: false,
            isLoading: true,
            shippingAddr: [],
            fetchedFName: "",
            fetchedLName: "",
            fetchedEmail: "",
            fetchedPhone: ""
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

    validateEmail = email => {
        var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
	
	getShippingAddress(){
        console.info('EditDetails getShippingAddress')
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://ftwventures.com.my/index.php?route=api/checkout/shipping_address", requestOptions)
            .then(response =>response.json())
            .then(result =>{

                this.setState({
                    shippingAddr: [result.addresses[result.address_id]],
                    shipping_addr_id: result.address_id,
                    isLoading: false,
                })
                
                console.log('EditDetails shipping',result.addresses[result.address_id])
                // var addressVar = result.addresses
                // console.warn('addr1', result.addresses[result.address_id])
                // if(addressVar[result.address_id].address_1!=''){
                //     this.saveShippingAddress()
                // }else{
                //     console.error('No Shipping Adress')
                //     const {  navigation, route  } = this.props;
                //         navigation.navigate('EditDetails', {
                //             prevScreenTitle: 'CartNew'})
                //     this.saveShippingAddress()
                // }
            })
            .catch(error => console.log('error', error));
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
    }

    filterField() {
        console.log('in filterfield')
        let passedFirstname = this.state.fetchedFName;
        let passedLastname = this.state.fetchedLName;
        // let passedEmail = this.state.emailfield;
        let passedPhone = this.state.fetchedPhone;
        // let passedPassword = this.state.passwordfield;
        // let passedCoPassword = this.state.copasswordfield;
        let passedAddress1 = this.state.address_1;
        let passedPostcode = this.state.postcode;
        let passedCity = this.state.city;
        let passedCountry = this.state.countryfield;
        let passedState = this.state.statefield;

        // console.log('zonedone',this.state.zonedone)
        // console.log('passedAddr1 length', passedAddress1)
        if (passedFirstname == "") {
            Alert.alert("Please enter your first name.");
            this.refs.firstnamefieldRef.focus();
        } else if (passedLastname == "") {
            Alert.alert("Please enter your last name.");
            this.refs.lastnamefieldRef.focus();
        // } else if (passedEmail == "") {
        //     Alert.alert("Please enter your email.");
        //     this.refs.emailfieldRef.focus();
        // } else if (!this.validateEmail(passedEmail)) {
		// 	Alert.alert("Please enter a valid email address")
		}else if (passedPhone == "") {
            Alert.alert("Please enter your phone number.");
            this.refs.phonefieldRef.focus();
        // } else if (passedPassword == "") {
        //     Alert.alert("Please enter your password.");
        //     this.refs.passwordfieldRef.focus();
        // } else if (passedCoPassword == "") {
        //     Alert.alert("Please confirm your password.");
        //     this.refs.copasswordfieldRef.focus();
        // } else if (passedPassword != passedCoPassword) {
        //     Alert.alert("Password entered does not match!");
        // } else if (passedPassword.length < 4 || passedPassword.length >20) {
        //     Alert.alert("Password must be between 4 and 20 characters!");
        //     this.refs.passwordfieldRef.focus();
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
        } else if (passedPostcode == "") {
            Alert.alert("Please enter your postcode.");
            this.refs.postcodefieldRef.focus();
        } else if (passedPostcode.length < 5 || passedPostcode.length >5) {
            Alert.alert("Postcode must be 5 characters!");
            this.refs.postcodefieldRef.focus();
        } else if (passedCountry == "") {
            Alert.alert("Please select your country.");
        } else if ((this.state.stateoption.length > 0) && passedState == "") {
            Alert.alert("Please select your state.");
        } else {
            console.log('passed filter')
        	// this.validateEmail(passedEmail);
            this.validate();
        }
    }

    validate() {
        let passedFirstname = this.state.fetchedFName;
        let passedLastname = this.state.fetchedLName;
        // let passedEmail = this.state.emailfield;
        let passedPhone = this.state.fetchedPhone;
        // let passedPassword = this.state.passwordfield;
        // let passedCoPassword = this.state.copasswordfield;
        let passedAddress1 = this.state.address_1;
        let passedAddress2 = this.state.address_2;
        let passedCity = this.state.city;
        let passedPostcode = this.state.postcode;
        let passedCountry = this.state.countryfield;
        let passedState = this.state.statefield;
		const {navigate} = this.props.navigation
		
		var formdata = new FormData();
		formdata.append("firstname", passedFirstname);
		formdata.append("lastname", passedLastname);
		// formdata.append("email", passedEmail);
		formdata.append("telephone", passedPhone);
		formdata.append("address_1", passedAddress1);
		formdata.append("address_2", passedAddress2);
		formdata.append("city", passedCity);
		formdata.append("postcode", passedPostcode);
		formdata.append("country_id", passedCountry);
		formdata.append("zone_id", passedState);
		// formdata.append("password", passedPassword);
		// formdata.append("confirm", passedCoPassword);
		formdata.append("agree", true);

		var myHeaders = new Headers();
		// myHeaders.append("Cookie", "language=en-gb;");

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: formdata,
			redirect: 'follow'
		};
        console.log('submit', requestOptions)
        // https://ftwventures.com.my/index.php?route=account/address/edit&address_id=109
		fetch("https://ftwventures.com.my/index.php?route=api/usershipping/address", requestOptions)
			.then(response => response.json())
			.then(json =>{
				console.log(json)
				if (json.success) {
					console.log('address updated')
					Alert.alert(
					'Details Updated',
					'Your shipping details have been updated',
					[
						{
							text: 'Okay',
							onPress: () => navigate('CartNew'),
							style: 'cancel',
						},
					],
				)
				}
			})
			.catch(error => console.error('Update usershipping error', error));

    }
    
    getCountries = () => {
//         return fetch("https://ftwventures.com.my/index.php?route=api/country/countries", {
			fetch('https://ftwventures.com.my/index.php?route=api/country/countries')
			.then(response => response.json())
			.then(json => {
				const countrytemp = json.map(
					(item) => ({
							label: item.name,
							value: item.country_id
					})
				)
				// console.log('country',countrytemp)
				this.setState({
					countryoption: countrytemp 
				})
			})
    }
    
    renderZone() {
// 		console.log('countryfield',this.state.countryfield)

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
                // console.log('zone',zonetemp.length)

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
                        color: 'darkgrey'
                }}
                onChangeItem={item => this.setState({
                        statefield: item.value,
                        // submitBtn: false
                })}
        />
            )
            this.setState({countrybefore: country_id})
        }
    }
		
    componentDidMount(){
        this.spin();
    	// this.getCountries()
        this.getShippingAddress()
        AsyncStorage.getItem("tokenKey", (err, value) => {
            if (!err && value != null) {
                this.setState(
                    { tokenKey: value },
                    this.connectAPI());
            } else {
            }
        });
    	this.getCountries()
    }
    

    connectAPI() {
  
    	const dataForm = new FormData();
    	dataForm.append("access_token", this.state.tokenKey)
        API.userDetail(dataForm).then(response => {
            data = response;
            this.setState({
                fetchedFName: data.firstname,
                fetchedLName: data.lastname,
                fetchedEmail: data.email,
                fetchedPhone: data.telephone
            });


        });
    }
    
	renderLeft() {
			const {navigate} = this.props.navigation
			return (
					<TouchableOpacity onPress={() => navigate(this.state.prevScreen)}>
							<Ionicons name={'ios-arrow-back'} size={35} color={'yellow'} style={{paddingTop: 0}} />
					</TouchableOpacity>
			);
	}
	
	renderCenter() {
			return <Image source={require('../images/dirtpit-logo-181x43.png')} />
	}

    render() {
        const { navigate } = this.props.navigation;
        if (!this.state.isLoading){
                return (
                    
                        <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.container}
                        >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                                                        Platform.OS == 'ios' ? (notch ? -10 : 0) : 0,
                                                height: Platform.OS == 'ios' ? (notch ? 90 : 95) : 70,
                                        }}
                                />
                        {
                            this.state.shippingAddr.map((item)=>{
                                return(
                                <ScrollView
                                    style={styles.scrollStyle}
                                    contentContainerStyle={styles.scrollContent}
                                >

                                    <View style={styles.headerLogo}>
                                        <Text style={{alignSelf: 'center', fontFamily:'Gotham-Bold', fontSize: 20}}>Update Delivery Contact</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontFamily: 'Gotham-Bold', fontSize: 16, justifyContent: 'flex-start'}}>Personal Details</Text>
                                    </View>		
                                    <View style={styles.wrapField}>
                                        <Image
                                            source={require("../images/icoUser.png")}
                                            style={styles.fieldIco}
                                        />
                                        <TextInput
                                            ref="firstnamefieldRef"
                                            onChangeText={fetchedFName =>
                                                this.setState({ fetchedFName })
                                            }
                                            value={this.state.fetchedFName}
                                            style={styles.inputStyles}
                                            placeholder="First Name *"
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="darkgrey"
                                        />
                                    </View>
                                    <View style={styles.wrapField}>
                                        <Image
                                            source={require("../images/icoUser.png")}
                                            style={styles.fieldIco}
                                        />
                                        <TextInput
                                            ref="lastnamefieldRef"
                                            onChangeText={fetchedLName =>
                                                this.setState({ fetchedLName })
                                            }
                                            value={this.state.fetchedLName}
                                            style={styles.inputStyles}
                                            placeholder="Last Name *"
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="darkgrey"
                                        />
                                    </View>
                                    {/* <View style={styles.wrapField}>
                                        <Image
                                            source={require("../images/icoEmail.png")}
                                            style={styles.fieldIco}
                                        />
                                        <TextInput
                                            ref="emailfieldRef"
                                            onChangeText={emailfield =>
                                                this.setState({ emailfield })
                                            }
                                            value={this.state.fetchedEmail}
                                            style={styles.inputStyles}
                                            placeholder="Email *"
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="darkgrey"
                                            keyboardType="email-address"
                                        />
                                    </View> */}
                                    <View style={styles.wrapField}>
                                        <Image
                                            source={require("../images/icoPhone.png")}
                                            style={styles.fieldIco}
                                        />
                                        <TextInput
                                            ref="phonefieldRef"
                                            onChangeText={fetchedPhone =>
                                                this.setState({ fetchedPhone })
                                            }
                                            value={this.state.fetchedPhone}
                                            style={styles.inputStyles}
                                            placeholder="Mobile Number *"
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="darkgrey"
                                            keyboardType="phone-pad"
                                        />
                                    </View>
                                    <View>
                                        <Text style={{fontFamily: 'Gotham-Bold', fontSize: 16, paddingTop:15,}}>Address</Text>
                                    </View>		
                                    <View style={styles.wrapField}>
                                        <Image
                                            source={require("../images/icoUser.png")}
                                            style={styles.fieldIco}
                                        />
                                        <TextInput
                                            ref="companyfieldRef"
                                            onChangeText={company =>
                                                this.setState({ company })
                                            }
                                            value={this.state.company}
                                            style={styles.inputStyles}
                                            placeholder="Company"
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="darkgrey"
                                        />
                                    </View>
                                    <View style={styles.wrapField}>
                                        <Image
                                            source={require("../images/icoUser.png")}
                                            style={styles.fieldIco}
                                        />
                                        <TextInput
                                            ref="address1fieldRef"
                                            onChangeText={address_1 =>
                                                this.setState({ address_1 })
                                            }
                                            value={this.state.address_1}
                                            style={styles.inputStyles}
                                            placeholder="Address 1 *"
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="darkgrey"
                                        />
                                    </View>
                                    <View style={styles.wrapField}>
                                        <Image
                                            source={require("../images/icoEmail.png")}
                                            style={styles.fieldIco}
                                        />
                                        <TextInput
                                            ref="address2fieldRef"
                                            onChangeText={address_2 =>
                                                this.setState({ address_2 })
                                            }
                                            value={this.state.address_2}
                                            style={styles.inputStyles}
                                            placeholder="Address 2"
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="darkgrey"
                                        />
                                    </View>
                                    <View style={styles.wrapField}>
                                        <Image
                                            source={require("../images/icoPhone.png")}
                                            style={styles.fieldIco}
                                        />
                                        <TextInput
                                            ref="cityfieldRef"
                                            onChangeText={city =>
                                                this.setState({ city })
                                            }
                                            value={this.state.city}
                                            style={styles.inputStyles}
                                            placeholder="City *"
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="darkgrey"
                                        />
                                    </View>
                                    <View style={styles.wrapField}>
                                        <Image
                                            source={require("../images/icoPassword.png")}
                                            style={styles.fieldIco}
                                        />
                                        <TextInput
                                            ref="postcodefieldRef"
                                            onChangeText={postcode =>
                                                this.setState({ postcode })
                                            }
                                            value={this.state.postcode}
                                            style={styles.inputStyles}
                                            placeholder="Postcode *"
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="darkgrey"
                                            keyboardType="number-pad"
                                        />
                                    </View>
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
                                                color: 'darkgrey'
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
                                        <Text style={styles.signInText}>UPDATE</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.doesntText}>
                                        The contact details and address submitted will only be used for the purpose of your purchase through this platform.
                                    </Text>
                                    
                                    {/* <TouchableOpacity
                                        onPress={() => navigate("", { screen: "" })}
                                    >
                                        <Text style={styles.signUpButton}>
                                            Terms and Conditions
                                        </Text>
                                    </TouchableOpacity> */}
                                </ScrollView>);

                            })
                        }
                        </View>
                        </TouchableWithoutFeedback>
                        </KeyboardAvoidingView>
                    );
        }else{
            console.info('EditDetails Loading') 
            const spin = this.spinValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
            })
    
            return(
                    <View style={{flex:1,alignItems: 'center', justifyContent: 'center',backgroundColor:'black'}}>
                        <NavigationEvents
                            onDidFocus={() => {
                                console.log('Checkout Refreshed');
                                // this.checkCartItems()
                            }}
                        />
                            <Animated.Image
                        style={{
                            width: 100,
                            height: 100,
                            transform: [{rotate: spin}] }}
                            source={require('../images/DirtPit_icon_1024.png')}
                    />
                    </View>
            )
        }
        // );
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
        alignSelf: "stretch",
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: "center"
    },
    headerLogo: {
        marginTop: 20,
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
        width:'80%',
        fontFamily: "CircularStd-Book",
        fontSize: 16,
        color: "#a0abba",
        textAlign: "center",
        alignItems: "center"
    },
    signUpButton: {
        marginTop: 4,
        marginBottom: 40,
        fontFamily: "CircularStd-Black",
        fontSize: 16,
        color: "#a0abba"
    }
});