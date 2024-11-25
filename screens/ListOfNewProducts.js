import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

const API_BASE_URL_PRODUCT = 'http://192.168.1.14:5555/product';
const API_BASE_URL_CATEGORIES = 'http://192.168.1.14:5555/category';

export default function ListOfNewProducts({ navigation }) {
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [Products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const handlenext = async () => {
    navigation.navigate('AddProductScreen');
  };

  const handleModifyProd = async (product) => {
    await AsyncStorage.setItem('PRODUCTID',product);
    await AsyncStorage.setItem('MODIFY','true');
    console.log("Card pressed:", product);
    navigation.replace('AddProductScreen');
    // You can navigate to another screen, show a modal, etc.
  };

  const fetchProducts = useCallback(async () => {
    try {
      const menuId = await AsyncStorage.getItem('MENUID');
      const response = await axios.get(`${API_BASE_URL_PRODUCT}/menu/${menuId}/products`);
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching Products:', error);
    }
  }, []);

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

    const fetchCategories = async () => {
      try {
        const menuId = await AsyncStorage.getItem('MENUID');
        const response = await axios.get(`${API_BASE_URL_CATEGORIES}/find/item/by/menu/${menuId}`);
        const fetchedCategories = response.data.map((category) => ({
          label: category.libelle,
          value: category.libelle,
        }));
        fetchedCategories.unshift({ label: 'All Products', value: 'all' });
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
    getColor();
  }, []);

  useEffect(() => {
    // Filter the products whenever selectedCategory or Products change
    if (selectedCategory && selectedCategory !== 'all') {
      setFilteredProducts(Products.filter((product) => product.categoryFK.libelle === selectedCategory));
    } else {
      setFilteredProducts(Products); // Show all products if "All Products" is selected
    }
  }, [selectedCategory, Products]);


  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [fetchProducts])
  );

  return (
    <ImageBackground
      source={require('../assets/backroundMenu2.jpeg')}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.innerContainer}
        >
          <View style={styles.headerContainer}>
            <View style={styles.header}>
              <Icon name="arrow-back" size={28} color="#000" onPress={() => navigation.goBack()} />
            </View>
          </View>
          <View style={styles.pickerWrapper}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedCategory(value)}
              items={categories}
              placeholder={{
                label: 'Filter by category...',
                value: null,
                color: '#888',
              }}
              style={pickerSelectStyles}
              value={selectedCategory}
              useNativeAndroidPickerStyle={false} // This is important for Android
            />
          </View>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.content}>
              {filteredProducts.length > 0 ? (
                <View style={styles.categoryContainer}>
                  {filteredProducts.map((Product) => (
                    <TouchableOpacity
                      key={Product._id}
                      style={styles.card}
                      onPress={() => handleModifyProd(Product._id)}
                    >
                      <ImageBackground
                        source={{ uri: Product.photo }}
                        style={styles.cardBackground}
                      >
                        <Text style={styles.cardText}>{Product.name}</Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View style={styles.content}>
                  <Text style={styles.welcomeText}>There is no new product</Text>
                  <Icon name="sad-outline" size={28} color="#000" />
                  <Image
                    source={require('../assets/emptything.png')}
                    style={styles.emptyImage}
                  />
                </View>
              )}
            </View>
          </ScrollView>
          <View style={styles.footerContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.primaryButton, { backgroundColor: selectedColor }]} onPress={handlenext}>
                <Text style={[styles.buttonText, styles.primaryButtonText]}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
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
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'repeat',
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
   
  },
  emptyImage: {
    width: 250,
    height: 250,
    marginTop: 100,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
    zIndex: 1,
    marginTop:10
  },
  pickerWrapper: {
    width:'70%',
    height:52,
    borderRadius: 15, // Set your desired border radius
    overflow: 'visible', // Ensure the rounded corners are visible
    backgroundColor: '#f1f1f1', // Match the background color if necessary
    marginBottom: 10,
    marginTop:40,
    marginRight:30,

    elevation: 20, // Adjust elevation/shadow as needed
    alignSelf:'flex-end'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 20,
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
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    width: '45%',
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
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
    elevation: 20,
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
