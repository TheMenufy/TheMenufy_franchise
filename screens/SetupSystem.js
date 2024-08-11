import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { TriangleColorPicker } from 'react-native-color-picker';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location'; 

const API_BASE_URL = 'http://192.168.1.15:5555/franchise';

const SetupSystem = () => {
  const navigation = useNavigation();
  
  const [establishmentName, setEstablishmentName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [franchiseFK, setfranchiseFK] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [themeColor, setThemeColor] = useState(0.5);
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [admin, setAdmin] = useState({});
  const [franchise, setFranchise] = useState({});
  const [socialNetworks, setSocialNetworks] = useState({
    facebook: '',
    instagram: '',
    linkedin: '',
  });
  const [franchiseImage, setFranchiseImage] = useState(null);
  const [errors, setErrors] = useState({
    establishmentName: '',
    address: '',
    phoneNumber: '',
    email: '',
    cuisineType: '',
    facebook: '',
    instagram: '',
    linkedin: '',
  });

  const [isEstablishmentOpen, setIsEstablishmentOpen] = useState(true);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isThemeColorOpen, setIsThemeColorOpen] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);


  const pickerContainerRef = useRef(null);

  const API_BASE_URL_USER = 'http://192.168.1.15:5555/user';
  const API_BASE_URL_FRANCHISE = 'http://192.168.1.15:5555/franchise';
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.78825,
    longitude: -100.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  
  const requestPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to grant location permissions to use this feature.');
      return false;
    }
    return true;
  };
  const getCoordinatesForPlace = async (placeName) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      let geocode = await Location.geocodeAsync(placeName);
      console.log(geocode)
      if (geocode.length > 0) {
        const { latitude, longitude } = geocode[0];
        setInitialRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    } catch (error) {
      console.error('Error getting coordinates', error);
    }
  };

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

  const fetchFranchiseData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const userData = await getUser(token);
      if (userData.length > 0) {
        const franchiseId = userData[0].franchiseFK;

        const franchiseData = await getFranchise(franchiseId);
        if (franchiseData) {
          setFranchise(franchiseData);
          setEstablishmentName(franchiseData.data.nameFr);
          setAddress(franchiseData.data.address);
          setPhoneNumber(franchiseData.data.phone);
          setEmail(franchiseData.data.email);
          setCuisineType(franchiseData.data.cuisineType);
          setSelectedColor(franchiseData.data.color);
          setFranchiseImage(franchiseData.data.logo);
          // Assuming you have social network fields in the franchise data
          setSocialNetworks({
            facebook: franchiseData.data.facebook || '',
            instagram: franchiseData.data.instagram || '',
            linkedin: franchiseData.data.linkedin || '',
          });
        }
      }
    } catch (error) {
      console.error('Failed to load franchise data', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getCoordinatesForPlace("russia");
      fetchFranchiseData();
     
    }, [])
  );

  const handleSave = () => {
    let validationErrors = {
      establishmentName: '',
      address: '',
      phoneNumber: '',
      email: '',
      facebook: '',
      instagram: '',
      linkedin: '',
    };

    let isValid = true;

    if (!establishmentName) {
      validationErrors.establishmentName = 'Establishment Name is required';
      isValid = false;
    }
    if (!address) {
      validationErrors.address = 'Address is required';
      isValid = false;
    }
    if (!phoneNumber) {
      validationErrors.phoneNumber = 'Phone Number is required';
      isValid = false;
    }
    if (!email) {
      validationErrors.email = 'Email is required';
      isValid = false;
    }
    if (!socialNetworks.facebook) {
      validationErrors.facebook = 'Facebook URL is required';
      isValid = false;
    }
    if (!socialNetworks.instagram) {
      validationErrors.instagram = 'Instagram URL is required';
      isValid = false;
    }
    if (!socialNetworks.linkedin) {
      validationErrors.linkedin = 'LinkedIn URL is required';
      isValid = false;
    }

    setErrors(validationErrors);

    if (isValid) {
      console.log('Data saved');
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setFranchiseImage(result.uri); 
    }
  };
  useEffect(() => {
    getCoordinatesForPlace("america");
  }, []);
  const handleLongPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsEstablishmentOpen(!isEstablishmentOpen)}>
            <Text style={styles.sectionTitle}>Establishment Information</Text>
            <Text style={styles.sectionToggle}>{isEstablishmentOpen ? '-' : '+'}</Text>
          </TouchableOpacity>
          {isEstablishmentOpen && (
            <View style={styles.sectionContent}>
              <TextInput
                style={styles.input}
                placeholder="Establishment Name"
                value={establishmentName}
                onChangeText={setEstablishmentName}
              />
              {errors.establishmentName ? <Text style={styles.error}>{errors.establishmentName}</Text> : null}

              <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
              />
              {errors.address ? <Text style={styles.error}>{errors.address}</Text> : null}

              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
              {errors.phoneNumber ? <Text style={styles.error}>{errors.phoneNumber}</Text> : null}

              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

              <TextInput
                style={styles.input}
                placeholder="Cuisine Type"
                value={cuisineType}
                onChangeText={setCuisineType}
              />
              {errors.cuisineType ? <Text style={styles.error}>{errors.cuisineType}</Text> : null}
            </View>
          )}
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsImageOpen(!isImageOpen)}>
            <Text style={styles.sectionTitle}>Franchise Logo</Text>
            <Text style={styles.sectionToggle}>{isImageOpen ? '-' : '+'}</Text>
          </TouchableOpacity>
          {isImageOpen && (
            <View style={styles.sectionContent}>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {franchiseImage ? (
                  <Image source={{ uri: franchiseImage }} style={styles.image} />
                ) : (
                  <Text style={styles.imagePlaceholder}>Select Logo</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsThemeColorOpen(!isThemeColorOpen)}>
            <Text style={styles.sectionTitle}>Theme Color</Text>
            <Text style={styles.sectionToggle}>{isThemeColorOpen ? '-' : '+'}</Text>
          </TouchableOpacity>
          {isThemeColorOpen && (
            <View style={styles.sectionContent}>
              <TriangleColorPicker
                onColorSelected={color => setSelectedColor(color)}
                style={{ height: 200, width: '100%' }}
                defaultColor={selectedColor}
              />
            </View>
          )}
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsSocialOpen(!isSocialOpen)}>
            <Text style={styles.sectionTitle}>Social Networks</Text>
            <Text style={styles.sectionToggle}>{isSocialOpen ? '-' : '+'}</Text>
          </TouchableOpacity>
          {isSocialOpen && (
            <View style={styles.sectionContent}>
              <TextInput
                style={styles.input}
                placeholder="Facebook URL"
                value={socialNetworks.facebook}
                onChangeText={text => setSocialNetworks(prevState => ({ ...prevState, facebook: text }))}
              />
              {errors.facebook ? <Text style={styles.error}>{errors.facebook}</Text> : null}

              <TextInput
                style={styles.input}
                placeholder="Instagram URL"
                value={socialNetworks.instagram}
                onChangeText={text => setSocialNetworks(prevState => ({ ...prevState, instagram: text }))}
              />
              {errors.instagram ? <Text style={styles.error}>{errors.instagram}</Text> : null}

              <TextInput
                style={styles.input}
                placeholder="LinkedIn URL"
                value={socialNetworks.linkedin}
                onChangeText={text => setSocialNetworks(prevState => ({ ...prevState, linkedin: text }))}
              />
              {errors.linkedin ? <Text style={styles.error}>{errors.linkedin}</Text> : null}
            </View>
          )}
        </View>

        <View style={styles.card}>
        <MapView
        style={styles.map}
        initialRegion={initialRegion}
        onLongPress={handleLongPress}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionToggle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  imagePicker: {
    height: 150,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imagePlaceholder: {
    fontSize: 16,
    color: '#888',
  },
  map: {
    height: 200,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SetupSystem;
