import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView, Keyboard } from 'react-native';
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
        const response = await axios.put('http://192.168.1.17:5555/auth/forgotPwd', { email });
  
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.innerContainer}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollViewContent} 
          keyboardShouldPersistTaps='handled'
        >
          <View style={styles.headerContainer}>
            <View style={styles.header}>
              <Icon name="arrow-back" size={28} color="#000" onPress={() => navigation.goBack()} />

            </View>
          </View>
          <View style={styles.content}>
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
                keyboardType='email-address'
                autoCapitalize='none'
              />
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.button} onPress={handleForgetPasswordVerification}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 0, // Adjust for iOS safe area
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:40,
    marginBottom: 20, // Adds space below the header
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start', // Aligns content to the top
    paddingTop: 60, // Add space at the top to ensure header isn't covered
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start', // Align content to the top
    alignItems: 'center',
    marginTop:20,
    paddingHorizontal: 20,
    paddingBottom: 20, // Space from the bottom of the screen to make room for the button
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
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    width: '100%',
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
    width: '100%', // Set width to 100% to make the button fill the container
    maxWidth: 400, // Optionally, set a max width for larger screens
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerContainer: {
    padding: 20,
    alignItems: 'center', // Center align the button
    width: '100%', // Ensure the container takes full width
  },
});
