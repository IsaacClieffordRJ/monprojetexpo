import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "./Button";

interface ButtonGridProps {
  onButtonPress: (label: string) => void;
}

const ButtonGrid: React.FC<ButtonGridProps> = ({ onButtonPress }) => {
  const buttons = [
    ["AC", "/", "×", "⌫"],
    ["7", "8", "9", "-"],
    ["4", "5", "6", "+"],
    ["1", "2", "3", "."],
    ["0", "="]
  ];

  return (
    <View style={styles.buttons}>
      {buttons.flat().map((button) => (
        <Button
          key={button}
          label={button}
          onPress={onButtonPress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default ButtonGrid;