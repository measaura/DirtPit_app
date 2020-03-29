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
    ActivityIndicator,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
// import Spinner from "react-native-loading-spinner-overlay";
// import Permissions from "react-native-permissions";
import {Permissions, request} from 'react-native-permissions'
// import FCM from "react-native-fcm";
import firebase from 'react-native-firebase'
import API from '../helper/APIController'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            emailfield: '',
            passwordfield: '',
            fcm_token: '',
            tokenKey: '',
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
    
    _askPermission() {
    console.log('ask permission')
            firebase
                .messaging()
                .hasPermission()
                .then(enabled => {
//                     if (enabled) {
//                         firebase
//                             .messaging()
//                             .getToken()
//                             .then(token => {
//                                 console.log('login.js FCM TOKEN: ', token)
//                                 this.setState({fcm_token: token})
//                                 this.updateProfile(response)
//                             })
//                         // user has permissions
//                     } else {
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
// 																Alert.alert(
// 																		'Limited functionality warning.',
// 																		'You might not get the full experience from this app if you disallow notifications. Are you sure to continue?',
// 																		[
// 																				{
// 																						text: 'No',
// 																						onPress: () => this._askPermission(),
// 																						style: 'cancel',
// 																				},
// 																				{
// 																						text: 'Okay',
// 																						onPress: () => this.updateProfile(response),
// 																						style: 'cancel',
// 																				},
// 																		],
// 																)
                            })
//                     }
                })
    }

    componentDidMount() {
        AsyncStorage.getItem('isLocationSet', (err, value) => {
            if (!err && value != null) {
            } else {
                this.requestLocation()
            }
        })
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
                navigate('UserDetail', {prevScreenTitle: 'UserDetail'})
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
            API.login(emailfieldpassed, passwordfieldpassed).then(response => {
                this.setState({isLogin: true})
                this.setState({tokenKey: response.access_token})
                this.fetchProfile()
            })
        }
    }

    fetchProfile() {
        console.log('fetch profile')
        API.userDetail().then(response => {
            firebase
                .messaging()
                .hasPermission()
                .then(enabled => {
                    if (enabled) {
                        firebase
                            .messaging()
                            .getToken()
                            .then(token => {
                                console.log('login.js FCM TOKEN: ', token)
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
        let dataToShow = responseData.items
        dataToShow.fcm_token = this.state.fcm_token
        API.userUpdate(dataToShow).then(_ => {
            this.setState({isLogin: false})
            navigate('UserDetail', {prevScreenTitle: 'UserDetail'})
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
                    <ActivityIndicator size="large" color="#C40D42" />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.headerLogo}>
                        <Image
                            source={require('../images/adaLogo2.png')}
                            style={styles.headerImg}
                        />
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
                            placeholderTextColor="#a0abba"
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
                            placeholderTextColor="#a0abba"
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
                        <Text style={styles.signUpButton}>SIGN UP NOW</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        alignItems: 'center',
    },
    headerLogo: {
        marginTop: 150,
        marginRight: 30,
        marginLeft: 30,
        marginBottom: 50,
        alignSelf: 'center',
        height: 48,
        width: 300,
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
        color: '#c40d42',
        paddingLeft: 15,
        paddingRight: 15,
        top: 3,
    },
    signInBut: {
        marginTop: 30,
        backgroundColor: '#c40d42',
        height: 50,
        borderRadius: 25,
        alignSelf: 'stretch',
        marginLeft: 30,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signInText: {
        fontSize: 16,
        color: '#ffffff',
    },
    doesntText: {
        marginTop: 30,
        fontSize: 16,
        color: '#a0abba',
    },
    signUpButton: {
        marginTop: 8,
        fontSize: 16,
        color: '#c40d42',
    },
})
