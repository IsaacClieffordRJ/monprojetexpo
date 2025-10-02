import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ButtonGrid from "./ButtonGrid";
import Display from "./Display";

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const calculate = (first: number, second: number, op: string): number | string => {
    switch (op) {
      case "+": return first + second;
      case "-": return first - second;
      case "×": return first * second;
      case "/": 
        if (second === 0) return "Error";
        return first / second;
      default: return second;
    }
  };

  const inputNumber = (num: number) => {
    if (display === "Error") {
      setDisplay(String(num));
      setExpression(String(num));
      setWaitingForOperand(false);
      return;
    }

    if (waitingForOperand) {
      setDisplay(String(num));
      setExpression(prev => prev + String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? String(num) : display + num);
      setExpression(prev => prev === "0" ? String(num) : prev + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(newValue as number);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
    setExpression(prev => prev + nextOperation);
  };

  const performCalculation = () => {
    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, parseFloat(display), operation);
      setDisplay(String(newValue));
      setExpression(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clearAll = () => {
    setDisplay("0");
    setExpression("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputDecimal = () => {
    if (waitingForOperand || display === "Error") {
      setDisplay("0.");
      setExpression(prev => prev === "Error" ? "0." : prev + "0.");
      setWaitingForOperand(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
      setExpression(prev => prev + ".");
    }
  };

  const backspace = () => {
    if (display === "Error") {
      setDisplay("0");
      setExpression("0");
      return;
    }

    
    if (display.length > 1) {
      const newDisplay = display.slice(0, -1);
      setDisplay(newDisplay);
      
      
      if (waitingForOperand) {
        
        return;
      } else {
        
        const lastNumberRegex = /(\d+\.?\d*)$/;
        const newExpression = expression.replace(lastNumberRegex, newDisplay);
        setExpression(newExpression);
      }
    } else {
      setDisplay("0");
     
      const lastNumberRegex = /(\d+\.?\d*)$/;
      const newExpression = expression.replace(lastNumberRegex, "0");
      setExpression(newExpression);
    }
  };

  const handlePress = (label: string) => {
    if (!isNaN(Number(label))) inputNumber(Number(label));
    else if (label === "AC") clearAll();
    else if (label === "=") performCalculation();
    else if (label === ".") inputDecimal();
    else if (label === "⌫") backspace();
    else inputOperation(label);
  };

  return (
    <View style={styles.container}>
      <Display expression={expression} />
      <ButtonGrid onButtonPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1a33",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});

export default Calculator;