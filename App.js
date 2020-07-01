/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Alert,
  View,
  Text,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from './app/NewAppScreen';

import AsyncStorage from '@react-native-community/async-storage'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import { useNavigation } from '@react-navigation/native'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import firebase from 'react-native-firebase'
import CookieManager from '@react-native-community/cookies'


import Login from './app/auth/login'
import Register from './app/auth/register'
import Verify from './app/auth/verify'

import HomeScreen from './app/main/home'
import TourScreen from './app/main/tour'
import ShopScreen from './app/main/shop/retail'
import SegmentScreen from './app/main/shop/segment'
import CategoryScreen from './app/main/shop/category'
import ProductScreen from './app/main/shop/product'
import DetailScreen from './app/main/shop/details'
import CartScreen from './app/main/shop/cart'
import CartNewScreen from './app/main/shop/cartnew'
import CheckoutScreen from './app/main/shop/checkout'
import PaymentScreen from './app/main/shop/payment'
import DealersScreen from './app/main/dealers'
import DealersListScreen from './app/main/dealers/dealerslist'
import DealersShopScreen from './app/main/dealers/dealershop'
import MotoGarageScreen from './app/main/motogarage'
import BikeGarageScreen from './app/main/bikegarage'
import CafeScreen from './app/main/cafe'
import CommunityScreen from './app/main/community'
import ConceptList from './app/main/concept'
import ConceptScreen from './app/main/concept/conceptshop'
import Profile from './app/main/profile'
import Notifications from './app/main/notifications'
// import Slider from './app/main/component'

class AuthLoadingScreen extends React.Component {
    constructor() {
        super()
        this._bootstrapAsync()
    }


    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
				// Get cookies for a url
				CookieManager.get('https://demo.shortcircuitworks.com')
					.then((cookies) => {
					
						if(cookies.length > 0){
							console.log('CookieManager.get =>', cookies);
							console.log(cookies?cookies.default.value:false);
						}
					});

        const userToken = await AsyncStorage.getItem('tokenKey')
        setTimeout(() => {
            // go to Home page
            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            this.props.navigation.navigate(userToken ? 'App' : 'Auth')
        }, 200)
    }

    // Render any loading content that you like here
    render() {
        StatusBar.setBarStyle('dark-content')
        return (
            <View style={styles.container}>
                <Image
                    source={require('./app/images/DirtPit_icon_1024.png')}
                    style={{width: 150, height: 150}}
                />
                <ActivityIndicator size='large' color='yellow' />
                <Image
                    source={require('./app/images/dirtpit-logo.png')}
                    style={{width: 200, height: 45}}
                />
                <StatusBar barStyle="dark-content" />
            </View>
        )
    }
}

const defaultChannel = new firebase.notifications.Android.Channel(
    'default-channel',
    'Default Notification',
    firebase.notifications.Android.Importance.High,
	)
	.setDescription('Default notification for general information')
	.setSound('default')
    
const AuthStack = createStackNavigator(
    {
        Login: Login,
        Register: Register,
    },
    {
        mode: 'modal',
        headerMode: 'none',
    },
)

const ShopStack = createStackNavigator({
		Segment: {screen: SegmentScreen},
		Category: {screen: CategoryScreen},
		Product: {screen: ProductScreen},
		Details: {screen: DetailScreen}
},
{
		mode: 'modal',
		headerMode: 'none',
})

const Tabs = createBottomTabNavigator(

    {
        Home: HomeScreen,
        Notifications: Notifications,
        CartNew: CartNewScreen,
        Profile: Profile,
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state
                let IconComponent = Ionicons
                let iconName
                if (routeName === 'Home') {
									iconName = `ios-home`;
                } else if (routeName === 'Notifications') {
                    iconName = `ios-notifications`;
                } else if (routeName === 'CartNew') {
                    iconName = `ios-cart`;
                } else if (routeName === 'Profile') {
                    iconName = `ios-person`;
                } 
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={25} color={tintColor} style={{paddingTop: 0}} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: Colors.primary,
            inactiveTintColor: 'gray',
            showLabel: false,
            style: {backgroundColor: 'black'},
        },
    },
// )
);

const HomeStack = createStackNavigator({
		Home: Tabs,
		Tour: TourScreen,
		ShopStack: ShopStack,
},
{
		mode: 'modal',
		headerMode: 'none',
})

const AppModalStack = createStackNavigator(
    {
        App: Tabs,
        Shop: ShopStack,
        Tour: TourScreen,
        Concept: ConceptList,
        ConceptScreen: ConceptScreen,
        Dealers: DealersScreen,
        DealersList: DealersListScreen,
        DealerShop: DealersShopScreen,
        MotoGarage: MotoGarageScreen,
        BikeGarage: BikeGarageScreen,
        Cafe: CafeScreen,
        Community: CommunityScreen,
        Cart: CartScreen,
        CartNew: CartNewScreen,
        Checkout: CheckoutScreen,
        Payment: PaymentScreen,
//         Slider: Slider,
//         UserList: UserList,
//         TrackingHistory: TrackingHistory,
//         EditProfile: EditProfile,
//         UserSettings: UserSettings,
//         Contact: Contact,
//         AddContact: AddContact,
//         AboutDevice: AboutDevice,
//         EditContact: EditContact,
//         EditManager: EditManager,
//         AddDevice: AddDevice,
//         AddDeviceDetail: AddDeviceDetail,
//         UserDetailHide: UserDetailHide,
//         Geofence: Geofence,
        Login: Login,
//         QrScanner: QrScanner,
//         TZFlatList: TZFlatList,
//         AddZone: AddZone,
    },
    {
        mode: 'modal',
        headerMode: 'none',
    },
)

