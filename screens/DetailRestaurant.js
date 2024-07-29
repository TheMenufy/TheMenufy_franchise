// screens/DetailRestaurant.js

import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DetailRestaurant = ({ route }) => {
  const { name, image } = route.params;
  const navigation = useNavigation();

  const description = 'Authentic Italian cuisine with a cozy atmosphere.';
  const address = '123 Main St, Tunis';
  const hours = '10:00 AM - 10:00 PM';

  // Get the width of the screen
  const { width } = Dimensions.get('window');

  // Handle the button press
  const handleClickHere = () => {
    navigation.navigate('MenuScreen'); // Navigue vers MenuScreen
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={image} style={[styles.image, { width }]} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        
        <Text style={styles.heading}>Menu:</Text>
        <TouchableOpacity style={styles.button} onPress={handleClickHere}>
          <Text style={styles.buttonText}>Click Here to See</Text>
        </TouchableOpacity>

        <Text style={styles.heading}>Address:</Text>
        <Text style={styles.address}>{address}</Text>
        
        <Text style={styles.heading}>Hours:</Text>
        <Text style={styles.hours}>{hours}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 250, // Ajustez la hauteur de l'image selon vos besoins
    resizeMode: 'cover',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  address: {
    fontSize: 16,
    color: '#333',
  },
  hours: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#f28b82', // Couleur du bouton
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DetailRestaurant;
