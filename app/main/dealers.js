import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  SectionList,
  View,
  Text,
  StatusBar,
  Alert,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../NewAppScreen';
import {Header} from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {showLocation} from 'react-native-map-link'
import DeviceInfo from 'react-native-device-info'
var iPhoneX = DeviceInfo.hasNotch()

const {width, height} = Dimensions.get('window')

const DATA_A = [
					{
							"store_id": "1",
							"image": "http://demo.shortcircuitworks.com/dirtpit23/image/catalog/app/kota.jpg",
							"category": "moto",
							"dealer_name": "FUNSPORTZ CYCLE",
							"retail_name": "FUNSPORTZ CYCLE SDN BHD",
							"description": "",
							"in_charge": "CHEAH ING SHERN",
							"contact_no": "016-2633003",
							"email": "",
							"city": "Petaling Jaya",
							"state": "Selangor",
							"address": "B-G 20, 10 BOULEVARD, JALAN PJU 6A, 47400 Petaling Jaya, Selangor",
							"meta_keyword": "",
							"latitude": "3.111399",
							"longitude": "101.639474"
					},
					{
							"store_id": "2",
							"image": "http://demo.shortcircuitworks.com/dirtpit23/image/catalog/app/kota.jpg",
							"category": "moto",
							"dealer_name": "AWANG TUM TUM CYCLES",
							"retail_name": "AWANG TUM TUM CYCLES",
							"description": "",
							"in_charge": "RADZUAN ABD JALIL",
							"contact_no": "+673 899 3659",
							"email": "",
							"city": "BANDAR SERI BEGAWAN",
							"state": "BRUNEI",
							"address": "NO. , SIMPANG 709, JERUDONG, BANDAR SERI BEGAWAN, BRUNEI",
							"meta_keyword": "",
							"latitude": "3.111399",
							"longitude": "101.639474"
					}
			];

    const A = [
    		{'id':'1','value':'Afghanistan'}, 
    		{'id':'2','value':'Afghanistan'},
        {'id':'3','value':'Afghanistan'}
    ];
    const B = [
				{'id':'4','value':'Benin'}, 
				{'id':'5','value':'Bhutan'}, 
				{'id':'6','value':'Bosnia'}, 
				{'id':'7','value':'Botswana'}, 
				{'id':'8','value':'Brazil'}, 
				{'id':'9','value':'Brunei'}, 
				{'id':'10','value':'Bulgaria'},
		];
    const C = [
				{'id':'11','value':'Cambodia'}, 
				{'id':'12','value':'Cameroon'}, 
				{'id':'13','value':'Canada'}, 
				{'id':'14','value':'Cabo'}
    ];
             
