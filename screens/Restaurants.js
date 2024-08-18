import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const API_BASE_URL_RESTAURANTS = 'http://192.168.1.17:5555/restaurant';

const RestaurantScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get(`${API_BASE_URL_RESTAURANTS}/retrieveall`)
      .then(response => {
        setRestaurants(response.data);
      })
      .catch(error => {
        console.error('Error fetching restaurants:', error);
      });
  }, []);

  const navigateToDetail = (restaurant) => {
    navigation.navigate('DetailRestaurant', {
      name: restaurant.nameRes,
      image: restaurant.images,
      address: restaurant.address,
      cuisineType: restaurant.cuisineType
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
              source={{ uri: restaurant.images }}
              style={styles.cardBackground}
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
    backgroundColor: '#007BFF',
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
