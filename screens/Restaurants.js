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

  const navigateToDetail = (restaurantName, restaurantImage) => {
    navigation.navigate('DetailRestaurant', { name: restaurantName, image: restaurantImage });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        {restaurants.map((restaurant) => (
          <TouchableOpacity
            key={restaurant._id}
            style={styles.card}
            onPress={() => navigateToDetail(restaurant.nameRes, restaurant.images)}
          >
            <ImageBackground
              source={{ uri: restaurant.images }}
              style={styles.cardBackground}
            >
              <Text style={styles.cardText}>{restaurant.nameRes}</Text>
            </ImageBackground>
          </TouchableOpacity>
        ))}
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
    textAlign: 'center', // Pour centrer le texte
  },
});

export default RestaurantScreen;
