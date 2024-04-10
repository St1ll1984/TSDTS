import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../const/colors';

interface IButtonIconProps {
	onPress?: () => void;
	extraStyle?: string;
	children?: React.ReactNode;
	width?: number;
}

const ButtonIcon = ({ children, onPress, width }: IButtonIconProps) => {
	return (
		<TouchableOpacity
			activeOpacity={0.6}
			style={styles.button}
			onPress={onPress}
		>
			{children}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default ButtonIcon;
