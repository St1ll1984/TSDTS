import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigatorProp } from '../types/type';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IUser {
	id: string;
	extraID: string;
	name: string;
}

const ConfigScreen = () => {
	const [company, setCompany] = useState<string>('');

	const [users, setUsers] = useState<IUser[]>([]);
	console.log(company);

	return (
		<View>
			<View>
				<TextInput
					placeholder="ЄДРПОУ"
					value={company}
					keyboardType="numeric"
					onChangeText={(value) => setCompany(value.toString())}
				/>
			</View>
			{/*{users.length && <View></View>}*/}
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

export default ConfigScreen;
