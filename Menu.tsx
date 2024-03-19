import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigatorProp } from './type';
//import ListScreen from "./ListScreen";


 const HomeScreen=()=> {
  const navigation = useNavigation<HomeStackNavigatorProp>();
  const Packages = 'Packages';
  return (
    <View style={styles.container}>
      <Button title='Упаковочные листы' onPress={()=>navigation.navigate('ListScreen',  { paramName: 'Packages' })}></Button>
      <Text> </Text>
      <Button title='Поступление товаров' onPress={()=>navigation.navigate('ListScreen', { paramName: 'Goodsreceipt' })}></Button>
      <Text> </Text>
      <Button title='Инвентаризация' onPress={()=>navigation.navigate('ListScreen', { paramName: 'Goodsinventory' })} ></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    textAlignVertical: 'auto',
    
  },
  button:{
  paddingTop: 100,
  paddingBottom: 100,
    borderRadius: 60
 },
});

export default HomeScreen;