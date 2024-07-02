
// screens/LoginScreen.js
import React from 'react';
import { View, Text, TextInput,TouchableOpacity,ImageBackground , StyleSheet } from 'react-native';

export default function Login({ navigation }) {
    return (
      <ImageBackground 
        source={require('../assets/background1.png')} // Update this to your image path
        style={styles.background}
      >
        <View style={styles.overlay}>
          <Text style={styles.textstyle}>SIGN IN</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input1}
            placeholder="Password"
            placeholderTextColor="#888"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('home')}
          >

            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          
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
        marginBottom: 50,
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
  });
