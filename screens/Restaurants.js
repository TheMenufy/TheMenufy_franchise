import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import defaultImage from '../assets/default_image.jpg'; // Adjust the path as needed

const API_BASE_URL_RESTAURANTS = 'http://192.168.1.17:5555/restaurant';
const API_BASE_URL = 'http://192.168.1.17:5555/user';

const getUser = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getUser`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get user data', error);
    throw error;
  }
};

const RestaurantScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [franchiseFK, setFranchiseFK] = useState(null);
  const navigation = useNavigation();

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const userData = await getUser(token);
      if (userData.length > 0) {
        setFranchiseFK(userData[0].franchiseFK); // Stocke franchiseFK
      }
    } catch (error) {
      console.error('Failed to load user data', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (franchiseFK) { // Assure que franchiseFK est chargé avant de récupérer les restaurants
      axios.get(`${API_BASE_URL_RESTAURANTS}/retrieveall`)
        .then(response => {
          //console.log(response.data)
          const filteredRestaurants = response.data.filter(restaurant => restaurant.franchiseFK === franchiseFK);
          setRestaurants(filteredRestaurants); // Filtre les restaurants par franchiseFK
        })
        .catch(error => {
          console.error('Error fetching restaurants:', error);
        });
    }
  }, [franchiseFK]);

  const navigateToDetail = (restaurant) => {
    navigation.navigate('DetailRestaurant', {
      name: restaurant.nameRes,
      image: restaurant.images,
      address: restaurant.address,
      cuisineType: restaurant.cuisineType,
      facebookLink: restaurant.facebookLink,
      twitterLink: restaurant.twitterLink,
      instagramLink: restaurant.instagramLink,
      tiktokLink: restaurant.tiktokLink,
      phone: restaurant.phone,
      email: restaurant.email
    });
  };

  const navigateToAddRestaurant = () => {
    navigation.navigate('AddRestaurant'); // Naviguer vers la page d'ajout de restaurant
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        {restaurants.map((restaurant) => (
          <TouchableOpacity
            key={restaurant._id}
            style={styles.card}
            onPress={() => navigateToDetail(restaurant)}
          >
            <ImageBackground
            source={restaurant.images ? { uri: restaurant.images } : defaultImage}              style={styles.cardBackground}
            >
              <Text style={styles.cardText}>{restaurant.nameRes}</Text>
            </ImageBackground>
          </TouchableOpacity>
        ))}

        {/* Bouton "Add Restaurant" */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={navigateToAddRestaurant}
        >
          <Text style={styles.addButtonText}>Add Restaurant</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  card: {
    width: '100%',
    aspectRatio: 16 / 9,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    textAlign: 'center',
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#f28b82',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RestaurantScreen;
