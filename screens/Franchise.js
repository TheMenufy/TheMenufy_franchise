import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const FranchiseScreen = () => {
  const navigation = useNavigation();
  const API_BASE_URL_USER = 'http://192.168.1.14:5555/user';
  const API_BASE_URL_FRANCHISE = 'http://192.168.1.14:5555/franchise';
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  
  //functions 


  
  const getUser = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL_USER}/getUser`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to get user data', error);
      throw error;
    }
  };
  
  const getFranchise = async (id) => {
    try {

      const response = await axios.get(`${API_BASE_URL_FRANCHISE}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get franchise data', error);
      throw error;
    }
  };

  const fetchFranchiseData = useCallback(async () => {
    try {
      const FRANCHISEID = await AsyncStorage.getItem('FRANCHISEID');
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const userData = await getUser(token);
      if (userData.length > 0) {
        const franchiseId = userData[0].franchiseFK;
        const franchiseData = await getFranchise(franchiseId);
        if (franchiseData) {
          setSelectedColor(franchiseData.data.color);
          await AsyncStorage.setItem('MENUID', franchiseData.data.menu);

        }
      }
      
    } catch (error) {
      console.error('Failed to load franchise data', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchFranchiseData();
    }, [fetchFranchiseData])
  );

  return (
    <ImageBackground
      source={require('../assets/backroundMenu2.jpeg')}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>

        <View style={styles.container}>
          <TouchableOpacity
            style={[styles.card, { backgroundColor: selectedColor }]}  // Apply selected color
            onPress={() => navigation.navigate('Categorielist')}
          >
            <View style={styles.cardTop}>
              <Text style={styles.cardText}>Flavor Fusion</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.cardLeft}>
                <Text style={styles.cardLeftText}>Categories: 4{"\n"}Products: 20{"\n"}Ingredients: 78{"\n"}Items: 14</Text>
              </View>
              <View style={styles.cardRight}>
                <Text style={styles.cardRightText}>10{"\n"}Restaurant use this menu</Text>
              </View>
            </View>
          </TouchableOpacity>
        
         

          <TouchableOpacity
            style={[styles.addMenuButton, { backgroundColor: selectedColor }]}
            onPress={() => {
              navigation.navigate('Addcategories')
            }}
          >
      <Text style={styles.addMenuButtonText}>Add Category</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'repeat', // Or 'stretch' if you want to stretch the image to fill the screen
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
   // paddingTop: Platform.OS === 'ios' ? 10 : 0, // Adjust for iOS safe area
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 20, // Adds space below the header
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  card: {
    width: '97%',
    aspectRatio: 16 / 9,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 10,
     shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.8,
  shadowRadius: 2,
  },
  cardTop: {
  
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
  },
  cardLeft: {
    flex: 2,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  cardRight: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  cardLeftText: {
    fontSize: 18,
    color: '#878787',
    textAlign: 'center',
  },
  cardRightText: {
    fontSize: 18,
    color: '#878787',
    textAlign: 'center',
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
});

export default FranchiseScreen;