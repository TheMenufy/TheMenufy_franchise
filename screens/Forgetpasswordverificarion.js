import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import axios from 'axios';

export default function ForgetPasswordVerification({ navigation }) {
  const [code, setCode] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isCodeIncorrect, setIsCodeIncorrect] = useState(false);

  const inputs = useRef([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : prev));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCodeChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value !== '') {
      if (index < 3) {
        // Move focus to the next input if it exists
        inputs.current[index + 1].focus();
      } else {
        // Validate code when the last digit is entered
        validateCode(newCode.join(''));
      }
    } else if (index > 0) {
      // Move focus to the previous input if the current input is cleared
      inputs.current[index - 1].focus();
    }
  };

  const validateCode = async (code) => {
    try {
      // Send the code with the correct key as per the server's expectations
      const response = await axios.post('http://192.168.1.17:5555/auth/verifCode', { activationCodeForgotPass: code });
     
      if (response.status === 201) {
        navigation.navigate('Changepasswordwithverif');
        setIsCodeIncorrect(false);
      } else {
        setIsCodeIncorrect(true);
      }
    } catch (error) {
      setIsCodeIncorrect(true);
      // Removed console.error line
    }
  };

  const handleResendCode = () => {
    if (timeLeft === 0) {
      setTimeLeft(120);
      setCode(['', '', '', '']);
      setIsCodeIncorrect(false);
      // Add resend code logic here, such as making an API call to resend the code
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-back" size={28} color="#000" onPress={() => navigation.goBack()} />
        <Icon name="earth-outline" size={28} color="#000" />
      </View>
      <View style={styles.overlay}>
        <Text style={styles.title}>Verification code</Text>
        <Text style={styles.subtitle}>Enter the 4-digits code sent to your email</Text>
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => inputs.current[index] = ref}
              style={[styles.codeInput, isCodeIncorrect && styles.incorrectCode]}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={value => handleCodeChange(index, value)}
            />
          ))}
        </View>
        <View style={styles.resendContainer}>
          <Text style={styles.timerText}>({timeLeft}s)</Text>
          <TouchableOpacity onPress={handleResendCode} disabled={timeLeft > 0}>
            <Text style={styles.resendText}>Resend</Text>
          </TouchableOpacity>
        </View>
        {isCodeIncorrect && (
          <View style={styles.errorContainer}>
            <Icon name="alert-circle-outline" size={20} color="white" />
            <Text style={styles.errorText}>Code incorrect!</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginVertical: 20,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  codeInput: {
    backgroundColor: '#f1f1f1',
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderRadius: 8,
    fontSize: 24,
    width: '20%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  incorrectCode: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    color: 'red',
  },
  resendText: {
    color: '#000',
    marginLeft: 10,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f28b82',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  errorText: {
    color: 'white',
    marginLeft: 10,
  },
});
