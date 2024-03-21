import { TouchableOpacity, View, Text } from "react-native";
import { Documents } from "../type";
import React from "react";
import DocumentsListItem from "./DocumentsListItem";
import { useNavigation } from "@react-navigation/native";
import { HomeStackNavigatorProp } from "../type";

export default function DocumentsList({
  documents,
  selectedIndex,
}: {
  documents: Documents[];
  selectedIndex: number;
}) {
  //selectedIndex==0:"Formed", ?selectedIndex=1:"Scanning", "Done"
  const navigation = useNavigation<HomeStackNavigatorProp>();
  //number >= 0 ? number : -number
  return (
    <View style={{ gap: 10 }}>
      {/* {documents.map((document) => document.docStatus === (selectedIndex===0?"Formed":selectedIndex===1?"Scanning":"Done" ) )  {
        return (
          <TouchableOpacity key={document.id} onPress={()=>navigation.navigate('ScanScreen', {par: document.docId})}>
            <DocumentsListItem document={document} />
          </TouchableOpacity>
        );
      })} */}

      {documents.map((document) => {
        if (
          document.docStatus === selectedIndex
          // (selectedIndex === 0
          //   ? "Formed"
          //   : selectedIndex === 1
          //   ? "Scanning"
          //   : "Done")
        ) {
          return (
            <TouchableOpacity
              key={document.id}
              onPress={() =>
                navigation.navigate("ScanScreen", { par: document.docId })
              }
            >
              <DocumentsListItem document={document} />
            </TouchableOpacity>
          );
        } else {
          return null; // If the condition doesn't match, return null or empty fragment
        }
      })}
    </View>
  );
}
