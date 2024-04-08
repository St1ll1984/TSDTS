import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackNavigatorParamList } from '../types/type';
import {
	Menu,
	ScanScreen,
	ConfigScreen,
	LoginScreen,
	ListScreen,
} from '../screens';
import { StyleSheet } from 'react-native';
import { COLORS } from '../const/colors';

const Stack = createStackNavigator<HomeStackNavigatorParamList>();
// const configOptions = { headerStyle: { backgroundColor: '#ffffff' } };
const MainNavigation = () => {
	return (
		<Stack.Navigator
			initialRouteName={'Login'}
			screenOptions={{ headerTitleAlign: 'center' }}
		>
			<Stack.Screen name="Config" component={ConfigScreen} />
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Menu" component={Menu} />
			<Stack.Screen name="ScanScreen" component={ScanScreen} />
			<Stack.Screen
				name="ListScreen"
				component={ListScreen}
				options={{
					headerTitle: 'Documents',
					headerTitleStyle: styles.header,
				}}
			/>
		</Stack.Navigator>
	);
};

const styles = StyleSheet.create({
	header: {
		// width: 'auto',
		// fontSize: 16, // Размер шрифта
		// flexWrap: 'wrap',
	},
});

export default MainNavigation;
