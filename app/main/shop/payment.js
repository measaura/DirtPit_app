import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Header } from "react-native-elements";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { WebView } from 'react-native-webview';
import AwesomeAlert from 'react-native-awesome-alerts'
import AsyncStorage from '@react-native-community/async-storage'
import DeviceInfo from 'react-native-device-info'
var iPhoneX = DeviceInfo.hasNotch()

export default class PaymentScreen extends Component {
  constructor(props) {
  	webview = null;
    super(props);
    this.state = {
    	showAlert: false,
    	myUrl: '',
    };
  };

	componentDidMount(){
		this.renderWebview()
	}
  
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
  
  goBack() {
    const {  navigation, route  } = this.props;
    navigation.goBack()
//     navigation.state.params.updateCount({itemCount:4});
  }
  
  getUrl(item){
  console.log('geturl',item)
		this.setState({
			myUrl: item,
		})
  }
  
  handleWebViewNavigationStateChange = (newNavState) => {
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    
    console.log(newNavState)
    const { url } = newNavState;
    if (!url) return;

    // handle certain doctypes
    if (url.includes('.pdf')) {
      this.webview.stopLoading();
      // open a modal with the PDF viewer
    }

    // one way to handle a successful form submit is via query strings
    if (url.includes('?message=success')) {
      this.webview.stopLoading();
      // maybe close this view?
    }

    // one way to handle a successful form submit is via query strings
    if (url.includes('?route=checkout/success')) {
      this.webview.stopLoading();
      this.setState({showAlert: true})
      // maybe close this view?
    }
    
    // one way to handle errors is via query string
    if (url.includes('?errors=true')) {
      this.webview.stopLoading();
    }

    // redirect somewhere else
    if (url.includes('google.com')) {
      const newURL = 'https://reactnative.dev/';
      const redirectTo = 'window.location = "' + newURL + '"';
      this.webview.injectJavaScript(redirectTo);
    }
  };
  
  renderWebview(){
		AsyncStorage.getItem("payment_url", (err, value) => {
				if (!err && value != null) {
					this.setState({
						myUrl: value,
					});

					console.warn('myUrl', value )
				} else {
				}
		});
  }
  
	renderLeft() {
			const {navigate} = this.props.navigation
			return (
					<TouchableOpacity onPress={()=>this.goBack()}>
							<Ionicons name={'ios-arrow-dropleft-circle'} size={30} color={'yellow'} style={{paddingTop: 0}} />
					</TouchableOpacity>
			);
	}
	
	renderCenter() {
			return <Image source={require('../../images/dirtpit-logo-181x43.png')} />
	}
	
	renderRight() {
			const {navigate} = this.props.navigation
// 			const BadgedIcon = withBadge(this.state.items)(Icon)
			if (this.state.isMonitor) {
					return ''
			} else {
					return (
							<TouchableOpacity
									onPress={() =>
											this.showAlert()
									}>
									<View style={{ paddingRight: 15}} >

										<Ionicons type='ionicon' name="ios-cart" size={28} color={"yellow"} />
									</View>
							</TouchableOpacity>
					)
			}
	}

  render() {
    return (
      <View style={{flex:1}}>
					<Header
							innerContainerStyles={styles.headerInnerContainer}
							outerContainerStyles={styles.headerOuterContainer}
							leftComponent={this.renderLeft()}
							centerComponent={this.renderCenter()}
							rightComponent={this.renderRight()}
							containerStyle={{
									backgroundColor: '#000',
									marginTop:
											Platform.OS == 'ios' ? 0 : -20,
									top:
											Platform.OS == 'ios' ? (iPhoneX ? -10 : 0) : -5,
									height: Platform.OS == 'ios' ? (iPhoneX ? 90 : 95) : 70,
							}}
					/>
				<WebView 
					ref={(ref) => (this.webview = ref)}
					source={{uri: this.state.myUrl}}
					onNavigationStateChange={this.handleWebViewNavigationStateChange}
					style={{flex: 1, marginTop: 0, height: 100}}
				/>  
        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title="Thank you!"
          message="Your order have been submitted for processing"
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
});