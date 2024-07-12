// screens/DetailRestaurant.js

import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const DetailRestaurant = ({ route }) => {
  const { name, image } = route.params;

  const menu = [
    'Pizza Margherita',
    'Pasta Carbonara',
    'Caesar Salad',
    'Tiramisu',
  ];

  const description = 'Authentic Italian cuisine with a cozy atmosphere.';
  const address = '123 Main St, Tunis';
  const hours = '10:00 AM - 10:00 PM';

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        
        <Text style={styles.heading}>Menu:</Text>
        {menu.map((item, index) => (
          <Text key={index} style={styles.menuItem}>{item}</Text>
        ))}
        
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
    width: 200,
    height: 200,
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
  menuItem: {
    fontSize: 18,
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: '#333',
  },
  hours: {
    fontSize: 16,
    color: '#333',
  },
});

export default DetailRestaurant;
