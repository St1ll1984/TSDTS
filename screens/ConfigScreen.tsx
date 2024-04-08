import React, { useEffect, useRef, useState } from 'react';
import {
	Keyboard,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeStackNavigatorProp, IUserJSON } from '../types/type';
import getUsers from '../api/getUsers';
import { ButtonCustom, Dropdown, Loader } from '../components';
import { COLORS } from '../const/colors';
import { useNavigation } from '@react-navigation/native';

const ConfigScreen = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [company, setCompany] = useState<string>('');
	// const [users, setUsers] = useState<IUserJSON[]>([]);
	// const [currentUser, setCurrentUser] = useState<IUserJSON>();
	const inputRef = useRef<TextInput | null>(null);
	const navigation = useNavigation<HomeStackNavigatorProp>();

	// const getSavedInfoConfig = async (key: string) => {
	// 	try {
	// 		const savedInfo = await AsyncStorage.getItem(key);
	// 		if (savedInfo !== null) {
	// 			return JSON.parse(savedInfo);
	// 		}
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// 	return null;
	// };

	// const loadSavedInfo = async (key: string, func: (value: any) => void) => {
	// 	const savedInfo = await getSavedInfoConfig(key);
	// 	func(savedInfo);
	// };

	// useEffect(() => {
	// 	loadSavedInfo('allUsersInStorage', setUsers);
	// 	loadSavedInfo('currentUserInStorage', setCurrentUser);
	// 	loadSavedInfo('companyInStorage', setCompany);
	// }, []);

	// const fetchUsers = async () => {
	// 	try {
	// 		const usersFromAPI = await getUsers();
	// 		setUsers(usersFromAPI);
	// 		await AsyncStorage.setItem('allUsersInStorage', JSON.stringify(users));
	// 	} catch (error) {
	// 		console.log(error);
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// };

	// const handlePressButton = async () => {
	// 	Keyboard.dismiss();
	// 	setIsLoading(true);
	//
	// 	await fetchUsers();
	// 	inputRef.current?.clear();
	// };

	const handleChangeInput = async (value: string) => {
		setCompany(value);
		// await AsyncStorage.setItem('companyInStorage', JSON.stringify(value));
	};

	return (
		<KeyboardAvoidingView style={styles.container} behavior="height">
			<Loader visible={isLoading} />
			<View style={{ flex: 1, justifyContent: 'space-between' }}>
				<View>
					<Text style={styles.subtitle}>ЄДРПОУ: {company}</Text>
					<TextInput
						style={
							company
								? [styles.input, { borderColor: COLORS.grey }]
								: styles.input
						}
						ref={inputRef}
						placeholder="ЄДРПОУ"
						value={company}
						keyboardType="numeric"
						onChangeText={(value) => handleChangeInput(value)}
					/>
					<ButtonCustom
						title={'Save'}
						disabled={!company}
						onPress={() => navigation.navigate('Login')}
					/>
				</View>
				<View style={{ gap: 20 }}>
					<ButtonCustom
						title={'Обновить задания'}
						disabled={!company}
						// onPress={handlePressButton}
					/>
					<ButtonCustom
						title={'Обновить пользователей'}
						disabled={!company}
						// onPress={handlePressButton}
					/>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'stretch',
		backgroundColor: COLORS.white,
		padding: 15,
	},
	subtitle: {
		fontSize: 20,
		marginHorizontal: 15,
	},
	input: {
		backgroundColor: COLORS.white,
		borderColor: COLORS.red,
		width: '100%',
		borderWidth: 1,
		borderRadius: 8,
		padding: 10,
		height: 45,
		marginHorizontal: 'auto',
		marginTop: 5,
		marginBottom: 10,
		fontSize: 20,
	},
	dropdownWrapper: {
		marginTop: 20,
		marginBottom: 50,
	},
});

export default ConfigScreen;
