import React from 'react';
import {View, Text, StyleSheet, ScrollView, Button, Alert} from 'react-native';
import Header from '../components/Header';

const ViewJob = ({route, navigation}) => {
  const {job} = route.params;

  const handleApplyNow = () => {
    Alert.alert(
      'Application Submitted',
      'Your application has been submitted successfully!',
    );
  };

  return (
    <>
      <Header title={'View Job'} />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>{job.designation}</Text>
          <Text style={styles.companyName}>{job.companyName}</Text>

          <View style={styles.detailContainer}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{job.location}</Text>
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.label}>Salary Package:</Text>
            <Text style={styles.value}>₹ {job.salaryPackage} LPA</Text>
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.label}>Required 12th Percentage:</Text>
            <Text style={styles.value}>{job.twelfthPercentage}%</Text>
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.label}>Graduation GPA:</Text>
            <Text style={styles.value}>{job.graduationGPA}</Text>
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.label}>Experience Required:</Text>
            <Text style={styles.value}>{job.experienceRequired} years</Text>
          </View>

          <Text style={styles.descriptionTitle}>Job Description:</Text>
          <Text style={styles.description}>{job.jobDescription}</Text>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  scrollView: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  companyName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#555',
    marginBottom: 16,
  },
  detailContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  value: {
    color: '#555',
    flex: 2,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  description: {
    color: '#555',
    lineHeight: 22,
  },
  buttonContainer: {
    marginTop: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ViewJob;
