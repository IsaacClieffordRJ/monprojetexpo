import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  label: string;
  onPress: (label: string) => void;
}

const Button: React.FC<ButtonProps> = ({ label, onPress }) => {
  const getButtonStyle = () => {
    if (label === "AC") return [styles.button, styles.clear];
    if (label === "=") return [styles.button, styles.equals];
    if (label === "0") return [styles.button, styles.number, styles.zero];
    if (label === "⌫") return [styles.button, styles.backspace];
    if (!isNaN(Number(label))) return [styles.button, styles.number];
    return [styles.button, styles.operator];
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={() => onPress(label)}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "22%",
    height: 70,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
  },
  number: { 
    backgroundColor: "#223a5e" 
  },
  operator: { 
    backgroundColor: "#e74c3c" 
  },
  clear: { 
    backgroundColor: "#f39c12" 
  },
  equals: { 
    backgroundColor: "#27ae60", 
    width: "47%" 
  },
  zero: { 
    width: "47%" 
  },
  backspace: {
    backgroundColor: "#95a5a6"
  }
});

export default Button;