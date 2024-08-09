import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'; // Utilisation d'expo-image-picker
import { TriangleColorPicker } from 'react-native-color-picker';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.17:5555/franchise';

const SetupSystem = () => {
  const navigation = useNavigation();

  const [establishmentName, setEstablishmentName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [themeColor, setThemeColor] = useState(0.5);
  const [selectedColor, setSelectedColor] = useState('#ffffff');
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
    facebook: '',
    instagram: '',
    linkedin: '',
  });

  const [isEstablishmentOpen, setIsEstablishmentOpen] = useState(true);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isThemeColorOpen, setIsThemeColorOpen] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState(null);

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
      setFranchiseImage(result.uri); // Met à jour l'état avec l'URI de l'image sélectionnée
    }
  };

  const handleLongPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

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
            </View>
          )}
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.sectionHeader} onPress={() => setIsImageOpen(!isImageOpen)}>
            <Text style={styles.sectionTitle}>Franchise Image</Text>
            <Text style={styles.sectionToggle}>{isImageOpen ? '-' : '+'}</Text>
          </TouchableOpacity>
          {isImageOpen && (
            <View style={styles.sectionContent}>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {franchiseImage ? (
                  <Image source={{ uri: franchiseImage }} style={styles.image} />
                ) : (
                  <Text style={styles.imagePlaceholder}>Select Image</Text>
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
                style={{ flex: 1, height: 200 }}
              />
              <View style={[styles.colorDisplay, { backgroundColor: selectedColor }]}>
                <Text style={styles.colorText}>Selected Color: {selectedColor}</Text>
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
                <Image source={require('../assets/facebook.png')} style={styles.logo} />
                <TextInput
                  style={styles.socialInput}
                  placeholder="Facebook URL"
                  value={socialNetworks.facebook}
                  onChangeText={(text) => setSocialNetworks({ ...socialNetworks, facebook: text })}
                />
                {errors.facebook ? <Text style={styles.error}>{errors.facebook}</Text> : null}
              </View>

              <View style={styles.socialContainer}>
                <Image source={require('../assets/instagram.png')} style={styles.logo} />
                <TextInput
                  style={styles.socialInput}
                  placeholder="Instagram URL"
                  value={socialNetworks.instagram}
                  onChangeText={(text) => setSocialNetworks({ ...socialNetworks, instagram: text })}
                />
                {errors.instagram ? <Text style={styles.error}>{errors.instagram}</Text> : null}
              </View>

              <View style={styles.socialContainer}>
                <Image source={require('../assets/linkedin.png')} style={styles.logo} />
                <TextInput
                  style={styles.socialInput}
                  placeholder="LinkedIn URL"
                  value={socialNetworks.linkedin}
                  onChangeText={(text) => setSocialNetworks({ ...socialNetworks, linkedin: text })}
                />
                {errors.linkedin ? <Text style={styles.error}>{errors.linkedin}</Text> : null}
              </View>
            </View>
          )}
        </View>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onLongPress={handleLongPress}
          >
            {selectedLocation && (
              <Marker coordinate={selectedLocation} />
            )}
          </MapView>
          <Text style={styles.mapPlaceholder}>
            {selectedLocation ? `Selected Location: ${selectedLocation.latitude}, ${selectedLocation.longitude}` : 'Select Location on Map'}
          </Text>
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
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: 'blue',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
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
    color: 'blue',
  },
  sectionContent: {
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imagePlaceholder: {
    color: 'gray',
  },
  slider: {
    height: 40,
  },
  mapContainer: {
    height: 300,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 20,
  },
  map: {
    flex: 1,
    borderRadius: 10,
  },
  mapPlaceholder: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#f28b82',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  socialInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
  colorDisplay: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  colorText: {
    color: '#000',
  },
});

export default SetupSystem;
