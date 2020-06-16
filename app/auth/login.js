import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Alert,
    Platform,
    Dimensions,
    ActivityIndicator,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
// import Spinner from "react-native-loading-spinner-overlay";
// import Permissions from "react-native-permissions";
import {Permissions, request} from 'react-native-permissions'
// import FCM from "react-native-fcm";
import firebase from 'react-native-firebase'
import API from '../helper/APIController'

const {width, height} = Dimensions.get('window')

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            emailfield: '',
            passwordfield: '',
            fcm_token: '',
            tokenKey: '',
            customerId: '',
            visible: false,
            isLogin: false,
        }
    }

    _requestCallPermission = () => {
        request('android.permission.CALL_PHONE').then(response => {
            this.setState({callPermission: response})
            // console.log(response);
        })
    }

    grantedMeCall() {
        AsyncStorage.setItem('isCallAccept', 'yes')
        this.setState({isCallAccept: 'yes'})
        console.log('Call Permission granted')
        if (Platform.OS === 'android') {
            this.setState(
                {
                    callPermission: 'allow',
                },
                this._requestCallPermission,
            )
        } else if (Platform.OS === 'ios') {
            this.setState({
                callPermission: 'allow',
            })
        }
    }

    notGrantedCall() {
        AsyncStorage.setItem('isCallAccept', 'no')
        this.setState({isCallAccept: 'no'})
        console.log('Call Permission denied')
        this.setState(
            {
                callPermission: 'not allow',
            },
            this._requestCallPermission,
        )
    }

    _requestPermission = () => {
        //         Permissions.request("android.permission.ACCESS_FINE_LOCATION").then(response => {
        request(
            Platform.select({
                android: 'android.permission.ACCESS_FINE_LOCATION',
                ios: 'ios.permission.LOCATION_WHEN_IN_USE',
            }),
        ).then(response => {
            this.setState({locationPermission: response})
            console.log(response)
             if (Platform.OS === 'android'){
             	this.requestCall()
             }
        })
    }

    grantedMe() {
        AsyncStorage.setItem('isLocationSet', 'yes')
        this.setState({isLocationSet: 'yes'})
        console.log('Location Permission granted')
        this.setState(
            {
                locationPermission: 'allow',
            },
            this._requestPermission,
        )
    }

    notGranted() {
        AsyncStorage.setItem('isLocationSet', 'no')
        this.setState({isLocationSet: 'no'})
        console.log('Location Permission denied')
        this.setState(
            {
                locationPermission: 'not allow',
            },
            this._requestPermission,
        )
    }

    requestLocation() {
        this.setState({
            visible: false,
        })
        Alert.alert(
            'Access to phone location required.',
            'This app requires your phone location to give you the most accurate information about you and the tracker device location. Your phone location will not be stored in the server.',
            [
                {
                    text: 'No',
                    onPress: () => this.notGranted(),
                    style: 'cancel',
                },
                {
                    text: 'Okay',
                    onPress: () => this.grantedMe(),
                    style: 'cancel',
                },
            ],
        )
    }

    requestCall() {
        Alert.alert(
            'Access to call function are required.',
            'This app requires the permission to make call in an emergency case upon user click to communicate to the tracker device. No calls will be made automatically from the app.',
            [
                {
                    text: 'No',
                    onPress: () => this.notGrantedCall(),
                    style: 'cancel',
                },
                {
                    text: 'Okay',
                    onPress: () => this.grantedMeCall(),
                    style: 'cancel',
                },
            ],
        )
    }
    
