import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Utilisation de expo-image-picker
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const AddRestaurantPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    nameRes: '',
    address: '',
    cuisineType: '',
    taxeTPS: '',
    taxeTVQ: '',
    payCashMethod: '',
    images: '', // Ajout de l'état pour l'URL de l'image
  });

  const navigation = useNavigation(); // Utilisation de useNavigation pour accéder aux fonctions de navigation

  // Fonction pour gérer les changements dans les champs de texte
  const handleChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.nativeEvent.text });
  };

  // Fonction pour ouvrir la bibliothèque d'images et sélectionner une image
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
      // Met à jour l'état avec l'URI de l'image sélectionnée
      setFormData({ ...formData, images: result.uri });
    }
  };

  // Fonction pour valider les champs du formulaire avant la soumission
  const validateForm = () => {
    const { firstName, lastName, phone, email, nameRes, address, cuisineType, taxeTPS, taxeTVQ, payCashMethod } = formData;

    if (!firstName || !lastName || !phone || !email || !nameRes || !address || !cuisineType || !taxeTPS || !taxeTVQ || !payCashMethod) {
      Alert.alert("Validation Error", "All fields are required. Please fill out all fields.");
      return false;
    }

    return true;
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async () => {
    if (!validateForm()) {
      return; // Stop the submission if validation fails
    }

    // Création d'une instance de FormData
    const formDataWithImage = new FormData();
    for (const key in formData) {
      formDataWithImage.append(key, formData[key]);
    }
    
    // Ajout de l'image au FormData
    if (formData.images) {
      formDataWithImage.append('images', {
        uri: formData.images,
        type: 'image/jpeg', // Ajustez le type MIME en fonction de l'image sélectionnée
        name: 'photo.jpg',
      });
    }

    try {
      // Envoi de la requête POST pour ajouter le restaurant
      const response = await axios.post('http://192.168.1.17:5555/user/addRestaurant', formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      Alert.alert("Success", response.data.message || "Restaurant added successfully");
      navigation.goBack(); // Retourne à la page précédente après un ajout réussi
    } catch (error) {
      console.error("Error adding restaurant:", error);
      Alert.alert("Error", "Failed to add restaurant. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Add a New Restaurant</Text>
        </View>
        <View style={styles.formContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
            {formData.images ? (
              <Image source={{ uri: formData.images }} style={styles.imagePreview} />
            ) : (
              <Text style={styles.imagePickerText}>Select an Image</Text>
            )}
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => handleChange(e, 'firstName')}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => handleChange(e, 'lastName')}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => handleChange(e, 'phone')}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleChange(e, 'email')}
          />
          <TextInput
            style={styles.input}
            placeholder="Restaurant Name"
            value={formData.nameRes}
            onChange={(e) => handleChange(e, 'nameRes')}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={formData.address}
            onChange={(e) => handleChange(e, 'address')}
          />
          <TextInput
            style={styles.input}
            placeholder="Cuisine Type"
            value={formData.cuisineType}
            onChange={(e) => handleChange(e, 'cuisineType')}
          />
          <TextInput
            style={styles.input}
            placeholder="TPS Tax"
            value={formData.taxeTPS}
            onChange={(e) => handleChange(e, 'taxeTPS')}
          />
          <TextInput
            style={styles.input}
            placeholder="TVQ Tax"
            value={formData.taxeTVQ}
            onChange={(e) => handleChange(e, 'taxeTVQ')}
          />
          <TextInput
            style={styles.input}
            placeholder="Payment Method"
            value={formData.payCashMethod}
            onChange={(e) => handleChange(e, 'payCashMethod')}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Add Restaurant</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3F3', // Couleur de fond saumon pâle
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: '#FA8072', // Bouton retour saumon
    borderRadius: 4,
    padding: 10,
    alignItems: 'center',
    marginRight: 16, // Espacement entre le bouton et le titre
  },
  backButtonText: {
    fontSize: 18,
    color: '#FFF',
  },
  title: {
    fontSize: 24,
    flex: 1,
    textAlign: 'center',
    color: '#FA8072', // Couleur saumon
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Pour Android
  },
  imagePickerButton: {
    backgroundColor: '#FAF3F3',
    borderColor: '#FA8072',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  imagePickerText: {
    color: '#FA8072',
    fontSize: 16,
  },
  input: {
    height: 45,
    borderColor: '#FA8072', // Bordure saumon
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#FA8072', // Bouton ajouter saumon
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default AddRestaurantPage;
