import React, {Component, createRef} from 'react';
import {
	Text,
	View,
	ScrollView,
	Image,
	StyleSheet,
	Dimensions,
	FlatList,
} from 'react-native';
let CurrentSlide = 0;
let IntervalTime = 4000;

export default class Slider extends Component {
	flatList = createRef();
	// TODO _goToNextPage()
	_goToNextPage = () => {
		if (CurrentSlide >= this.state.link.length-1) CurrentSlide = 0;
		this.flatList.current.scrollToIndex({
			index: ++CurrentSlide,
			animated: true,
		});
	};
	
	_startAutoPlay = () => {
		this._timerId = setInterval(this._goToNextPage, IntervalTime);
	};
	
	_stopAutoPlay = () => {
		if (this._timerId) {
			clearInterval(this._timerId);
			this._timerId = null;
		}
	};
	
	componentDidMount() {
		this._stopAutoPlay();
		this._startAutoPlay();
	}
	
	componentWillUnmount() {
		this._stopAutoPlay();
	}
	// TODO _renderItem()
	_renderItem({item, index}) {
// 	console.warn(item);
		return <Image source={{uri: item}} style={styles.sliderItems} />;
	}
	// TODO _keyExtractor()
	_keyExtractor(item, index) {
		// console.log(item);
		return index.toString();
	}
	state = {
		link: [
        "https://ftwventures.com.my/image/catalog/app/slider/Cafe.png",
        "https://ftwventures.com.my/image/catalog/app/slider/FTWRacingRetail.jpg",
        "https://ftwventures.com.my/image/catalog/app/slider/MotoManiac.jpg",
		],
	};
	
	render() {
		return (
			<View style={{marginTop: 10, marginBottom: 10, backgroundColor:'yellow'}}>
				<FlatList
					style={{
						flex: 1,
					}}
					data={this.state.link}
					keyExtractor={this._keyExtractor.bind(this)}
					renderItem={this._renderItem.bind(this)}
					horizontal={true}
					flatListRef={React.createRef()}
					ref={this.flatList}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
sliderItems: {
	marginLeft: 5,
	marginRight: 5,
	height: 200,
	width: Dimensions.get('window').width,
},
});