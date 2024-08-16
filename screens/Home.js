import React, { useEffect, useState, useCallback, useRef }  from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FranchiseScreen from '../screens/Franchise';
import RestaurantScreen from '../screens/Restaurants';
import ProfilePage from '../screens/Profile';
import ConversationsPage from '../screens/Chat';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const API_BASE_URL_USER = 'http://192.168.1.15:5555/user';
const API_BASE_URL_FRANCHISE = 'http://192.168.1.15:5555/franchise';

function CustomTabBar({ state, descriptors, navigation, selectedColor }) {
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
        } else if (route.name === 'Menu') {
          iconName = 'menu';
        } else if (route.name === 'Restaurants') {
          iconName = 'restaurant';
        } else if (route.name === 'Chat') {
          iconName = 'chatbubbles';
        }

        // Determine the button color based on the active route
        const buttonColor = 
        route.name === 'Home' && state.routes[state.index].name === 'Menu'
          ? selectedColor
          : route.name === 'Menu' && isFocused
          ? selectedColor
          : 'tomato';
      
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
            style={[styles.homeButton, { backgroundColor: buttonColor }]}
          >
            <Ionicons name={iconName} size={30} color="white" />
          </TouchableOpacity>
        );
      }else {
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
                color={isFocused ? buttonColor : 'gray'}
              />
              <Text style={{ color: isFocused ? buttonColor : 'gray' }}>
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
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  const getUser = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL_USER}/getUser`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to get user data', error);
      throw error;
    }
  };

  const getFranchise = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL_FRANCHISE}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get franchise data', error);
      throw error;
    }
  };

  const fetchFranchiseData = useCallback(async () => {
    
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const userData = await getUser(token);
      if (userData.length > 0) {
        const franchiseId = userData[0].franchiseFK;
        const franchiseData = await getFranchise(franchiseId);
        if (franchiseData) {
          setSelectedColor(franchiseData.data.color);
          await AsyncStorage.setItem('color', franchiseData.data.color);
        }
      }
    } catch (error) {
      console.error('Failed to load franchise data', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchFranchiseData();
    }, [fetchFranchiseData])
  );

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} selectedColor={selectedColor} />}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f28b82',
          },
          headerTitleStyle: {
            color: '#FFFFFF', // Set the title color to white
          },
        }}
      />
      <Tab.Screen
        name="Menu"
        component={FranchisesScreen}
        options={{
          headerTitleAlign: 'center',
          title: 'Menu',
          headerTitleAlign: 'center',
          Titlecolor: '#FFFFFF',
          headerStyle: {
            backgroundColor: selectedColor,
          },
          headerTitleStyle: {
            color: '#FFFFFF', // Set the title color to white
          },
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f28b82',
          },
          headerTitleStyle: {
            color: '#FFFFFF', // Set the title color to white
          },
        }}
      />
      <Tab.Screen
        name="Restaurants"
        component={RestaurantsScreen}
        options={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f28b82',
          },
          headerTitleStyle: {
            color: '#FFFFFF', // Set the title color to white
          },
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ConversationsScreen}
        options={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f28b82',
          },
          headerTitleStyle: {
            color: '#FFFFFF', // Set the title color to white
          },
        }}
      />
    </Tab.Navigator>
  );
};

const HomeScreen = ({ navigation }) => {
  const latestNews = [
    { id: 1, title: "New Franchise Opened: Pizza Palace", description: "Pizza Palace has opened a new branch in downtown." },
    { id: 2, title: "Special Offer at Burger Town", description: "Burger Town is offering a 20% discount on all items this weekend." },
    { id: 3, title: "KFC Launches New Menu", description: "KFC has introduced new spicy wings to their menu." },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.setupButton}
          onPress={() => navigation.navigate('SetupSystem')}
        >
          <Text style={styles.setupButtonText}>Setup System</Text>
        </TouchableOpacity>
        
        <Text style={styles.welcomeText}>Welcome!</Text>
        
        <View style={styles.profileSummary}>
          <Text style={styles.profileSummaryTitle}>Profile Summary</Text>
          <Text style={styles.profileSummaryText}>Admin: Adem Seddik</Text>
          <Text style={styles.profileSummaryText}>Role: resFranchise</Text>
          <Text style={styles.profileSummaryText}>Location: Tunis, Tunisia</Text>
        </View>

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
  return <ProfilePage />;
};

const RestaurantsScreen = () => {
  return <RestaurantScreen />;
};

const FranchisesScreen = () => {
  return <FranchiseScreen />;
};

const ConversationsScreen = () => {
  return <ConversationsPage />;
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileSummary: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  profileSummaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  profileSummaryText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  newsSection: {
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
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
    marginBottom: 20,
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
    color: '#555',
  },
  phoneNumber: {
    fontSize: 16,
    color: '#888',
  },
  detailsSection: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
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
    borderRadius: 30,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
  },
  setupButton: {
    backgroundColor: '#f28b82',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
    marginHorizontal:16,
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
  },
  setupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  conversationCard: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  conversationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conversationImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  conversationDetails: {
    flex: 1,
  },
  conversationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 16,
    color: '#666',
  },
  messageTime: {
    fontSize: 14,
    color: '#aaa',
  },
});

export default Home;