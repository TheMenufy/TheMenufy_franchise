import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    let valid = true;

    if (email === '') {
      setEmailError('Email is required');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password === '') {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      // Proceed with navigation or login logic
      navigation.navigate('home');
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/backr.png')} // Update this to your image path
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.textstyle}>SIGN IN</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TextInput
          style={styles.input1}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        <TouchableOpacity
          style={[styles.rememberMeContainer, rememberMe && styles.rememberMeSelected]}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <Text style={styles.rememberMeText}>{rememberMe ? '✓ ' : ''}Remember Me</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.copyrightText}>© IPACT Consult 2024</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' if you want to stretch the image
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // optional overlay to make text more readable
    alignItems: 'center',
    justifyContent: 'center',
  },
  textstyle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 100,
    color: '#f28b82', // or your preferred color
  },
  button: {
    backgroundColor: '#f28b82', // or your preferred color
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f1f1f1', // or your preferred color
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 25,
    textAlign: 'center',
    fontSize: 16,
    width: '90%', // or your preferred width
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input1: {
    backgroundColor: '#f1f1f1', // or your preferred color
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 25,
    textAlign: 'center',
    fontSize: 16,
    width: '90%', // or your preferred width
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginBottom: 10,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#888',
  },
  rememberMeSelected: {
    backgroundColor: '#f28b82',
    borderColor: '#f28b82',
  },
  rememberMeText: {
    fontSize: 16,
    color: '#888',
  },
  copyrightText: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
