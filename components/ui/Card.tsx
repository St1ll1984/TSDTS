import { View, ViewStyle } from "react-native";

interface CardProps extends React.PropsWithChildren {
  style?: ViewStyle;
}

export default function Card({ children, style = {} }: CardProps) {
  return (
    <View
      style={{
        padding: 15,
        borderRadius: 15,
        backgroundColor: "lightblue",
        elevation: 3,
        shadowColor: "#000",
        shadowRadius: 8,
        shadowOffset: { height: 100, width: 0 },
        shadowOpacity: 0.80,
        ...style,
      }}
    >
      {children}
    </View>
  );
}