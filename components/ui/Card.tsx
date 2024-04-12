import { View, ViewStyle } from 'react-native';

interface CardProps extends React.PropsWithChildren {
	style?: ViewStyle;
}

export default function Card({ children, style = {} }: CardProps) {
	return (
		<View
			style={{
				padding: 10,
				// paddingHorizontal: 10,
				// paddingVertical: 15,
				borderRadius: 5,
				backgroundColor: 'lightblue',
				elevation: 5,
				// shadowColor: '#000',
				// shadowRadius: 8,
				// shadowOffset: { height: 100, width: 0 },
				// shadowOpacity: 0.8,
				...style,
			}}
		>
			{children}
		</View>
	);
}
