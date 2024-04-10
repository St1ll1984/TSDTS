import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState, useLayoutEffect } from 'react';
import { Header } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Documents } from '../types/type';
import { useSQLiteContext } from 'expo-sqlite/next';
import { ScrollView } from 'react-native-gesture-handler';
import DocumentsList from '../components/DocumentsList';
import { HomeStackNavigatorProp } from '../types/type';
import { ButtonGroup } from '@rneui/themed';

const ListScreen = ({ route }: any) => {
	const { paramName } = route.params;
	const navigation = useNavigation();
	const [documents, setDocuments] = useState<Documents[]>([]);
	const db = useSQLiteContext();

	const [selectedIndex, setSelectedIndex] = useState(0);
	//constans [selectedIndexes, setSelectedIndexes] = useState([1,1,1]);
	//constans navigation = useNavigation<HomeStackNavigatorProp>();

	useEffect(() => {
		navigation.setOptions({
			headerTitle: 'Документы ' + paramName.toString(), // Замените 'Новый заголовок' на желаемый заголовок
		});
		console.log('123456789');
		console.log(paramName);
	});

	useEffect(() => {
		db.withExclusiveTransactionAsync(async () => {
			await getData();
		});
	}, [db]);

	async function getData() {
		const result = await db.getAllAsync<Documents>(
			`Select * from documents WHERE docType = ? ORDER BY docDate `,
			[paramName],
		);
		setDocuments(result);
		console.log(result);
	}
	console.log(selectedIndex);
	return (
		<View>
			{/* <Text>List screen123+ {paramName}</Text>
			 */}
			{/* <ButtonGroup
        buttons={["Formed", "Scanning", "Done"]} //"Formed" | "Scanning" | "Done";
        selectMultiple
        selectedIndexes={selectedIndexes}
        onPress={(value) => {
          setSelectedIndexes(value);
          console.log(value, selectedIndexes);
        }}
        containerStyle={{ marginBottom: 20 }}
      /> */}
			<ButtonGroup
				buttons={['Formed', 'Scanning', 'Done']}
				onPress={(selectedIdx) => setSelectedIndex(selectedIdx)}
				selectedIndex={selectedIndex}
				containerStyle={{ marginBottom: 0, marginTop: 10 }}
			/>

			<ScrollView contentContainerStyle={{ padding: 12, paddingVertical: 10 }}>
				<DocumentsList documents={documents} selectedIndex={selectedIndex} />
				<Text>{paramName}</Text>
				<StatusBar style="auto" />
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default ListScreen;
