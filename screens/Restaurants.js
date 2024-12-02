import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import defaultImage from '../assets/default_image.jpg'; // Ajustez le chemin si nécessaire

const API_BASE_URL_RESTAURANTS = 'http://192.168.1.14:5555/restaurant';
const API_BASE_URL = 'http://192.168.1.14:5555/user';

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
  const [theme, setTheme] = useState('light'); // Définir un état pour le thème
  const navigation = useNavigation();

  // Fonction pour récupérer le thème stocké
  const fetchTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      setTheme(savedTheme || 'light'); // Par défaut 'light' si aucune valeur n'est trouvée
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  };

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
    fetchUserData(); // Charger les données utilisateur une fois au démarrage
  }, []);

  const fetchRestaurants = useCallback(() => {
    if (franchiseFK) {
      axios.get(`${API_BASE_URL_RESTAURANTS}/retrieveall`)
        .then(response => {
          const filteredRestaurants = response.data.filter(restaurant => restaurant.franchiseFK === franchiseFK);
          setRestaurants(filteredRestaurants);
        })
        .catch(error => {
          console.error('Error fetching restaurants:', error);
        });
    }
  }, [franchiseFK]);

  useEffect(() => {
    fetchRestaurants(); // Charger les restaurants lors du montage du composant
  }, [fetchRestaurants]);

  useFocusEffect(
    useCallback(() => {
      fetchRestaurants(); // Récupérer les restaurants à chaque fois que la page devient active
      fetchTheme(); // Récupérer et appliquer le thème à chaque fois que la page devient active
    }, [])
  );

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

  const containerStyle = theme === 'dark' ? styles.containerDark : styles.containerLight;
  const cardBackgroundStyle = theme === 'dark' ? styles.cardBackgroundDark : styles.cardBackgroundLight;

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={[styles.container, containerStyle]}>
        {restaurants.map((restaurant) => (
          <TouchableOpacity
            key={restaurant._id}
            style={styles.card}
            onPress={() => navigateToDetail(restaurant)}
          >
            <ImageBackground
              source={restaurant.images ? { uri: restaurant.images } : defaultImage}
              style={[styles.cardBackground, cardBackgroundStyle]}
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
  containerLight: {
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#333',
  },
  card: {
    width: '100%',
    aspectRatio: 16 / 9,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardBackgroundLight: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBackgroundDark: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444', // Une couleur de fond plus sombre
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
