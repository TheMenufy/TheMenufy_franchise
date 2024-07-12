// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import login from './screens/Login';
import home from './screens/Home';
import ForgetPassword from './screens/ForgetPasswordScreen';
import RestaurantScreen from './screens/Restaurants';
import DetailRestaurant from './screens/DetailRestaurant'; 
import Forgetpasswordverificarion from './screens/Forgetpasswordverificarion';
import changepassword from './screens/changepassword';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={login}  options={{ headerShown: false }}/>
        <Stack.Screen name="home" component={home} options={{ headerTitleAlign: 'center' }}/>
        <Stack.Screen name="forgetpassword" component={ForgetPassword} options={{ headerShown: false }}/>
        <Stack.Screen name="Forgetpasswordverificarion" component={Forgetpasswordverificarion} options={{ headerShown: false }}/>
        <Stack.Screen name="changepassword" component={changepassword} options={{ headerShown: false }}/>
        <Stack.Screen name="Restaurants" component={RestaurantScreen} options={{ title: 'Restaurants' }} />
        <Stack.Screen name="DetailRestaurant" component={DetailRestaurant} options={{ title: 'Restaurant Details' }} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
