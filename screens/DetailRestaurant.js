// screens/DetailRestaurant.js

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const DetailRestaurant = ({ route }) => {
  const { name, image } = route.params;

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.text}>{name}</Text>
      {/* Ajoutez d'autres détails ici si nécessaire */}
    </View>
  );
};

const styles = StyleSheet.create({
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
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default DetailRestaurant;
