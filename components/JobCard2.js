import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

const JobCard2 = ({job, navigation}) => {
  const renderApplicant = ({item}) => (
    <View style={styles.applicantCard}>
      <Text style={styles.applicantName}>{item.name.toUpperCase()}</Text>
      <Text style={styles.applicantBranch}>Branch: {item.branch}</Text>
    </View>
  );

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{job.designation}</Text>
      <Text style={styles.company}>{job.companyName}</Text>
      <Text style={styles.location}>Location: {job.location}</Text>
      <Text style={styles.salary}>Salary: ₹ {job.salaryPackage} LPA</Text>
      <Text style={styles.salary}>
        Posted on: {job.currentDate ? job.currentDate : 'Posted long ago'}
      </Text>

      {/* Applicants section */}
      {job.applicants && job.applicants.length > 0 ? (
        <View style={styles.applicantsContainer}>
          <Text style={styles.applicantsTitle}>Applicants:</Text>
          <FlatList
            data={job.applicants}
            renderItem={renderApplicant}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      ) : (
        <Text style={styles.noApplicantsText}>No applicants yet.</Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ViewJob', {job})}>
        <Text style={styles.buttonText}>View Details</Text>
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
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  company: {
    fontSize: 16,
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    marginBottom: 8,
  },
  salary: {
    fontSize: 14,
    marginBottom: 8,
  },
  applicantsContainer: {
    marginTop: 16,
  },
  applicantsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  noApplicantsText: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
  },
  applicantCard: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  applicantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  applicantBranch: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#ff7f50',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default JobCard2;
