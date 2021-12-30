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
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../../NewAppScreen';
import {Header} from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'

import DeviceInfo from 'react-native-device-info'
var iPhoneX = DeviceInfo.hasNotch()

const {width, height} = Dimensions.get('window')

export default class ProductScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			dataSource: [],
			catId: this.props.navigation.state.params.catId
		};
	}

	componentDidMount(){
	console.log(this.state.segId)
		fetch("https://ftwventures.com.my/index.php?route=api/product&category="+ this.state.catId)
			.then(response => response.json())
			.then((responseJson)=> {
				this.setState({
					loading: false,
					dataSource: responseJson.products
				})
			})
		.catch(error=>console.log(error)) //to catch the errors if any
	}

	FlatListItemSeparator = () => {
		return (
			<View style={{
				 height: .5,
				 width:"100%",
				 backgroundColor:"rgba(0,0,0,0.5)",
				}}
			/>
		);
	}

	renderThumbs(item) {
		if (item.item.thumb == 'placeholder.png'){
			return (
			<Image
					source={require('../../images/no-image-icon.png')}
					style={styles.imageThumbnail}
			/>
		)}else{
			return (
			<Image
					source={{uri: item.item.thumb}}
					style={styles.imageThumbnail}
			/>
		)}
	}
	
	renderLeft() {
			const {navigate} = this.props.navigation
			return (
					<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
							<Ionicons name={'ios-arrow-back-circle'} size={30} color={'yellow'} style={{paddingTop: 0}} />
					</TouchableOpacity>
			);
	}

	renderCenter() {
			return <Image source={require('../../images/dirtpit-logo-181x43.png')} />
	}

  render() {
		const {navigate} = this.props.navigation
		if (this.state.loading){
			return(
				<View style={styles.loader}>
					<ActivityIndicator size="large" color="#0c9" />
				</View>
			)
		}else if (this.state.dataSource){
// 		var list = this.state.dataSource.filter(item => item.category_id === this.state.catId)
// 		console.log('-------------------- ')
// 		console.log(this.state.dataSource)
// 		console.log('=====================')
			return(
				<View style={styles.MainContainer}>
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
						renderItem={item => (

								<View style={{ flex: 1, flexDirection: 'column', margin: 1}}>
									<TouchableOpacity
											onPress={() =>
													navigate('Details', {
															prevScreenTitle: 'Details',
															prodId: item.item.product_id,
													})
											}
											>
											{this.renderThumbs(item)}
											<View style={styles.rowTextContent}>
													<Text allowFontScaling={false} style={styles.rowMessage}>
														{item.item.name}
													</Text>
													<Text allowFontScaling={false} style={styles.rowPrice}>
														{item.item.price}
													</Text>
											</View>

									</TouchableOpacity>
								</View>
// 								}									
									
							)}
						numColumns={2}
						keyExtractor={item=>item.product_id}
					/>
				</View>
			)
		}else{
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
																Platform.OS == 'ios' ? (iPhoneX ? 20 : 0) : -20,
														top:
																Platform.OS == 'ios' ? (iPhoneX ? -15 : 0) : -5,
														height: 70,
												}}
										/>
                    <View style={styles.cantLocate}>
                        <Image
                            source={require('../../images/noNoti.png')}
                            style={styles.cantLocateImg}
                        />
                        <Text allowFontScaling={false} style={styles.cantLocateText}>
                            More Products soon...
                        </Text>
                    </View>
                </View>
            )
		}
		
//     return (
//     	<ScrollView >
//       <View style={styles.flexContainer}>
//         <View style={styles.testBox} >
//         	<Text allowFontScaling={false} style={styles.sectionTitle} > title </Text>
//         </View>
//         <View style={styles.testBox} >
//         	<Text allowFontScaling={false} style={styles.sectionTitle} > title </Text>
//         </View>
//         <View style={styles.testBox} >
//         	<Text allowFontScaling={false} style={styles.sectionTitle} > title </Text>
//         </View>
//         <View style={styles.testBox} >
//         	<Text allowFontScaling={false} style={styles.sectionTitle} > title </Text>
//         </View>
//         <View style={styles.testBox} >
//         	<Text allowFontScaling={false} style={styles.sectionTitle} > title </Text>
//         </View>
//         <View style={styles.testBox} >
//         	<Text allowFontScaling={false} style={styles.sectionTitle} > title </Text>
//         </View>
//         <View style={styles.testBox} >
//         	<Text allowFontScaling={false} style={styles.sectionTitle} > title </Text>
//         </View>
//       </View>
//       </ScrollView>
//     );


  }
};

const styles = StyleSheet.create({
	MainContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
    width: (width/2)-5,
    padding: 2
  },
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
        height: 105,
        backgroundColor: '#ffffff',
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    rowIcon: {
        width: 100,
        height: 100,
        marginLeft: 20,
    },
    rowTextContent: {
        alignSelf: 'stretch',
        height: 105,
        marginLeft: 10,
        justifyContent: 'center',
        flex: 1,
    },
    rowMessage: {
        color: '#3f3f3f',
        fontFamily: 'Gotham-Light',
        fontSize: 14,
        paddingRight: 5,
    },
    rowPrice: {
        color: '#3f3f3f',
        fontSize: 13,
        paddingRight: 10,
        color: 'green',
    },
    rowTime: {
        color: '#a0abba',
        fontSize: 13,
    },
});