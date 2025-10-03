import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: number) => {
    if (display === 'Error') {
      setDisplay(String(num));
      setExpression(String(num));
      setWaitingForOperand(false);
      return;
    }

    if (waitingForOperand) {
      setDisplay(String(num));
      setExpression((prev) => prev + num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
      setExpression((prev) => (prev === '0' ? String(num) : prev + num));
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);
      setDisplay(String(newValue));
      if (typeof newValue === 'number') {
        setPreviousValue(newValue);
      } else {
        setPreviousValue(null);
      }
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
    setExpression((prev) => prev + nextOperation);
  };

  const calculate = (
    firstValue: number,
    secondValue: number,
    operation: string
  ): number | string => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '/':
        if (secondValue === 0) {
          return 'Error';
        }
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setExpression(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setExpression('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputDecimal = () => {
    if (waitingForOperand || display === 'Error') {
      setDisplay('0.');
      setExpression((prev) => (prev === 'Error' ? '0.' : prev + '0.'));
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
      setExpression((prev) => prev + '.');
    }
  };

  const backspace = () => {
    if (display === 'Error') {
      setDisplay('0');
      setExpression('0');
      return;
    }

    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
      setExpression((prev) => prev.slice(0, -1));
    } else {
      setDisplay('0');
      setExpression('0');
    }
  };

  const Button = ({
    text,
    onPress,
    type = 'number',
    span = 1,
  }: {
    text: string;
    onPress: () => void;
    type?: 'number' | 'operator' | 'clear' | 'equals';
    span?: number;
  }) => {
    const getButtonStyle = () => {
      switch (type) {
        case 'operator':
          return styles.operatorButton;
        case 'clear':
          return styles.clearButton;
        case 'equals':
          return styles.equalsButton;
        default:
          return styles.numberButton;
      }
    };

    return (
      <TouchableOpacity
        style={[styles.button, getButtonStyle(), span === 2 && styles.wideButton]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.gradient}>
        <StatusBar barStyle="light-content" backgroundColor="#667eea" />
        <View style={styles.container}>
        <View style={styles.displayContainer}>
          <Text style={styles.displayText} numberOfLines={3} adjustsFontSizeToFit>
            {expression}
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <View style={styles.buttonRow}>
            <Button text="AC" onPress={clearAll} type="clear" />
            <Button text="/" onPress={() => inputOperation('/')} type="operator" />
            <Button text="×" onPress={() => inputOperation('×')} type="operator" />
            <Button text="⌫" onPress={backspace} type="operator" />
          </View>

          <View style={styles.buttonRow}>
            <Button text="7" onPress={() => inputNumber(7)} />
            <Button text="8" onPress={() => inputNumber(8)} />
            <Button text="9" onPress={() => inputNumber(9)} />
            <Button text="-" onPress={() => inputOperation('-')} type="operator" />
          </View>

          <View style={styles.buttonRow}>
            <Button text="4" onPress={() => inputNumber(4)} />
            <Button text="5" onPress={() => inputNumber(5)} />
            <Button text="6" onPress={() => inputNumber(6)} />
            <Button text="+" onPress={() => inputOperation('+')} type="operator" />
          </View>

          <View style={styles.buttonRow}>
            <Button text="1" onPress={() => inputNumber(1)} />
            <Button text="2" onPress={() => inputNumber(2)} />
            <Button text="3" onPress={() => inputNumber(3)} />
            <Button text="." onPress={inputDecimal} type="operator" />
          </View>

          <View style={styles.buttonRow}>
            <Button text="0" onPress={() => inputNumber(0)} span={2} />
            <Button text="=" onPress={performCalculation} type="equals" span={2} />
          </View>
        </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const buttonSize = (width - 60) / 4;
const buttonHeight = (height - 280) / 5;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#27075aff',
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 40,
  },
  displayContainer: {
    flex: 1,
    backgroundColor: '#0f2857',
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 20,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#223a5e',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 25,
  },
  displayText: {
    color: 'white',
    fontSize: 48,
    fontWeight: '300',
    textAlign: 'right',
  },
  buttonsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    width: buttonSize,
    height: buttonHeight,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  wideButton: {
    width: buttonSize * 2 + 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 32,
    fontWeight: '600',
  },
  numberButton: {
    backgroundColor: '#223a5e',
  },
  operatorButton: {
    backgroundColor: '#e74c3c',
  },
  clearButton: {
    backgroundColor: '#f39c12',
  },
  equalsButton: {
    backgroundColor: '#27ae60',
  },
});