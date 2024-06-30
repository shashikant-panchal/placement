import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Header from '../components/Header';

const AdminSelectedStudents = () => {
  const selectedStudents = [
    {
      id: 1,
      name: 'John Doe',
      branch: 'Computer Science',
      companyName: 'ABC Inc.',
      designation: 'Software Engineer',
      salary: '80,000',
    },
    {
      id: 2,
      name: 'Jane Smith',
      branch: 'Electrical Engineering',
      companyName: 'XYZ Corp.',
      designation: 'Web Developer',
      salary: '70,000',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      branch: 'Mechanical Engineering',
      companyName: 'PQR Ltd.',
      designation: 'Data Analyst',
      salary: '75,000',
    },
    {
      id: 4,
      name: 'Bob Brown',
      branch: 'Information Technology',
      companyName: 'MNO Solutions',
      designation: 'UX Designer',
      salary: '85,000',
    },
  ];

  return (
    <>
    <Header title={'Selected Students'}/>
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.studentsContainer}>
        {selectedStudents.map((student) => (
          <View key={student.id} style={styles.card}>
            <Text style={styles.title}>{student.name}</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Branch:</Text>
              <Text style={styles.value}>{student.branch}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Company Name:</Text>
              <Text style={styles.value}>{student.companyName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Designation:</Text>
              <Text style={styles.value}>{student.designation}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Salary:</Text>
              <Text style={styles.value}>₹{student.salary} LPA</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  studentsContainer: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    color: '#666',
    marginRight: 4,
  },
  value: {
    flex: 1,
    textAlign: 'right',
  },
});

export default AdminSelectedStudents;
