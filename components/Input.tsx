import React, { MutableRefObject, useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { COLORS } from '../const/colors';

interface InputProps extends React.PropsWithChildren {
	label?: string;
	error?: boolean;
	onFocus?: () => void;
	props?: InputProps;
	keyboardType?: 'default' | 'numeric';
	placeholder?: string;
	value?: string;
	onChangeText?: (text: string) => void;
	onEndEditing?: () => void | undefined;
	showSoftInputOnFocus?: boolean;
	autoFocus?: boolean;
	// children?: React.ReactNode;
}

const Input = ({ label, error, onFocus, children, ...props }: InputProps) => {
	const [isFocused, setIsFocused] = useState(false);
	return (
		<View>
			<Text style={styles.label}>{label}</Text>
			<View
				style={[
					styles.inputContainer,
					{
						borderColor: error
							? COLORS.red
							: isFocused
								? COLORS.blue
								: COLORS.darkGrey,
						alignItems: 'center',
					},
				]}
			>
				<TextInput
					autoCorrect={false}
					onFocus={() => {
						onFocus && onFocus();
						setIsFocused(true);
					}}
					onBlur={() => setIsFocused(false)}
					style={{ color: COLORS.black, flex: 1, textAlign: 'center' }}
					{...props}
				/>
				{children}
			</View>
			{error && (
				<Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12 }}>
					{error}
				</Text>
			)}
		</View>
	);
};
const styles = StyleSheet.create({
	label: {
		// marginVertical: 5,
		// fontSize: 14,
		color: COLORS.grey,
	},
	inputContainer: {
		position: 'relative',
		height: 40,
		borderColor: COLORS.darkGrey,
		borderWidth: 1,
		borderRadius: 5,
		// flexDirection: 'row',
		paddingHorizontal: 10,
	},
});
export default Input;
