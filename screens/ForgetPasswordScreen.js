import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing Ionicons from react-native-vector-icons
import axios from 'axios';


export default function ForgetPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleForgetPasswordVerification = async () => {
    let valid = true;
  
    if (email === '') {
      setEmailError('Email is required');
      valid = false;
    } else {
      setEmailError('');
    }
  
    if (valid) {
      try {
        const response = await axios.put('http://192.168.1.13:5555/auth/forgotPwd', { email });
  
        if (response.status === 200) {
          // Navigate to verification screen or show success message
          navigation.navigate('Forgetpasswordverificarion');
        } else {
          // Handle other response statuses appropriately
          setEmailError(response.data.message || 'Unknown error occurred');
        }
      } catch (error) {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          setEmailError(errorMessage);
        } else {
          console.error('Network error:', error.message);
          setEmailError('Network error, please try again later.');
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-back" size={28} color="#000" style={styles.earth} />
        <Icon name="earth-outline" size={28} color="#000" style={styles.earth} />
      </View>
      <View style={styles.overlay}>
        <Text style={styles.welcomeText}>What's your email address?</Text>
        <Text style={styles.subtitle}>Enter the email address associated with your account</Text>
        <View style={styles.inputContainer}>
          <Icon name="mail-outline" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.button} onPress={handleForgetPasswordVerification}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  earth: {
    marginTop: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 50, // Adjust this value to move the content down
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
    marginHorizontal: 10,
    textAlign: 'center', // Center the subtitle text
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    width: '90%',
    height: 55,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginRight: 10,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#f28b82',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignItems: 'center',
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerContainer: {
    alignItems: 'center',
    marginBottom: 50, // Increased value to move the button higher
  },
});
