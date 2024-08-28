import React, { useEffect, useState } from 'react';
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

const API_BASE_URL_CATEGORIES = 'http://192.168.1.17:5555/category';

export default function Categorielist({ navigation }) {
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [categories, setCategories] = useState([]);

  const handlenext = async () => {
    const AddProductScreen = () => import('./AddProductScreen');
    navigation.navigate(AddProductScreen);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const menuId = await AsyncStorage.getItem('MENUID');
        
        const response = await axios.get(`${API_BASE_URL_CATEGORIES}/find/item/by/menu/${menuId}`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  
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
      source={require('../assets/backroundMenu2.jpeg')}
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
            
            <View style={styles.content}>
              {categories.length > 0 ? (
                <View style={styles.categoryContainer}>
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={category._id}
                      style={styles.card}
                      onPress={() => navigation.navigate('DetailScreen', { category })}
                    >
                      <ImageBackground
                        source={{ uri: category.photo }}
                        style={styles.cardBackground}
                      >
                        <Text style={styles.cardText}>{category.libelle}</Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View style={styles.content}>
                  <Text style={styles.welcomeText}>There is no new category</Text>
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
            <TouchableOpacity
            style={[styles.addMenuButton, { backgroundColor: selectedColor }]}
            onPress={() => {
              navigation.navigate('Addcategories')
            }}
          >
      <Text style={styles.addMenuButtonText}>Add Category</Text>
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
  addMenuButton: {
    backgroundColor: '#f28b82',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    width: 330,
    alignItems: 'center',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  addMenuButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
 