import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing Ionicons from react-native-vector-icons
import axios from 'axios';
export default function ForgetPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  

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
        const response = await axios.put('http://192.168.1.15:5555/auth/forgotPwd', { email });
  
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
        <Icon name="arrow-back" size={28} color="#000" style={styles.earth}  />
        <Icon name="earth-outline" size={28} color="#000" style={styles.earth}/>
      </View>
      <View style={styles.overlay}>
       
        <Text style={styles.welcomeText}>What's your email address ?</Text>
        <Text style={styles.subtitle}>Enter the email address associeted with your account </Text>
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
        
       
       
        <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleForgetPasswordverificaion}
    
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    backgroundColor: 'white',
  },
  earth:{
    marginTop:25,
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
  },
  image: {
    width: 200,
    height: 230,
    marginBottom: 20,
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
    marginHorizontal:10
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
    height:55,
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
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 70,
    
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal:30,
  },
  rememberMeSelected: {
    backgroundColor: '#f28b82',
    borderColor: '#f28b82',
  },
  rememberMeText: {
    fontSize: 14,
    color: '#888',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#f28b82',
    marginHorizontal:30,
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
    flexDirection: 'row',
    alignItems: 'center',
marginTop:350
    

 
  },
  footerText: {
    fontSize: 14,
    color: '#888',
  },
  signUpText: {
    fontSize: 16,
    color: '#f28b82',
    fontWeight: 'bold',
 
  },
});
