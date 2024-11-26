import React, { useState, useEffect } from "react"
import { Modal, ToastAndroid, KeyboardAvoidingView, TextInput, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userimage from '../assets/images/user.png'
const REGEX_INPUT = /^[a-zA-Z\s]+$/;
const REGEX_date = /^(0?[1-9]|[12][0-9]|3[01])[./-](0?[1-9]|1[012])[./-]\d{4}$/;
const EditPorfileScreen = ({ navigation }) => {
    // ------- popup ----------------------------------
    const [showPopup, setShowPopup] = useState(false);
    const displayPopup = (message) => {
        setShowPopup(true);
    };
    // --------- Langue -------------------
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [currentLanguageFR, setCurrentLanguageFR] = useState('fr');
    const [userName, setuserName] = useState('');
    const [Email, setEmail] = useState('');
    const [address, setAdresse] = useState('');
    const [Phone, setPhone] = useState('');
    const [image, setImage] = useState(null);
    const [client, setUser] = useState({});
    const [selectedCountry, setSelectedCountry] = useState("");
    const [citiesByCountry, setCitiesByCountry] = useState({});
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [selectedCity, setSelectedCity] = useState("");
    const [cities, setCities] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [galleryStatus, setGalleryStatus] = useState(null);
    const [isValiduserName, setIsValiduserName] = useState(true);
    const GALLERY_PERMISSION_KEY = '@my_app_gallery_permission';
    const IMAGE_KEY = '@my_app_image';
    const handleuserName = (input) => {
        setuserName(input);
    };
    const [isValidEmail, setIsValidEmail] = useState(true);
    const handleEmail = (input) => {
        setEmail(input);
        
    };
    const [isValidPhone, setIsValidPhone] = useState(true);
    const handlePhone = (input) => {
        setPhone(input);
       
    };
    useEffect(() => {
        fetch("http://192.168.1.17:5555/user" + "/utils/citiesByCountry")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur de réponse HTTP : " + response.status);
                }
                return response.json();
            })
            .then((data) => {
                setCitiesByCountry(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    const onCountryChange = (value) => {
        const selectedCities = citiesByCountry[value];
        const cities = selectedCities.map((city) => city.city);
        setSelectedCountry(value);
        setCities(cities);
    };
    /*-----------Edit Photo Profile -----------------*/
    useEffect(() => {
        (async () => {
            const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setGalleryStatus(status.status === 'granted');
        })();
        
        // Retrieve data from AsyncStorage
        AsyncStorage.multiGet([GALLERY_PERMISSION_KEY, IMAGE_KEY])
            .then((response) => {
                const galleryPermissionValue = response[0][1]; // Assuming this is the correct index
                const imageValue = response[1][1];
    
                if (galleryPermissionValue !== null) {
                    setHasGalleryPermission(JSON.parse(galleryPermissionValue));
                }
    
                if (imageValue !== null) {
                    setImage(imageValue);
                }
            });
    }, []);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled && result.assets && result.assets.length > 0) {
            const imageUri = result.assets[0].uri;
            console.log('Image URI:', imageUri);
            setImage(imageUri);
            const formData = new FormData();
            const imageName = result.assets[0].fileName; // or any other name you prefer
            formData.append('image', {
                uri: imageUri,
                type: 'image/jpeg', // Make sure this matches the actual file type
                name: imageName,
            });
            try {
                const token = await AsyncStorage.getItem('userToken');
                await AsyncStorage.setItem(IMAGE_KEY, imageUri);
               
                await axios.post("http://192.168.1.17:5555/user" + "/updateImage", formData, {
                    headers: {
                       Authorization: `Bearer ${token}` ,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Image mise à jour avec succès !');
            } catch (error) {
                console.error("Error saving image to AsyncStorage or uploading", error);
            }
        }
    };
    if (hasGalleryPermission === null) {
        //return <ActivityIndicator />;
    } else if (hasGalleryPermission === false) {
        return <Text>No access to internal storage</Text>;
    }
    /*------------------------- liaison avec back : GET data------------------------------------ */
    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Retrieve the token from AsyncStorage
                const token = await AsyncStorage.getItem('userToken');
                
                // If the token exists, make the API request
                if (token) {
                    const response = await axios.get("http://192.168.1.17:5555/user/getUser", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    // Set the user data
                    setUser(response.data[0]);
                } else {
                    console.error('No token found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUser();
    }, [client]);
    /* --------------------------Edit profile ---------------------------------------------- */
    const handleSubmit = async() => {
        const token = await AsyncStorage.getItem('userToken');
        const userId = await AsyncStorage.getItem('USERID');
        if (true) {
            if (selectedCountry) {
                let configuration = {
                    method: "PUT",
                    url: "http://192.168.1.17:5555/user" + "/updateUserAdmin/"+userId,
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                    },
                    data: {
                        userName: userName || client.userName,
                        email: Email || client.email,
                        address: selectedCountry + ', ' + selectedCity || "Canada, Montreal",
                        phone: Phone || client.phone,
                    },
                };
                axios(configuration)
                    .then((result) => {
                        console.log("User data changed");
                        navigation.goBack();
                    })
                    .catch((error) => {
                        ToastAndroid.show('Profile not changed ', ToastAndroid.LONG);
                    })
            } else {
                configuration = {
                    method: "PUT",
                    url: "http://192.168.1.17:5555/user" + "/updateUserAdmin/"+userId,
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                    },
                    data: {
                        userName: userName || client.userName,
                        email: Email || client.email,
                        address: client.address,
                        phone: Phone || client.phone,
                    },
                };
                axios(configuration)
                    .then((result) => {
                        console.log("User data changed");
                        navigation.goBack();
                    })
                    .catch((error) => {
                        ToastAndroid.show('Profile not changed ', ToastAndroid.LONG);
                    })
            }
        }
        else {
            ToastAndroid.show('Field formats not accepted', ToastAndroid.LONG);
        }
    }
    const handlenavigationtochangepassword = () => {
        navigation.push('Changepasswordscrean');
      };
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
        >
            <ScrollView
                contentContainerStyle={styles.scrollViewContainer}
                showsVerticalScrollIndicator={true} // Optional: Set to false if you want to hide the vertical scroll indicator
            >
                <View style={styles.container}>
                    <StatusBar
                        barStyle="dark-content"
                        hidden={false}
                        backgroundColor="#fff"
                    />
                  
                  <Icon name='arrow-left' size={22} color='#F3F3F3' style={{ alignSelf: 'flex-start', marginTop: 20, marginLeft: 15 }}  />
                    <TouchableOpacity onPress={() => setShowConfirmModal(true)} >
                        <Text style={styles.iconLng} >{('save')} </Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <View style={{ alignItems: 'center', borderTopLeftRadius: 200, marginTop: 20 }}>
                            <TouchableOpacity onPress={() => pickImage()} style={styles.profileImageContainer}>
                            {client.image === 'client.png' ?
                                    <Image source={userimage} style={styles.profileImage}  />
                                    :
                                    <Image 
                                    source={{ uri: 'http://192.168.1.17:5555/uploads/user/' + client.image }}
                                    style={styles.profileImage}
                                />
                                
                            }
                                   <View style={styles.editIconContainer}>
              <Icon name="edit" size={25} color="#000000" />
            </View>
                            </TouchableOpacity>
                        </View>
                        {/* ----------------- Inputs -------------------------------------- */}
                        <View style={{ flexDirection: 'column', justifyContent: 'center', width: '80%', alignSelf: 'center', marginTop: 0 }}>
                            <View style={styles.viewInput}>
                                <Text style={styles.label}>  {('User name')} </Text>
                                <TextInput
                                    placeholder={client.userName}
                                    textAlign="left"
                                    style={styles.input}
                                    value={userName}
                                    onChangeText={handleuserName}
                                />
                            </View>
                            {isValiduserName ? null : (<Text style={styles.invalid}>{('')}</Text>)}
                            <View style={styles.viewInput}>
                                <Text style={styles.label}> {('email')} </Text>
                                <TextInput
                                    placeholder={client.email}
                                    textAlign="left"
                                    style={styles.input}
                                    value={Email}
                                    onChangeText={handleEmail}
                                />
                            </View>
                            {isValidEmail ? null : (<Text style={styles.invalid}>{('')}</Text>)}
                            <View style={styles.viewInput}>
                                <Text style={styles.label}> {('Phone number')} </Text>
                                <TextInput
                                    placeholder={client.phone}
                                    textAlign="left"
                                    style={styles.input}
                                    value={Phone}
                                    onChangeText={handlePhone}
                                />
                            </View>
                            {isValidPhone ? null : (<Text style={styles.invalid}>{('')}</Text>)}
                           
                            <Text style={styles.txtAdress}> {('address')} </Text>
                            <View style={styles.viewPicker}>
                                <Picker
                                    selectedValue={selectedCountry}
                                    onValueChange={onCountryChange}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Choose a country" value="" />
                                    {Object.keys(citiesByCountry).map((country) => (
                                        <Picker.Item key={country} label={country} value={country} />
                                    ))}
                                </Picker>
                            </View>
                            {selectedCountry ?
                                <View style={styles.viewPicker}>
                                    <Picker
                                        selectedValue={selectedCity}
                                        onValueChange={(value) => setSelectedCity(value)}
                                        style={styles.picker}
                                    >
                                        <Picker.Item label="Choose a city" value="" />
                                        {cities.map((city) => (
                                            <Picker.Item key={city} label={city} value={city} />
                                        ))}
                                    </Picker>
                                </View>
                                : null}
<TouchableOpacity style={styles.saveButton} onPress={handlenavigationtochangepassword}>
          <Text style={styles.saveButtonText}>Change Password</Text>
        </TouchableOpacity>
                        </View>
                        {/*----------------------------------------------------------------- */}
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'column' }}>
                        <View style={styles.viewBar}>
                        </View>
                    </View>
                    <Modal
                        visible={showPopup}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => setShowPopup(false)}
                    >
                        <View style={styles.popupContainer}>
                            <Icon name='times' size={22} color='#fff' style={{ alignSelf: 'flex-start', marginTop: 0, marginBottom: 5, marginLeft: 0 }} onPress={() => setShowPopup(false)} />
                            <Text style={styles.popupText}>{('language')}</Text>
                            <TouchableOpacity style={styles.closeButton} onPress={() => changeLanguage(currentLanguage === 'en' ? 'fr' : 'en')}>
                                <Text style={styles.txtTouchablePopup}>French</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={() => changeLanguage(currentLanguageFR === 'fr' ? 'en' : 'fr')}>
                                <Text style={styles.txtTouchablePopup}>English</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    <Modal
                        visible={showConfirmModal}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={() => setShowConfirmModal(false)}>
                        <View style={styles.popupContainer}>
                            <Icon name='times' size={22} color='#fff' style={{ alignSelf: 'flex-start', marginBottom: 5, }} onPress={() => setShowConfirmModal(false)} />
                            <View style={styles.confirmationModal}>
                                <Text style={styles.popupText}>Are you sure you want to continue?</Text>
                                <View style={styles.modalButtons}>
                                    <TouchableOpacity
                                        style={[styles.buttonstyle1, styles.buttonClose]}
                                        onPress={() => setShowConfirmModal(false)}>
                                        <Text style={{ fontWeight: "500" }}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.buttonstyle2, styles.buttonClose]}
                                        onPress={() => { setShowConfirmModal(false); handleSubmit(); }}>
                                        <Text style={styles.textStyle}>Save changes</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
