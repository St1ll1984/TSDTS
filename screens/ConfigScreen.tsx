import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigatorProp } from '../type';



 const ConfigScreen=()=> {
  
  return (
   <View></View>
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

export default ConfigScreen;