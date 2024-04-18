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
import { BottomBar } from '../components';

const ListScreen = ({ route }: any) => {
	const { paramName } = route.params;
	// console.log('route', route);
	// console.log('paramName', paramName);
	const navigation = useNavigation();
	// const [documents, setDocuments] = useState<Documents[]>([]);
	const [documents, setDocuments] = useState<Documents[][]>([]);
	const db = useSQLiteContext();
	const [selectedIndex, setSelectedIndex] = useState(0);
	//constans [selectedIndexes, setSelectedIndexes] = useState([1,1,1]);
	//constans navigation = useNavigation<HomeStackNavigatorProp>();

	useEffect(() => {
		navigation.setOptions({
			headerTitle: 'Документы ' + paramName.toString(), // Замените 'Новый заголовок' на желаемый заголовок
		});
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
		// ====================================
		const groupedByDocNumber = result.reduce(
			(acc: { [key: string]: Documents[] }, item) => {
				if (!acc[item.docNumber]) {
					acc[item.docNumber] = [];
				}
				acc[item.docNumber].push(item);
				return acc;
			},
			{},
		);

		const resultGroupedByDocNumber = Object.values(groupedByDocNumber);
		setDocuments(resultGroupedByDocNumber);
		// ====================================
		// setDocuments(result);
		// console.log(result);
	}
	// console.log(selectedIndex);
	return (
		// <View style={{ paddingBottom: 20 }}>
		<View style={styles.container}>
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

			<ScrollView
				contentContainerStyle={{
					padding: 10,
				}}
			>
				<DocumentsList documents={documents} selectedIndex={selectedIndex} />
				{/*<Text>{paramName}</Text>*/}
				{/*<StatusBar style="auto" />*/}
			</ScrollView>
			<BottomBar
				config
				menu
				login
				style={{
					paddingVertical: 5,
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default ListScreen;
