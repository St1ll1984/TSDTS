import { Documents } from '../types/type';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './ui/Card';
import { COLORS } from '../const/colors';

interface DocumentListItemProps {
	document: Documents[];
}

export default function DocumentsListItem({ document }: DocumentListItemProps) {
	const quantityItemsInDocument = document.length;
	const options: Intl.DateTimeFormatOptions = {
		weekday: 'short',
		year: '2-digit',
		month: 'numeric',
		day: 'numeric',
	};
	const departureTimeStampToDate = new Date(
		document[0]?.departuredate,
	).toLocaleDateString('RU', options);

	return (
		<Card>
			<View style={styles.container}>
				<View style={{ alignItems: 'center' }}>
					<Ionicons name="cart-outline" size={50} color="black" />
					<Text
						style={[styles.text, styles.textAccent, { color: COLORS.darkGrey }]}
					>
						{quantityItemsInDocument} поз.
					</Text>
				</View>
				<View>
					<Text style={styles.text}>
						Дата отгрузки:{' '}
						<Text style={styles.textAccent}>{departureTimeStampToDate}</Text>
					</Text>
					<Text style={styles.text}>
						№ упаковки:{' '}
						<Text style={styles.textAccent}>{document[0].docNumber}</Text>
					</Text>
					<Text style={styles.text}>
						Контрагент:{' '}
						<Text style={styles.textAccent}>{document[0].counterparty}</Text>
					</Text>
				</View>
			</View>
		</Card>
	);
}

const styles = StyleSheet.create({
	image: {
		alignContent: 'center',
		alignItems: 'stretch',
		justifyContent: 'center',
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		// gap: 15,
	},
	text: {
		fontSize: 16,
		// height: 50,
		// justifyContent: 'center',
		// color: 'black',
		// marginBottom: 12,
		// alignContent: 'center',
	},
	textAccent: {
		fontWeight: 'bold',
		fontStyle: 'italic',
	},
});
