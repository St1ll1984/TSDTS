import React from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	StyleProp,
	ViewStyle,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../const/colors';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigatorProp } from '../types/type';

interface IBottomBarProps {
	login?: boolean;
	menu?: boolean;
	config: boolean;
	style?: StyleProp<ViewStyle>;
}

const BottomBar = ({ login, menu, style }: IBottomBarProps) => {
	const navigation = useNavigation<HomeStackNavigatorProp>();
	return (
		<View style={[styles.ButtonWrapper, style]}>
			{login && (
				<TouchableOpacity
					activeOpacity={0.6}
					style={styles.button}
					onPress={() => navigation.navigate('Login')}
				>
					<MaterialIcons name="login" size={35} style={styles.buttonIcon} />
				</TouchableOpacity>
			)}
			{menu && (
				<TouchableOpacity
					activeOpacity={0.6}
					style={styles.button}
					onPress={() => navigation.navigate('Menu')}
				>
					<MaterialIcons name="menu-book" size={35} style={styles.buttonIcon} />
				</TouchableOpacity>
			)}
			<TouchableOpacity
				activeOpacity={0.6}
				style={styles.button}
				onPress={() => navigation.navigate('Config')}
			>
				<MaterialIcons name="settings" size={35} style={styles.buttonIcon} />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	ButtonWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonIcon: {
		color: COLORS.darkBlue,
	},
});

export default BottomBar;
