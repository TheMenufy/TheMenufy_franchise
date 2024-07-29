// screens/FranchiseScreen.js

import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FranchiseScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        
        {/* CardView for Torino */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('RestaurantCategoriesScreen', {
            restaurantName: 'Torino',
            initialCategories: [
              { id: '1', name: 'Appetizers' },
              { id: '2', name: 'Main Courses' },
              { id: '3', name: 'Desserts' },
            ],
          })}
        >
          <ImageBackground
            source={require('../assets/pizza.jpg')}
            style={styles.cardBackground}
          >
            <Text style={styles.cardText}>Categories</Text>
          </ImageBackground>
        </TouchableOpacity>

        {/* CardView for Baguette Baguette */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('RestaurantCategoriesScreen', {
            restaurantName: 'Baguette Baguette',
            initialCategories: [
              { id: '4', name: 'Sandwiches' },
              { id: '5', name: 'Pastries' },
            ],
          })}
        >
          <ImageBackground
            source={require('../assets/sushi.jpg')}
            style={styles.cardBackground}
          >
            <Text style={styles.cardText}>Products</Text>
          </ImageBackground>
        </TouchableOpacity>

        {/* CardView for KFC */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('RestaurantCategoriesScreen', {
            restaurantName: 'KFC',
            initialCategories: [
              { id: '6', name: 'Fried Chicken' },
              { id: '7', name: 'Sides' },
            ],
          })}
        >
          <ImageBackground
            source={require('../assets/mozzarella.jpg')}
            style={styles.cardBackground}
          >
            <Text style={styles.cardText}>Choices</Text>
          </ImageBackground>
        </TouchableOpacity>

        {/* CardView for Foret Noire */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('RestaurantCategoriesScreen', {
            restaurantName: 'Foret Noire',
            initialCategories: [
              { id: '8', name: 'Cakes' },
              { id: '9', name: 'Pastries' },
            ],
          })}
        >
          <ImageBackground
            source={require('../assets/pates.jpg')}
            style={styles.cardBackground}
          >
            <Text style={styles.cardText}>Items</Text>
          </ImageBackground>
        </TouchableOpacity>
        
        {/* Add Menu Button */}
        <TouchableOpacity
          style={styles.addMenuButton}
          onPress={() => {/* Navigate to Add Menu Screen or handle action here */}}
        >
          <Text style={styles.addMenuButtonText}>Add Menu</Text>
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
    aspectRatio: 16 / 9, // Utilisation d'un ratio fixe pour une taille uniforme
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
  },
  addMenuButton: {
    backgroundColor: '#f28b82',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  addMenuButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FranchiseScreen;
