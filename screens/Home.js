// Home.js

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FranchiseScreen from '../screens/Franchise';
import RestaurantScreen from '../screens/Restaurants';

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

const HomeScreen = ({ navigation }) => {
  const latestNews = [
    { id: 1, title: "New Franchise Opened: Pizza Palace", description: "Pizza Palace has opened a new branch in downtown." },
    { id: 2, title: "Special Offer at Burger Town", description: "Burger Town is offering a 20% discount on all items this weekend." },
    { id: 3, title: "KFC Launches New Menu", description: "KFC has introduced new spicy wings to their menu." },
    // Ajoutez d'autres activités ici
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddFranchise')}>
          <Text style={styles.buttonText}>Add Franchise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddRestaurant')}>
          <Text style={styles.buttonText}>Add Restaurant</Text>
        </TouchableOpacity>

        <View style={styles.newsSection}>
          <Text style={styles.newsHeading}>Latest News</Text>
          {latestNews.map(news => (
            <View key={news.id} style={styles.newsCard}>
              <Text style={styles.newsTitle}>{news.title}</Text>
              <Text style={styles.newsDescription}>{news.description}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFA07A', // Oranger clair
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  newsSection: {
    marginTop: 30,
    width: '100%',
    paddingHorizontal: 20,
  },
  newsHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  newsCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  newsDescription: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
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
