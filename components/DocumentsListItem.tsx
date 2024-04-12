import { Documents } from '../types/type';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './ui/Card';

interface DocumentListItemProps {
	document: Documents;
}

export default function DocumentsListItem({ document }: DocumentListItemProps) {
	return (
		<Card>
			<View style={styles.container}>
				<Ionicons name="cart-outline" size={50} color="black" />
				<View>
					<Text style={styles.text}>
						Дата отгрузки:{' '}
						<Text style={styles.textAccent}>{document.departuredate}</Text>
					</Text>
					<Text style={styles.text}>
						№ упаковки:{' '}
						<Text style={styles.textAccent}>{document.docNumber}</Text>
					</Text>
					<Text style={styles.text}>
						Контрагент:{' '}
						<Text style={styles.textAccent}>{document.counterparty}</Text>
					</Text>
					<Text style={styles.text}>
						Позиций: <Text style={styles.textAccent}>{5}</Text> //TODO need
						calculate qty rowNumber in docType
					</Text>
					{/*<Text style={styles.text}>*/}
					{/*	{document.articleName} {'\n'} количество: {document.articleQty}{' '}*/}
					{/*	{'\n'} ед. {document.articleUnit}*/}
					{/*</Text>*/}
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
