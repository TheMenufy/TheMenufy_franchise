// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import login from './screens/Login';
import home from './screens/Home';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={login}  options={{ headerShown: false }}/>
        <Stack.Screen name="home" component={home} options={{ headerTitleAlign: 'center' }}/>
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
