import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AddMenuScreen from './AddmenuScreen';

const FranchiseScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
    source={require('../assets/backroundMenu2.jpeg')}// Replace this with your image URL or require a local image
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('RestaurantCategoriesScreen', {
              restaurantName: 'Torino',
              initialCategories: [
                { id: '1', name: 'Appetizers' },
                { id: '2', name: 'Main Courses' },
                { id: '3', name: 'Desserts' },
              ],
            })}
          >
            <View style={styles.cardTop}>
              <Text style={styles.cardText}>Flavor Fusion</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.cardLeft}>
                <Text style={styles.cardLeftText}>Categories: 4{"\n"}Products: 20{"\n"}Ingredients: 78{"\n"}Items: 14</Text>
              </View>
              <View style={styles.cardRight}>
                <Text style={styles.cardRightText}>10{"\n"}Restaurant use this menu</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('RestaurantCategoriesScreen', {
              restaurantName: 'Torino',
              initialCategories: [
                { id: '1', name: 'Appetizers' },
                { id: '2', name: 'Main Courses' },
                { id: '3', name: 'Desserts' },
              ],
            })}
          >
            <View style={styles.cardTop}>
              <Text style={styles.cardText}>Delectable Delights</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.cardLeft}>
                <Text style={styles.cardLeftText}>Categories: 3{"\n"}Products: 25{"\n"}Ingredients: 14{"\n"}Items: 9</Text>
              </View>
              <View style={styles.cardRight}>
                <Text style={styles.cardRightText}>6{"\n"}Restaurant use this menu</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addMenuButton}
            onPress={() => {
              navigation.navigate(AddMenuScreen)
            }}
          >
            <Text style={styles.addMenuButtonText}>Add Menu</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'repeat', // Or 'stretch' if you want to stretch the image to fill the screen
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  card: {
    width: '97%',
    aspectRatio: 16 / 9,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 10,
  },
  cardTop: {
    backgroundColor: '#f28b82',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
  },
  cardLeft: {
    flex: 2,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  cardRight: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  cardLeftText: {
    fontSize: 18,
    color: '#878787',
    textAlign: 'center',
  },
  cardRightText: {
    fontSize: 18,
    color: '#878787',
    textAlign: 'center',
  },
  addMenuButton: {
    backgroundColor: '#f28b82',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  addMenuButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FranchiseScreen;
