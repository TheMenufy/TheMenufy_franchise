// Home.js

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
        } else if (route.name === 'Archives') {
          iconName = 'archive';
        } else if (route.name === 'Restaurants') {
          iconName = 'restaurant';
        } else if (route.name === 'Convs') {
          iconName = 'chatbubbles';
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={route.name === 'Home' ? styles.homeButton : styles.tabButton}
          >
            <Ionicons name={iconName} size={route.name === 'Home' ? 30 : 25} color={isFocused ? 'tomato' : 'gray'} />
            {route.name !== 'Home' && <Text style={{ color: isFocused ? 'tomato' : 'gray' }}>{route.name}</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Home = () => {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />} initialRouteName="Home">
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Archives" component={FranchisesScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
      <Tab.Screen name="Convs" component={ConversationsScreen} />
    </Tab.Navigator>
  );
};

const HomeScreen = () => {
  const latestNews = [
    { id: 1, title: "New Franchise Opened: Pizza Palace", description: "Pizza Palace has opened a new branch in downtown." },
    { id: 2, title: "Special Offer at Burger Town", description: "Burger Town is offering a 20% discount on all items this weekend." },
    { id: 3, title: "KFC Launches New Menu", description: "KFC has introduced new spicy wings to their menu." },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        
        <View style={styles.profileSummary}>
          <Text style={styles.profileSummaryTitle}>Profile Summary</Text>
          <Text style={styles.profileSummaryText}>Admin: John Doe</Text>
          <Text style={styles.profileSummaryText}>Role: Administrator</Text>
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
  const admin = {
    firstName: 'John',
    lastName: 'Doe',
    role: 'Administrator',
    phoneNumber: '+1234567890',
    imageUrl: 'https://example.com/admin_profile.jpg',
    email: 'john.doe@example.com',
    location: 'Tunis, Tunisia',
    experience: '5 years in restaurant management',
    joinDate: 'Joined on January 1, 2020',
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <Image style={styles.profileImage} source={{ uri: admin.imageUrl }} />
        </View>
        <Text style={styles.name}>{admin.firstName} {admin.lastName}</Text>
        <Text style={styles.role}>{admin.role}</Text>
        <Text style={styles.phoneNumber}>{admin.phoneNumber}</Text>
      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.detailTitle}>Contact Information</Text>
        <Text style={styles.detailText}>Email: {admin.email}</Text>
        <Text style={styles.detailText}>Location: {admin.location}</Text>
        <Text style={styles.detailText}>Phone: {admin.phoneNumber}</Text>

        <Text style={styles.detailTitle}>Professional Experience</Text>
        <Text style={styles.detailText}>Experience: {admin.experience}</Text>
        <Text style={styles.detailText}>{admin.joinDate}</Text>
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

const ConversationsScreen = () => {
  const conversations = [
    { id: 1, name: "Pizza Palace", lastMessage: "Your order is on the way!", time: "2 min ago" },
    { id: 2, name: "Burger Town", lastMessage: "Don't forget to rate us!", time: "10 min ago" },
    { id: 3, name: "KFC", lastMessage: "New spicy wings available now.", time: "30 min ago" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Conversations</Text>
        {conversations.map(conversation => (
          <TouchableOpacity key={conversation.id} style={styles.conversationCard}>
            <View style={styles.conversationHeader}>
              <Image
                style={styles.conversationImage}
                source={{ uri: `https://example.com/${conversation.name.toLowerCase().replace(/ /g, "_")}_profile.jpg` }}
              />
              <View style={styles.conversationDetails}>
                <Text style={styles.conversationName}>{conversation.name}</Text>
                <Text style={styles.lastMessage}>{conversation.lastMessage}</Text>
              </View>
              <Text style={styles.messageTime}>{conversation.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
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
