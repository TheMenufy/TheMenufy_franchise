import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.17:5555/user';

// Function to get user data from the backend
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
  const navigation = useNavigation();

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const userData = await getUser(token);
      if (userData.length > 0) {
        setAdmin(userData[0]);
      }
    } catch (error) {
      console.error('Failed to load user data', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  const handleEditProfile = () => {
    navigation.push('EditProfile');
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://192.168.1.17:5555/auth/logout');
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      navigation.navigate('login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('An error occurred while logging out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout} style={styles.changePasswordButton}>
        <Ionicons name="log-out-outline" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
        <Ionicons name="pencil" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: admin.image || 'https://example.com/default_profile.jpg' }} style={styles.profileImage} />
        </View>
        <Text style={styles.name}>{admin.userName}</Text>
        <Text style={styles.role}>{admin.role}</Text>
        <Text style={styles.phoneNumber}>{admin.phone}</Text>
      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.detailTitle}>Contact Information</Text>
        <Text style={styles.detailText}>Email: {admin.email}</Text>
        <Text style={styles.detailText}>Location: {admin.address}</Text>
        <Text style={styles.detailText}>Phone number: {admin.phone}</Text>
        <Text style={styles.detailText}>Date of Birth: {admin.birthday}</Text>
      </View>

      <View style={styles.memberSinceSection}>
        <Text style={styles.detailTitle}>Member Since</Text>
        <Text style={styles.detailText}>{admin.createdAt}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  changePasswordButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'tomato',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    elevation: 3,
  },
  editButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#007BFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    elevation: 3,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 60,
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
    marginBottom: 20,
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
  logoutButton: {
    marginTop: 20,
    backgroundColor: 'tomato',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfilePage;
