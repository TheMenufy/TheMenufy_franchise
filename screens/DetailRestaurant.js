import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const API_BASE_URL_RESTAURANTS = 'http://192.168.1.17:5555/restaurant';

const DetailRestaurant = ({ route }) => {
  const { name, image, address, cuisineType } = route.params;
  const navigation = useNavigation();

  // Get the width of the screen
  const { width } = Dimensions.get('window');

  // Handle the button press
  const handleClickHere = () => {
    navigation.navigate('MenuScreen'); // Navigate to MenuScreen
  };

  const handleUpdate = () => {
    navigation.navigate('UpdateRestaurant', { name, image, address, cuisineType }); // Navigate to UpdateRestaurant screen with parameters
  };

  const handleDelete = () => {
    // Add your delete logic here
    // For example, make a DELETE request to the API and then navigate back or show a confirmation
    console.log('Delete button pressed');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Display the image using URI */}
        <Image source={{ uri: image }} style={[styles.image, { width }]} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{cuisineType}</Text>

        <View style={styles.infoSection}>
          <Text style={styles.heading}>Address:</Text>
          <Text style={styles.address}>{address}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.heading}>Menu:</Text>
          <TouchableOpacity style={styles.button} onPress={handleClickHere}>
            <Text style={styles.buttonText}>View Menu</Text>
          </TouchableOpacity>
        </View>

        {/* Update and Delete buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    height: 250, // Adjust the height of the image as needed
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  address: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f28b82', // Button color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  updateButton: {
    backgroundColor: '#4CAF50', // Green for Update button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginRight: 10,
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#f44336', // Red for Delete button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    flex: 1,
  },
  infoSection: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});

export default DetailRestaurant;
