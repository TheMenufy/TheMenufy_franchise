import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import defaultImage from '../assets/default_image.jpg'; // Adjust the path as needed

const DetailRestaurant = ({ route }) => {
  const { name, image, address, cuisineType, facebookLink, twitterLink, instagramLink, tiktokLink, phone, email } = route.params;
  const navigation = useNavigation();

  // Get the width of the screen
  const { width } = Dimensions.get('window');

  // Convert cuisineType to hashtag and uppercase
  const cuisineHashtag = `#${cuisineType.toUpperCase()}`;

  // Handle the button press
  const handleClickHere = () => {
    navigation.navigate('Categorielist'); // Navigate to MenuScreen
  };

  const handleUpdate = () => {
    navigation.navigate('UpdateRestaurant', { name, image, address, cuisineType, facebookLink, twitterLink, instagramLink, tiktokLink, phone, email }); // Navigate to UpdateRestaurant screen with parameters
  };

  const handleDelete = () => {
    console.log('Delete button pressed');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Display the image using URI with a blurred background effect */}
        <View style={styles.imageContainer}>
          <Image source={image ? { uri: image } : defaultImage} style={[styles.image, { width }]} />
        </View>

        {/* Restaurant name and View Menu link in a row */}
        <View style={styles.nameMenuContainer}>
          <Text style={styles.name}>{name}</Text>
          <TouchableOpacity onPress={handleClickHere} style={styles.viewMenuButton}>
            <Text style={styles.viewMenu}>View Menu</Text>
          </TouchableOpacity>
        </View>

        {/* Cuisine type displayed as a hashtag */}
        <Text style={styles.description}>{cuisineHashtag}</Text>

        {/* Address Card */}
        <View style={styles.card}>
          <Text style={styles.heading}>Address:</Text>
          <Text style={styles.address}>{address}</Text>
        </View>

        {/* Contact Card */}
        <View style={styles.card}>
          <Text style={styles.heading}>Contact:</Text>
          <Text style={styles.phone}>{phone}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        {/* Social Media Links Card */}
        <View style={styles.card}>
          <Text style={styles.heading}>Follow us:</Text>
          <Text style={styles.link}>{facebookLink}</Text>
          <Text style={styles.link}>{twitterLink}</Text>
          <Text style={styles.link}>{instagramLink}</Text>
          <Text style={styles.link}>{tiktokLink}</Text>
        </View>

        {/* Buttons */}
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
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 0,
    paddingBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
    width: '100%',
    height: 250,
  },
  image: {
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  nameMenuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  viewMenuButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 15,
    backgroundColor: '#007BFF',
  },
  viewMenu: {
    fontSize: 18,
    color: '#fff',
    textDecorationLine: 'underline',
  },
  description: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  address: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  phone: {
    fontSize: 18,
    color: '#007BFF',
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  email: {
    fontSize: 18,
    color: '#007BFF',
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  link: {
    fontSize: 18,
    color: '#007BFF',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
    elevation: 4,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    flex: 1,
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
});

export default DetailRestaurant;
