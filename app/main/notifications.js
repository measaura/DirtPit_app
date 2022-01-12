import React, {Component} from 'react'
import {
    StyleSheet,
  Animated,
  Easing,
    View,
    Text,
    FlatList,
    Image,
    BackHandler,
    TouchableOpacity,
    Dimensions,
    TouchableHighlightBase,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {Header} from 'react-native-elements'
import Moment from 'moment'
import Ionicons from 'react-native-vector-icons/Ionicons'

import API from '../helper/APIController'

import DeviceInfo from 'react-native-device-info'
var notch = DeviceInfo.hasNotch()

const {width, height} = Dimensions.get('window')

console.disableYellowBox = true
export default class Notifications extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
				 this.spinValue = new Animated.Value(0);
    }

    // static navigationOptions = {
    //     title: 'Home',
    //     headerStyle: {
    //       backgroundColor: '#f4511e',
    //     },
    //     headerTintColor: '#fff',
    //     headerTitleStyle: {
    //       fontWeight: 'bold',
    //     },
    //   };
    //

    //     static navigationOptions = ({ navigation }) => {
    //         const { params } = navigation.state;
    //
    //         return {
    //             tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
    //                 const { route, index, focused } = scene;
    //
    //                 if (focused) {
    //                 }
    //                 params.onTabFocus();
    // //                 jumpToIndex(1);
    // 								this.props.navigation.navigate('Notifications');
    //             }
    //         };
    //     };

    connectAPI() {
        this.setState({
            fetchedData: [],
            dataStatus: false,
        })
        API.deviceNotification().then(([code, response]) => {
            if (code == 200) {
                var count = Object.keys(response.items).length
                if (count == 0) {
                    this.setState({
                        visible: false,
                    })
                    this.setState({
                        dataStatus: false,
                    })
                } else {
                    data = response.items
                    this.setState({
                        fetchedData: [...this.state.fetchedData, ...data],
                        visible: false,
                        dataStatus: true,
                    })
                }
            }
        })
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
				fetch("https://ftwventures.com.my/index.php?route=api/notification/orderhistory" )
					.then(response => response.json())
					.then(result =>{
						console.log('orderhistory',result)
						if (result.success) {
							console.log('success',result.success)
							
						}
                        this.setState({orderHistory: result.orders})
					})
					.catch(error => console.log('error in testFetch', error));
		}

    componentDidMount() {
        this.didFocusListener = this.props.navigation.addListener(
            'didFocus',
            () => {
//                 this.connectAPI()
            },
        )

        BackHandler.addEventListener('backPress', this.handleBackButton)

        AsyncStorage.getItem('tokenKey', (err, value) => {
            if (!err && value != null) {
                this.setState({tokenKey: value})
            } else {
            }
        })
        this.testFetch()
    }

    componentWillUnmount() {
        this.didFocusListener.remove()
        BackHandler.removeEventListener('backPress', this.handleBackButton)
    }

    handleBackButton() {
        return true
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
			return <Image source={require('../images/dirtpit-logo-181x43.png')} />
	}


    static navigationOptions = {
        title: 'Home',
    }

    renderNotificationIcon(item) {
        if (item.type === 'lowbattery') {
            return (
                <Image
                    source={require('../images/noNoti.png')}
                    style={styles.rowIcon}
                />
            )
        } else if (item.type === 'alarm') {
            return (
                <Image
                    source={require('../images/noNoti.png')}
                    style={styles.rowIcon}
                />
            )
        } else if (item.type === 'zone') {
            return (
                <Image
                    source={require('../images/noNoti.png')}
                    style={styles.rowIcon}
                />
            )
        }
    }

    renderNotificationText(item) {
        if (item.type === 'lowbattery') {
            return ' device low battery.'
        } else if (item.type === 'alarm') {
            return ' device emergency alert.'
        } else if (item.type === 'zone') {
            return ' device ' + item.zone_detect + item.zone.name
        }
    }

    render() {
        const {navigate} = this.props.navigation
        if (this.state.orderHistory) {
            console.info('reder orderhistory', this.state.orderHistory)
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
											Platform.OS == 'ios' ? 0 : -20,
									top:
											Platform.OS == 'ios' ? (notch ? -10 : 0) : -5,
									height: Platform.OS == 'ios' ? (notch ? 90 : 95) : 70,
								}}
						/>
                    <View style={styles.flatContent}>
                        <FlatList
                            data={this.state.orderHistory}
                            keyExtractor={(item, index) => item.hashid}
                            renderItem={item => (
                                <TouchableOpacity
                                    onPress={() =>
                                        navigate('UserDetailHide', {
                                            prevScreenTitle: 'UserDetailHide',
                                            hashid: item.item.hashid,
                                        })
                                    }
                                    style={styles.rowWrap}>
                                    {this.renderNotificationIcon(item.item)}
                                    <View style={styles.rowTextContent}>
                                        <Text style={{fontSize:14}}>
                                            Order ID: {item.item.order_id}{' '}
                                        </Text>
                                        <Text style={styles.rowMessage}>
                                            Amount: {item.item.total}
                                        </Text>
                                        <Text style={{fontSize:15}}>
                                            Status: {item.item.status}
                                        </Text>
                                        <Text style={styles.rowTime}>
                                            {Moment(
                                                item.item.date_added +
                                                    ' UTC+0000',
                                                'YYYY-MM-DD HH:mm:ss ZZ',
                                            )
                                                .tz(Moment.tz.guess())
                                                .format(
                                                    'DD MMMM YYYY',
                                                )}
                                        </Text>
                                    </View>
                                    <Image
                                        source={require('../images/rowNext.png')}
                                        style={styles.rowArrow}
                                    />
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            )
        } else {
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
												Platform.OS == 'ios' ? 0 : -20,
										top:
												Platform.OS == 'ios' ? (notch ? -10 : 0) : 5,
										height: Platform.OS == 'ios' ? (notch ? 90 : 95) : 70,
								}}
						/>
                    <View style={styles.cantLocate}>
                        <Image
                            source={require('../images/noNoti.png')}
                            style={styles.cantLocateImg}
                        />
                        <Text style={styles.cantLocateText}>
                            You have no notifcation.
                        </Text>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
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
        height: 85,
        backgroundColor: '#ffffff',
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    rowIcon: {
        width: 30,
        height: 30,
        marginLeft: 20,
    },
    rowTextContent: {
        alignSelf: 'stretch',
        height: 85,
        marginLeft: 10,
        justifyContent: 'center',
        flex: 1,
    },
    rowMessage: {
        color: '#3f3f3f',
        fontSize: 16,
        paddingRight: 10,
    },
    rowTime: {
        color: '#a0abba',
        fontSize: 13,
    },
})
