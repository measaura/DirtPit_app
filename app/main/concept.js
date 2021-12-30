import React, {Component} from 'react';
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
import {Colors} from '../NewAppScreen';
import { Header } from "react-native-elements";
import Ionicons from 'react-native-vector-icons/Ionicons'

import DeviceInfo from 'react-native-device-info'
var iPhoneX = DeviceInfo.hasNotch()

const {width, height} = Dimensions.get('window')

const randomHexColor = () => {
  return '#000000'.replace(/0/g, function() {
    return (~~(Math.random() * 16)).toString(16);
  });
};

const datArr = 4;

export default class ConceptList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			dataSource: []
		};
	}

	componentDidMount(){
		fetch("https://ftwventures.com.my/index.php?route=api/category&concept")
			.then(response => response.json())
			.then((responseJson)=> {
				this.setState({
					loading: false,
					dataSource: responseJson.categories
				})
			})
		.catch(error=>console.log(error)) //to catch the errors if any
	}

	FlatListItemSeparator = () => {
		return (
			<View style={{
				 height: 5,
				 width:"100%",
				 backgroundColor: '#fff',
				}}
			/>
		);
	}

	renderLeft() {
			const {navigate} = this.props.navigation
			return (
					<TouchableOpacity onPress={() => navigate('Home')}>
							<Ionicons name={'ios-home'} size={30} color={'yellow'} style={{paddingTop: 0}} />
					</TouchableOpacity>
			);
	}

	renderCenter() {
			return <Image source={require('../images/dirtpit-logo-181x43.png')} />
	}

  render() {
		const {navigate} = this.props.navigation
		if (this.state.loading){
			return(
				<View style={styles.loader}>
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
											Platform.OS == 'ios' ? (iPhoneX ? -10 : 0) : -10,
									height: Platform.OS == 'ios' ? (iPhoneX ? 90 : 95) : 70,
							}}
					/>
					<ActivityIndicator size="large" color="#0c9" />
				</View>
			)
		}else{
// 		var list = this.state.dataSource.filter(item => item.top === "1")
			return(
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
											Platform.OS == 'ios' ? (iPhoneX ? -10 : 0) : -5,
									height: Platform.OS == 'ios' ? (iPhoneX ? 90 : 95) : 70,
							}}
					/>
					<FlatList
						data={this.state.dataSource}
// 						renderItem={item => this.renderItem(item)}
						contentContainerStyle={{ flexGrow: 1 }}
						keyExtractor={item=>item.store_id.toString()}
						ItemSeparatorComponent = { this.FlatListItemSeparator }
						renderItem={item => (
// 							if ({item.item.top} == 1){

									<TouchableOpacity
											onPress={() =>
													navigate('ConceptScreen', {
															prevScreenTitle: 'ConceptScreen',
															storeId: item.item.store_id,
													})
											}
											>
											<ImageBackground
													source={{uri: item.item.image}}
													style={styles.rowBg}
											>
											<View style={styles.rowTextContent}>
													<Text allowFontScaling={false} style={styles.rowMessage}>
														{item.item.name}
													</Text>
											</View>
											</ImageBackground>
									</TouchableOpacity>

// 								}									

							)}
					/>
				</View>
			)
		}

  }
};


const styles = StyleSheet.create({
  scrollView: {
  	flex: 1,
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
    marginTop: 0,
    paddingHorizontal: 0,
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
  menuContainer: {
  	flexDirection: 'column',
  	justifyContent: 'center',
  	alignItems: 'center',
  	paddingTop: 40,
  	paddingBottom: 20
  },
  menuButton: {
  	width: 100,
  	height: 100,
  },
  menuBox: {
  	width: 100,
  	paddingBottom: 20,
  	flexDirection: 'column',
  	alignItems: 'center',
  },
  menuText: {
  	fontSize: 16,
  	fontWeight: 'bold',
  	marginTop: -10,
  },
  flexContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		height: 'auto',
	},
  testBox: {
		width: 150,
		height: 200,
		borderWidth: 1,
	},
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
        height: '25%',
        backgroundColor: '#ffffff',
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    rowIcon: {
        width: 100,
        height: 100,
        marginLeft: 20,
    },
    rowBg: {
        flexGrow:1, 
        height: Platform.OS == 'ios' ? (iPhoneX ? (height-90)/datArr : (height-60)/datArr) : (height-65)/datArr,
    },
    rowTextContent: {
        alignSelf: 'stretch',
        flex:1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    rowMessage: {
        color: '#fff',
        fontFamily: 'Gotham-Bold',
        fontSize: 18,
        paddingRight: 10,
        paddingLeft: 25,
        bottom: '40%',
    },
});