import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';
import axios from 'axios';
import Header from '../components/Header';

const CompanyNotifications = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!title || !message) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    axios
      .post('https://npb-lyart.vercel.app/api/notifications', {title, message})
      .then(response => {
        Alert.alert('Success', 'Notification added successfully!');
        setTitle('');
        setMessage('');
      })
      .catch(error => {
        Alert.alert('Error', 'Failed to add notification.');
        console.error(error);
      });
  };

  return (
    <>
      <Header title={'Add a Notification'} />
      <View style={styles.container}>
        <Text style={styles.header}>Add Notification</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Message"
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default CompanyNotifications;
