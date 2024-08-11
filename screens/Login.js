import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const rememberMePref = await AsyncStorage.getItem('rememberMe');
        const token = await AsyncStorage.getItem('userToken');
        
        if (rememberMePref === 'true' && token) {
          navigation.navigate('home');
        } else {
          if (rememberMePref !== null) {
            setRememberMe(JSON.parse(rememberMePref));
          }
        }
      } catch (error) {
        console.error('Error checking login status:', error.message);
      }
    };

    checkLoginStatus();
  }, [navigation]);

  const handleForgetPassword = () => {
    navigation.navigate('forgetpassword');
  };

  const submit = async () => {
    setSubmitting(true);
    setEmailError('');
    setPasswordError('');
    
    try {
      const response = await axios.post('http://192.168.1.15:5555/auth/login', {
        email,
        password,
        rememberMe
      });

      const { tokenLogin, user } = response.data;
      await AsyncStorage.setItem('userToken', tokenLogin);
      
      await AsyncStorage.setItem('id', user.id);
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      await AsyncStorage.setItem('rememberMe', JSON.stringify(rememberMe)); // Store rememberMe preference

      if (response.data.tokenLogin) {
        navigation.navigate('home');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;

        if (errorMessage.includes("email")) {
          setEmailError(errorMessage);
        } else if (errorMessage.includes("credentials")) {
          setPasswordError(errorMessage);
        } else {
          console.error('Error:', errorMessage);
        }
      } else {
        console.error('Network error:', error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
       
        <Icon name="arrow-back" size={24} color="#FFFFFF" />
        <Icon name="earth-outline" size={28} color="#000" style={styles.earth} />
      </View>
      <View style={styles.overlay}>
       
        <Image source={require('../assets/cadenas_cut.png')} style={styles.image} />
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Make your day full of productivity!</Text>
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
        <View style={styles.inputContainer}>
          <Icon name="lock-closed-outline" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Icon name="eye-off-outline" size={20} color="#888" style={styles.icon} />
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.rememberMeContainer, rememberMe && styles.rememberMeSelected]}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <Text style={styles.rememberMeText}>{rememberMe ? '✓ ' : ''}Remember Me</Text>
          </TouchableOpacity>
      
          <TouchableOpacity onPress={handleForgetPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
     
        <TouchableOpacity style={styles.button} onPress={submit} disabled={isSubmitting}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}></View>
        <View style={styles.footerContainer}></View>
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
  },
  image: {
    width: 200,
    height: 230,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
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
    marginHorizontal: 30,
    marginHorizontal: 30,
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
    marginHorizontal: 30,
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#f28b82',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    marginBottom: 40,
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
