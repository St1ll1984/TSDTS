import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Documents } from '../types/type';
import React, { useEffect, useRef, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite/next';
import { TextInput } from 'react-native-gesture-handler';
import { ButtonCustom, ButtonIcon } from '../components';
import { COLORS } from '../const/colors';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

interface DocumentListItemProps {
	document: Documents;
}

const ScanScreen = ({ route }: any) => {
	const { par } = route.params;
	// constans navigation = useNavigation();
	const [count, setCount] = useState<number>(1);
	const [box, setBox] = useState<number>(1);
	const [inputText, setInputText] = useState('');
	const [itemArticle, setItemArticle] = useState<Documents>();
	const [itemArticleQuantity, setItemArticleQuantity] = useState<number>(0);
	const [scannedQuantityItems, setScannedQuantityItems] = useState(0);
	const [memoryStartScannedQty, setMemoryStartScannedQty] = useState(-1);
	const db = useSQLiteContext();
	const textInputRef = useRef<TextInput | null>(null);

	useEffect(() => {
		db.withExclusiveTransactionAsync(async () => {
			if (!itemArticle) return;
			if (memoryStartScannedQty === scannedQuantityItems) return;
			await updateData(scannedQuantityItems, par, itemArticle);
		});

		db.withExclusiveTransactionAsync(async () => {
			await getData(count, par);
		});
	}, [count]);

	useEffect(() => {
		textInputRef.current?.focus();
	}, []);

	async function getData(count: number, par: string) {
		const articleByDocId = await db.getAllAsync<Documents>(
			`Select * from documents where docId = ? and articleRowNumber = ?`,
			[par, count],
		);
		const allArticles = await db.getAllAsync<Documents>(
			`Select * from documents where docId = ? `,
			[par],
		);

		setItemArticle(articleByDocId[0]);
		setItemArticleQuantity(allArticles.length);
		setScannedQuantityItems(articleByDocId[0].articleQtyScan);
		setMemoryStartScannedQty(articleByDocId[0].articleQtyScan);
	}

	async function updateData(
		scannedQuantityItems: number,
		par: string,
		article: Documents,
	) {
		if (memoryStartScannedQty !== scannedQuantityItems) {
			await db.runAsync(
				`UPDATE documents SET articleQtyScan = ? WHERE docId = ? and articleRowNumber = ? and docNumber=? and articleName=? and articleUnit=? and docType=? and docStatus=?`,
				scannedQuantityItems,
				par,
				article.articleRowNumber,
				article.docNumber,
				article.articleName,
				article.articleUnit,
				article.docType,
				article.docStatus,
			);
		}
	}

	useEffect(() => {
		if (inputText === itemArticle?.article.toString()) {
			setScannedQuantityItems(scannedQuantityItems + 1);
			setInputText('');
		}
	}, [inputText]);

	// useEffect(() => {
	// 	if (
	// 		itemArticle?.articleQty === scannedQuantityItems &&
	// 		memoryStartScannedQty !== scannedQuantityItems
	// 	) {
	// 		setCount(count + 1);
	// 	}
	// }, [scannedQuantityItems]);

	return (
		<KeyboardAvoidingView
			style={styles.container}
			// behavior={'padding'}
			// keyboardVerticalOffset={0}
		>
			<View style={styles.containerTop}>
				<View>
					<Text style={styles.text}>Отсканируйте номенклатуру:</Text>
					<Text style={[styles.text, styles.textAccent]}>
						{itemArticle?.articleName}
					</Text>
				</View>
				<View>
					<Text style={styles.text}>
						ШК:{' '}
						<Text style={[styles.text, styles.textAccent]}>
							{itemArticle?.article}
						</Text>
					</Text>
				</View>
				<View>
					<Text style={styles.text}>
						В количестве:{' '}
						<Text style={[styles.text, styles.textAccent]}>
							{itemArticle?.articleQty} шт.
						</Text>
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
							size={40}
							color={box === 1 ? COLORS.grey : COLORS.black}
						/>
					</ButtonIcon>
					<View
						style={{
							backgroundColor: COLORS.lightGrey,
							width: 40,
							height: 40,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Text style={[styles.text, styles.textAccent, { fontSize: 20 }]}>
							{box}
						</Text>
					</View>
					<ButtonIcon onPress={() => setBox(box + 1)}>
						<AntDesign name="plussquareo" size={40} color={COLORS.black} />
					</ButtonIcon>
				</View>
			</View>
			<TextInput
				style={styles.textInput}
				placeholder="Количество отсканированного"
				value={String(scannedQuantityItems)}
				// onChangeText={(value) => setScannedQuantityItems(value)}
				// showSoftInputOnFocus={false}
			/>
			<TextInput
				// readOnly
				ref={textInputRef}
				style={styles.textInput}
				placeholder="Текущий шк"
				value={inputText}
				onChangeText={(text) => setInputText(text)}
				showSoftInputOnFocus={false}
			/>

			<View style={styles.containerComment}>
				<Text style={styles.text}>Комментарий:</Text>
				<Text style={[styles.text, { fontSize: 16, fontStyle: 'italic' }]}>
					Добавить к заказу 1 шт подрамник
				</Text>
			</View>
			<View>
				<ButtonCustom
					title={count === itemArticleQuantity ? 'Готово' : 'Сохранить'}
				/>
			</View>

			<View style={styles.containerBottom}>
				<ButtonIcon onPress={() => setCount(count - 1)} disabled={count === 1}>
					<FontAwesome5
						name="arrow-left"
						size={30}
						color={count === 1 ? COLORS.grey : COLORS.black}
					/>
				</ButtonIcon>
				<ButtonIcon
					onPress={() => setCount(count + 1)}
					disabled={count === itemArticleQuantity}
				>
					<FontAwesome5
						name="arrow-right"
						size={30}
						color={count === itemArticleQuantity ? COLORS.grey : COLORS.black}
					/>
				</ButtonIcon>
			</View>

			<StatusBar style="auto" />
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 10,
		paddingHorizontal: 10,
		backgroundColor: '#fff',
	},
	containerTop: {
		// gap: 7,
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
		flexDirection: 'row',
		backgroundColor: '#fff',
		alignItems: 'stretch',
		justifyContent: 'space-between',
		paddingHorizontal: 15,
		paddingTop: 15,
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
