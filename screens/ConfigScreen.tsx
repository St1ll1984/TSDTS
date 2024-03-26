import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigatorProp, IUser } from '../types/type';
import { TextInput } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usersDb from '../temporaryDB/users';

const ConfigScreen = () => {
	const [company, setCompany] = useState<string>('');
	const [users, setUsers] = useState<IUser[]>([]);
	const [currentUser, setCurrentUser] = useState<IUser>();
	const onPressCompanyBtn = () => {
		setUsers(usersDb);
	};

	return (
		<View style={styles.container}>
			<View>
				<View>
					<Text>ЄДРПОУ</Text>
					<TextInput
						style={
							company ? [styles.input, { borderColor: 'gray' }] : styles.input
						}
						placeholder="ЄДРПОУ"
						value={company}
						keyboardType="numeric"
						onChangeText={(value) => setCompany(value)}
					/>
					<TouchableOpacity
						style={
							!company
								? [styles.button, { backgroundColor: 'gray' }]
								: styles.button
						}
						disabled={!company}
						onPress={onPressCompanyBtn}
					>
						<Text style={styles.buttonText}>Дальше</Text>
					</TouchableOpacity>
				</View>
			</View>
			{users.length > 0 ? (
				<View>
					<Text>FlatList</Text>
				</View>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#eee',
		padding: 15,
	},
	input: {
		backgroundColor: 'white',
		borderColor: 'red',
		width: '100%',
		borderWidth: 1,
		borderRadius: 8,
		padding: 10,
		height: 45,
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 5,
		marginBottom: 10,
		fontSize: 20,
	},
	inputFocus: {
		borderColor: 'green',
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 20,
		elevation: 3,
		backgroundColor: 'blue',
	},
	buttonText: {
		fontSize: 16,
		fontWeight: 'bold',
		letterSpacing: 1.2,
		textTransform: 'uppercase',
		color: 'white',
	},
});

export default ConfigScreen;
