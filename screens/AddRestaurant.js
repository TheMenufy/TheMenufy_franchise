import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AddRestaurantPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    phone: '',
    email: '',
    nameRes: '',
    address: '',
    cuisineType: '',
    taxeTPS: '',
    taxeTUQ: '', // Changer de taxeTVQ à taxeTUQ
    payCashMethod: '',
    tokenLogin: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2MzMGJhMmY0ODdmZDA0MzhjZjM2ZiIsInJvbGUiOiJyZXNGcmFuY2hpc2UiLCJpYXQiOjE3MjQ4NjY1NDksImV4cCI6MTcyNTQ3MTM0OX0.RiMMaCbEOWqBlz8lNp5gAotzjjtXoj7zzQHwiwlvKaQ', // Valeur par défaut
  });

  const navigation = useNavigation();

  const handleChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.nativeEvent.text });
  };

  const validateForm = () => {
    const { firstName, lastName, userName, phone, email, nameRes, address, cuisineType, taxeTPS, taxeTUQ, payCashMethod } = formData;

    if (!firstName || !lastName || !userName || !phone || !email || !nameRes || !address || !cuisineType || !taxeTPS || !taxeTUQ || !payCashMethod) {
      Alert.alert("Validation Error", "All fields are required. Please fill out all fields.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    console.log('FormData being sent:', formData); // Log the formData to the console

    try {
      const response = await axios.post('http://192.168.1.17:5555/user/addRestaurantFranchise', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      Alert.alert("Success", response.data.message || "Restaurant added successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Error adding restaurant:", error.response ? error.response.data : error.message);
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
            placeholder="UserName"
            value={formData.userName}
            onChange={(e) => handleChange(e, 'userName')}
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
            placeholder="TUQ Tax" // Modifier le placeholder de taxeTVQ à taxeTUQ
            value={formData.taxeTUQ}
            onChange={(e) => handleChange(e, 'taxeTUQ')}
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
    backgroundColor: '#FAF3F3',
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
    backgroundColor: '#FA8072',
    borderRadius: 4,
    padding: 10,
    alignItems: 'center',
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 18,
    color: '#FFF',
  },
  title: {
    fontSize: 24,
    flex: 1,
    textAlign: 'center',
    color: '#FA8072',
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
    elevation: 4,
  },
  input: {
    height: 45,
    borderColor: '#FA8072',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#FA8072',
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
