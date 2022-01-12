import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    BackHandler
} from "react-native";
import { Header } from "react-native-elements";
import { StackActions, NavigationActions } from "react-navigation";
import VersionNumber from "react-native-version-number";
import CookieManager from '@react-native-community/cookies';
import AsyncStorage from '@react-native-community/async-storage';

import API from "../helper/APIController";

import DeviceInfo from "react-native-device-info";
var notch = DeviceInfo.hasNotch();

console.disableYellowBox = true;
export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this4 = this;
        this.state = {
            fetchedName: "",
            fetchedEmail: "",
            fetchedPhone: ""
        };
    }

    static triggerRefresh() {
        this4.connectAPI();
    }

    handleTabFocus = () => {
//         this4.connectAPI();
    };

    componentDidMount() {
			fetch('https://ftwventures.com.my/chk.php')
			.then(response => response.json())
			.then(json => {
				console.log('session', json) 
			})
			
				// Get cookies for a url
				CookieManager.get('https://ftwventures.com.my/')
					.then((cookies) => {
						console.log('Profile CookieManager.get =>', cookies);
					});

        this.props.navigation.setParams({
            onTabFocus: this.handleTabFocus
        });

        BackHandler.addEventListener("backPress", this.handleBackButton);
        AsyncStorage.getItem("tokenKey", (err, value) => {
            if (!err && value != null) {
                this.setState(
                    { tokenKey: value },
                    this.connectAPI);
            } else {
            }
        });
    }

    connectAPI() {
  
    	const dataForm = new FormData();
    	dataForm.append("access_token", this.state.tokenKey)
        API.userDetail(dataForm).then(response => {
            data = response;
            this.setState({
                fetchedName: data.firstname+' '+data.lastname,
                fetchedEmail: data.email,
                fetchedPhone: data.telephone
            });


        });
    }

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
//                 jumpToIndex(2);
//             }
//         };
//     };

    componentWillUnmount() {
        BackHandler.removeEventListener("backPress", this.handleBackButton);
    }

    handleBackButton() {
        return true;
    }

		renderCenter() {
				return <Image source={require('../images/dirtpit-logo-181x43.png')} />
		}

    renderRight() {
        const { navigate } = this.props.navigation;
        return (
            <TouchableOpacity onPress={() => navigate("EditManager")}>
                <Text style={styles.doneButton}>Edit</Text>
            </TouchableOpacity>
        );
    }

    logout = () => {
        API.logout().then(response => {
            // clear cookies
            CookieManager.clearAll()
                .then((success) => {
                    console.log('CookieManager.clearAll =>', success);
                });
            AsyncStorage.clear();
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: "Login"
                    })
                ]
            });
            this.props.navigation.dispatch(resetAction);
        });
    };

    renderHeaderImg() {
        if (this.state.avatarCheck === "http://iot.adamana.my/uploads/") {
            const urlServer = this.state.avatarCheck;
            const imageContent = this.state.avatarContent;
            return (
                <Image
                    style={styles.headerImage}
                    source={{ uri: urlServer + imageContent }}
                />
            );
        } else {
            return (
                <Image
                    style={styles.headerImage}
                    source={require("../images/iconBlank.png")}
                />
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
						<Header
								innerContainerStyles={styles.headerInnerContainer}
								outerContainerStyles={styles.headerOuterContainer}
								centerComponent={this.renderCenter()}
								rightComponent={this.renderRight()}
								containerStyle={{
										backgroundColor: '#000',
										marginTop:
												Platform.OS == 'ios' ? 0 : -20,
										top:
												Platform.OS == 'ios' ? (notch ? -10 : 0) : 5,
										height: Platform.OS == 'ios' ? (notch ? 90 : 95) : 70,
								}}
						/>
                <ScrollView
                    style={styles.scrollStyle}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.headerWrap}>
                        <Text style={styles.headerName}>
                            {this.state.fetchedName}
                        </Text>
                        <Text style={styles.headerEmail}>
                            {this.state.fetchedEmail}
                        </Text>
                        <Text style={styles.headerEmail}>
                            {this.state.fetchedPhone}
                        </Text>
                    </View>
										<Image
												style={styles.appImage}
												source={require('../NewAppScreen/components/logo.png')}
										/>
										<Text style={styles.appVersion}>
												Version: {VersionNumber.appVersion}
										</Text>
										<Text style={styles.appVersion}>
												support@dirtpit.my
										</Text>
                    <TouchableOpacity
                        style={styles.logOutBut}
                        onPress={this.logout.bind(this)}
                    >
                        <Text style={styles.logOutButText}>Log Out</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    appVersion: {
        top: 20
    },
    appImage: {
        width: 250,
        height: 40,
        marginBottom: 60,
        top: 60
    },
    doneButton: {
        color: "yellow",
        fontSize: 18,
    },
    headerOuterContainer: {
        borderBottomWidth: 1,
        borderColor: "#5b5b5b",
        backgroundColor: "#ffffff"
    },
    headerInnerContainer: {
        backgroundColor: "#ffffff"
    },
    headerNavTitle: {
        color: "#000",
        fontSize: 16,
        textAlign: "center"
    },
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    flatContent: {
        flex: 1
    },
    scrollStyle: {
        alignSelf: "stretch"
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: "center"
    },
    headerWrap: {
        height: 100,
        backgroundColor: "#0c0c0c",
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center"
    },
    headerImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
        borderColor: "#ffffff",
        borderWidth: 3
    },
    headerName: {
        color: "#ffffff",
        fontFamily: 'Gotham-Bold',
        fontSize: 18,
    },
    headerEmail: {
        color: "#ffffff",
        fontFamily: 'Gotham-Bold',
        fontSize: 14,
    },
    logOutBut: {
        position: "absolute",
        bottom: 30,
        alignItems: "center",
        width: "100%",
        justifyContent: "center"
    },
    logOutButText: {
        color: "#000",
        fontFamily: 'Gotham-Bold',
        fontSize: 18,
        textAlign: "center"
    }
});