import React, { useEffect, useState, createContext } from 'react';
import { Appearance } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import login from './screens/Login';
import home from './screens/Home';
import ForgetPassword from './screens/ForgetPasswordScreen';
import RestaurantScreen from './screens/Restaurants';
import DetailRestaurant from './screens/DetailRestaurant';
import Forgetpasswordverificarion from './screens/Forgetpasswordverificarion';
import Changepasswordscrean from './screens/ChangePasswordScreen';
import Changepasswordwithverif from './screens/Changepasswordwithverif';
import EditProfilePage from './screens/EditProfile';
import ProfilePage from './screens/Profile';
import SetupSystem from './screens/SetupSystem';
import MenuScreen from './screens/MenuScreen';
import RestaurantCategoriesScreen from './screens/RestaurantCategoriesScreen';
import ChatPage from './screens/ChatPage';
import AddMenuScreen from './screens/AddmenuScreen';
import Addcategories from './screens/Addcategories';
import ListOfNewCategorie from './screens/ListOfNewCategorie';
import AddProductScreen from './screens/AddProductScreen';
import AddIngredient from './screens/AddIngredient';
import AddItem from './screens/AddItem';
import Pruductlist from './screens/Pruductlist';
import AddRestaurant from './screens/AddRestaurant';
import EditPorfileScreen from './screens/EditPorfileScreen';
import Categorielist from './screens/Categorielist';
import ListOfNewProducts from './screens/ListOfNewProducts';

// Theme Context
export const ThemeContext = createContext();

const Stack = createNativeStackNavigator();

export default function App() {
  const [theme, setTheme] = useState('light');  // Default theme is 'light'

  // Load theme from AsyncStorage on app load
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        // If no theme saved, use system theme preference
        const systemTheme = Appearance.getColorScheme();
        setTheme(systemTheme || 'light');
      }
    };
    loadTheme();

    // Listen for system theme changes and update app theme accordingly
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme); // Automatically update theme when system theme changes
    });

    // Clean up the listener when the component unmounts
    return () => {
      subscription.remove();
    };
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // Save the selected theme to AsyncStorage
    await AsyncStorage.setItem('theme', newTheme);
  };

  // Define theme colors based on current theme
  const themeColors = theme === 'light'
    ? { backgroundColor: '#ffffff', textColor: '#000000', headerColor: '#f28b82' }
    : { backgroundColor: '#000000', textColor: '#ffffff', headerColor: '#333333' };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeColors }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen name="login" component={login} options={{ headerShown: false }} />
          <Stack.Screen name="home" component={home} options={{ headerShown: false }} />
          <Stack.Screen name="forgetpassword" component={ForgetPassword} options={{ headerShown: false }} />
          <Stack.Screen name="Forgetpasswordverificarion" component={Forgetpasswordverificarion} options={{ headerShown: false }} />
          <Stack.Screen name="Restaurants" component={RestaurantScreen} options={{ title: 'Restaurants' }} />
          <Stack.Screen
            name="DetailRestaurant"
            component={DetailRestaurant}
            options={{
              title: 'Restaurant Details',
              headerStyle: { backgroundColor: themeColors.headerColor },
              headerTitleStyle: { color: themeColors.textColor },
            }}
          />
          <Stack.Screen name="Changepasswordwithverif" component={Changepasswordwithverif} options={{ headerShown: false }} />
          <Stack.Screen
            name="Changepasswordscrean"
            component={Changepasswordscrean}
            options={{
              title: 'Change Password',
              headerStyle: { backgroundColor: themeColors.headerColor },
              headerTitleStyle: { color: themeColors.textColor },
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfilePage}
            options={{
              title: 'Edit Profile',
              headerTitleAlign: 'center',
              headerStyle: { backgroundColor: themeColors.headerColor },
              headerTitleStyle: { color: themeColors.textColor },
            }}
          />
          <Stack.Screen
            name="EditPorfileScreen"
            component={EditPorfileScreen}
            options={{
              title: 'Edit Profile',
              headerTitleAlign: 'center',
              headerStyle: { backgroundColor: themeColors.headerColor },
              headerTitleStyle: { color: themeColors.textColor },
            }}
          />
          <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false }} />
          <Stack.Screen
            name="SetupSystem"
            component={SetupSystem}
            options={{
              title: 'Setup System',
              headerTitleAlign: 'center',
              headerStyle: { backgroundColor: themeColors.headerColor },
              headerTitleStyle: { color: themeColors.textColor },
            }}
          />
          <Stack.Screen name="MenuScreen" component={MenuScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RestaurantCategoriesScreen" component={RestaurantCategoriesScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ChatPage" component={ChatPage} options={{ title: 'Chat' }} />
          <Stack.Screen name="AddMenuScreen" component={AddMenuScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Addcategories" component={Addcategories} options={{ headerShown: false }} />
          <Stack.Screen name="ListOfNewCategorie" component={ListOfNewCategorie} options={{ headerShown: false }} />
          <Stack.Screen name="ListOfNewProducts" component={ListOfNewProducts} options={{ headerShown: false }} />
          <Stack.Screen name="AddProductScreen" component={AddProductScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddIngredient" component={AddIngredient} options={{ headerShown: false }} />
          <Stack.Screen name="AddItem" component={AddItem} options={{ headerShown: false }} />
          <Stack.Screen name="AddRestaurant" component={AddRestaurant} options={{ headerShown: false }} />
          <Stack.Screen
            name="Categorielist"
            component={Categorielist}
            options={{
              title: 'All Categories',
              headerTitleAlign: 'center',
              headerStyle: { backgroundColor: themeColors.headerColor },
              headerTitleStyle: { color: themeColors.textColor },
            }}
          />
          <Stack.Screen
            name="Pruductlist"
            component={Pruductlist}
            options={{
              title: 'All Products',
              headerTitleAlign: 'center',
              headerStyle: { backgroundColor: themeColors.headerColor },
              headerTitleStyle: { color: themeColors.textColor },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
