import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Header from '../components/Header';

const StudentOpenings = () => {
  const jobOpenings = [
    {
      id: 1,
      companyName: 'ABC Inc.',
      designation: 'Software Engineer',
      twelfthPercentage: '85%',
      graduationGPA: '3.8',
      salaryPackage: '80LPA',
    },
    {
      id: 2,
      companyName: 'XYZ Corp.',
      designation: 'Web Developer',
      twelfthPercentage: '80%',
      graduationGPA: '3.5',
      salaryPackage: '70LPA',
    },
    {
      id: 3,
      companyName: 'PQR Ltd.',
      designation: 'Data Analyst',
      twelfthPercentage: '88%',
      graduationGPA: '3.9',
      salaryPackage: '75LPA',
    },
    {
      id: 4,
      companyName: 'MNO Solutions',
      designation: 'UX Designer',
      twelfthPercentage: '82%',
      graduationGPA: '3.7',
      salaryPackage: '85LPA',
    },
    {
      id: 5,
      companyName: 'EFG Technologies',
      designation: 'Network Engineer',
      twelfthPercentage: '86%',
      graduationGPA: '3.6',
      salaryPackage: '90LPA',
    },
    {
      id: 6,
      companyName: 'LMN Innovations',
      designation: 'Business Analyst',
      twelfthPercentage: '84%',
      graduationGPA: '3.8',
      salaryPackage: '78LPA',
    },
    {
      id: 7,
      companyName: 'GHI Enterprises',
      designation: 'Mobile App Developer',
      twelfthPercentage: '81%',
      graduationGPA: '3.6',
      salaryPackage: '82LPA',
    },
    {
      id: 8,
      companyName: 'JKL Systems',
      designation: 'Systems Engineer',
      twelfthPercentage: '87%',
      graduationGPA: '3.9',
      salaryPackage: '95LPA',
    },
    {
      id: 9,
      companyName: 'RST Solutions',
      designation: 'UI Designer',
      twelfthPercentage: '83%',
      graduationGPA: '3.7',
      salaryPackage: '88LPA',
    },
    {
      id: 10,
      companyName: 'UVW Tech',
      designation: 'Quality Assurance Tester',
      twelfthPercentage: '85%',
      graduationGPA: '3.8',
      salaryPackage: '72LPA',
    },
  ];

  return (
    <>
    <Header title={'Job Openings'}/>
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.openingsContainer}>
        {jobOpenings.map((job) => (
          <View key={job.id} style={styles.card}>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>ID:</Text>
                <Text>{job.id}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Company Name:</Text>
                <Text>{job.companyName}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Designation:</Text>
                <Text>{job.designation}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>12th Percentage:</Text>
                <Text>{job.twelfthPercentage}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Graduation GPA:</Text>
                <Text>{job.graduationGPA}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Salary Package:</Text>
                <Text>{job.salaryPackage} LPA</Text>
              </View>
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
  openingsContainer: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
});

export default StudentOpenings;
