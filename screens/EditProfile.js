import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const EditProfile = () => {
  const admin = {
    firstName: 'John',
    lastName: 'Doe',
    role: 'Administrator',
    phoneNumber: '+1234567890',
    imageUrl: 'prof.png',
    email: 'john.doe@example.com',
    location: 'Tunis, Tunisia',
    DateofBirth: 'August 11, 2000',
    joinDate: 'January 1, 2020',
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(admin.DateofBirth);

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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDateOfBirth(date.toDateString());
    hideDatePicker();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
          <Ionicons name="pencil" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image style={styles.profileImage} source={require('../assets/prof.png')} />
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

        <Modal visible={isModalVisible} onRequestClose={toggleModal}>
          <ScrollView contentContainerStyle={styles.modalScrollContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Profile</Text>

              <View style={styles.profileImageContainer}>
                <Image style={styles.profileImage} source={{ uri: admin.imageUrl }} />
              </View>
              <LabeledInput label="First Name" defaultValue={admin.firstName} />
              <LabeledInput label="Last Name" defaultValue={admin.lastName} />
              <LabeledInput label="Email" defaultValue={admin.email} />
              <LabeledInput label="Address" defaultValue={admin.location} />
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Date of Birth</Text>
                <TouchableOpacity onPress={showDatePicker} style={styles.input}>
                  <Text>{dateOfBirth || 'Select Date of Birth'}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>
      </View>
    </ScrollView>
  );
};

const LabeledInput = ({ label, defaultValue, ...props }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      defaultValue={defaultValue}
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '90%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0, height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
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
  modalScrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    width: '100%',
    height: 55,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#f28b82',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditProfile;
