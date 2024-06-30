import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';

const HODHome = () => {
  // Sample HOD profile data
  const hodData = {
    name: 'Dr. Jane Smith',
    address: '456 Elm St, City, Country',
    gender: 'Female',
    department: 'Computer Science',
    phone: '+1 234-567-8902',
    email: 'jane.smith@university.edu',
  };

  return (
    <>
      <Header title={"HOD Profile"} />
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.profileHeading}>HOD Profile</Text>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.text}>{hodData.name}</Text>

          <Text style={styles.label}>Address:</Text>
          <Text style={styles.text}>{hodData.address}</Text>

          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.text}>{hodData.gender}</Text>

          <Text style={styles.label}>Department:</Text>
          <Text style={styles.text}>{hodData.department}</Text>

          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.text}>{hodData.phone}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={[styles.text, styles.email]}>{hodData.email}</Text>
        </View>
      </View>
    </>
  );
};

export default HODHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 70,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
  },
  email: {
    color: '#007bff', // blue color for email link
    textDecorationLine: 'underline',
  },
});
