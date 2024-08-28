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
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker'; // Make sure to install expo-image-picker
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ListOfNewProducts from './ListOfNewProducts';

export default function AddProductScreen({ navigation }) {

  const API_BASE_URL_CATEGORIES = 'http://192.168.1.17:5555/category';
  const API_BASE_URL_PRODUCT = 'http://192.168.1.17:5555/product';

  // Input fields and errors
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [productName, setProductName] = useState('');
  const [productNameError, setProductNameError] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [price, setPrice] = useState('');
  const [priceError, setPriceError] = useState('');
  const [promotion, setPromotion] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isModifying, setIsModifying] = useState(false);
  const [productId, setProductId] = useState(null);

  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [animatedText, setAnimatedText] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const MODIFY = await AsyncStorage.getItem('MODIFY');
      if (MODIFY === 'true') {
        setIsModifying(true);
        const storedProductId = await AsyncStorage.getItem('PRODUCTID');
        setProductId(storedProductId);
        loadProductDetails(storedProductId);
      }
      fetchCategories();
      getColor();
    };

    loadData();
  }, []);

  useEffect(() => {
    let text = "N ";
    let index = 0;

    const interval = setInterval(() => {
      setAnimatedText((prev) => prev + text[index]);
      index++;
      if (index === text.length) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const getColor = async () => {
    try {
      const color = await AsyncStorage.getItem('color');
      if (color !== null) {
        setSelectedColor(color);
      }
    } catch (error) {
      console.error('Failed to retrieve color from AsyncStorage', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const menuId = await AsyncStorage.getItem('MENUID');
      const response = await axios.get(`${API_BASE_URL_CATEGORIES}/find/item/by/menu/${menuId}`);
      const fetchedCategories = response.data.map((category) => ({
        label: category.libelle,
        value: category._id,
      }));
      setCategories(fetchedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const loadProductDetails = async (productId) => {
    try {
      const response = await axios.get(`${API_BASE_URL_PRODUCT}/find/item/${productId}`);
      const product = response.data;
      setProductName(product.name);
      setDescription(product.description);
      setPrice(product.price.toString());
      setImage(product.photo);
      setSelectedCategory(product.categoryFK._id);
    } catch (error) {
      console.error('Error loading product details:', error);
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

  const validateFields = () => {
    let valid = true;

    if (!productName) {
      setProductNameError('Name is required');
      valid = false;
    } else {
      setProductNameError('');
    }

    if (!description) {
      setDescriptionError('Description is required');
      valid = false;
    } else {
      setDescriptionError('');
    }

    if (!price) {
      setPriceError('Price is required');
      valid = false;
    } else {
      setPriceError('');
    }

    if (!selectedCategory) {
      setCategoryError('You should choose a category');
      valid = false;
    } else {
      setCategoryError('');
    }

    return valid;
  };

  const handleAddOrModifyProduct = async () => {
    if (!validateFields()) return;

    try {
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('promotion', promotion);
      formData.append('photo', image);
      formData.append('categoryFK', selectedCategory);

      let response;
      if (isModifying) {
        response = await axios.put(`${API_BASE_URL_PRODUCT}/update/${productId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        await AsyncStorage.setItem('MODIFY', 'false');
      } else {
        response = await axios.post(`${API_BASE_URL_PRODUCT}/create`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      if (response.status === 201 || response.status === 200) {
        setProductName('');
        setDescription('');

        setPromotion('');
        setPrice('');
        setSelectedCategory('');
        setImage(null);
        ToastAndroid.show('Product saved successfully!', ToastAndroid.SHORT);
        navigation.goBack();
      } else {
        ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      ToastAndroid.show('Error saving product!', ToastAndroid.SHORT);
    }
  };

  const handleGoToList = () => {
    navigation.navigate(ListOfNewProducts);
  };

  const handleGoNext = () => {
    const AddIngredient = () => import('./AddIngredient');
    navigation.navigate(AddIngredient);
  };

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
                <Icon name="list-outline" size={28} color="#000" onPress={handleGoToList} />
              </View>
            </View>
            <View style={styles.content}>
              <Text style={styles.welcomeText}>{animatedText}</Text>
              <View style={styles.pickerWrapper}>
                <RNPickerSelect
                  onValueChange={(value) => setSelectedCategory(value)}
                  items={categories}
                  placeholder={{
                    label: 'Select a category...',
                    value: null,
                    color: '#888',
                  }}
                  style={pickerSelectStyles}
                  value={selectedCategory}
                  useNativeAndroidPickerStyle={false} // This is important for Android
                />
              </View>
              {categoryError ? <Text style={styles.errorText}>{categoryError}</Text> : null}

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Product name"
                  placeholderTextColor="#BDBDBD"
                  value={productName}
                  onChangeText={setProductName}
                />
              </View>
              {productNameError ? <Text style={styles.errorText}>{productNameError}</Text> : null}

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Description"
                  placeholderTextColor="#BDBDBD"
                  value={description}
                  onChangeText={setDescription}
                />
              </View>
              {descriptionError ? <Text style={styles.errorText}>{descriptionError}</Text> : null}

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Price"
                  placeholderTextColor="#BDBDBD"
                  value={price}
                  keyboardType="numeric"
                  onChangeText={setPrice}
                />
              </View>
              {priceError ? <Text style={styles.errorText}>{priceError}</Text> : null}

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Promotion (optional)"
                  placeholderTextColor="#BDBDBD"
                  value={promotion}
                  keyboardType="numeric"
                  onChangeText={setPromotion}
                />
              </View>

              <TouchableOpacity onPress={pickImage}>
                <View style={styles.imagePicker}>
                  {image ? (
                    <Image source={{ uri: image }} style={styles.imagePreview} />
                  ) : (
                    <Text style={styles.imagePickerText}>Pick an image</Text>
                  )}
                </View>
              </TouchableOpacity>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleAddOrModifyProduct}>
                  <Text style={styles.buttonText}>
                    {isModifying ? 'Save Changes' : 'Add Product'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleGoNext}>
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 15,
    backgroundColor: '#f1f1f1',
    
    elevation:20
  },
  inputAndroid: {
    fontSize: 16,
     width:'100%',
     height:52,
     paddingStart:15,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 15,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: '#f1f1f1',
 

  },
});
const pickerSelectStylesdisponibility = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 15,
    backgroundColor: '#f1f1f1',
    
    elevation:20
  },
  inputAndroid: {
    fontSize: 16,
     width:'100%',
     height:52,
  paddingStart:10,

    borderColor: 'gray',
    alignContent:'center',
    alignItems:'center',
alignSelf:'center',
    borderRadius: 15,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: '#f1f1f1',
 

  },
});
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  inputContainerSmall: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    paddingHorizontal: 10,
    
    
    borderRadius: 15,
    width: '50%', // Adjust this width to fit the row
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 10,
  },
  pickerWrapperdisponibility: {
    width: '30%', // Adjust this width to fit the row
    height: 52,
    borderRadius: 15,
    overflow: 'visible',
    paddingStart:10,

    backgroundColor: '#f1f1f1',
    elevation: 20,
  },
  pickerWrapper: {
    width:'100%',
    height:52,
    borderRadius: 15, // Set your desired border radius
    overflow: 'visible', // Ensure the rounded corners are visible
    backgroundColor: '#f1f1f1', // Match the background color if necessary
    marginBottom: 15,
    elevation: 20, // Adjust elevation/shadow as needed
  },
  pickerWrapperdisponibility: {
    width:'40%',
    height:52,
    alignContent:'center',
    alignItems:'center',
    alignSelf:'center',

    marginRight:20,
    borderRadius: 15, // Set your desired border radius
    overflow: 'visible', // Ensure the rounded corners are visible
    backgroundColor: '#f1f1f1', // Match the background color if necessary
    elevation: 20, // Adjust elevation/shadow as needed
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'repeat', // Or 'stretch' if you want to stretch the image to fill the screen
  },
  container: {
    flex: 1,
    height:20,
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
    paddingTop:10,
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
    elevation: 10,
  },
  inputContainerdisc: {

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
    elevation: 10,
  },
  inputContainerprice: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    alignSelf:'flex-start',
    borderRadius: 15,
    width: '30%',
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontStyle:'normal',

    color: '#FFFFFFF',
  },
  inputdesc: {
textAlign:'left',
    fontSize: 16,
    fontStyle:'normal',
    color: '#FFFFFFF',
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