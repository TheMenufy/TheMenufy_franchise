// Home.js

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FranchiseScreen from '../screens/Franchise.js';
import RestaurantScreen from '../screens/Restaurants.js';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Franchises" component={FranchisesScreen} />
      <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
      <Tab.Screen name="Users" component={UsersScreen} />
      <Tab.Screen name="Archives" component={ArchivesScreen} />
    </Tab.Navigator>
  );
};

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
};

const ProfileScreen = () => {
  // Exemple de données d'administrateur
  const admin = {
    firstName: 'John',
    lastName: 'Doe',
    role: 'Administrator',
    phoneNumber: '+1234567890',
    // Remplacez imageUrl par l'URL de l'image de profil de l'administrateur
    imageUrl: 'https://example.com/admin_profile.jpg', 
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri: admin.imageUrl }}
          />
        </View>
        <Text style={styles.name}>{admin.firstName} {admin.lastName}</Text>
        <Text style={styles.role}>{admin.role}</Text>
        <Text style={styles.phoneNumber}>{admin.phoneNumber}</Text>
        {/* Ajoutez d'autres informations si nécessaire */}
      </View>
      {/* Autres contenus de la page de profil ici */}
    </View>
  );
};

const RestaurantsScreen = () => {
  return <RestaurantScreen />;
};

const FranchisesScreen = () => {
  return <FranchiseScreen />;
};

const UsersScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Users Screen</Text>
    </View>
  );
};

const ArchivesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Archives Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#f28b82',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  role: {
    fontSize: 18,
    marginBottom: 5,
  },
  phoneNumber: {
    fontSize: 16,
    color: '#888',
  },
});

export default Home;
