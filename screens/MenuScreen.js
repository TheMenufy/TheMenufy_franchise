// screens/MenuScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, SafeAreaView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const categories = [
  { id: '1', name: 'Appetizers' },
  { id: '2', name: 'Main Courses' },
  { id: '3', name: 'Desserts' },
];

const products = {
  '1': [
    { id: '1', name: 'Bruschetta' },
    { id: '2', name: 'Garlic Bread' },
  ],
  '2': [
    { id: '3', name: 'Margherita Pizza' },
    { id: '4', name: 'Spaghetti Carbonara' },
  ],
  '3': [
    { id: '5', name: 'Tiramisu' },
    { id: '6', name: 'Cheesecake' },
  ],
};

const choices = {
  '3': [
    { id: '1', name: 'Size', options: ['Small', 'Medium', 'Large'] },
    { id: '2', name: 'Crust', options: ['Thin', 'Thick'] },
  ],
};

const items = {
  '1': [
    { id: '1', name: 'Tomato Basil', price: '$5' },
    { id: '2', name: 'Classic', price: '$4' },
  ],
};

const MenuScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigation = useNavigation();

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setSelectedCategory(item.id);
        setSelectedProduct(null); // Reset selected product when changing category
        setSelectedProductId(null); // Reset selected product ID when changing category
      }}
    >
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setSelectedProduct(item.id);
        setSelectedProductId(item.id); // Set selected product ID
      }}
    >
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderChoiceItem = ({ item }) => (
    <View style={styles.choiceContainer}>
      <Text style={styles.choiceTitle}>{item.name}:</Text>
      {item.options.map((option, index) => (
        <Text key={index} style={styles.choiceOption}>{option}</Text>
      ))}
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        {!selectedCategory && (
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
          />
        )}

        {selectedCategory && !selectedProduct && (
          <FlatList
            data={products[selectedCategory] || []}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
          />
        )}

        {selectedProduct && (
          <>
            <Text style={styles.subheading}>Choices:</Text>
            {choices[selectedProductId]?.map((choice) => (
              <FlatList
                key={choice.id}
                data={[choice]}
                renderItem={renderChoiceItem}
                keyExtractor={(item) => item.id}
              />
            ))}

            <Text style={styles.subheading}>Items:</Text>
            <FlatList
              data={items[selectedProductId] || []}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    backgroundColor: '#fff', // Ensure the header has a background color
    zIndex: 1, // Ensure the header is above other content
    padding: 10,
    paddingTop: Platform.OS === 'ios' ? 20 : 0, // Add space for the notch or status bar on iOS
  },
  backButton: {
    backgroundColor: '#f28b82', // Button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    position: 'absolute',
    top: 20, // Position the button below the status bar
    left: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 60, // Leave space for the fixed header
  },
  item: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
  },
  choiceContainer: {
    marginBottom: 20,
  },
  choiceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  choiceOption: {
    fontSize: 16,
    marginVertical: 5,
  },
  itemContainer: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 16,
    color: '#888',
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default MenuScreen;