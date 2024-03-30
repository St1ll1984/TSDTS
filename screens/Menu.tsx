import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigatorProp } from '../types/type';
import { DocType } from '../types/enum';
import React from 'react';

//import ListScreen from "./ListScreen";

const HomeScreen = () => {
	const navigation = useNavigation<HomeStackNavigatorProp>();
	// constans DocumType = DocType;

	let Packages: DocType = DocType.Packages;
	console.log(Packages);
	return (
		<View style={styles.container}>
			<Button
				title="Упаковочные листы"
				onPress={() =>
					navigation.navigate('ListScreen', { paramName: DocType.Packages })
				}
			></Button>
			<Text> </Text>
			<Button
				title="Поступление товаров"
				onPress={() =>
					navigation.navigate('ListScreen', { paramName: DocType.Goodsreceipt })
				}
			></Button>
			<Text> </Text>
			<Button
				title="Инвентаризация"
				onPress={() =>
					navigation.navigate('ListScreen', {
						paramName: DocType.Goodsinventory,
					})
				}
			></Button>
			<StatusBar style="auto" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'stretch',
		justifyContent: 'center',
		textAlignVertical: 'auto',
	},
	button: {
		paddingTop: 100,
		paddingBottom: 100,
		borderRadius: 60,
	},
});

export default HomeScreen;
