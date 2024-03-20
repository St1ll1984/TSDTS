import { TouchableOpacity, View, Text } from "react-native";
import { Documents } from "../type";
import React from "react";
import DocumentsListItem from "./DocumentsListItem";
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigatorProp } from "../type";

export default function DocumentsList({
  documents,
}: {
  documents: Documents[];
}) {

  const navigation = useNavigation<HomeStackNavigatorProp>();

  return (
    <View style={{ gap: 10 }}>
      {documents.map((document) => {
        return (
          <TouchableOpacity key={document.id} onPress={()=>navigation.navigate('ScanScreen', {par: document.docId})}>
            <DocumentsListItem document={document} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
