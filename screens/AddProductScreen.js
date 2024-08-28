import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Image,
  ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker'; // Make sure to install expo-image-picker
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



export default function AddProductScreen({ navigation }) {


  const API_BASE_URL_CATEGORIES = 'http://192.168.1.17:5555/category';
  const API_BASE_URL_PRODUCT = 'http://192.168.1.17:5555/product';

  //category input and error 
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
  const [CategoryError, setCategoryError] = useState('');
 //product name input and error 
  const [Productname, setProductname] = useState('');
  const [ProductnameError, setProductnameError] = useState('');
 //description input and error 
  const [description, setDescription] = useState('');
  const [descriptionError, setdescriptionError] = useState('');
 //disponibility input and error
  const [selecteddisponibility, setSelecteddisponibility] = useState('');
  const [disponibilityError, setdisponibilityError] = useState('');
   //disponibility duration input
  const [disponibilityduration, setdisponibilityduration] = useState('');
   //promotion input 
  const [promotion, setpromotion] = useState('');
   //price input and error 
  const [price, setprice] = useState('');
  const [priceError, setpriceError] = useState('');
 //image input
  const [image, setImage] = useState(null);
  const [disponibilitydurationError, setdisponibilitydurationError] = useState('');

  const [categories, setCategories] = useState([]);


  //for dispalay ... 
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [animatedText, setAnimatedText] = useState('');

  useEffect(() => {
    let text = "N ";
    let index = 0;

    const interval = setInterval(() => {
        setAnimatedText((prev) => prev + text[index]);
      index++;
      if (index === text.length) {
        clearInterval(interval);
      }
    },0.5);

    return () => clearInterval(interval);
  }, []);

  const disponibility = [
    { label: 'yes', value: 'no' },
    { label: 'no', value: 'yes' },
    
  ];

  
const gottolist = () =>{
  // In Addcategories.js
const ListOfNewCategorie = () => import('./ListOfNewCategorie');
navigation.navigate(ListOfNewCategorie)
}
const handleGoNext =()=>{
  const AddIngredient = () => import('./AddIngredient');
  navigation.navigate(AddIngredient)
}
const handleaddone = async () => {
  let valid = true;

  if (!Productname) {
    setProductnameError('Name is required');
    valid = false;
  } else {
    setProductnameError('');
  }
  if (!description) {
    setdescriptionError('Description is required');
    valid = false;
  } else {
    setdescriptionError('');
  }
  if (!selecteddisponibility) {
    setdisponibilityError('Disponibility is required');
    valid = false;
  } else {
    setdisponibilityError('');
  }
  if (!disponibilityduration) {
    setdisponibilitydurationError('Duration is required');
    valid = false;
  } else {
    setdisponibilitydurationError('');
  }
  if (!price) {
    setpriceError('Price is required');
    valid = false;
  } else {
    setpriceError('');
  }
  if (!selectedCategory) {
    setCategoryError('You should choose a category');
    valid = false;
  } else {
    setCategoryError('');
  }

  if (valid) {
    try {
      const formData = new FormData();
      formData.append('name', Productname);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('disponibilityDuration', disponibilityduration);
      formData.append('promotion', promotion);
     formData.append('categoryFK',selectedCategory);

      if (image) {
        // Assuming `image` is a file URI, convert it to a file object
        const fileType = image.split('.').pop();
        formData.append('img', {
          uri: image,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }

     

      
      const response = await axios.post(`${API_BASE_URL_PRODUCT}/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setProductname('');
        setDescription('');
        setSelecteddisponibility('');
        setdisponibilityduration('');
        setpromotion('');
        setprice('');
        setSelectedCategory('');
        setImage(null);
      }
    } catch (error) {
    }
  }
};


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  useEffect(() => {
    const getColor = async () => {
      try {
        const color = await AsyncStorage.getItem('color');
        if (color !== null) {
          console.log('Retrieved color:', color);
          setSelectedColor(color);
        } else {
          console.log('No color found, using default.');
        }
      } catch (error) {
        console.error('Failed to retrieve color from AsyncStorage', error);
      }
    };
  
    const fetchCategories = async () => {
      try {
        const menuId = await AsyncStorage.getItem('MENUID');
        const response = await axios.get(`${API_BASE_URL_CATEGORIES}/find/item/by/menu/${menuId}`);
        const fetchedCategories = response.data.map((category) => ({
          label: category.libelle,
          value: category._id,
        }));
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
    getColor();
  }, []);
  return (
    <ImageBackground
      source={require('../assets/backroundMenu2.jpeg')} // Replace this with your image URL or require a local image
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.innerContainer}
        >
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.headerContainer}>
              <View style={styles.header}>
                <Icon name="arrow-back" size={28} color="#000" onPress={() => navigation.goBack()} />
                  
                <Icon name="list-outline" size={28} color="#000" onPress={() => gottolist()} />

              </View>
            </View>
            <View style={styles.content}>
              <Text style={styles.welcomeText}>{animatedText}</Text>
              <View style={styles.pickerWrapper}>
  <RNPickerSelect
    onValueChange={(value) => setSelectedCategory(value)}
    items={categories}
    placeholder={{
      label: 'Select a category...',
      value: null,
      color: '#888',
    }}
    style={pickerSelectStyles}
    value={selectedCategory}
    useNativeAndroidPickerStyle={false} // This is important for Android
  />

</View>
{CategoryError ? <Text style={styles.errorText}>{CategoryError}</Text> : null}

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Product name"
                  placeholderTextColor="#888"
                  value={Productname}
                  onChangeText={setProductname}
                />
              </View>
              {ProductnameError ? <Text style={styles.errorText}>{ProductnameError}</Text> : null}
              <View style={styles.inputContainerdisc}>
                <TextInput
                  style={styles.input}
                  placeholder="Description"
                  placeholderTextColor="#888"
                  value={description}
                  onChangeText={setDescription}
                />
              </View>
              {descriptionError ? <Text style={styles.errorText}>{descriptionError}</Text> : null}
              <View style={styles.row}>
  <View style={styles.pickerWrapperdisponibility}>
    <RNPickerSelect
      onValueChange={(value) => setSelecteddisponibility(value)}
      items={disponibility}
      placeholder={{
        label: 'Disponibility',
        value: null,
        color: '#888',
      }}
      style={pickerSelectStylesdisponibility}
      value={selecteddisponibility}
      useNativeAndroidPickerStyle={false} // This is important for Android
    />
  </View>
  {disponibilityError ? <Text style={styles.errorText}>{disponibilityError}</Text> : null}

  <TextInput
  style={[styles.inputContainerSmall, { fontSize: 14 }]} // Adjust the fontSize as needed
  placeholder="Duration"
  placeholderTextColor="#888"
  value={disponibilityduration}
  onChangeText={setdisponibilityduration}
/>

 
</View>
<View style={styles.inputContainerprice}>
<TextInput
  style={[styles.input, { fontSize: 14 }]} // Adjust the fontSize as needed
  placeholder="Promotion"
  placeholderTextColor="#888"
  value={promotion}
  onChangeText={setpromotion}
/>
</View>
              <View style={styles.inputContainerprice}>
                <TextInput
                  style={styles.input}
                  placeholder="price"
                  placeholderTextColor="#888"
                  value={price}
                  onChangeText={setprice}
                />
              </View>
              {priceError ? <Text style={styles.errorText}>{priceError}</Text> : null}
             

              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                <Text style={styles.imagePickerText}>
                  {image ? "Change Image" : "Pick an Image"}
                </Text>
                {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={styles.footerContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.plusButton,{ backgroundColor: selectedColor }]} onPress={() =>handleaddone()}>
                <Text style={[styles.buttonText, styles.plusButtonText]}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.primaryButton,{ backgroundColor: selectedColor }]} onPress={()=>handleGoNext()}>
                <Text style={[styles.buttonText, styles.primaryButtonText]}>Next</Text>
              </TouchableOpacity>

            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 15,
    backgroundColor: '#f1f1f1',
    
    elevation:20
  },
  inputAndroid: {
    fontSize: 16,
     width:'100%',
     height:52,
     paddingStart:15,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 15,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: '#f1f1f1',
 

  },
});
const pickerSelectStylesdisponibility = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 15,
    backgroundColor: '#f1f1f1',
    
    elevation:20
  },
  inputAndroid: {
    fontSize: 16,
     width:'100%',
     height:52,
  paddingStart:10,

    borderColor: 'gray',
    alignContent:'center',
    alignItems:'center',
alignSelf:'center',
    borderRadius: 15,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: '#f1f1f1',
 

  },
});
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  inputContainerSmall: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    paddingHorizontal: 10,
    
    
    borderRadius: 15,
    width: '50%', // Adjust this width to fit the row
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 10,
  },
  pickerWrapperdisponibility: {
    width: '30%', // Adjust this width to fit the row
    height: 52,
    borderRadius: 15,
    overflow: 'visible',
    paddingStart:10,

    backgroundColor: '#f1f1f1',
    elevation: 20,
  },
  pickerWrapper: {
    width:'100%',
    height:52,
    borderRadius: 15, // Set your desired border radius
    overflow: 'visible', // Ensure the rounded corners are visible
    backgroundColor: '#f1f1f1', // Match the background color if necessary
    marginBottom: 15,
    elevation: 20, // Adjust elevation/shadow as needed
  },
  pickerWrapperdisponibility: {
    width:'40%',
    height:52,
    alignContent:'center',
    alignItems:'center',
    alignSelf:'center',

    marginRight:20,
    borderRadius: 15, // Set your desired border radius
    overflow: 'visible', // Ensure the rounded corners are visible
    backgroundColor: '#f1f1f1', // Match the background color if necessary
    elevation: 20, // Adjust elevation/shadow as needed
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'repeat', // Or 'stretch' if you want to stretch the image to fill the screen
  },
  container: {
    flex: 1,
    height:20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingTop: 60,
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
  
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    width: '100%',
    height: 55,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 10,
  },
  inputContainerdisc: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    width: '100%',
    height: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 10,
  },
  inputContainerprice: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    alignSelf:'flex-start',
    borderRadius: 15,
    width: '30%',
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginBottom: 10,
  },
  imagePicker: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  imagePickerText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 15,
  },
  footerContainer: {
    padding: 20,
    width: '100%',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 400,
  },
  button: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  primaryButton: {
    backgroundColor: '#f28b82',
  },
  plusButton: {
    backgroundColor: '#76c7c0',
  },
  buttonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonTextplus: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
  },
  primaryButtonText: {
    color: '#fff',
  },
  plusButtonText: {
    color: '#fff',
    size:20,
  },
});