import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RestaurantScreen = () => {
  const navigation = useNavigation();

  const navigateToDetail = (restaurantName, restaurantImage) => {
    navigation.navigate('DetailRestaurant', { name: restaurantName, image: restaurantImage });
  };

  const addRestaurant = () => {
    // Logique pour ajouter un restaurant
    navigation.navigate('AddRestaurant'); // Assurez-vous que cette route est définie dans votre navigation
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        {/* CardView pour Torino Tunis */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigateToDetail('Torino Tunis', require('../assets/TorinoTunis.jpg'))}
        >
          <ImageBackground
            source={require('../assets/TorinoTunis.jpg')}
            style={styles.cardBackground}
          >
            <Text style={styles.cardText}>Torino Tunis</Text>
          </ImageBackground>
        </TouchableOpacity>
        
        {/* CardView pour Baguette&Baguette La Marsa */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigateToDetail('Baguette&Baguette La Marsa', require('../assets/bgmarsa.jpg'))}
        >
          <ImageBackground
            source={require('../assets/bgmarsa.jpg')}
            style={styles.cardBackground}
          >
            <Text style={styles.cardText}>Baguette&Baguette La Marsa</Text>
          </ImageBackground>
        </TouchableOpacity>
        
        {/* CardView pour KFC Géant */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigateToDetail('KFC Géant', require('../assets/KFCgéant.jpg'))}
        >
          <ImageBackground
            source={require('../assets/KFCgéant.jpg')}
            style={styles.cardBackground}
          >
            <Text style={styles.cardText}>KFC Géant</Text>
          </ImageBackground>
        </TouchableOpacity>
        
        {/* CardView pour Foret Noire Hammam Lif */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigateToDetail('Foret Noire Hammam Lif', require('../assets/HammamLif.jpg'))}
        >
          <ImageBackground
            source={require('../assets/HammamLif.jpg')}
            style={styles.cardBackground}
          >
            <Text style={styles.cardText}>Foret Noire Hammam Lif</Text>
          </ImageBackground>
        </TouchableOpacity>
        
        {/* CardView pour Street 19 Hammam Lif */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigateToDetail('Street 19 Hammam Lif', require('../assets/Street19.jpg'))}
        >
          <ImageBackground
            source={require('../assets/Street19.jpg')}
            style={styles.cardBackground}
          >
            <Text style={styles.cardText}>Street 19 Hammam Lif</Text>
          </ImageBackground>
        </TouchableOpacity>
        
        {/* Bouton pour ajouter un restaurant */}
        <TouchableOpacity style={styles.addButton} onPress={addRestaurant}>
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
  },
  addButton: {
    marginTop: 20,
    backgroundColor: 'tomato',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RestaurantScreen;
