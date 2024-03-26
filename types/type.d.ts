 /// <reference types="nativewind/types"/>

import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type HomeStackNavigatorParamList={
    Menu: undefined;
    ListScreen: undefined;
    AuthScreen: undefined;
    ConfigScreen: undefined;
    ScanScreen: undefined;
};

export type HomeStackNavigatorProp = NativeStackScreenProps<
  HomeStackNavigatorParamList,
  Menu,
  ListScreen,
  AuthScreen,
  ConfigScreen,
  ScanScreen
>;


export interface Documents {
    id: number;
    docId: string;
    docNumber: string;
    docDate: number;
    article: string;
    articleName: string;
    articleQty: number;
    articleUnit: string;
    docType: DocType; ////"Packages" | "Goodsreceipt" | "Goodsinventory";
    docStatus: DocStatus; //"Formed" | "Scanning" | "Done";
    articleQtyScan: number;
    articleRowNumber: number;

};


