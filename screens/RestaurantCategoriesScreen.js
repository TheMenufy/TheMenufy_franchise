// screens/RestaurantCategoriesScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Button, SafeAreaView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const RestaurantCategoriesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { restaurantName, initialCategories } = route.params;

  const [categories, setCategories] = useState(initialCategories || []);
  const [newCategory, setNewCategory] = useState('');

  const addCategory = () => {
    if (newCategory.trim()) {
      setCategories([
        ...categories,
        { id: (categories.length + 1).toString(), name: newCategory.trim() },
      ]);
      setNewCategory('');
    }
  };

  const renderCategoryItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.header}>{restaurantName}</Text>
      </View>

      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      <View style={styles.addCategoryContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Category"
          value={newCategory}
          onChangeText={setNewCategory}
        />
        <Button title="Add Category" onPress={addCategory} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerContainer: {
    marginTop: Platform.OS === 'ios' ? 20 : 0, // Adjust margin for iOS and Android
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#f28b82',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 20, // Add some space between the button and the header text
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  list: {
    marginBottom: 20,
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
  addCategoryContainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default RestaurantCategoriesScreen;
