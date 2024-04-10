import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../const/colors';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigatorProp } from '../types/type';
import { ButtonIcon } from './index';

interface IBottomBarProps {
	login?: boolean;
	menu?: boolean;
	config: boolean;
	style?: StyleProp<ViewStyle>;
}

const BottomBar = ({ login, menu, style }: IBottomBarProps) => {
	const navigation = useNavigation<HomeStackNavigatorProp>();
	const sizeIcon = 35;
	return (
		<View style={[styles.ButtonWrapper, style]}>
			{login && (
				<ButtonIcon onPress={() => navigation.navigate('Login')}>
					<MaterialIcons
						name="login"
						size={sizeIcon}
						style={styles.buttonIcon}
					/>
				</ButtonIcon>
			)}
			{menu && (
				<ButtonIcon onPress={() => navigation.navigate('Menu')}>
					<MaterialIcons
						name="menu-book"
						size={sizeIcon}
						style={styles.buttonIcon}
					/>
				</ButtonIcon>
			)}
			<ButtonIcon onPress={() => navigation.navigate('Config')}>
				<MaterialIcons
					name="settings"
					size={sizeIcon}
					style={styles.buttonIcon}
				/>
			</ButtonIcon>
		</View>
	);
};

const styles = StyleSheet.create({
	ButtonWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
	},
	buttonIcon: {
		color: COLORS.grey,
	},
});

export default BottomBar;
