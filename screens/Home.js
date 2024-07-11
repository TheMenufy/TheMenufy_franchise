// Home.js

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';
import FranchiseScreen from '../screens/Franchise';
import RestaurantScreen from '../screens/Restaurants';

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName;
        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Profile') {
          iconName = 'person';
        } else if (route.name === 'Franchise') {
          iconName = 'business';
        } else if (route.name === 'Restaurants') {
          iconName = 'restaurant';
        } else if (route.name === 'Users') {
          iconName = 'people';
        }

        if (route.name === 'Home') {
          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.homeButton}
            >
              <Ionicons name={iconName} size={30} color="white" />
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
            >
              <Ionicons
                name={iconName}
                size={25}
                color={isFocused ? 'tomato' : 'gray'}
              />
              <Text style={{ color: isFocused ? 'tomato' : 'gray' }}>
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
}

const Home = () => {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}
    initialRouteName="Home">
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Franchise" component={FranchisesScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
      <Tab.Screen name="Users" component={UsersScreen} />
    
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
  const admin = {
    firstName: 'John',
    lastName: 'Doe',
    role: 'Administrator',
    phoneNumber: '+1234567890',
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
      </View>
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
    backgroundColor: '#FFA07A',
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
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    alignItems: 'center',
  },
  homeButton: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
  },
});

export default Home;
