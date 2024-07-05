// screens/Franchise.js

import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';

const FranchiseScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        
        
        {/* CardView for Torino */}
        <View style={styles.card}>
          <ImageBackground
            source={require('../assets/Torino.jpg')}
            style={styles.cardBackground}
          >
            <Text style={styles.cardText}>Torino</Text>
          </ImageBackground>
        </View>
        
        {/* CardView for Baguette Baguette */}
        <View style={styles.card}>
          <ImageBackground
            source={require('../assets/bg.jpg')}
            style={styles.cardBackground}
          >
            <Text style={styles.cardText}>Baguette Baguette</Text>
          </ImageBackground>
        </View>
        
        {/* CardView for KFC */}
        <View style={styles.card}>
          <ImageBackground
            source={require('../assets/KFC.jpg')}
            style={styles.cardBackground}
          >
            <Text style={styles.cardText}>KFC</Text>
          </ImageBackground>
        </View>
        
        {/* CardView for Foret Noire */}
        <View style={styles.card}>
          <ImageBackground
            source={require('../assets/Foretnoire.png')}
            style={styles.cardBackground}
          >
            <Text style={styles.cardText}>Foret Noire</Text>
          </ImageBackground>
        </View>
        
        {/* CardView for Street 19 */}
        <View style={styles.card}>
          <ImageBackground
            source={require('../assets/Street19.jpg')}
            style={styles.cardBackground}
          >
            <Text style={styles.cardText}>Street 19</Text>
          </ImageBackground>
        </View>
        
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
});

export default FranchiseScreen;
