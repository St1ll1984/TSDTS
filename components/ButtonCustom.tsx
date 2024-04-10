import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../const/colors';

interface IButtonProps {
	disabled?: boolean;
	title?: string;
	onPress?: () => void;
	extraStyle?: string;
	children?: React.ReactNode;
	width?: number;
}

const ButtonCustom = ({
	title,
	disabled,
	children,
	onPress,
	width,
}: IButtonProps) => {
	return (
		<TouchableOpacity
			activeOpacity={0.6}
			style={[
				disabled
					? [styles.button, { backgroundColor: COLORS.grey }]
					: styles.button,
				{ width },
			]}
			disabled={disabled}
			onPress={onPress}
		>
			<Text style={styles.buttonText}>{title}</Text>
			{children}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		borderRadius: 10,
		elevation: 3,
		backgroundColor: COLORS.blue,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: 'bold',
		letterSpacing: 1.2,
		color: COLORS.light,
	},
});

export default ButtonCustom;
