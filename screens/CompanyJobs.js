import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Header from '../components/Header';

const CompanyJobs = () => {
  const [designation, setDesignation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [twelfthPercentage, setTwelfthPercentage] = useState('');
  const [graduationGPA, setGraduationGPA] = useState('');
  const [salaryPackage, setSalaryPackage] = useState('');
  const [jobAdded, setJobAdded] = useState(false); // State to track job added
  const [errorText, setErrorText] = useState('');

  const handleAddJob = () => {
    // Check if any field is empty
    if (
      !designation ||
      !companyName ||
      !twelfthPercentage ||
      !graduationGPA ||
      !salaryPackage
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
    };

    fetch('https://placement-backend-navy.vercel.app/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Job added successfully:', data);
        setJobAdded(true); // Set jobAdded state to true upon successful addition
        setErrorText(''); // Clear error message
        setDesignation(''); // Clear input fields
        setCompanyName('');
        setTwelfthPercentage('');
        setGraduationGPA('');
        setSalaryPackage('');

        // Show alert for successful job addition
        Alert.alert('Success', 'Job added successfully!');
      })
      .catch(error => console.error('Error adding job:', error));
  };

  return (
    <>
      <Header title={'Add a Job'} />
      <View style={styles.container}>
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
        <TouchableOpacity style={styles.button} onPress={handleAddJob}>
          <Text style={styles.buttonText}>Add Job</Text>
        </TouchableOpacity>

        {/* Error message for incomplete details */}
        {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}

        {/* Conditional rendering of success message */}
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
