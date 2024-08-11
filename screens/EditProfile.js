import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library

const API_BASE_URL = 'http://192.168.1.15:5555/user';

const EditProfile = () => {
  const navigation = useNavigation();

  const [admin, setAdmin] = useState({
    userName: '',
    role: '',
    phoneNumber: '',
    image: '',
    email: '',
    location: '',
    DateofBirth: '',
    joinDate: '',
  });

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSaveProfile} style={styles.headerSaveButton}>
          <Text style={styles.headerSaveButtonText}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, userName, email, location, dateOfBirth, selectedImage]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) throw new Error('No token found');

        const userData = await getUser(token);
        if (userData.length > 0) {
          setAdmin(userData[0]);
          setUserName(userData[0].userName);
          setEmail(userData[0].email);
          setLocation(userData[0].address);
          setDateOfBirth(userData[0].birthday);
        
        
        }
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    };

    fetchUserData();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      setSelectedImage(uri);
      setAdmin({ ...admin, image: uri });
    }
  };

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

  const handleSaveProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const id = await AsyncStorage.getItem('id');

      if (!token) throw new Error('No token found');

      const formData = new FormData();
      formData.append('userName', userName);
      formData.append('email', email);
      formData.append('address', location);
      formData.append('birthday', dateOfBirth);

      if (selectedImage) {
        formData.append('image', {
          uri: selectedImage,
          type: 'image/jpeg',
          name: 'profile.jpg',
        });
      }

      const response = await axios.put(`${API_BASE_URL}/updateUserAdmin/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.message === 'Updated user ADMIN.') {
        alert('Profile updated successfully');
        navigation.goBack(); // Navigate to ProfilePage after saving
      } else {
        alert('An error occurred. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Failed to update profile', error.response.data);
      } else if (error.request) {
        console.error('Failed to update profile', error.request);
      } else {
        console.error('Failed to update profile', error.message);
      }
      alert('An error occurred. Please try again.');
    }
  };

  const handlenavigationtochangepassword = () => {
    navigation.push('Changepasswordscrean');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
            <Image
              source={{ uri: admin.image || 'https://example.com/default_profile.jpg' }}
              style={styles.profileImage}
            />
            <View style={styles.editIconContainer}>
              <Icon name="edit" size={30} color="#000000" />
            </View>
          </TouchableOpacity>
          <Text style={styles.name}>{admin.userName}</Text>
          <Text style={styles.role}>{admin.role}</Text>
          <Text style={styles.phoneNumber}>{admin.phoneNumber}</Text>
        </View>

        <LabeledInput label="User Name" value={userName} onChangeText={setUserName} />
        <LabeledInput label="Email" value={email} onChangeText={setEmail} />
        <LabeledInput label="Address" value={location} onChangeText={setLocation} />
        <LabeledInput label="Date of Birth" value={dateOfBirth} onChangeText={setDateOfBirth} />

        <TouchableOpacity style={styles.saveButton} onPress={handlenavigationtochangepassword}>
          <Text style={styles.saveButtonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const LabeledInput = ({ label, value, onChangeText }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    paddingVertical: 20,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#f28b82',
    borderRadius: 15,
    padding: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    padding: 20, // Increased padding
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30, // Increased margin
  },
  profileImageContainer: {
    width: 120, // Increased width
    height: 120, // Increased height
    borderRadius: 60, // Increased radius
    overflow: 'hidden',
    marginBottom: 15, // Increased margin
    borderWidth: 3, // Increased border width
    borderColor: '#f28b82',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 28, // Increased font size
    fontWeight: 'bold',
    marginBottom: 10, // Increased margin
  },
  role: {
    fontSize: 22, // Increased font size
    marginBottom: 10, // Increased margin
    color: '#555',
  },
  phoneNumber: {
    fontSize: 18, // Increased font size
    color: '#888',
  },
  detailsSection: {
    width: '95%', // Increased width
    backgroundColor: '#f9f9f9',
    borderRadius: 15, // Increased border radius
    shadowColor: '#000',
    shadowOffset: {
      width: 0, height: 3, // Increased shadow offset
    },
    shadowOpacity: 0.3,
    shadowRadius: 5, // Increased shadow radius
    elevation: 6, // Increased elevation
    marginBottom: 30, // Increased margin
  },
  detailTitle: {
    fontSize: 22, // Increased font size
    fontWeight: 'bold',
    marginBottom: 15, // Increased margin
    color: '#333',
  },
  detailText: {
    fontSize: 18, // Increased font size
    marginBottom: 10, // Increased margin
    color: '#666',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20, // Increased margin
  },
  label: {
    fontSize: 18, // Increased font size
    color: '#333',
    marginBottom: 10, // Increased margin
  },
  input: {
    flexDirection: 'row',

    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 2,
    borderRadius: 15,
    width: 300,
 
    height: 55,


  },
  saveButton: {
    backgroundColor: '#f28b82',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom:10,
    alignItems: 'center',
    width: '100%',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18, // Increased font size
  },
  headerSaveButton: {
    marginRight: 15,
  },
  headerSaveButtonText: {
    color: '#ff0000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditProfile;
