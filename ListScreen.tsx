import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState, useLayoutEffect } from 'react';
import { Header } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Documents } from './type';
import { useSQLiteContext } from 'expo-sqlite/next';
import { ScrollView } from 'react-native-gesture-handler';
import DocumentsList from './components/DocumentsList';
//import React from 'react';


// interface RouteParams {
//   paramName: string; // замените string на тип вашего параметра
// }
// type Props = {
//   route: RouteProp<Record<string, RouteParams>, string>;
// };


const ListScreen = ({ route } )=> {
  const { paramName } = route.params;
  const navigation = useNavigation();
  const [documents, setDocuments] = useState<Documents[]>([]);
  const db = useSQLiteContext();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Новый заголовок'+{paramName}, // Замените 'Новый заголовок' на желаемый заголовок
    });
  },);

  

useEffect(()=> {
  db.withExclusiveTransactionAsync(async () => {
    await getData();
  })
}, [db]
)

  async function getData() {
    const result = await db.getAllAsync<Documents>(`Select * from documents ORDER BY docDate`);
    setDocuments(result);
  }


  return (
    <ScrollView contentContainerStyle = {{padding: 15, paddingVertical: 170}}>
      {/* <Text>List screen123+ {paramName}</Text>
       */}
      <DocumentsList 
      documents={documents}
      />

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ListScreen;