import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigatorProp, IUserJSON } from '../types/type';
import { COLORS } from '../const/colors';
import React, { useState } from 'react';
import { BottomBar, Dropdown } from '../components';

const LoginScreen = () => {
	const [users, setUsers] = useState<IUserJSON[]>([]);
	const [currentUser, setCurrentUser] = useState<IUserJSON>();
	const navigation = useNavigation<HomeStackNavigatorProp>();

	const handlePressButton = () => {
		navigation.navigate('Menu');
	};
	return (
		<View style={styles.container}>
			<View style={styles.dropdownWrapper}>
				<Dropdown
					data={users}
					setData={setCurrentUser}
					currentUser={currentUser}
					onPress={handlePressButton}
				/>
			</View>
			<BottomBar config style={{ justifyContent: 'center' }} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		backgroundColor: COLORS.white,
		paddingHorizontal: 5,
		paddingTop: 80,
		paddingBottom: 15,
	},
	dropdownWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	ButtonWrapper: {
		alignItems: 'center',
	},
	button: {
		padding: 10,
		borderWidth: 2,
		borderColor: COLORS.blue,
		borderRadius: 8,
	},
});

export default LoginScreen;
