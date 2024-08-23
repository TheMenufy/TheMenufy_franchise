import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DetailRestaurant = ({ route }) => {
  const { name, image, address, cuisineType, facebookLink, twitterLink, instagramLink, tiktokLink, phone, email } = route.params;
  const navigation = useNavigation();

  // Get the width of the screen
  const { width } = Dimensions.get('window');

  // Convert cuisineType to hashtag and uppercase
  const cuisineHashtag = `#${cuisineType.toUpperCase()}`;

  // Handle the button press
  const handleClickHere = () => {
    navigation.navigate('MenuScreen'); // Navigate to MenuScreen
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
        {/* Display the image using URI */}
        <Image source={{ uri: image }} style={[styles.image, { width }]} />

        {/* Restaurant name and View Menu link in a row */}
        <View style={styles.nameMenuContainer}>
          <Text style={styles.name}>{name}</Text>
          <TouchableOpacity onPress={handleClickHere}>
            <Text style={styles.viewMenu}>View Menu</Text>
          </TouchableOpacity>
        </View>

        {/* Cuisine type displayed as a hashtag */}
        <Text style={styles.description}>{cuisineHashtag}</Text>

        <View style={styles.infoSection}>
          <Text style={styles.heading}>Address:</Text>
          <Text style={styles.address}>{address}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.heading}>Contact:</Text>
          <Text style={styles.phone}>{phone}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.heading}>Follow us:</Text>
          <Text style={styles.link}>{facebookLink}</Text>
          <Text style={styles.link}>{twitterLink}</Text>
          <Text style={styles.link}>{instagramLink}</Text>
          <Text style={styles.link}>{tiktokLink}</Text>
        </View>

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
  },
  image: {
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
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
    fontSize: 26,
    fontWeight: 'bold',
  },
  viewMenu: {
    fontSize: 18,
    color: '#007BFF',
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
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  address: {
    fontSize: 18,
    color: '#333',
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
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginRight: 10,
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#f44336',
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
