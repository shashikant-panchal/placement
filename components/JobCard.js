import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const JobCard = ({job, navigation}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate('ApplyJob', {job})}>
        <Text style={styles.title}>{job.companyName}</Text>
        <Text style={styles.company}>{job.designation}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  company: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#444',
  },
});

export default JobCard;
