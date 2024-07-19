import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {
  const admin = {
    firstName: 'John',
    lastName: 'Doe',
    role: 'Administrator',
    phoneNumber: '+1234567890',
    imageUrl: 'https://example.com/admin_profile.jpg',
    email: 'john.doe@example.com',
    location: 'Tunis, Tunisia',
    DateofBirth: 'August 11, 2000',
    joinDate: 'January 1, 2020',
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSaveProfile = () => {
    toggleModal();
    navigation.navigate('Profile'); // Navigate to ProfilePage after saving
  };

  const handleEditProfile = () => {
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
        <Ionicons name="pencil" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <Image style={styles.profileImage} source={{ uri: admin.imageUrl }} />
        </View>
        <Text style={styles.name}>{admin.firstName} {admin.lastName}</Text>
        <Text style={styles.role}>{admin.role}</Text>
        <Text style={styles.phoneNumber}>{admin.phoneNumber}</Text>
      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.detailTitle}>Contact Information</Text>
        <Text style={styles.detailText}>Email: {admin.email}</Text>
        <Text style={styles.detailText}>Location: {admin.location}</Text>
        <Text style={styles.detailText}>Phone: {admin.phoneNumber}</Text>
        <Text style={styles.detailText}>Date of Birth: {admin.DateofBirth}</Text>

        <Text style={styles.detailTitle}>Member Since</Text>
        <Text style={styles.detailText}>{admin.joinDate}</Text>
      </View>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Profile</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            defaultValue={admin.firstName}
            // onChange handler here to update firstName state or context
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            defaultValue={admin.lastName}
            // onChange handler here to update lastName state or context
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            defaultValue={admin.email}
            // onChange handler here to update email state or context
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  editButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'tomato',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    elevation: 3, // For Android elevation
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 60, // Adjust as needed to avoid overlapping with edit button
    marginBottom: 20,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#f28b82',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  role: {
    fontSize: 18,
    marginBottom: 5,
    color: '#555',
  },
  phoneNumber: {
    fontSize: 16,
    color: '#888',
  },
  detailsSection: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: 'tomato',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditProfile;
