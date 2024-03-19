import { TouchableOpacity, View, Text } from "react-native";
import { Documents } from "../type";
import React from "react";
import DocumentsListItem from "./DocumentsListItem";

export default function DocumentsList({
  documents,
}: {
  documents: Documents[];
}) {
  return (
    <View style={{ gap: 10 }}>
      {documents.map((document) => {
        return (
          <TouchableOpacity key={document.id}>
            <DocumentsListItem document={document} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
