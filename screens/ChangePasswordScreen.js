import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Changepasswordwithverif({ navigation }) {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleCancel = () => {
    navigation.push('EditProfile');
  };

  const handleChangePassword = async () => {
    // Reset the error message before validation
    setPasswordError('');

    // Basic validation
    if (!oldPassword || !password || !confirmPassword) {
      setPasswordError('All fields are required.');
      return;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        setPasswordError('User not authenticated.');
        return;
      }

      const response = await axios.put('http://192.168.1.13:5555/user/updatePassword', 
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
        setPasswordError('An error occurred. Please try again.');
      }
    } catch (error) {
      setPasswordError('An error occurred. Please try again.');
      console.error('Error resetting password:', error.message);
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
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
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
    marginTop: 23,
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
    width: '100%',
    maxWidth: 400,
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
