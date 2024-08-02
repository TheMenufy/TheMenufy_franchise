import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider'; // Assurez-vous d'installer cette bibliothèque
import { launchImageLibrary } from 'react-native-image-picker';

const SetupSystem = () => {
  const navigation = useNavigation(); // Utilisez le hook useNavigation pour obtenir l'objet de navigation

  const [establishmentName, setEstablishmentName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [themeColor, setThemeColor] = useState(0.5); // Valeur initiale du slider
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

  // États pour gérer l'affichage des rubriques
  const [isEstablishmentOpen, setIsEstablishmentOpen] = useState(true);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isThemeColorOpen, setIsThemeColorOpen] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);

  const handleSave = () => {
    // Reset errors
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

    // Validation logic
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
      // Logic to save the data
      console.log('Data saved');
    }
  };

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setFranchiseImage(response.assets[0].uri);
      }
    });
  };

  // Function to determine the color based on the slider value
  const getColorFromSliderValue = (value) => {
    const hue = value * 360;
    return `hsl(${hue}, 100%, 50%)`;
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
            <Text style={styles.sectionTitle}>Restaurant Image</Text>
            <Text style={styles.sectionToggle}>{isImageOpen ? '-' : '+'}</Text>
          </TouchableOpacity>
          {isImageOpen && (
            <View style={styles.sectionContent}>
              <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
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
              <View style={styles.sliderContainer}>
                <Slider
                  value={themeColor}
                  onValueChange={setThemeColor}
                  minimumValue={0}
                  maximumValue={1}
                  step={0.01}
                  style={[styles.slider, { backgroundColor: getColorFromSliderValue(themeColor) }]}
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
                <Image source={require('../assets/facebook.png')} style={styles.logo} />
                <TextInput
                  style={styles.socialInput} // Utilisez le style socialInput pour une largeur uniforme
                  placeholder="Facebook URL"
                  value={socialNetworks.facebook}
                  onChangeText={(text) => setSocialNetworks({ ...socialNetworks, facebook: text })}
                />
                {errors.facebook ? <Text style={styles.error}>{errors.facebook}</Text> : null}
              </View>

              <View style={styles.socialContainer}>
                <Image source={require('../assets/instagram.png')} style={styles.logo} />
                <TextInput
                  style={styles.socialInput} // Utilisez le style socialInput pour une largeur uniforme
                  placeholder="Instagram URL"
                  value={socialNetworks.instagram}
                  onChangeText={(text) => setSocialNetworks({ ...socialNetworks, instagram: text })}
                />
                {errors.instagram ? <Text style={styles.error}>{errors.instagram}</Text> : null}
              </View>

              <View style={styles.socialContainer}>
                <Image source={require('../assets/linkedin.png')} style={styles.logo} />
                <TextInput
                  style={styles.socialInput} // Utilisez le style socialInput pour une largeur uniforme
                  placeholder="LinkedIn URL"
                  value={socialNetworks.linkedin}
                  onChangeText={(text) => setSocialNetworks({ ...socialNetworks, linkedin: text })}
                />
                {errors.linkedin ? <Text style={styles.error}>{errors.linkedin}</Text> : null}
              </View>
            </View>
          )}
        </View>

        {/* Placeholder for the map component */}
        <View style={styles.mapContainer}>
          <Text style={styles.mapPlaceholder}>Map Placeholder</Text>
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
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40, // Add extra padding at the bottom
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
  card: {
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f0f0f0',
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
    padding: 15,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  socialInput: { // Style pour les champs de réseaux sociaux
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%', // Assurez-vous que ces champs utilisent la largeur totale disponible
  },
  sliderContainer: {
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  socialContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  mapContainer: {
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  mapPlaceholder: {
    color: '#aaa',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#f28b82',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePicker: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  imagePlaceholder: {
    color: '#aaa',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SetupSystem;
