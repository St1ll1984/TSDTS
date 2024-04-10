import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../const/colors';

interface IButtonProps {
	disabled?: boolean;
	title?: string;
	onPress?: () => void;
	children?: React.ReactNode;
}

const Button = ({ title, disabled, children, onPress }: IButtonProps) => {
	return (
		<TouchableOpacity
			activeOpacity={0.6}
			style={
				disabled
					? [styles.button, { backgroundColor: COLORS.grey }]
					: styles.button
			}
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
		paddingHorizontal: 32,
		borderRadius: 20,
		elevation: 3,
		backgroundColor: COLORS.blue,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: 'bold',
		letterSpacing: 1.2,
		// textTransform: 'uppercase',
		color: COLORS.light,
	},
});

export default Button;
