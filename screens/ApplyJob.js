import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Button, Alert} from 'react-native';
import Header from '../components/Header';
import {AuthContext} from '../AuthContext';

const ApplyJob = ({route, navigation}) => {
  const {userData} = useContext(AuthContext);
  console.log('UserData===>', JSON.stringify(userData));
  const {job} = route.params;

  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const checkIfApplied = async () => {
      try {
        const response = await fetch(
          `https://npb-lyart.vercel.app/api/hasApplied/${userData._id}/${job._id}`,
        );
        const result = await response.json();

        if (result.applied) {
          setHasApplied(true);
        }
      } catch (error) {
        console.error('Error checking if the job is already applied:', error);
      }
    };

    checkIfApplied();
  }, [userData._id, job._id]);

  const handleApplyNow = async () => {
    try {
      const response = await fetch(
        'https://npb-lyart.vercel.app/api/applyJob',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studentId: userData._id,
            jobId: job._id,
            userData,
          }),
        },
      );

      if (response.ok) {
        setHasApplied(true);
        Alert.alert(
          'Application Submitted',
          'Your application has been submitted successfully!',
        );
      } else {
        Alert.alert(
          'Error',
          'Failed to submit your application. Please try again.',
        );
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
      console.error('Error applying for the job:', error);
    }
  };

  return (
    <>
      <Header title={'Apply Job'} />
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

        <View style={styles.buttonContainer}>
          {hasApplied ? (
            <Text style={styles.appliedText}>Already Applied</Text>
          ) : (
            <Button
              title="Apply Now"
              onPress={handleApplyNow}
              color="#ff7f50"
            />
          )}
        </View>
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

export default ApplyJob;
