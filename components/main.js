import React from "react";
import { 
	View, 
	TouchableOpacity, 
	Text, 
	FlatList, 
	SectionList,
	StyleSheet, 
	SafeAreaView, 
	Image 
} from "react-native"
import Collapsible from 'react-native-collapsible';
import { createStore } from 'redux'

function hotels(state = [], action) {
  switch (action.type) {
    case 'UPDATE':
      return [...action.data]
    default:
      return state
  }
}

let store = createStore(hotels)

// export default function AuthScreen() {
// 	React.useEffect(() => {
// 		const unsubscribe = store.subscribe(() => {
// 			setRestaurantsList(store.getState());
// 		});	

// 		return () => {
// 			unsubscribe();
// 		}
// 	}, []);

// 	const collapseBlock = (index) => {
// 		let list = restaurantsList;
// 		list[index].isCollapsed = !list[index].isCollapsed
// 		setRestaurantsList(list);
// 	}

// 	const renderBlock = (item, index) => {
// 		//	console.warn(item.restaurantName);
// 			return (
// 				<TouchableOpacity 
// 					style={styles.subCont} 
// 					onPress={() => collapseBlock(index)}
// 				>
// 					<View style={{flexDirection: 'row'}}>	
// 						<Image
// 							style={styles.restImage}
// 							resizeMode= "cover"
// 							source={{uri: item.restaurantImage}}
// 						/>	
// 						<Text style={styles.titleText}>{item.restaurantName}</Text>
// 					</View>
// 					<Collapsible collapsed={item.isCollapsed}>
// 						{/* TODO::: write code for no outlet */}
// 						{item.outlet.map((ele) => (
// 							<View style={styles.expandCont}>
// 								<Text style={styles.smallFont}>{ele.outletName}</Text>
// 							</View>
// 						))}
// 					</Collapsible>
// 				</TouchableOpacity>
// 			)
// 		}

// 		return (
// 			<SafeAreaView>
// 				<FlatList
// 					data={restaurantsList}
// 					renderItem={({item, index}) => renderBlock(item, index)}
// 					keyExtractor={item => JSON.stringify(item.restaurantId)}
// 				/>
// 			</SafeAreaView>
// 		);
// }

export default class AuthScreen extends React.Component {
	state = {
		restaurantsList: [],
		errorMessage: '',
	}

	componentDidMount(){
		this.getData();
		store.subscribe(() => {
			this.setState({ restaurantsList: store.getState() });
		});
	}

	getData = () => {
		let url = "https://eatoo.uberdoo.com/foodapp/public/api/guest/listRestaurant";

		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				latitude: 13.012345, 
				longitude: 80.123456
			})
		})
		.then(res => res.json())
		.then(resJson => {
			//console.warn("response", resJson);
			if (resJson !== "false") {
				let List = resJson.listRestaurants.map(ele => {
					ele.isCollapsed = true;
					return ele;
				});
				//console.warn("this is new object", List)
				store.dispatch({ type: 'UPDATE', data: List })
			}
		})
		.catch(err => console.warn("error", err))
	};

	collapseBlock = (index) => {
		let list = this.state.restaurantsList;
		list[index].isCollapsed = !list[index].isCollapsed
		this.setState({restaurantsList: list});
	}

	renderBlock = (item, index) => {
	//	console.warn(item.restaurantName);
		return (
			<TouchableOpacity 
				style={styles.subCont} 
				onPress={() => this.collapseBlock(index)}
			>
				<View style={{flexDirection: 'row'}}>	
					<Image
						style={styles.restImage}
						resizeMode= "cover"
        		source={{uri: item.restaurantImage}}
      		/>	
					<Text style={styles.titleText}>{item.restaurantName}</Text>
				</View>
				<Collapsible collapsed={item.isCollapsed}>
					{/* TODO::: write code for no outlet */}
					{item.outlet.map((ele) => (
						<View style={styles.expandCont}>
							<Text style={styles.smallFont}>{ele.outletName}</Text>
						</View>
					))}
  			</Collapsible>
  		</TouchableOpacity>
		)
	}

	render() {
		return (
			<SafeAreaView>
				<FlatList
					data={this.state.restaurantsList}
					renderItem={({item, index}) => this.renderBlock(item, index)}
					keyExtractor={item => JSON.stringify(item.restaurantId)}
				/>
			</SafeAreaView>
		)
	}
}


const styles = StyleSheet.create({
	titleText: {
		fontSize: 25,
		fontWeight: "bold",
	},
	smallFont: {
		fontSize: 15,
		marginLeft: 8,
		fontWeight: "bold",
		color: 'white',
	},
	subCont: {
    backgroundColor: 'white',
		marginVertical: 2,
		width: 380,
		flexDirection: 'column',
	},
	expandCont: {
    backgroundColor: 'steelblue',
    marginTop: 2,
		width: 380,
		padding: 12,
		flexDirection: 'column',
	},
	restImage: {
		height: 140,
		width: 140,
	},
});
