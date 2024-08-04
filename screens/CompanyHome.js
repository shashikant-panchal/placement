import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../components/Header';
import {AuthContext} from '../AuthContext';

const CompanyHome = () => {
  const {userData} = useContext(AuthContext);

  return (
    <>
      <Header title={'Company Profile'} />
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.profileHeading}>Company Profile</Text>
          <Text style={styles.label}>Company Name:</Text>
          <Text style={styles.text}>{userData.companyName}</Text>

          <Text style={styles.label}>Address:</Text>
          <Text style={styles.text}>{userData.address}</Text>

          <Text style={styles.label}>Website:</Text>
          <Text style={[styles.text, styles.website]}>{userData.website}</Text>

          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.text}>{userData.phone}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={[styles.text, styles.email]}>{userData.email}</Text>
        </View>
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
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 70,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
  website: {
    color: '#007bff', // blue color for website link
    textDecorationLine: 'underline',
  },
  email: {
    color: '#007bff', // blue color for email link
    textDecorationLine: 'underline',
  },
});
