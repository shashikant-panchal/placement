import React, {useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Header from '../components/Header';
import {AuthContext} from '../AuthContext';

const CompanyHome = ({navigation}) => {
  const {userData, logout} = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <Header title={'Company Profile'} />
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.profileHeading}>Company Profile</Text>
          <Text style={styles.label}>Company Name:</Text>
          <Text style={styles.text}>{userData?.companyName}</Text>

          <Text style={styles.label}>Address:</Text>
          <Text style={styles.text}>{userData?.address}</Text>

          <Text style={styles.label}>Website:</Text>
          <Text style={[styles.text, styles.website]}>{userData?.website}</Text>

          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.text}>{userData?.phone}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={[styles.text, styles.email]}>{userData?.email}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CompanyHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20, // Added padding for spacing
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20, // Adjusted padding for better layout
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%', // Ensured the card takes full width
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
  website: {
    color: '#007bff', // Blue color for website link
    textDecorationLine: 'underline',
  },
  email: {
    color: '#007bff', // Blue color for email link
    textDecorationLine: 'underline',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: '100%', // Ensured the button takes full width
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
