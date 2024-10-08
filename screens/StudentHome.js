import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import {AuthContext} from '../AuthContext';

const StudentHome = () => {
  const {userData, logout} = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigation.navigate('Login');
  };

  return (
    <>
      <Header title={'Student Home'} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.profileHeading}>Student Profile</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.text}>{userData?.name}</Text>

          <Text style={styles.label}>Address:</Text>
          <Text style={styles.text}>{userData?.address}</Text>

          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.text}>{userData?.gender}</Text>

          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.text}>{userData?.phone}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{userData?.email}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
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
    shadowOffset: {width: 0, height: 2},
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
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
