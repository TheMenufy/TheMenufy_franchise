import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView,  Platform, StyleSheet, Text, View, TextInput, Button, Modal, Alert,TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';



const AddIngredient = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Access the route
  const { product } = route.params; // Get the productId from the route parameters
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [newIngredient, setNewIngredient] = useState({
    libelle: '',
    type: '',
    quantity: '',
    price: '',
    qtMax: '',
  });

  useEffect(() => {
    const fetchIngredients = async () => {
      try { const color = await AsyncStorage.getItem('color');
        if (color !== null) {
          setSelectedColor(color);
        }
        const response = await axios.get(`http://192.168.1.17:5555/ingredient/retrieve/${product}`);
        setIngredients(response.data);
        console
      } catch (error) {
        setError('Error fetching ingredients');
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, [product]);

  const handlegoback = async () => {

    navigation.navigate('AddProductScreen')
  }

  const handleAddIngredient = async () => {
    const { libelle, type, quantity, price, qtMax } = newIngredient;

    if (!libelle || !type || !quantity || !price || !qtMax) {
      Alert.alert('Error', 'Please fill all the fields.');
      return;
    }

    if (type === 'Supplement' && price == 0) {
      Alert.alert('Error', 'Price for Supplement must be greater than 0.');
      return;
    }

    if (type === 'Ingredient' && price != 0) {
      Alert.alert('Error', 'Price for Ingredient must be 0.');
      return;
    }

    try {
      const response = await axios.post(`http://192.168.1.17:5555/ingredient/add/${product}`, newIngredient);
      setIngredients([...ingredients, response.data.data]);
      setModalVisible(false);
      setNewIngredient({
        libelle: '',
        type: '',
        quantity: '',
        price: '',
        qtMax: '',
      });
      Alert.alert('Success', 'Ingredient added successfully');
    } catch (error) {
      console.error('Error adding ingredient:', error);
      Alert.alert('Error', 'Failed to add ingredient');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
                  <View style={styles.headerContainer}>
              <View style={styles.header}>
                <Icon name="arrow-back" size={28} color="#000" onPress={handlegoback} />
            
              </View>
            </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {ingredients.map((ingredient) => (
          <View key={ingredient._id} style={styles.ingredientContainer}>
            <Text style={styles.ingredientName}>{ingredient.libelle}</Text>
            <Text style={styles.ingredientDescription}>{ingredient.type}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Button to open the modal */}
      
      <TouchableOpacity style={[styles.addButton,{ backgroundColor: selectedColor }]} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Ingredient</Text>
      </TouchableOpacity>

      {/* Modal for adding ingredient */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Ingredient</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newIngredient.libelle}
              onChangeText={(text) => setNewIngredient({ ...newIngredient, libelle: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Type (Supplement/Ingredient)"
              value={newIngredient.type}
              onChangeText={(text) => setNewIngredient({ ...newIngredient, type: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Quantity"
              keyboardType="numeric"
              value={newIngredient.quantity}
              onChangeText={(text) => setNewIngredient({ ...newIngredient, quantity: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
              value={newIngredient.price}
              onChangeText={(text) => setNewIngredient({ ...newIngredient, price: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Max Quantity"
              keyboardType="numeric"
              value={newIngredient.qtMax}
              onChangeText={(text) => setNewIngredient({ ...newIngredient, qtMax: text })}
            />
            <Button title="Submit" onPress={handleAddIngredient} />
            <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop:10,
    paddingTop: Platform.OS === 'ios' ? 10 : 0, // Adjust for iOS safe area
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 20, // Adds space below the header
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    padding: 16,
    marginTop:80
  },
  ingredientContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  ingredientName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ingredientDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addButton: {
    margin: 16,
    padding: 12,
    backgroundColor: '#007bff',
    borderRadius: 15,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default AddIngredient;