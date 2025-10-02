import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface DisplayProps {
  expression: string;
}

const Display: React.FC<DisplayProps> = ({ expression }) => {
  return (
    <View style={styles.displayContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
      >
        <Text style={styles.display} numberOfLines={1}>
          {expression}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  displayContainer: {
    width: "100%",
    backgroundColor: "#0f2857",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    justifyContent: "flex-end",
    minHeight: 100,
  },
  display: {
    color: "#fff",
    fontSize: 40,
    textAlign: "right",
    fontWeight: "300",
  },
});

export default Display;