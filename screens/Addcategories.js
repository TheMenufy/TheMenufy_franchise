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
  Image,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker'; // Make sure to install expo-image-picker
import axios from 'axios';

export default function Addcategories({ navigation }) {

  const API_BASE_URL_category = 'http://192.168.1.17:5555/category';
  //the fields 
  const [categorieLiblle, setcategorieLiblle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [categorieLiblleError, setcategorieLiblleError] = useState('');
  const [descriptionError, setdescriptionError] = useState('');

  // extra for better displaying 
  const [selectedColor, setSelectedColor] = useState('#ffffff');


  const handlenext = () => {
    
    const AddProductScreen = () => import('./AddProductScreen');
    navigation.navigate(AddProductScreen)

  };
const gottolist = () =>{
  // In Addcategories.js
const ListOfNewCategorie = () => import('./ListOfNewCategorie');
navigation.navigate(ListOfNewCategorie)
}
const handleaddone = async () => {
  const menuId = await AsyncStorage.getItem('MENUID');

  if (!categorieLiblle || !description) {
    Alert.alert("Missing Information", "Please fill all the fields.");
    return;
  }

  const formData = new FormData();
  formData.append('libelle', categorieLiblle);
  formData.append('description', description);
  formData.append('photo', image); // Pass the default photo string

  try {
    const response = await axios.post(`http://192.168.1.17:5555/category/add/${menuId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 201) {
      setcategorieLiblle(''); 
        setDescription('');
        setImage(null);
      Alert.alert("Success", "Category added successfully!");
    } else {
      Alert.alert("Error", "Failed to add category. Please try again.");
    }
  } catch (error) {
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request data:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    Alert.alert("Error", "An error occurred while adding the category.");
  }
};

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const getcolor = async () => {
    const color = await AsyncStorage.getItem('color');
    setSelectedColor(color);

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
      source={require('../assets/backroundMenu2.jpeg')} // Replace this with your image URL or require a local image
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
                  
                <Icon name="list-outline" size={28} color="#000" onPress={() => gottolist()} />

              </View>
            </View>
            <View style={styles.content}>
              <Text style={styles.welcomeText}>add categoie </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Libelle"
                  placeholderTextColor="#888"
                  value={categorieLiblle}
                  onChangeText={setcategorieLiblle}
                />
              </View>
              {categorieLiblleError ? <Text style={styles.errorText}>{categorieLiblleError}</Text> : null}
              <View style={styles.inputContainerdisc}>
                <TextInput
                  style={styles.input}
                  placeholder="Description"
                  placeholderTextColor="#888"
                  value={description}
                  onChangeText={setDescription}
                />
              </View>
              {descriptionError ? <Text style={styles.errorText}>{descriptionError}</Text> : null}

              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                <Text style={styles.imagePickerText}>
                  {image ? "Change Image" : "Pick an Image"}
                </Text>
                {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={styles.footerContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.plusButton,{ backgroundColor: selectedColor }]} onPress={() =>handleaddone()}>
                <Text style={[styles.buttonText, styles.plusButtonText,backgroundColor=selectedColor]}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.primaryButton,{ backgroundColor: selectedColor }]} onPress={() =>handlenext()}>
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
    marginTop: 40,
    marginBottom: 20, // Adds space below the header
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 20,
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
  inputContainerdisc: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    width: '100%',
    height: 100,
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
  imagePicker: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  imagePickerText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 15,
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
  plusButton: {
    backgroundColor: '#76c7c0',
  },
  buttonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonTextplus: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
  },
  primaryButtonText: {
    color: '#fff',
  },
  plusButtonText: {
    color: '#fff',
    size:20,
  },
});