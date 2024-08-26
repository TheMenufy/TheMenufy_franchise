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
import EditPorfileScreen from './screens/EditPorfileScreen';
import AddRestaurant from './screens/AddRestaurant';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={login}  options={{ headerShown: false }}/>
        <Stack.Screen name="home" component={home} options={{ headerTitleAlign: 'center' ,headerShown: false }}/>
        <Stack.Screen name="forgetpassword" component={ForgetPassword} options={{ headerShown: false }}/>
        <Stack.Screen name="Forgetpasswordverificarion" component={Forgetpasswordverificarion} options={{ headerShown: false }}/>
        <Stack.Screen name="Restaurants" component={RestaurantScreen} options={{ title: 'Restaurants' }} />
        <Stack.Screen name="DetailRestaurant" component={DetailRestaurant} options={{ title: 'Restaurant Details' , headerStyle: {
      backgroundColor: '#f28b82',

    }, headerTitleStyle: {
      color: '#FFFFFF', // Set the title color to white
    },}} />
        <Stack.Screen name="Changepasswordwithverif" component={Changepasswordwithverif} options={{ headerShown: false }}/>
        <Stack.Screen name="Changepasswordscrean" component={Changepasswordscrean} options={{ headerShown: true ,title:"change password", headerStyle: {
      backgroundColor: '#f28b82',

    }, headerTitleStyle: {
      color: '#FFFFFF', // Set the title color to white
    },}}/>
        <Stack.Screen name="EditProfile" component={EditProfilePage} options={{ headerShown: true ,title:"Edit profile" , headerTitleAlign: 'center', headerStyle: {
      backgroundColor: '#f28b82',

    }, headerTitleStyle: {
      color: '#FFFFFF', // Set the title color to white
    },}} />
            <Stack.Screen name="EditPorfileScreen" component={EditPorfileScreen} options={{ headerShown: true ,title:"Edit profile" , headerTitleAlign: 'center', headerStyle: {
      backgroundColor: '#f28b82',

    }, headerTitleStyle: {
      color: '#FFFFFF', // Set the title color to white
    },}} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false }}/>
        <Stack.Screen name="SetupSystem" component={SetupSystem} options={{ headerShown: true ,title:"Setup System" , headerTitleAlign: 'center'}}/>
        <Stack.Screen name="MenuScreen" component={MenuScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="RestaurantCategoriesScreen" component={RestaurantCategoriesScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ChatPage" component={ChatPage} options={{ title: 'Chat' }} />
        <Stack.Screen name="AddMenuScreen" component={AddMenuScreen} options={{ headerShown: false  }} />
        <Stack.Screen name="Addcategories" component={Addcategories} options={{ headerShown: false  }} />
        <Stack.Screen name="ListOfNewCategorie" component={ListOfNewCategorie} options={{ headerShown: false  }} />
        <Stack.Screen name="AddProductScreen" component={AddProductScreen} options={{ headerShown: false  }} />
        <Stack.Screen name="AddIngredient" component={AddIngredient} options={{ headerShown: false  }} />
        <Stack.Screen name="AddItem" component={AddItem} options={{ headerShown: false  }} />
        <Stack.Screen name="AddRestaurant" component={AddRestaurant} options={{ headerShown: false  }} />




      </Stack.Navigator>
    </NavigationContainer>
  );
}