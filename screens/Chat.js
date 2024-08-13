// ConversationsPage.js

import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const imageMap = {
  "Torino.jpg": require('../assets/Torino.jpg'),
  "sushi.jpg": require('../assets/sushi.jpg'),
  "KFC.jpg": require('../assets/KFC.jpg'),
};

const ConversationsPage = () => {
  const navigation = useNavigation(); // Initialize navigation

  const conversations = [
    { id: 1, name: "Pizza Palace", lastMessage: "Your order is on the way!", time: "2 min ago", image: "Torino.jpg" },
    { id: 2, name: "Burger Town", lastMessage: "Don't forget to rate us!", time: "10 min ago", image: "sushi.jpg" },
    { id: 3, name: "KFC", lastMessage: "New spicy wings available now.", time: "30 min ago", image: "KFC.jpg" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Conversations</Text>
        {conversations.map(conversation => (
          <TouchableOpacity
            key={conversation.id}
            style={styles.conversationCard}
            onPress={() => navigation.navigate('ChatPage', { conversationName: conversation.name })}
          >
            <View style={styles.conversationHeader}>
              <Image
                style={styles.conversationImage}
                source={imageMap[conversation.image]}
              />
              <View style={styles.conversationDetails}>
                <Text style={styles.conversationName}>{conversation.name}</Text>
                <Text style={styles.lastMessage}>{conversation.lastMessage}</Text>
              </View>
              <Text style={styles.messageTime}>{conversation.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  conversationCard: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  conversationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conversationImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  conversationDetails: {
    flex: 1,
  },
  conversationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 16,
    color: '#666',
  },
  messageTime: {
    fontSize: 14,
    color: '#aaa',
  },
});

export default ConversationsPage;
