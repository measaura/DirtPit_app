import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    Alert
} from "react-native";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nicknamefield: "",
            emailfield: "",
            phonefield: "",
            passwordfield: "",
            copasswordfield: ""
        };
    }

    filterField() {
        let passedNickname = this.state.nicknamefield;
        let passedEmail = this.state.emailfield;
        let passedPhone = this.state.phonefield;
        let passedPassword = this.state.passwordfield;
        let passedCoPassword = this.state.copasswordfield;

        if (passedNickname == "") {
            Alert.alert("Please enter your name.");
            this.refs.nicknamefieldRef.focus();
        } else if (passedEmail == "") {
            Alert.alert("Please enter your email.");
            this.refs.emailfieldRef.focus();
        } else if (passedPhone == "") {
            Alert.alert("Please enter your phone number.");
            this.refs.phonefieldRef.focus();
        } else if (passedPassword == "") {
            Alert.alert("Please enter your password.");
            this.refs.passwordfieldRef.focus();
        } else if (passedCoPassword == "") {
            Alert.alert("Please enter your confirm password.");
            this.refs.copasswordfieldRef.focus();
        } else if (passedPassword != passedCoPassword) {
            Alert.alert("New and confirm password does not match!");
        } else {
            this.validate();
        }
    }

    validate() {
        let passedNickname = this.state.nicknamefield;
        let passedEmail = this.state.emailfield;
        let passedPhone = this.state.phonefield;
        let passedPassword = this.state.passwordfield;
        let passedCoPassword = this.state.copasswordfield;

        return fetch("http://iot.adamana.my/api/register", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: passedNickname,
                email: passedEmail,
                phone: passedPhone,
                password: passedPassword,
                retype_password: passedCoPassword
            })
        })
            .then(response => {
                return response.json(); // << This is the problem
            })
            .then(responseData => {
                // responseData = undefined
                if (responseData.token) {
                    Alert.alert(
                        "You have successfully registered.",
                        "Please login to continue.",
                        [
                            {
                                text: "Okay",
                                onPress: () => console.log("Cancel"),
                                style: "cancel"
                            }
                        ]
                    );
                    this.props.navigation.goBack();
                } else {
                }
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollStyle}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.headerLogo}>
                        <Image
                            source={require("../images/adaLogo2.png")}
                            style={styles.headerImg}
                        />
                    </View>
                    <View style={styles.wrapField}>
                        <Image
                            source={require("../images/icoUser.png")}
                            style={styles.fieldIco}
                        />
                        <TextInput
                            ref="nicknamefieldRef"
                            onChangeText={nicknamefield =>
                                this.setState({ nicknamefield })
                            }
                            value={this.state.nicknamefieldRef}
                            style={styles.inputStyles}
                            placeholder="Nickname"
                            underlineColorAndroid="transparent"
                            placeholderTextColor="#a0abba"
                        />
                    </View>
                    <View style={styles.wrapField}>
                        <Image
                            source={require("../images/icoEmail.png")}
                            style={styles.fieldIco}
                        />
                        <TextInput
                            ref="emailfieldRef"
                            onChangeText={emailfield =>
                                this.setState({ emailfield })
                            }
                            value={this.state.emailfield}
                            style={styles.inputStyles}
                            placeholder="Email"
                            underlineColorAndroid="transparent"
                            placeholderTextColor="#a0abba"
                            keyboardType="email-address"
                        />
                    </View>
                    <View style={styles.wrapField}>
                        <Image
                            source={require("../images/icoPhone.png")}
                            style={styles.fieldIco}
                        />
                        <TextInput
                            ref="phonefieldRef"
                            onChangeText={phonefield =>
                                this.setState({ phonefield })
                            }
                            value={this.state.phonefield}
                            style={styles.inputStyles}
                            placeholder="Mobile Number"
                            underlineColorAndroid="transparent"
                            placeholderTextColor="#a0abba"
                            keyboardType="phone-pad"
                        />
                    </View>
                    <View style={styles.wrapField}>
                        <Image
                            source={require("../images/icoPassword.png")}
                            style={styles.fieldIco}
                        />
                        <TextInput
                            ref="passwordfieldRef"
                            secureTextEntry={true}
                            onChangeText={passwordfield =>
                                this.setState({ passwordfield })
                            }
                            value={this.state.passwordfield}
                            style={styles.inputStyles}
                            placeholder="Password"
                            underlineColorAndroid="transparent"
                            placeholderTextColor="#a0abba"
                        />
                    </View>
                    <View style={styles.wrapField}>
                        <Image
                            source={require("../images/icoPassword.png")}
                            style={styles.fieldIco}
                        />
                        <TextInput
                            ref="copasswordfieldRef"
                            secureTextEntry={true}
                            onChangeText={copasswordfield =>
                                this.setState({ copasswordfield })
                            }
                            value={this.state.copasswordfield}
                            style={styles.inputStyles}
                            placeholder="Confirm Password"
                            underlineColorAndroid="transparent"
                            placeholderTextColor="#a0abba"
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.signInBut}
                        onPress={this.filterField.bind(this)}
                    >
                        <Text style={styles.signInText}>SIGN UP</Text>
                    </TouchableOpacity>
                    <Text style={styles.doesntText}>
                        By clicking Sign Up, I agree to the
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigate("", { screen: "" })}
                    >
                        <Text style={styles.signUpButton}>
                            Terms and Conditions
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Image
                        source={require("../images/backButton.png")}
                        style={styles.backImg}
                    />
                </TouchableOpacity>
            </View>
        );
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
        alignSelf: "stretch"
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: "center"
    },
    headerLogo: {
        marginTop: Platform.OS == "ios" ? 150 : 40,
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
        marginTop: 15,
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
        fontFamily: "CircularStd-Book",
        fontSize: 17,
        color: "#c40d42",
        paddingLeft: 15,
        paddingRight: 15
    },
    signInBut: {
        marginTop: 30,
        backgroundColor: "#c40d42",
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
        fontFamily: "CircularStd-Bold",
        color: "#ffffff"
    },
    doesntText: {
        marginTop: 30,
        fontFamily: "CircularStd-Book",
        fontSize: 16,
        color: "#a0abba"
    },
    signUpButton: {
        marginTop: 4,
        marginBottom: 40,
        fontFamily: "CircularStd-Black",
        fontSize: 16,
        color: "#a0abba"
    }
});