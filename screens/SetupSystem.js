import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { TriangleColorPicker } from 'react-native-color-picker';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

const API_BASE_URL_USER = 'http://192.168.1.14:5555/user';
const API_BASE_URL_FRANCHISE = 'http://192.168.1.14:5555/franchise';


const SetupSystem = () => {
  const navigation = useNavigation();
  const [establishmentName, setEstablishmentName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [franchiseImage, setFranchiseImage] = useState(null);
  const [socialNetworks, setSocialNetworks] = useState({
    facebook: '',
    instagramLink: '',
    twitterLink: '',
    tiktokLink: '',
  });
  const [errors, setErrors] = useState({
    establishmentName: '',
    address: '',
    phoneNumber: '',
    email: '',
    cuisineType: '',
    facebook: '',
    twitterLink: '',
    instagramLink: '',
    tiktokLink: '',
  });
  const [isEstablishmentOpen, setIsEstablishmentOpen] = useState(true);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isThemeColorOpen, setIsThemeColorOpen] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.78825,
    longitude: -100.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const pickerContainerRef = useRef(null);

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
      if (geocode.length > 0) {
        const { latitude, longitude } = geocode[0];
        setInitialRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    } catch (error) {
      console.error('Error getting coordinates', error);
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

  const updateFranchise = async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_BASE_URL_FRANCHISE}/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Failed to update franchise', error);
      throw error;
    }
  };

  const fetchFranchiseData = async () => {
    try {
      const FRANCHISEID = await AsyncStorage.getItem('FRANCHISEID');
        const franchiseData = await getFranchise(FRANCHISEID);
        if (franchiseData) {
          setEstablishmentName(franchiseData.data.nameFr);
          setAddress(franchiseData.data.address);
          setPhoneNumber(franchiseData.data.phone);
          setEmail(franchiseData.data.email);
          setCuisineType(franchiseData.data.cuisineType);
          setSelectedColor(franchiseData.data.color);
          setFranchiseImage(franchiseData.data.logo);
          setSocialNetworks({
            facebook: franchiseData.data.facebookLink || '',
            instagramLink: franchiseData.data.instagramLink || '',
            tiktokLink: franchiseData.data.tiktokLink || '',
            twitterLink: franchiseData.data.twitterLink || '',
          });

          getCoordinatesForPlace(franchiseData.data.address);
        }
      
    } catch (error) {
      console.error('Failed to load franchise data', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFranchiseData();
    }, [])
  );

  const handleLongPress = async (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);

    try {
      const reverseGeocode = await Location.reverseGeocodeAsync(coordinate);
      if (reverseGeocode.length > 0) {
        const { street, city, region, postalCode } = reverseGeocode[0];
        const formattedAddress = `${street}, ${city}, ${region}, ${postalCode}`;
        setAddress(formattedAddress);
      }
    } catch (error) {
      console.error('Error getting address from coordinates', error);
    }
  };

  const handleSave = async () => {
    let validationErrors = {
      establishmentName: '',
      address: '',
      phoneNumber: '',
      email: '',
      facebook: '',
      instagramLink: '',
      tiktokLink: '',
      twitterLink: '',
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
    if (!socialNetworks.instagramLink) {
      validationErrors.instagramLink = 'Instagram URL is required';
      isValid = false;
    }
    if (!socialNetworks.twitterLink) {
      validationErrors.twitterLink = 'Twitter URL is required';
      isValid = false;
    }
    if (!socialNetworks.tiktokLink) {
      validationErrors.tiktokLink = 'TikTok URL is required';
      isValid = false;
    }

    setErrors(validationErrors);

    if (isValid) {
      try {
        const FRANCHISEID = await AsyncStorage.getItem('FRANCHISEID');

   

   
        if (userData.length > 0) {
   

          const updatedData = {
            nameFr: establishmentName,
            address,
            phone: phoneNumber,
            email,
            cuisineType,
            color: selectedColor,
            logo: franchiseImage,
            facebookLink: socialNetworks.facebook,
            instagramLink: socialNetworks.instagramLink,
            tiktokLink: socialNetworks.tiktokLink,
            twitterLink: socialNetworks.twitterLink,
          };

          const updatedFranchise = await updateFranchise(FRANCHISEID, updatedData);
          if (updatedFranchise.success) {
            Alert.alert('Success', 'Franchise information updated successfully');
          }
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to update franchise information');
      }
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

    const colorObjectToHex = ({ h, s, v }) => {
      const f = (n, k = (n + h / 60) % 6) =>
        Math.round((v - v * s * Math.max(Math.min(k, 4 - k, 1), 0)) * 255);
      const r = f(5);
      const g = f(3);
      const b = f(1);
    
      const toHex = (value) => {
        const hex = value.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      };
    
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
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
              {errors.establishmentName ? <Text style={styles.errorText}>{errors.establishmentName}</Text> : null}

              <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />
              {errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}

              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
              {errors.phoneNumber ? <Text style={styles.errorText}>{errors.phoneNumber}</Text> : null}

              <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
              {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

              <TextInput
                style={styles.input}
                placeholder="Cuisine Type"
                value={cuisineType}
                onChangeText={setCuisineType}
              />
            </View>
          )}
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsImageOpen(!isImageOpen)}>
            <Text style={styles.sectionTitle}>Upload Franchise Image</Text>
            <Text style={styles.sectionToggle}>{isImageOpen ? '-' : '+'}</Text>
          </TouchableOpacity>
          {isImageOpen && (
            <View style={styles.sectionContent}>
              <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
               
             
              {franchiseImage && (
                <Image source={{ uri: franchiseImage }} style={{ width: 200, height: 200, marginTop: 10 ,alignContent:'center',alignSelf:'center'}} />
              )}
               </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsThemeColorOpen(!isThemeColorOpen)}>
            <Text style={styles.sectionTitle}>Choose Theme Color</Text>
            <Text style={styles.sectionToggle}>{isThemeColorOpen ? '-' : '+'}</Text>
          </TouchableOpacity>
          {isThemeColorOpen && (
            <View style={styles.sectionContent}>
              <View ref={pickerContainerRef}>
              <TriangleColorPicker
  onColorChange={(color) => {
    const selectedColor = { h: color.h, s: color.s, v: color.v };

    const hexColor = colorObjectToHex(selectedColor);
  
    setSelectedColor(hexColor);
  }}
  style={{ height: 200, width: '100%' }}
  defaultColor={selectedColor}
/>

              </View>
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
               <View style={styles.socialContainer}>
                <Image source={require('../assets/facebook.png')} style={styles.logofb} />
                <TextInput
                  style={styles.socialInput}
                  placeholder="Facebook URL"
                  value={socialNetworks.facebook}
                  onChangeText={(text) => setSocialNetworks({ ...socialNetworks, facebook: text })}
                />
                {errors.facebook ? <Text style={styles.error}>{errors.facebook}</Text> : null}
              </View>
              <View style={styles.socialContainer}>
              <Image source={require('../assets/instagram.png')} style={styles.logoin} />
              <TextInput
                style={styles.socialInput}
                placeholder="instagramLink"
                value={socialNetworks.instagramLink}
                onChangeText={(text) => setSocialNetworks((prev) => ({ ...prev, instagramLink: text }))}
              />
              {errors.instagramLink ? <Text style={styles.errorText}>{errors.instagramLink}</Text> : null}
              </View>
              <View style={styles.socialContainer}>
              <Image source={require('../assets/twitter.png')} style={styles.logotwit} />
              <TextInput
                style={styles.socialInput}
                placeholder="Twitter Link"
                value={socialNetworks.twitterLink}
                onChangeText={(text) => setSocialNetworks((prev) => ({ ...prev, twitterLink: text }))}
              />
              {errors.twitterLink ? <Text style={styles.errorText}>{errors.twitterLink}</Text> : null}
              </View>
              <View style={styles.socialContainer}>
              <Image source={require('../assets/tiktok.png')} style={styles.logotik} />
              <TextInput
                style={styles.socialInput}
                placeholder="TikTok Link"
                value={socialNetworks.tiktokLink}
                onChangeText={(text) => setSocialNetworks((prev) => ({ ...prev, tiktokLink: text }))}
              />
              {errors.tiktokLink ? <Text style={styles.errorText}>{errors.tiktokLink}</Text> : null}
              </View>
            </View>
          )}
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsLocationOpen(!isLocationOpen)}>
            <Text style={styles.sectionTitle}>Location</Text>
            <Text style={styles.sectionToggle}>{isLocationOpen ? '-' : '+'}</Text>
          </TouchableOpacity>
          {isLocationOpen && (
            <View style={styles.sectionContent}>
              <MapView
                style={styles.map}
                initialRegion={initialRegion}
                key={`${initialRegion.latitude}-${initialRegion.longitude}`}
                onLongPress={handleLongPress}
              >
                {selectedLocation && <Marker coordinate={selectedLocation} />}
              </MapView>
            </View>
          )}
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
    backgroundColor: '#f0f0f0',
  },
  socialInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
  },
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  card: {
    marginBottom: 10,
    borderRadius: 25,
    backgroundColor: '#f28b82',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    padding: 20,
  },
  cardimage: {
    marginBottom: 10,
    borderRadius: 25,
    backgroundColor: '#FFDCDD',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    padding: 20,
  },
  logofb: {
    width: 40,
    height: 60,
    marginRight: 7,
  },
  logoin: {
    width: 40,
    height: 40,
    marginRight: 7,
  },
  logotwit: {
    width: 40,
    height: 55,
    marginRight: 7,
  },
  logotik: {
    width: 40,
    height: 40,
    marginRight: 7,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor:'#EBECFF',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 60,
    height: 150,
    marginBottom: 10,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  colorPicker: {
    flex: 1,
  },
  map: {
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: '#f28b82',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
    alignItems: 'center',
    alignSelf:'center',
    width: '90%',
   
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SetupSystem;