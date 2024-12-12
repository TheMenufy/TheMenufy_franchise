import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const ChatPage = ({ route }) => {
  const { conversationName } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I assist you today?', sender: 'them' },
    { id: 2, text: 'Hi, I have a question', sender: 'me' },
  ]);

  const randomResponses = [
    "Your order has been confirmed and is being prepared.",
    "Our delivery team is on its way to you.",
    "Could you please provide more details about your request?",
    "We’re currently running a promotion on all orders today!",
    "Let me check on that for you. I’ll get back to you shortly.",
    "Is there anything else you would like to add to your order?",
    "Our working hours are from 10 AM to 10 PM daily.",
    "We appreciate your feedback and will make sure to improve our service.",
    "Your request has been noted, and we’ll take care of it.",
    "Please ensure that your delivery address is correct.",
  ];

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: message, sender: 'me' }]);
      setMessage('');

      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * randomResponses.length);
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: prevMessages.length + 1, text: randomResponses[randomIndex], sender: 'them' },
        ]);
      }, 1000);
    }
  };

  const sendImage = () => {
    launchImageLibrary({}, response => {
      if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        setMessages([...messages, { id: messages.length + 1, image: imageUri, sender: 'me' }]);

        setTimeout(() => {
          const randomIndex = Math.floor(Math.random() * randomResponses.length);
          setMessages((prevMessages) => [
            ...prevMessages,
            { id: prevMessages.length + 1, text: randomResponses[randomIndex], sender: 'them' },
          ]);
        }, 1000);
      }
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <Text style={styles.header}>{conversationName}</Text>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.message,
              msg.sender === 'me' ? styles.myMessage : styles.theirMessage,
            ]}
          >
            {msg.text && <Text style={styles.messageText}>{msg.text}</Text>}
            {msg.image && <Image source={{ uri: msg.image }} style={styles.image} />}
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={sendImage} style={styles.imageButton}>
          <Text style={styles.sendButtonText}>Photo</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
    backgroundColor: '#f8f8f8',
    textAlign: 'center',
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f1f1',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 50,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#f28b82',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 5,
    height: 50,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imageButton: {
    marginLeft: 10,
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 5,
    height: 50,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default ChatPage;