const DATA = [
  {
    "title": "PERLIS",
    "data": [
			{
				"contact_no": "014-6337297", 
				"in_charge": "MUHAMMAD NAIM ", 
				"email": "axicontrading@gmail.com", 
				"retail_name": "VITA CYCLE", 
				"city": "ARAU, PERLIS", 
				"address": "NO. 14, JALAN SEMBILAN TAMAN PAUH INDAH, PAUH, 02600 ARAU, PERLIS", 
				"store_id": 1, 
				"dealer_name": "AXICON TRADING"
			}
    ]
  }, 
  {
    "title": "PERAK",
    "data": [
			{
				"contact_no": "012-3833902", 
				"in_charge": "DESMOND", 
				"email": "support@bikesgallery.com.my", 
				"retail_name": "BIKES GALLERY GIANT BICYCLE IPOH", 
				"city": "IPOH, PERAK ", 
				"address": " 6, PERSIARAN SILIBIN UTARA, KAWASAN PERKILANGAN JELAPANG 30020 ", 
				"store_id": 2, 
				"dealer_name": "EE EE BIKES GALLERY"
			}
    ]
  }, 
  {
    "title": "PENANG",
    "data": [
			{
				"contact_no": "011-1301 8552", 
				"in_charge": "MUHAMMAD FARHAN", 
				"email": "ProSportApparel01@gmail.com", 
				"retail_name": "AMJ CYCLE STATION", 
				"city": "KEPALA BATAS, PENANG", 
				"address": "JALAN DAGANGAN 10, 13200", 
				"store_id": 3, 
				"dealer_name": "FD BICYCLE"
			}
    ]
  }, 
  {
    "title": "KEDAH",
    "data": [
			{
				"contact_no": 176325447, 
				"in_charge": "BOY", 
				"email": "boysikalworks@gmail.com", 
				"retail_name": "BOYSIKAL WORKS", 
				"city": "ALOR SETAR, KEDAH", 
				"address": "141, JALAN SHAHAB 8, KOMPLEKS SHAHAB PERDANA, 05150 A.SETAR", 
				"store_id": 4, 
				"dealer_name": "BOYSIKAL WORKS"
			}
    ]
  },
  {
    "title": "SELANGOR",
    "data": [
			{
				"contact_no": "016-2633003", 
				"in_charge": "CHEAH ING SHERN", 
				"email": "cheah.funsportzcycles@gmail.com", 
				"retail_name": "FUNSPORTZ CYCLE", 
				"city": "PETALING JAYA SELANGOR ", 
				"address": "B-G 20, 10 BOULEVARD, JALAN PJU 6A, 47400 ", 
				"store_id": 5, 
				"dealer_name": "FUNSPORTZ CYCLE SDN BHD"
			}, 
			{
				"contact_no": "03-6186 2653", 
				"in_charge": "SAMY", 
				"email": "samybicycle@gmail.com", 
				"retail_name": "R.N. SAMY BICYCLE", 
				"city": "TAMAN BATU CAVES", 
				"address": "NO. 13 A-G, PLAZA UMNO, JALAN BATU CAVES, TAMAN BATU CAVES 68100", 
				"store_id": 6, 
				"dealer_name": "SYARIKAT R.N. SAMY"
			}, 
			{
				"contact_no": "019-5081865", 
				"in_charge": "EZAM MALIK", 
				"email": "prestigeadventure@gmail.com", 
				"retail_name": "CYCLE LABZ", 
				"city": "PUTRAJAYA, SELANGOR", 
				"address": "NO 19, JLN PINGGIRAN PUTRA 4A/14, DESA PINGGIRAN PUTRA, 43000 ", 
				"store_id": 7, 
				"dealer_name": "CYCLE LABZ"
			}, 
			{
				"contact_no": "019-3885214", 
				"in_charge": "AZLAN", 
				"email": "lanazbest@gmail.com", 
				"retail_name": "BICYCLE EXTREME SPORTS", 
				"city": "KLANG, SELANGOR", 
				"address": "LOT 3435-C, JALAN SUNGAI JATI, 41000 KLANG, SELANGOR", 
				"store_id": 8, 
				"dealer_name": "BICYCLE EXTREME SPORTS"
			}, 
			{
				"contact_no": "019-3019013", 
				"in_charge": "BOSS", 
				"email": "bikeprobicycle@gmail.com", 
				"retail_name": "BIKE PRO CENTRE", 
				"city": "PETALING JAYA, SELANGOR ", 
				"address": "17, JALAN SS 23/15, TAMAN SEA 47400 PJ, SELANGOR", 
				"store_id": 9, 
				"dealer_name": "BIKE PRO CENTRE"
			}
    ]
  }, 
  {
    "title": "W.P. KUALA LUMPUR",
    "data": [
			{
				"contact_no": "012-6459560", 
				"in_charge": "AKMAL", 
				"email": "akmal@the basikal.com", 
				"retail_name": "THE BASIKAL", 
				"city": "BANGSAR", 
				"address": "89-1 JALAN BANGSAR, BANGSAR 59200 SELANGOR", 
				"store_id": 10, 
				"dealer_name": "CYCLING GEAR BIKE CENTRE"
			}
    ]
  }, 
  {
    "title": "NEGERI SEMBILAN",
    "data": [
			{
				"contact_no": "013-2490762", 
				"in_charge": "NAZIM", 
				"email": "nazimmx5@yahoo.com", 
				"retail_name": "LASAK PRORIDE", 
				"city": "BANDAR ENSTEK, NEGERI SEMBILAN", 
				"address": "NO 95, MERCATO BANDAR ENSTEK, 6/2D, JLN TIMUR 5/1, BANDAR BARU ENSTEK", 
				"store_id": 11, 
				"dealer_name": "LASAK PRORIDE"
			}, 
			{
				"contact_no": "012-9174110", 
				"in_charge": "MOHAMMAD ZAIRIE", 
				"email": "zairie@spedazone.com.my", 
				"retail_name": "SPEDAZONE", 
				"city": "SEREMBAN, NEGERI SEMBILAN ", 
				"address": "NO. 5, JALAN CATTLEYA 2, PERSADA CATTLEYA, SEREMBAN", 
				"store_id": 12, 
				"dealer_name": "HOT PURSUIT"
			}, 
			{
				"contact_no": "013-2490762", 
				"in_charge": "NAZIM", 
				"email": "nazimmx5@yahoo.com", 
				"retail_name": "KEDAI BASIKAL PERPATIH", 
				"city": "SENAWANG, NEGERI SEMBILAN", 
				"address": "1,,JALAN DESA ANGGERIK 7, TAMAN DESA ANGGERIK", 
				"store_id": 13, 
				"dealer_name": "LASAK PRORIDE"
			}
    ]
  }, 
  {
    "title": "JOHOR",
    "data": [
			{
				"contact_no": "013-7247959", 
				"in_charge": "NIZAM", 
				"email": "nizamnegro@gmail.com", 
				"retail_name": "NEG BICYCLE SHOP", 
				"city": "BATU PAHAT, JOHOR", 
				"address": "G16 , 17 , PESTA KENANGAN DATO ONN; 83000 BATU", 
				"store_id": 14, 
				"dealer_name": "NEG BICYCLE SHOP"
			}, 
    ]
  }, 
  {
    "title": "BRUNEI",
    "data": [
			{
				"contact_no": "673 899 3659", 
				"in_charge": "RADZUAN ABD JALIL", 
				"email": "radzuan@awangtumtumcycles.com", 
				"retail_name": "AWANG TUM TUM CYCLES", 
				"city": "BRUNEI", 
				"address": "NO. , SIMPANG 709, JERUDONG, BANDAR SERI BEGAWAN, BRUNEI", 
				"store_id": 15, 
				"dealer_name": "AWANG TUM TUM CYCLES"
			}
		]
  }, 
  {
    "title": "PAHANG ",
    "data": [
			{
				"contact_no": "012-9522488", 
				"in_charge": "TAN KUAN ANN", 
				"email": "Jack910401@hotmail.com ", 
				"retail_name": "KUANTAN MOUNTAIN BIKE CENTRE", 
				"city": "KUANTAN, PAHANG ", 
				"address": "B-170, GRD FLOOR, JALAN DATO\u2019 LIM HOE LEK, 25200", 
				"store_id": 16, 
				"dealer_name": "KUANTAN MOUNTAIN BIKE CENTRE"
			}
    ]
  }
];

