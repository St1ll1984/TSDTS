import { Documents } from "../type";
import { TouchableOpacity, View, Text, Image, StyleSheet} from "react-native";
import Card from "./ui/Card";

interface DocumentListItemProps{
    document: Documents;
}


export default function DocumentsListItem({
  document,
}:DocumentListItemProps){
  return(
 <Card>
  <View style={styles.container}>
    <Image style = {styles.image} source={require('../assets/cart.png') } />
     
    <Text style={styles.text}>
      {document.articleName}  {'\n'} количество: {document.articleQty}  {'\n'} ед.{" "}
      {document.articleUnit}
    </Text>
    
  </View>
  </Card> 
  );
}

const styles = StyleSheet.create({
  image: {
    alignContent: "center",
    alignItems: 'stretch',
    justifyContent: 'center',
    width: 30,
    height: 30,
    /* marginRight: 20  */
    },
  container: {
    flexDirection: 'row',
    alignContent: "center",
    gap: 20
    },
  text: {
    height: 50,
    justifyContent: 'center',
    color: 'black',
    marginBottom: 12,
    alignContent: "center",
    }
});