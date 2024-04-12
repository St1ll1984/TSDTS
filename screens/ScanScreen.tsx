import { StatusBar } from 'expo-status-bar';
import {
	Keyboard,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Documents } from '../types/type';
import { useEffect, useRef, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import { TextInput } from 'react-native-gesture-handler';
import { ButtonIcon } from '../components';
import { COLORS } from '../const/colors';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

interface DocumentListItemProps {
	document: Documents;
}

const ScanScreen = ({ route }: any) => {
	const { par } = route.params;
	console.log('par', par);
	// constans navigation = useNavigation();
	const [count, setCount] = useState<number>(1);
	const [box, setBox] = useState<number>(1);
	const [inputText, setInputText] = useState('');
	const [itemArticle, setItemArticle] = useState<Documents>();
	const db = useSQLiteContext();
	const textInputRef = useRef<TextInput | null>(null);
	console.log('count', count);

	useEffect(() => {
		db.withExclusiveTransactionAsync(async () => {
			await getData(count, par);
			//  console.log('result', result);
			//  console.log('result[0]', result[0]);
			 
		});
		
	}, [count]);

	async function getData(count: number, par: string) {
		const result = await db.getAllAsync<Documents>(
			`Select * from documents where docId = ? and articleRowNumber = ?`, [par, count]
		);
		setItemArticle(result[0]);
		
		console.log('par2', par);
		console.log('count2', count);
		console.log('itemArticle2', result[0]);
		//console.log('qtyItem', qtyItem);
		
		}
	

	

	const switchOffKeyboard = () => {
		Keyboard.dismiss();
	}

	return (
		<KeyboardAvoidingView
			style={styles.container}
			// behavior={'padding'}
			// keyboardVerticalOffset={0}
		>
			<View style={styles.containerTop}>
				<View>
					<Text style={styles.text}>Отсканируйте номенклатуру:</Text>
					<Text style={[styles.text, styles.textAccent]}>{}</Text>
				</View>
				<View>
					<Text style={styles.text}>
						ШК: <Text style={[styles.text, styles.textAccent]}>12345678</Text>
					</Text>
				</View>
				<View>
					<Text style={styles.text}>
						В количестве:{' '}
						<Text style={[styles.text, styles.textAccent]}>18 шт.</Text>
					</Text>
				</View>
				<View>
					<Text style={styles.text}>
						Место:{' '}
						<Text style={[styles.text, styles.textAccent]}>A1-Б4-Ф4</Text>
					</Text>
				</View>
			</View>

			<View style={styles.containerBox}>
				<Text style={styles.text}>Ящик:</Text>
				<View style={styles.wrapperBoxButtons}>
					<ButtonIcon onPress={() => setBox(box - 1)} disabled={box === 1}>
						<AntDesign
							name="minussquareo"
							size={30}
							color={box === 1 ? COLORS.grey : COLORS.black}
						/>
					</ButtonIcon>
					<View
						style={{ backgroundColor: COLORS.lightGrey, width: 30, height: 30 }}
					>
						<Text style={[styles.text, styles.textAccent, { fontSize: 20 }]}>
							{box}
						</Text>
					</View>
					<ButtonIcon onPress={() => setBox(box + 1)}>
						<AntDesign name="plussquareo" size={30} color={COLORS.black} />
					</ButtonIcon>
				</View>
			</View>
			<TextInput
				ref={textInputRef}
				style={styles.textInput}
				placeholder="Введите текст"
				value={inputText}
				onChangeText={(value) => setInputText(value)}
				showSoftInputOnFocus={false}
			/>

			<View style={styles.containerComment}>
				<Text style={styles.text}>Комментарий:</Text>
				<Text style={[styles.text, { fontSize: 16, fontStyle: 'italic' }]}>
					Добавить к заказу 1 шт подрамник
				</Text>
			</View>

			<View style={styles.containerBottom}>
				<ButtonIcon onPress={() => setCount(count - 1)} disabled={count === 1}>
					<FontAwesome5
						name="arrow-left"
						size={30}
						color={count === 1 ? COLORS.grey : COLORS.black}
					/>
				</ButtonIcon>
				<ButtonIcon onPress={() => setCount(count + 1)}>
					<FontAwesome5 name="arrow-right" size={30} color={COLORS.black} />
				</ButtonIcon>
			</View>

			<StatusBar style="auto" />
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: 'space-between',
		// alignItems: 'stretch',
		paddingVertical: 10,
		paddingHorizontal: 10,
		backgroundColor: '#fff',
	},
	containerTop: {
		gap: 7,
	},
	containerBox: {
		marginVertical: 10,
	},
	wrapperBoxButtons: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 15,
	},
	containerComment: {
		marginBottom: 'auto',
	},
	text: {
		fontSize: 18,
		textAlign: 'center',
	},
	textAccent: {
		fontWeight: 'bold',
		fontStyle: 'italic',
	},
	containerBottom: {
		flex: 0,
		flexDirection: 'row',
		backgroundColor: '#fff',
		alignItems: 'stretch',
		justifyContent: 'space-between',
		paddingHorizontal: 15,
	},
	textInput: {
		borderRadius: 5,
		height: 40,
		borderColor: COLORS.darkGrey,
		borderWidth: 1,
		paddingHorizontal: 10,
		marginBottom: 25,
		textAlign: 'center',
	},
});

export default ScanScreen;
