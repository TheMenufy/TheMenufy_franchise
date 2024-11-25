import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Changepasswordwithverif({ navigation }) {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleCancel = () => {
    navigation.push('EditProfile');
  };

  const handleChangePassword = async () => {
    setErrors({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });

    let valid = true;
    if (!oldPassword) {
      setErrors(prev => ({ ...prev, oldPassword: 'Current password is required.' }));
      valid = false;
    }
    if (!password) {
      setErrors(prev => ({ ...prev, newPassword: 'New password is required.' }));
      valid = false;
    } else if (password.length < 6) {
      setErrors(prev => ({ ...prev, newPassword: 'Password must be at least 6 characters long.' }));
      valid = false;
    }
    if (password !== confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match.' }));
      valid = false;
    }

    if (!valid) return;

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'User not authenticated.');
        return;
      }

      const response = await axios.put('http://192.168.1.14:5555/user/updatePassword', 
        { 
          password,
          confirmPassword, 
          oldPassword 
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.message) {
        Alert.alert('Success', 'Password updated successfully', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        Alert.alert('Error', 'An error occurred. Please try again.');
      }
    } catch (error) {
      // Extract the error message and display it without logging to the console
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.overlay}>
        <View style={styles.inputContainer}>
          <Icon name="lock-closed-outline" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Current Password"
            placeholderTextColor="#888"
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry
          />
        </View>
        {errors.oldPassword ? (
          <Text style={styles.errorText}>{errors.oldPassword}</Text>
        ) : null}

        <View style={styles.inputContainer}>
          <Icon name="lock-closed-outline" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        {errors.newPassword ? (
          <Text style={styles.errorText}>{errors.newPassword}</Text>
        ) : null}

        <View style={styles.inputContainer}>
          <Icon name="lock-closed-outline" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            placeholderTextColor="#888"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
        {errors.confirmPassword ? (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        ) : null}

        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  header: {

    backgroundColor: '#f1f1f1',
    alignItems: 'flex-start',
    padding: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    width: '100%',
    maxWidth: 400,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginRight: 10,
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginBottom: 10,
  },
  footerContainer: {
    marginTop:30,
    width: '100%',
    maxWidth: 400,
    marginTop:30,

  },
  button: {
    backgroundColor: '#f28b82',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: 'center',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#a1a1a1',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
