import React, { useState } from 'react';
import {

  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Addcategories from './Addcategories';

export default function ListOfNewCategorie({ navigation }) {
  

  return (
    <ImageBackground
    source={require('../assets/backroundMenu2.jpeg')}// Replace this with your image URL or require a local image
      style={styles.backgroundImage}
    >
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.innerContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
                      <View style={styles.headerContainer}>
            <View style={styles.header}>
              <Icon name="arrow-back" size={28} color="#000" onPress={() => navigation.goBack()} />

            </View>
          </View>
          <View style={styles.content}>
            <Text style={styles.welcomeText}>There is no new categorie  </Text>
            <Icon name="sad-outline" size={28} color="#000" onPress={{}} />
            <Image
    source={require('../assets/emptything.png')}
    style={styles.emptyImage} // Add styling for your image
  />
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <View style={styles.buttonContainer}>
  
            <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={{}}>
              <Text style={[styles.buttonText, styles.primaryButtonText]}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'repeat', // Or 'stretch' if you want to stretch the image to fill the screen
      },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  emptyImage: {
    width: 250, // Adjust the width and height as needed
    height: 250,
    marginTop: 100,
    transform: [{ rotate: '180deg' }],
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
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop:20

  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
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
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginBottom: 10,
  },
  footerContainer: {
    padding: 20,
    width: '100%',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 400,
  },
  button: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  primaryButton: {
    backgroundColor: '#f28b82',
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryButtonText: {
    color: '#fff',
  },
});
