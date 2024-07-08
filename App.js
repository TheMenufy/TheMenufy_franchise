// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import login from './screens/Login';
import home from './screens/Home';
import RestaurantScreen from './screens/Restaurants';
import DetailRestaurant from './screens/DetailRestaurant'; 


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={login}  options={{ headerShown: false }}/>
        <Stack.Screen name="home" component={home} options={{ headerTitleAlign: 'center' }}/>
        <Stack.Screen name="Restaurants" component={RestaurantScreen} options={{ title: 'Restaurants' }} />
        <Stack.Screen name="DetailRestaurant" component={DetailRestaurant} options={{ title: 'Restaurant Details' }} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
