// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigatorProp } from '../types/type';
import { DocType } from '../types/enum';
import React from 'react';
import { BottomBar, ButtonCustom } from '../components';

const HomeScreen = () => {
	const navigation = useNavigation<HomeStackNavigatorProp>();
	// constans DocumType = DocType;

	let Packages: DocType = DocType.Packages;
	// console.log(Packages);
	return (
		<View style={styles.container}>
			<View>
				<ButtonCustom
					title="Упаковочные листы"
					onPress={() =>
						navigation.navigate('ListScreen', { paramName: DocType.Packages })
					}
				></ButtonCustom>
				<Text> </Text>
				<ButtonCustom
					title="Поступление товаров"
					onPress={() =>
						navigation.navigate('ListScreen', {
							paramName: DocType.Goodsreceipt,
						})
					}
				></ButtonCustom>
				<Text> </Text>
				<ButtonCustom
					title="Инвентаризация"
					onPress={() =>
						navigation.navigate('ListScreen', {
							paramName: DocType.Goodsinventory,
						})
					}
				></ButtonCustom>
				{/*<StatusBar style="auto" />*/}
			</View>
			<BottomBar config login />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'stretch',
		justifyContent: 'space-between',
		textAlignVertical: 'auto',
		padding: 15,
	},
	ButtonWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
	},
});

export default HomeScreen;
