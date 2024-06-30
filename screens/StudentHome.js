import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Header from '../components/Header';

const studentData = {
  name: "John Doe",
  address: "123 Main St, City, Country",
  gender: "Male",
  phone: "+1 234-567-8901",
  email: "john.doe@example.com"
};

const StudentHome = () => {

  return (
    <>
    <Header title={'Student Home'}/>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.profileHeading}>Student Profile</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.text}>{studentData.name}</Text>

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.text}>{studentData.address}</Text>

        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.text}>{studentData.gender}</Text>

        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.text}>{studentData.phone}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.text}>{studentData.email}</Text>
      </View>
    </ScrollView>
    </>
  );
};

export default StudentHome;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  profileHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
});
