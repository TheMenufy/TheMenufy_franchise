import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.14:5555/user';

const getUser = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getUser`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get user data', error);
    throw error;
  }
};

const ProfilePage = () => {
  const [admin, setAdmin] = useState({});
  const [currentProfile, setCurrentProfile] = useState('personal');
  const [isDarkMode, setIsDarkMode] = useState(false); // state for dark/light mode
  const navigation = useNavigation();

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const userData = await getUser(token);
      if (userData.length > 0) {
        console.log("the franchise id is: " + userData[0].franchiseFK);
        AsyncStorage.setItem('IMAGE_KEY', userData[0].image);
        setAdmin(userData[0]);
      }
    } catch (error) {
      console.error('Failed to load user data', error);
    }
  };

  const loadTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme) {
        setIsDarkMode(storedTheme === 'dark');
      }
    } catch (error) {
      console.error('Failed to load theme from AsyncStorage', error);
    }
  };

  const saveTheme = async (theme) => {
    try {
      await AsyncStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Failed to save theme to AsyncStorage', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    saveTheme(newTheme); // Save the new theme to AsyncStorage
  };

  useEffect(() => {
    fetchUserData();
    loadTheme(); // Load the theme when the component mounts
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  const handleEditProfile = () => {
    navigation.push('EditPorfileScreen');
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://192.168.1.14:5555/auth/logout');
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      navigation.navigate('login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('An error occurred while logging out. Please try again.');
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Dark/Light Mode Toggle Button */}
        <TouchableOpacity onPress={toggleTheme} style={styles.themeToggleButton}>
          <Ionicons name={isDarkMode ? "moon" : "sunny"} size={24} color={isDarkMode ? "#fff" : "#000"} />
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            {admin.image === 'client.png' ? (
              <Image source={userimage} style={styles.profileImage} />
            ) : (
              <Image source={{ uri: 'http://192.168.1.14:5555/uploads/user/' + `${admin.image}` }} style={styles.profileImage} />
            )}
          </View>

          <View style={styles.nameAndEditContainer}>
            <Text style={[styles.name, isDarkMode && styles.darkText]}>{admin.userName}</Text>
            <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
              <Ionicons name="pencil" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={[styles.role, isDarkMode && styles.darkText]}>{admin.role}</Text>
          <Text style={[styles.phoneNumber, isDarkMode && styles.darkText]}>{admin.phone}</Text>
        </View>

        {/* Contact Information Section */}
        <View style={[styles.detailsSection, isDarkMode && styles.darkSection]}>
          <Text style={[styles.detailTitle, isDarkMode && styles.darkText]}>Contact Information</Text>
          <Text style={[styles.detailText, isDarkMode && styles.darkText]}>Email: {admin.email}</Text>
          <Text style={[styles.detailText, isDarkMode && styles.darkText]}>Location: {admin.address}</Text>
          <Text style={[styles.detailText, isDarkMode && styles.darkText]}>Phone number: {admin.phone}</Text>
          <Text style={[styles.detailText, isDarkMode && styles.darkText]}>Date of Birth: {admin.birthday}</Text>
        </View>

        {/* Member Since Section */}
        <View style={[styles.memberSinceSection, isDarkMode && styles.darkSection]}>
          <Text style={[styles.detailTitle, isDarkMode && styles.darkText]}>Member Since</Text>
          <Text style={[styles.detailText, isDarkMode && styles.darkText]}>{admin.createdAt}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  themeToggleButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    backgroundColor: 'transparent',
    padding: 8,
  },
  logoutButton: {
    backgroundColor: 'tomato',
    borderRadius: 20,
    width: 40,
    height: 40,
    padding: 8,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#f28b82',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  nameAndEditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
  },
  darkText: {
    color: '#fff',
  },
  editButton: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 20,
  },
  darkSection: {
    backgroundColor: '#444',
  },
  memberSinceSection: {
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
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ProfilePage;
