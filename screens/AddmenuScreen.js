import React, { useEffect, useState } from 'react';
import {

  View,
  Text,
  TextInput,
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
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AddMenuScreen({ navigation }) {
  const [menuName, setMenuName] = useState('');
  const [menuNameError, setMenuNameError] = useState('');
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  const handleAddMenu = () => {
    let valid = true;

    if (menuName === '') {
      setMenuNameError('Menu name is required');
      valid = false;
    } else {
      setMenuNameError('');
    }

    if (valid) {
      // Perform add menu logic here
      console.log('Adding menu:', menuName);
      navigation.navigate(Addcategories); // Navigate back after successful addition
    }
  };
  useEffect(() => {
    const getColor = async () => {
      try {
        const color = await AsyncStorage.getItem('color');
        if (color !== null) {
          console.log('Retrieved color:', color);
          setSelectedColor(color);
        } else {
          console.log('No color found, using default.');
        }
      } catch (error) {
        console.error('Failed to retrieve color from AsyncStorage', error);
      }
    };

    getColor();
  }, []);
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
            <Text style={styles.welcomeText}>What is the name of the new menu?</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="New menu name"
                placeholderTextColor="#888"
                value={menuName}
                onChangeText={setMenuName}
              />
            </View>
            {menuNameError ? <Text style={styles.errorText}>{menuNameError}</Text> : null}
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.primaryButton,{ backgroundColor: selectedColor }]} onPress={handleAddMenu}>
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
    justifyContent: 'space-between',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingTop: 60,
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