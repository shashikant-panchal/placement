import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Header from '../components/Header';

const AdminCollegeInfo = () => {
  // Mock data for college information
  const collegeInfo = {
    collegeName: 'College of Engineering',
    address: '123 College Street, City, State, Country',
    website: 'http://www.xyzcollege.edu',
    emailAddress: 'info@xyzcollege.edu',
    phone: '+91 123 456 7890',
    deanName: 'Dr. John Doe',
  };

  return (
    <>
    <Header title={'College Info'}/>
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{collegeInfo.collegeName}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{collegeInfo.address}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Website:</Text>
          <Text style={[styles.value, styles.website]}>{collegeInfo.website}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email Address:</Text>
          <Text style={styles.value}>{collegeInfo.emailAddress}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{collegeInfo.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Dean Name:</Text>
          <Text style={styles.value}>{collegeInfo.deanName}</Text>
        </View>
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent:"center" // White background
  },
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent:'center',
    borderRadius: 20,
    margin: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666666',
    marginRight: 10,
  },
  value: {
    fontSize: 16,
    flex: 1,
    color: '#333333',
  },
  website: {
    textDecorationLine: 'underline',
    color: '#007bff',
  },
});

export default AdminCollegeInfo;