const AppDefault = createSwitchNavigator({
    Loading: AuthLoadingScreen,
    Auth: AuthStack,
    App: AppModalStack,
})

// end test code


const AppContainer = createAppContainer(AppDefault)


// const App: () => React$Node = () => {



export default class App extends Component {
    async componentDidMount() {
        // Create the channel
        firebase
            .notifications()
            .android.createChannels([
                defaultChannel,
            ])
        // 		this.checkUserSignedIn();
        // 		this.checkPermission();
        this.createNotificationListeners()
    }

    componentWillUnmount() {
        // 		this.notificationListener();
        this.notificationOpenedListener()
    }

    async createNotificationListeners() {
        /*
         * Triggered when a particular notification has been received in foreground
         * */
        this.notificationListener = firebase
            .notifications()
            .onNotification(notification => {
                console.log('onNotification')
                console.log('Title: ', notification.title)
//                 if (notification.title == 'Notification') {
                    notification.android.setChannelId('default-channel')
//                 }//  else if (notification.title == 'SOS!') {
//                     notification.android.setChannelId('sos-channel')
//                 } else if (notification.title == 'Safe Zone') {
//                     notification.android.setChannelId('safezone-channel')
//                 }
                notification.android.setSmallIcon('ic_notif')
                 notification.android.setColor('#0600FF')

                const {title, body} = notification
                console.log(notification)

                firebase.notifications().displayNotification(notification)
                //       this.showAlert(title, body);
            })

        /*
         * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
         * */
        this.notificationOpenedListener = firebase
            .notifications()
            .onNotificationOpened(notificationOpen => {
                console.log('onBackgroundNotificationOpened')
                const {title, body} = notificationOpen.notification
//                 firebase.notifications().displayNotification(JSON.stringify(notificationOpen))
                      this.showAlert(title, body);
								firebase.notifications().removeAllDeliveredNotifications()
            })

        /*
         * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
         * */
        const notificationOpen = await firebase
            .notifications()
            .getInitialNotification(notificationOpen => {
							console.log('getInitialNotification: app closed')
            	 const {title, body} = notificationOpen.notification
            	 this.showAlert(title, body)
            })
//         console.log('getInitialNotification: app closed')
//         if (notificationOpen) {
//             const {title, body} = notificationOpen.notification
//         }

				firebase.notifications().removeAllDeliveredNotifications()

        /*
         * Triggered for data only payload in foreground
         * */
        // 		this.messageListener = firebase.messaging().onMessage((message) => {
        // 		console.log("App.js onMessage");
        // 			//process data message
        // 			console.log(JSON.stringify(message));
        // 		});

        // Temporary solution using onMessage for foreground data only message from server.
        // To remove and use Notification on both server and app.

        this.messageListener = firebase.messaging().onMessage(message => {
        	const navigation = useNavigation();
            console.log('App.js METHOD: onMessage')
            // Process your message as required
            console.log('message: ', message)

            const newNotification = new firebase.notifications.Notification()
                .setNotificationId(message.messageId)
                .setTitle(message.data.title)
                .setBody(message.data.body)
                .setData(message.data)
                .android.setSmallIcon('ic_notif')

            if (message.data.bigpic) {
                newNotification.android.setBigPicture(
                    message.data.bigpic,
                    message.data.lgicon,
                    message.data.title,
                    message.data.bigsummary,
                )
            }
            //.android.setChannelId('default-channel')
            if (Platform.OS === 'android') {
                newNotification
                    .setSound('default')
                    .android.setChannelId('default-channel')
            } else {
                newNotification.setSound('default')
            }
// 
//             if (message.data.title === 'SOS!') {
//                 if (Platform.OS === 'android') {
//                     newNotification
//                         .setSound(sosChannel.sound)
//                         .android.setChannelId(sosChannel.channelId)
//                 } else {
//                     newNotification.setSound('sos.wav')
//                 }
//             }
//             
//             if (message.data.title === 'ALERT!') {
//                 if (Platform.OS === 'android') {
//                     newNotification
//                         .setSound(sosChannel.sound)
//                         .android.setChannelId(geofenceChannel.channelId)
//                 } else {
//                     newNotification.setSound('geofence.wav')
//                 }
//             }

            if (message.data.bigpic) {
                newNotification.android.setBigPicture(
                    message.data.bigpic,
                    message.data.lgicon,
                    message.data.title,
                    message.data.bigsummary,
                )
            }
            if (message.data.lgicon) {
                newNotification.android.setLargeIcon(message.data.lgicon)
            }
            if (message.data.color) {
                newNotification.android.setColor(message.data.color)
            }

            console.log(
                'App.js displayNotification foreground:',
                newNotification,
            )
						

						
            if (message.data.title === 'Notification') {
            						console.log('Notification',message.data.title)
                firebase.notifications().displayNotification(newNotification)
            }else{
            	console.log(message.data.title)
            	this.showAlert(message.data.title, message.data.body)
            	navigation.navigate('Home')
            }
        })
        // end onMessage
    }

    showAlert(title, body) {
        Alert.alert(
            title,
            body,
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
        )
    }
    
	render(){
		return (
					<AppContainer />
		)
	}
};
// 

const styles = StyleSheet.create({
	container: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: 'black',
	},
  scrollView: {
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
    marginTop: 32,
    paddingHorizontal: 24,
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
});
// 
// export default App;
