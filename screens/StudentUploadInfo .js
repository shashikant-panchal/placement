import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Header from '../components/Header';

const StudentUploadInfo = () => {
  const [tenthPassYear, setTenthPassYear] = useState('');
  const [tenthPercentage, setTenthPercentage] = useState('');
  const [twelfthPassYear, setTwelfthPassYear] = useState('');
  const [twelfthPercentage, setTwelfthPercentage] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [graduationGPA, setGraduationGPA] = useState('');

  const handleSubmit = () => {
    Alert.alert('Success', 'Student information added successfully!', [
      {text: 'OK', onPress: clearFields},
    ]);
  };

  const clearFields = () => {
    setTenthPassYear('');
    setTenthPercentage('');
    setTwelfthPassYear('');
    setTwelfthPercentage('');
    setGraduationYear('');
    setGraduationGPA('');
  };

  return (
    <>
      <Header title={'Upload Info'} />
      <View style={styles.container}>
        <Text style={styles.heading}>Upload Student Info</Text>

        <TextInput
          style={styles.input}
          placeholder="10th Pass Year"
          value={tenthPassYear}
          onChangeText={text => setTenthPassYear(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="10th Percentage"
          value={tenthPercentage}
          onChangeText={text => setTenthPercentage(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="12th Pass Year"
          value={twelfthPassYear}
          onChangeText={text => setTwelfthPassYear(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="12th Percentage"
          value={twelfthPercentage}
          onChangeText={text => setTwelfthPercentage(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Graduation Year"
          value={graduationYear}
          onChangeText={text => setGraduationYear(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Graduation GPA"
          value={graduationGPA}
          onChangeText={text => setGraduationGPA(text)}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default StudentUploadInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    borderRadius: 5,
  },
  submitButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#1e90ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  submitText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
