import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ListScreen from "./ListScreen";
import Menu from "./Menu";
import ScanScreen from "./ScanScreen";
import AuthScreen from "./screens/AuthScreen";
import ConfigScreen from "./screens/ConfigScreen";
import { HomeStackNavigatorParamList } from "./type";
import * as SQLite from "expo-sqlite";
import React, { useEffect } from "react";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { SQLiteProvider } from "expo-sqlite/next";

const loadDatabase = async () => {
  //db
  const dbName = "mySQLiteDB.db";
  const dbAsset = require("./assets/mySQLiteDB.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (fileInfo.exists) {
    ////if (!fileInfo.exists)
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
};

export default function App() {
  //navigation
  const Stack = createStackNavigator<HomeStackNavigatorParamList>();
  //Load DB
  const [dbLoaded, setDbLoaded] = React.useState<boolean>(false);
  React.useEffect(() => {
    loadDatabase()
      .then(() => setDbLoaded(true))
      .catch((e) => console.error(e));
  }, []);

  if (!dbLoaded)
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size={"large"} />
        {/* <Text>Loading...</Text>; */}
      </View>
    );

  return (
    <NavigationContainer>
      <React.Suspense
        fallback={
          <View style={{ flex: 1, backgroundColor: "red" }}>
            <ActivityIndicator size={"large"} />
            {/* <Text>Loading Data...</Text>; */}
          </View>
        }
      >
        <SQLiteProvider databaseName="mySQLiteDB.db" useSuspense>
          <Stack.Navigator initialRouteName="Menu">
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="ScanScreen" component={ScanScreen} />
            <Stack.Screen name="ConfigScreen" component={ConfigScreen}  options={{
                // Set the presentation mode to modal for our modal route.
                presentation: "modal",
              }}/>
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
            <Stack.Screen
              name="ListScreen"
              component={ListScreen}
              options={{
                headerTitle: "Documents",
                //headerStyle: styles.header,
                headerTitleStyle: styles.header,
              }}
            />
          </Stack.Navigator>
        </SQLiteProvider>
      </React.Suspense>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "auto",
    fontSize: 16, // Размер шрифта
    flexWrap: "wrap",
  },
});