//     _askPermission() {
//     console.log('ask permission')
//             firebase
//                 .messaging()
//                 .hasPermission()
//                 .then(enabled => {
// //                     if (enabled) {
// //                         firebase
// //                             .messaging()
// //                             .getToken()
// //                             .then(token => {
// //                                 console.log('login.js FCM TOKEN: ', token)
// //                                 this.setState({fcm_token: token})
// //                                 this.updateProfile(response)
// //                             })
// //                         // user has permissions
// //                     } else {
//                         firebase
//                             .messaging()
//                             .requestPermission()
//                             .then(() => {
//                                 console.log('User Now Has Permission')
//                                 firebase
//                                     .messaging()
//                                     .getToken()
//                                     .then(token => {
//                                         console.log(
//                                             'login.js FCM TOKEN: ',
//                                             token,
//                                         )
//                                         this.setState({fcm_token: token})
//                                         this.updateProfile(response)
//                                     })
//                             })
//                             .catch(error => {
//                                 console.log('Error', error)
//                                 // User has rejected permissions
// // 																Alert.alert(
// // 																		'Limited functionality warning.',
// // 																		'You might not get the full experience from this app if you disallow notifications. Are you sure to continue?',
// // 																		[
// // 																				{
// // 																						text: 'No',
// // 																						onPress: () => this._askPermission(),
// // 																						style: 'cancel',
// // 																				},
// // 																				{
// // 																						text: 'Okay',
// // 																						onPress: () => this.updateProfile(response),
// // 																						style: 'cancel',
// // 																				},
// // 																		],
// // 																)
//                             })
// //                     }
//                 })
//     }

    componentDidMount() {
//         AsyncStorage.getItem('isLocationSet', (err, value) => {
//             if (!err && value != null) {
//             } else {
//                 this.requestLocation()
//             }
//         })
// 				this.requestCall()
        this.setState({
            visible: !this.state.visible,
        })
        this.checkUserSignedIn()
    }

    async checkUserSignedIn() {
        const {
            navigate,
            state: {params},
        } = this.props.navigation
        let context = this
        try {
            let value = await AsyncStorage.getItem('tokenKey')
            if (value != null) {
                navigate('Home', {prevScreenTitle: 'Home'})
                setTimeout(
                    function() {
                        this.setState({
                            visible: false,
                        })
                    }.bind(this),
                    1000,
                )
            } else {
                this.setState({
                    visible: false,
                })
            }
        } catch (error) {}
    }

    proceedLogin() {
        const {navigate} = this.props.navigation
        const {
            state: {params},
        } = this.props.navigation
        let emailfieldpassed = this.state.emailfield
        let passwordfieldpassed = this.state.passwordfield

        if (emailfieldpassed === '') {
            Alert.alert('Please enter your email.')
        } else if (passwordfieldpassed === '') {
            Alert.alert('Please enter your password.')
        } else {
        const formData = new FormData();

        formData.append("email", emailfieldpassed);
        formData.append("password", passwordfieldpassed);
            API.login(formData).then(response => {
            console.log('API.login',response)
                this.setState({
                		isLogin: true,
                		tokenKey: response.access_token,
                })
                AsyncStorage.setItem('customerId', response.customer_id)
                AsyncStorage.setItem('tokenKey', response.access_token)
                this.fetchProfile()
								navigate('Home', {prevScreenTitle: 'Home'})
            })
        }
    }

    fetchProfile() {
        console.log('fetch profile')
        const formData = new FormData();

        formData.append("access_token", this.state.tokenKey);

        API.userDetail(formData).then(response => {
        console.log('fetchprofile log:',response)
            firebase
                .messaging()
                .hasPermission()
                .then(enabled => {
                    if (enabled) {
                        firebase
                            .messaging()
                            .getToken()
                            .then(token => {
                                console.log('login.js fetchProfile FCM TOKEN: ', token)
                                this.setState({fcm_token: token})
                                this.updateProfile(response)
                            })
                        // user has permissions
                    } else {
                        firebase
                            .messaging()
                            .requestPermission()
                            .then(() => {
                                console.log('User Now Has Permission')
                                firebase
                                    .messaging()
                                    .getToken()
                                    .then(token => {
                                        console.log(
                                            'login.js FCM TOKEN: ',
                                            token,
                                        )
                                        this.setState({fcm_token: token})
                                        this.updateProfile(response)
                                    })
                            })
                            .catch(error => {
                                console.log('Error', error)
                                // User has rejected permissions
																Alert.alert(
																		'Limited experience notice.',
																		'This is to inform that you might not get the full experience from this app when you disallow notifications.',
																		[
// 																				{
// 																						text: 'No',
// 																						onPress: () => this.fetchProfile(),
// 																						style: 'cancel',
// 																				},
																				{
																						text: 'Okay',
																						onPress: () => this.updateProfile(response),
																						style: 'cancel',
																				},
																		],
																)
                            })
                    }
                })
        })
    }

    updateProfile(responseData) {
        const {navigate} = this.props.navigation
        let dataToShow = responseData
//         console.log(this.state.fcm_token)
        dataToShow.fcm_token = this.state.fcm_token
        API.userUpdate(dataToShow).then(_ => {
            this.setState({isLogin: false})
            navigate('Home', {prevScreenTitle: 'Home'})
        })
        console.log('Profile Updated')
    }

    render() {
        const {navigate} = this.props.navigation
        if (this.state.isLogin === true) {
            return (
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                    }}>
                    <ActivityIndicator size="large" color="yellow" />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                	<View style={{justifyContent:'center', height:200, width:width, backgroundColor:'black'}} >
                    <View style={styles.headerLogo}>
                        <Image
                            source={require('../../app/images/dirtpit-logo.png')}
                            style={styles.headerImg}
                        />
                    </View>
                	</View>

                    <View style={styles.wrapField}>
                        <Image
                            source={require('../images/icoEmail.png')}
                            style={styles.fieldIco}
                        />
                        <TextInput
                            ref={el => {
                                this.emailfield = el
                            }}
                            onChangeText={emailfield =>
                                this.setState({emailfield})
                            }
                            value={this.state.emailfield}
                            style={styles.inputStyles}
                            placeholder="Email"
                            underlineColorAndroid="transparent"
                            placeholderTextColor="dark-grey"
                            keyboardType="email-address"
                            returnKeyType="next"
                        />
                    </View>
                    <View style={styles.wrapField}>
                        <Image
                            source={require('../images/icoPassword.png')}
                            style={styles.fieldIco}
                        />
                        <TextInput
                            secureTextEntry={true}
                            ref={el => {
                                this.passwordfield = el
                            }}
                            onChangeText={passwordfield =>
                                this.setState({passwordfield})
                            }
                            value={this.state.passwordfield}
                            style={styles.inputStyles}
                            placeholder="Password"
                            underlineColorAndroid="transparent"
                            placeholderTextColor="dark-grey"
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.signInBut}
                        onPress={this.proceedLogin.bind(this)}>
                        <Text style={styles.signInText}>SIGN IN</Text>
                    </TouchableOpacity>
                    <Text style={styles.doesntText}>
                        Do not have an account?
                    </Text>
                    <TouchableOpacity
                        onPress={() =>
                            navigate('Register', {screen: 'Register'})
                        }>
                        <Text style={styles.signUpButton}>REGISTER</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    headerLogo: {
        alignSelf: 'center',
        height: 55,
        width: 300,
        backgroundColor:'black',
    },
    headerImg: {
        flex: 1,
        width: null,
        height: null,
    },
    wrapField: {
        height: 40,
        borderRadius: 25,
        flexDirection: 'row',
        alignSelf: 'stretch',
        marginTop: 15,
        marginLeft: 30,
        marginRight: 30,
        alignItems: 'center',
        elevation: 1,
    },
    fieldIco: {
        width: 20,
        height: 20,
        marginLeft: 15,
    },
    inputStyles: {
        flex: 2,
        fontSize: 18,
        color: '#000',
        paddingLeft: 15,
        paddingRight: 15,
        top: 3,
    },
    signInBut: {
        marginTop: 30,
        backgroundColor: 'yellow',
        height: 50,
        borderRadius: 25,
        alignSelf: 'stretch',
        marginLeft: 30,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signInText: {
    		fontFamily: 'Gotham Bold',
        fontSize: 16,
        color: 'black',
    },
    doesntText: {
        marginTop: 30,
        fontSize: 16,
        color: '#a0abba',
    },
    signUpButton: {
        marginTop: 8,
        fontFamily: 'Gotham Bold',
        fontSize: 16,
        color: 'black',
    },
})
