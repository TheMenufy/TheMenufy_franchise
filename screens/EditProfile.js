import React, { useState ,useEffect} from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity ,Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const API_BASE_URL = 'http://192.168.1.13:5555/user';
const EditProfile = () => {
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) throw new Error('No token found');

        const userData = await getUser(token);
        if (userData.length > 0) {
          setAdmin(userData[0]);
        }
      } catch (error) {
        console.error('Failed to load use data', error);
      }
    };

    fetchUserData();
  }, []);
  
  const [admin, setAdmin] = useState({
    firstName: 'Adem',
    lastName: 'Seddik',
    role: 'resFranchise',
    phoneNumber: '+21625443666',
    imageUrl: 'prof.png',
    email: 'ademseddikadem@gmail.com',
    location: 'Tunis, Tunisia',
    DateofBirth: 'August 11, 2000',
    joinDate: 'January 1, 2020',
  });

  const [firstName, setFirstName] = useState(admin.firstName);
  const [lastName, setLastName] = useState(admin.lastName);
  const [email, setEmail] = useState(admin.email);
  const [location, setLocation] = useState(admin.location);
  const [dateOfBirth, setDateOfBirth] = useState(admin.DateofBirth);

  const navigation = useNavigation();

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
      setProfileImage(uri);
      await AsyncStorage.setItem('profileImage', uri);
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) throw new Error('No token found');

        const formData = new FormData();
        formData.append('image', {
          uri,
          type: 'image/jpeg',
          name: 'profile.jpg',
        });
        await updateImage(formData, token);
      } catch (error) {
        console.error('Failed to upload image', error);
      }
    }
  };

  const getUser = async (token) => {
    try {
      console.log("im here")
      const response = await axios.get(`${API_BASE_URL}/getUser`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to get user data', error);
      throw error;
    }
  };
  const handleSaveProfile = () => {
    setAdmin({
      ...admin,
      firstName,
      lastName,
      email,
      location,
      DateofBirth: dateOfBirth,
    });
    navigation.navigate('Profile'); // Navigate to ProfilePage after saving
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.profileImageContainer}>
            
          <Image source={{ uri: admin.image || 'https://example.com/default_profile.jpg' }} style={styles.profileImage} />
          
          </View>
          </TouchableOpacity>
          <Text style={styles.name}>{firstName} {lastName}</Text>
          <Text style={styles.role}>{admin.role}</Text>
          <Text style={styles.phoneNumber}>{admin.phoneNumber}</Text>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.detailTitle}>Contact Information</Text>
          <LabeledInput label="First Name" value={firstName} onChangeText={setFirstName} />
          <LabeledInput label="Last Name" value={lastName} onChangeText={setLastName} />
          <LabeledInput label="Email" value={admin.email} onChangeText={setEmail} />
          <LabeledInput label="Address" value={admin.address} onChangeText={setLocation} />
          <LabeledInput label="Date of Birth" value={dateOfBirth} onChangeText={setDateOfBirth} />

          <Text style={styles.detailTitle}>Member Since</Text>
          <Text style={styles.detailText}>{admin.joinDate}</Text>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    padding: 20, // Increased padding
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
    backgroundColor: '#f1f1f1',
    paddingVertical: 15, // Increased padding
    paddingHorizontal: 20, // Increased padding
    borderRadius: 15,
    width: '100%',
    height: 60, // Increased height
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, // Increased shadow offset
    shadowOpacity: 0.2,
    shadowRadius: 3, // Increased shadow radius
    elevation: 3, // Increased elevation
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#f28b82',
    paddingVertical: 20, // Increased padding
    paddingHorizontal: 30, // Increased padding
    borderRadius: 20, // Increased border radius
    alignItems: 'center',
    width: '100%',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18, // Increased font size
  },
});

export default EditProfile;
