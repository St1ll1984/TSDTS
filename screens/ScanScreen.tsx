import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigatorProp } from '../types/type';
import { useEffect, useRef, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import { Documents } from '../types/type';
import { TextInput } from 'react-native-gesture-handler';

interface DocumentListItemProps {
	document: Documents;
}

const ScanScreen = ({ route }: any) => {
	const { par } = route.params;
	// constans navigation = useNavigation();
	const [count, setCount] = useState<number>(1);
	let name: String = 'Номенклатура';
	let qty: number = 999999;
	const db = useSQLiteContext();
	const textInputRef = useRef<TextInput | null>(null);

	useEffect(() => {
		db.withExclusiveTransactionAsync(async () => {
			await getData(count);
		});
	}, [count]);

	async function getData(count: number) {
		const result = await db.getAllAsync<Documents>(`Select * from documents `);
		console.log(result);
		if (textInputRef.current !== null) {
			// textInputRef.current.focus(TextInput);
			textInputRef.current.focus();
		}
		Keyboard.dismiss();
		if (result.length > 0) {
			name = result[0].articleName;
			qty = result[0].articleQty;
		} else {
		}
	}

	function getDataNext() {
		setCount(count + 1);
	}

	function getDataPrev() {
		if (count > 1) {
			setCount(count - 1);
		}
	}

	return (
		<View style={styles.container}>
			{/* отображение шапки */}
			<View style={styles.containerTop}>
				<Text>
					Отсканируйте номенклатуру: {'\n'} {name} {'\n'} в количестве {'\n'}{' '}
					{qty} {'\n'} {count}
				</Text>
				<Text>Введите количество:</Text>
				<TextInput
					ref={textInputRef}
					style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
					placeholder="Введите текст"
				/>

				<Text>Параметр {par}</Text>
			</View>

			{/* кнопки низ страницы */}
			<View style={styles.containerBottom}>
				<Button title="Назад" onPress={() => getDataPrev()}></Button>
				<Button title="Вперед" onPress={() => getDataNext()}></Button>
			</View>

			<StatusBar style="auto" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'stretch',
		justifyContent: 'center',
		textAlignVertical: 'auto',
	},
	textInput: {
		flex: 0,
		backgroundColor: 'grey',
		alignItems: 'stretch',
		justifyContent: 'center',
		textAlignVertical: 'auto',
	},
	containerTop: {
		//gap: 100,
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		textAlignVertical: 'auto',
	},
	containerBottom: {
		flex: 0,
		flexDirection: 'row',
		backgroundColor: '#fff',
		alignItems: 'stretch',
		justifyContent: 'space-between',
	},
	button: {
		paddingTop: 100,
		paddingBottom: 100,
		borderRadius: 60,
	},
});

export default ScanScreen;
