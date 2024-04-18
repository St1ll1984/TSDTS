import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../const/colors';
import { HomeStackNavigatorProp, IUserJSON } from '../types/type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import ButtonIcon from './ButtonIcon';

interface IDropdownProps {
	data: IUserJSON[];
	setData: (value: IUserJSON) => void;
	currentUser?: IUserJSON;
	onPress: () => void;
}

const Dropdown = ({ data, setData, currentUser, onPress }: IDropdownProps) => {
	const navigation = useNavigation<HomeStackNavigatorProp>();
	const handleSelect = async (value: IUserJSON) => {
		setData(value);
		await AsyncStorage.setItem('currentUserInStorage', JSON.stringify(value));
		navigation.navigate('Menu');
	};

	return (
		<SelectDropdown
			data={data}
			onSelect={(selectedItem) => handleSelect(selectedItem)}
			search
			renderButton={(selectedItem, isOpened) => {
				return (
					<View style={styles.dropdownButtonStyle}>
						<Text style={styles.dropdownButtonTxtStyle}>
							{/*{(selectedItem && selectedItem.name) || 'Выберите пользователя'}*/}
							{(currentUser && currentUser.name) || 'Выберите пользователя'}
						</Text>
						<AntDesign
							name={isOpened ? 'up' : 'down'}
							size={24}
							color={COLORS.black}
							style={styles.dropdownButtonArrowStyle}
						/>
						<ButtonIcon>
							<MaterialCommunityIcons
								name="send"
								size={30}
								color={COLORS.blue}
								onPress={onPress}
							/>
						</ButtonIcon>
					</View>
				);
			}}
			renderItem={(item, index, isSelected) => {
				return (
					<View
						style={{
							...styles.dropdownItemStyle,
							...(isSelected && { backgroundColor: COLORS.lightGrey }),
						}}
					>
						<Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
					</View>
				);
			}}
		/>
	);
};

const styles = StyleSheet.create({
	dropdownButtonStyle: {
		height: 50,
		backgroundColor: COLORS.lightGrey,
		borderRadius: 12,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	dropdownButtonTxtStyle: {
		flex: 1,
		fontSize: 18,
		fontWeight: '500',
		color: COLORS.black,
	},
	dropdownButtonArrowStyle: {
		fontSize: 24,
		marginRight: 10,
	},
	dropdownButtonIconStyle: {
		fontSize: 24,
		marginRight: 8,
	},
	dropdownMenuStyle: {
		backgroundColor: '#E9ECEF',
		borderRadius: 8,
	},
	dropdownItemStyle: {
		width: '100%',
		flexDirection: 'row',
		paddingHorizontal: 12,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 8,
	},
	dropdownItemTxtStyle: {
		flex: 1,
		fontSize: 18,
		fontWeight: '500',
		color: '#151E26',
	},
	dropdownItemIconStyle: {
		fontSize: 28,
		marginRight: 8,
	},
});

export default Dropdown;
