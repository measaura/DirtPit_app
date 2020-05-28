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
  View,
  Text,
  StatusBar,
  Image,
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
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


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
import DealersScreen from './app/main/dealers'
import MotoGarageScreen from './app/main/motogarage'
import BikeGarageScreen from './app/main/bikegarage'
import ConceptList from './app/main/concept'
import ConceptScreen from './app/main/concept/conceptshop'
import Profile from './app/main/profile'
import Notifications from './app/main/notifications'
// import Slider from './app/main/component'


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
        MotoGarage: MotoGarageScreen,
        BikeGarage: BikeGarageScreen,
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
//         Login: Login,
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
//     Loading: AuthLoadingScreen,
//     Auth: AuthStack,
    App: AppModalStack,
})

// end test code


const AppContainer = createAppContainer(AppDefault)


// const App: () => React$Node = () => {

export default class App extends Component {
	render(){
		return (
					<AppContainer />
		)
	}
};
// 

const styles = StyleSheet.create({
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
