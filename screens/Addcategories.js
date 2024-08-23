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
  ToastAndroid
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
  const [animatedText, setAnimatedText] = useState('');

  useEffect(() => {
    let text = "You can add a new categorie to this menu";
    let index = 0;

    const interval = setInterval(() => {
        setAnimatedText((prev) => prev + text[index]);
      index++;
      if (index === text.length) {
        clearInterval(interval);
      }
    },0.5); // Adjust the speed by changing the interval time

    return () => clearInterval(interval);
  }, []);
  const handlenext = () => {
    
    const AddProductScreen = () => import('./AddProductScreen');
    navigation.navigate(AddProductScreen)

  };
const gottolist = () =>{
  // In Addcategories.js
const ListOfNewCategorie = () => import('./ListOfNewCategorie');
navigation.navigate(ListOfNewCategorie)
}

const handleaddone =async()  =>{
  let valid = true;

  if (categorieLiblle === '') {
    setcategorieLiblleError('libelle is required');
    valid = false;
  } else {
    setcategorieLiblleError('');
  }
  if (description === '') {
      setdescriptionError('Description is required');
      valid = false;
    } else {
      setdescriptionError('');
    }

    if (valid) {
      try {
        // Fetch the menuId from AsyncStorage
        const menuId = await AsyncStorage.getItem('MENUID');
  console.log(menuId);
        // Prepare the form data
        const formData = new FormData();
        formData.append('libelle', categorieLiblle);
        formData.append('description', description);
        formData.append('menu', menuId);
  
        if (image) {
          // Assuming `image` is a file URI, convert it to a file object
          const fileType = image.split('.').pop();
          formData.append('photo', {
            uri: image,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
          });
        }
  
        // Send the POST request to create the category
        const response = await axios.post(`${API_BASE_URL_category}/create`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log('Category added successfully:', response.data);
  
        // Reset the state after successful addition
        setcategorieLiblle(''); 
        setDescription('');
        setImage(null);
      } catch (error) {
        console.error('Error adding category:', error);
      }
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
              <Text style={styles.welcomeText}>{animatedText}</Text>
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