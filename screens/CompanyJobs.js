import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import Header from '../components/Header';

const CompanyJobs = () => {
  const [designation, setDesignation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [twelfthPercentage, setTwelfthPercentage] = useState('');
  const [graduationGPA, setGraduationGPA] = useState('');
  const [salaryPackage, setSalaryPackage] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [location, setLocation] = useState('');
  const [experienceRequired, setExperienceRequired] = useState('');
  const [jobAdded, setJobAdded] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleAddJob = async () => {
    if (
      !designation ||
      !companyName ||
      !twelfthPercentage ||
      !graduationGPA ||
      !salaryPackage ||
      !jobDescription ||
      !location ||
      !experienceRequired
    ) {
      setErrorText('Please fill out all details.');
      return;
    }

    const newJob = {
      designation,
      companyName,
      twelfthPercentage: parseFloat(twelfthPercentage),
      graduationGPA: parseFloat(graduationGPA),
      salaryPackage: parseFloat(salaryPackage),
      jobDescription,
      location,
      experienceRequired,
    };

    try {
      const response = await axios.post(
        'https://npb-lyart.vercel.app/api/jobs',
        newJob,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Job added successfully:', response.data);
      setJobAdded(true);
      setErrorText('');
      setDesignation('');
      setCompanyName('');
      setTwelfthPercentage('');
      setGraduationGPA('');
      setSalaryPackage('');
      setJobDescription('');
      setLocation('');
      setExperienceRequired('');

      Alert.alert('Success', 'Job added successfully!');
    } catch (error) {
      console.error('Error adding job:', error);
      Alert.alert('Error', 'Failed to add job. Please try again.');
    }
  };

  return (
    <>
      <Header title={'Add a Job'} />
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.label}>Designation:</Text>
          <TextInput
            style={styles.input}
            value={designation}
            onChangeText={text => setDesignation(text)}
            placeholder="Enter designation"
          />
          <Text style={styles.label}>Company Name:</Text>
          <TextInput
            style={styles.input}
            value={companyName}
            onChangeText={text => setCompanyName(text)}
            placeholder="Enter company name"
          />
          <Text style={styles.label}>12th Percentage:</Text>
          <TextInput
            style={styles.input}
            value={twelfthPercentage}
            onChangeText={text => setTwelfthPercentage(text)}
            keyboardType="numeric"
            placeholder="Enter percentage"
          />
          <Text style={styles.label}>Graduation GPA:</Text>
          <TextInput
            style={styles.input}
            value={graduationGPA}
            onChangeText={text => setGraduationGPA(text)}
            keyboardType="numeric"
            placeholder="Enter GPA"
          />
          <Text style={styles.label}>Salary Package:</Text>
          <TextInput
            style={styles.input}
            value={salaryPackage}
            onChangeText={text => setSalaryPackage(text)}
            keyboardType="numeric"
            placeholder="Enter salary package"
          />
          <Text style={styles.label}>Job Description:</Text>
          <TextInput
            style={styles.textArea}
            value={jobDescription}
            onChangeText={text => setJobDescription(text)}
            placeholder="Enter job description"
            multiline
            textAlignVertical="top"
          />
          <Text style={styles.label}>Location:</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={text => setLocation(text)}
            placeholder="Enter job location"
          />
          <Text style={styles.label}>Experience Required:</Text>
          <TextInput
            style={styles.input}
            value={experienceRequired}
            onChangeText={text => setExperienceRequired(text)}
            placeholder="Enter experience required"
          />
          <TouchableOpacity style={styles.button} onPress={handleAddJob}>
            <Text style={styles.buttonText}>Add Job</Text>
          </TouchableOpacity>
        </ScrollView>

        {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
        {jobAdded && (
          <Text style={styles.successText}>Job added successfully!</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  textArea: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    minHeight: 100, // Minimum height for the text area
    height: 'auto', // Allow height to adjust with content
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
    alignSelf: 'center',
  },
  successText: {
    color: 'green',
    fontSize: 16,
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default CompanyJobs;
