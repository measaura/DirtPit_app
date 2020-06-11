import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
    BackHandler,
    TouchableOpacity,
    Dimensions,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {Header} from 'react-native-elements'
import Moment from 'moment'

import API from '../helper/APIController'

import DeviceInfo from 'react-native-device-info'
var iPhoneX = DeviceInfo.hasNotch()

const {width, height} = Dimensions.get('window')

console.disableYellowBox = true
export default class Notifications extends React.Component {
    constructor(props) {
        super(props)
        this2 = this
        this.state = {}
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
    }

    componentWillUnmount() {
        this.didFocusListener.remove()
        BackHandler.removeEventListener('backPress', this.handleBackButton)
    }

    handleBackButton() {
        return true
    }

    renderCenter() {
        return <Text style={styles.headerNavTitle}>NOTIFICATIONS</Text>
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
        if (this.state.dataStatus) {
            return (
                <View style={styles.container}>
                    <Header
                        innerContainerStyles={styles.headerInnerContainer}
                        centerContainerStyle={styles.headerInnerContainer}
                        outerContainerStyles={styles.headerOuterContainer}
                        centerComponent={this.renderCenter()}
                        containerStyle={{
                            backgroundColor: '#fff',
                            marginTop:
                                Platform.OS == 'ios' ? (iPhoneX ? 20 : 0) : -10,
                            top:
                                Platform.OS == 'ios' ? (iPhoneX ? -15 : 0) : -5,
                            height: 70,
                        }}
                    />
                    <View style={styles.flatContent}>
                        <FlatList
                            data={this.state.fetchedData}
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
                                        <Text style={styles.rowMessage}>
                                            {item.item.device.assignee.name}{' '}
                                            {this.renderNotificationText(
                                                item.item,
                                            )}
                                        </Text>
                                        <Text style={styles.rowTime}>
                                            {Moment(
                                                item.item.tracked_at +
                                                    ' UTC+0000',
                                                'YYYY-MM-DD HH:mm:ss ZZ',
                                            )
                                                .tz(Moment.tz.guess())
                                                .format(
                                                    'DD MMMM YYYY, hh:mm:ss A',
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
                        centerContainerStyle={styles.headerInnerContainer}
                        outerContainerStyles={styles.headerOuterContainer}
                        centerComponent={this.renderCenter()}
                        containerStyle={{
                            backgroundColor: '#fff',
                            marginTop:
                                Platform.OS == 'ios' ? (iPhoneX ? 20 : 0) : -10,
                            top:
                                Platform.OS == 'ios' ? (iPhoneX ? -15 : 0) : -5,
                            height: 70,
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