EditPorfileScreen.navigationOptions = () => {
    return {
        headerShown: null,
    };
};
const styles = StyleSheet.create({
    saveButton: {
        backgroundColor: '#f28b82',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 15,
        marginBottom:10,
        marginTop:20,
        alignItems: 'center',
        width: '100%',
      },
      saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18, // Increased font size
      },
    bottomImageContainer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: '100%',
        height: '100%',
      },
    bottomImage: {
        width: 150,  // Adjust the size as needed
        height: 150, // Adjust the size as needed
        resizeMode: 'contain', // Adjust the resize mode as needed
    },
    textStyle: {
        color: 'tomato',
        fontWeight: "500"
    },
    modalButtons: {
        flexDirection: 'row', // This will position the buttons side by side
        width: '100%',
    },
    container: {
        height: '100%',
        backgroundColor: '#F3F3F3',
        flex: 1,
        flexDirection: 'column',
    },
    scrollViewContainer: {
        flexGrow: 1,
    },
    viewBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 40,
        backgroundColor: '#F3F3F3',
        shadowOpacity: 500,
        elevation: 15,
    },
    send: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: '80%',
        backgroundColor: '#fff',
        height: 50,
        borderRadius: 30,
        marginTop: 0,
        marginBottom: 50
    },
    sendTxt: {
        fontSize: 15,
        letterSpacing: 1.5,
        textAlign: 'center',
        position: 'relative',
        color: "#fff"
    },
    picker: {
        width: "100%",
        //backgroundColor: color.white
    },
    viewPicker: {
        width: "100%",
        height: 60,
        marginTop: 10,
        borderWidth: 0,
        borderColor: '#ccc', // choix de la couleur du border
        borderRadius: 20,
        backgroundColor: '#fff'
    },
    input: {
        width: "100%",
        height: 60,
        marginTop: 5,
        borderWidth: 0, // ajout du style border
        borderColor: '#ccc', // choix de la couleur du border
        borderRadius: 20,
        marginTop: 10,
        backgroundColor: '#fff',
        paddingLeft: 10,
    },
    viewInput: {
        flexDirection: 'column',
        marginTop: 5,
        borderRadius: 30,
    },
    label: {
        fontSize: 15,
        textAlign: 'left',
        marginTop: 10,
    },
    txtAdress: {
        marginTop: 10,
    },
    invalid: {
        color: 'red',
        marginTop: 0,
    },
    iconLng: {
        alignSelf: 'flex-end', marginTop: -20, marginRight: 25, fontSize: 16, color: 'tomato'
    },
    /* ----- Popup Section -----*/
    popupContainer: {
        backgroundColor: "#fff",
        margin: 50,
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    popupText: {
        fontSize: 15,
        marginBottom: 10,
        textAlign: "center",
        marginBottom: 10,
        marginTop: 5
    },
    txtPop: {
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    closeButton: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        width: '90%'
    },
    buttonstyle1: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        width: '50%'
    },
    buttonstyle2: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        width: '50%'
    },
    txtTouchablePopup: {
        color: '#fff',
        alignSelf: 'center'
    },
    profileImageContainer: {
        width: 150,
        height: 150,
        borderRadius: 100,
        overflow: 'hidden',
        marginBottom: 15, // Increased margin
        borderWidth: 3, // Increased border width
        borderColor: '#f28b82',
        justifyContent: 'center',
        alignItems: 'center',
      },
      editIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#f28b82',
        borderRadius: 150,
        padding: 10,
        margin:5
      },
});
export default EditPorfileScreen;