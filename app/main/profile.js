import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    AsyncStorage,
    BackHandler
} from "react-native";
import { Header } from "react-native-elements";
import { StackActions, NavigationActions } from "react-navigation";
import VersionNumber from "react-native-version-number";

import API from "../helper/APIController";

import DeviceInfo from "react-native-device-info";
var iPhoneX = DeviceInfo.hasNotch();

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
        this4.connectAPI();
    };

    componentDidMount() {
        this.props.navigation.setParams({
            onTabFocus: this.handleTabFocus
        });

        BackHandler.addEventListener("backPress", this.handleBackButton);
        AsyncStorage.getItem("tokenKey", (err, value) => {
            if (!err && value != null) {
                this.setState({ tokenKey: value }, this.connectAPI);
            } else {
            }
        });
    }

    connectAPI() {
        API.userDetail().then(response => {
            data = response.items;
            // console.log(data);
            this.setState({
                fetchedName: data.name,
                fetchedEmail: data.email,
                fetchedPhone: data.phone
            });

            if (data.imgUrl) {
                this.setState({
                    avatarCheck: "http://iot.adamana.my/uploads/",
                    avatarContent: data.imgUrl
                });
            } else {
                this.setState({
                    avatarCheck: ""
                });
            }
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
        return <Text style={styles.headerNavTitle}>PROFILE</Text>;
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
                    centerContainerStyle={styles.headerInnerContainer}
                    outerContainerStyles={styles.headerOuterContainer}
                    centerComponent={this.renderCenter()}
                    rightComponent={this.renderRight()}
                        containerStyle={{
													backgroundColor: '#fff',
													marginTop:  Platform.OS == "ios" ? (iPhoneX ? 20 : 0) : -10,
													top: Platform.OS == "ios" ? (iPhoneX ? -15 : 0) : -5,
													height: 70
												}}
                />
                <ScrollView
                    style={styles.scrollStyle}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.headerWrap}>
                        {this.renderHeaderImg()}
                        <Text style={styles.headerName}>
                            {this.state.fetchedName}
                            Demo Name
                        </Text>
                        <Text style={styles.headerEmail}>
                            {this.state.fetchedEmail}
                            demo@email.com
                        </Text>
                        <Text style={styles.headerEmail}>
                            {this.state.fetchedPhone}
                            01223456789
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
        color: "#000",
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
        height: 220,
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
        fontSize: 18,
    },
    headerEmail: {
        color: "#ffffff",
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
        fontSize: 18,
        textAlign: "center"
    }
});