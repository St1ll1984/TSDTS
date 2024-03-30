import React from 'react';
import {
	View,
	StyleSheet,
	useWindowDimensions,
	ActivityIndicator,
	Text,
} from 'react-native';
import { COLORS } from '../const/colors';

interface ILoaderProps {
	visible: boolean;
}
const Loader = ({ visible }: ILoaderProps) => {
	const { height, width } = useWindowDimensions();
	return (
		visible && (
			<View style={[styles.container, { height, width }]}>
				<View style={styles.loader}>
					<ActivityIndicator size={'large'} color={COLORS.blue} />
					<Text style={{ fontSize: 16 }}>Загрука пользователей...</Text>
				</View>
			</View>
		)
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'rgba(0,0,0,0.5)',
		zIndex: 10,
		position: 'absolute',
		justifyContent: 'center',
	},
	loader: {
		height: 70,
		backgroundColor: COLORS.white,
		marginHorizontal: 50,
		borderRadius: 5,
		flexDirection: 'row',
		gap: 20,
		alignItems: 'center',
		paddingHorizontal: 20,
	},
});
export default Loader;