export default class DealersScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			dataSource: [],
		};
	}

	componentDidMount(){
// 	console.log(this.state.segId)
		fetch("http://demo.shortcircuitworks.com/dirtpit23/index.php?route=api/dealers&dealers")
			.then(response => response.json())
			.then((responseJson)=> {
				this.setState({
					loading: false,
					dataSource: responseJson.dealers
				})
			})
		.catch(error=>console.log(error)) //to catch the errors if any
	}
// 
// 	FlatListItemSeparator = () => {
// 		return (
// 			<View style={{
// 				 height: .5,
// 				 width:"100%",
// 				 backgroundColor:"rgba(0,0,0,0.5)",
// 				}}
// 			/>
// 		);
// 	}

  GetSectionListItem = item => {
    //Function for click on an item
    Alert.alert(item);
  };
  
  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
    );
  };
  
	renderLeft() {
			const {navigate} = this.props.navigation
			return (
					<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
							<Ionicons name={'ios-arrow-dropleft-circle'} size={30} color={'yellow'} style={{paddingTop: 0}} />
					</TouchableOpacity>
			);
	}

	renderCenter() {
			return <Image source={require('../images/DirtPit_logo-180x35.png')} />
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
// 		var list = this.state.dataSource.filter(item => item.top === "1")
// 		console.log('-------------------- ')
// 		console.log(list)
// 		console.log('=====================')

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
									height: Platform.OS == 'ios' ? (iPhoneX ? 90 : 0) : 70,
							}}
					/>
        <SectionList
          ItemSeparatorComponent={this.FlatListItemSeparator}
          sections={DATA}
          renderSectionHeader={({ section }) => (
            <Text style={styles.SectionHeaderStyle}> {section.title} </Text>
          )}
						renderItem={item => (
							<TouchableOpacity
									onPress={() =>
										showLocation({
												dialogTitle: 'Open map application',
												dialogMessage:
														'Get directions to "' +
														item.item.dealer_name +
														'" using selected app',
												latitude: item.item.latitude,
												longitude: item.item.longitude,
										})
									}
									style={styles.rowWrap}>
									<View style={styles.rowTextContent}>
											<Text allowFontScaling={false} style={styles.rowMessage}>
												{item.item.dealer_name}
											</Text>
											<Text allowFontScaling={false} style={styles.rowTime}>
												{item.item.address}
											</Text>
											<Text allowFontScaling={false} style={styles.rowTime}>
												{item.item.in_charge}{': '}{item.item.contact_no}
											</Text>
									</View>
							</TouchableOpacity>
						)}
          keyExtractor={(item, index) => index}
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
                            source={require('../images/DirtPit_icon_1024.png')}
                            style={styles.cantLocateImg}
                        />
                        <Text allowFontScaling={false} style={styles.cantLocateText}>
                            More Contents soon...
                        </Text>
                    </View>
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
        height: 100,
        backgroundColor: '#ffffff',
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    rowIcon: {
        width: 120,
        height: 120,
        marginLeft: 20,
    },
    rowTextContent: {
        alignSelf: 'stretch',
        height: 100,
        marginLeft: 10,
        justifyContent: 'center',
        flex: 1,
    },
    rowMessage: {
        color: '#3f3f3f',
        fontSize: 25,
    },
    rowTime: {
        color: '#a0abba',
        fontSize: 15,
    },
  SectionHeaderStyle: {
    backgroundColor: 'yellow',
    fontSize: 20,
    padding: 5,
    color: 'black',
  },
  SectionListItemStyle: {
    fontSize: 15,
    color: '#000',
    backgroundColor: '#F5F5F5',
  },
});