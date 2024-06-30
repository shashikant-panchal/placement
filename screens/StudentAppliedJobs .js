import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Header from '../components/Header';

// Sample JSON data for applied jobs
const appliedJobsData = [
  { id: '1', companyName: 'ABC Inc.', designation: 'Software Engineer', applyDate: '2024-06-30', status: 'Pending' },
  { id: '2', companyName: 'XYZ Ltd.', designation: 'Product Manager', applyDate: '2024-06-29', status: 'Accepted' },
  { id: '3', companyName: 'PQR Corp.', designation: 'UI/UX Designer', applyDate: '2024-06-28', status: 'Rejected' },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return '#ffcc00'; // yellow
    case 'Accepted':
      return '#00cc66'; // green
    case 'Rejected':
      return '#ff6666'; // red
    default:
      return '#999999'; // gray for unknown status
  }
};

const StudentAppliedJobs = () => {
  const renderItem = ({ item }) => (
    <View style={[styles.jobCard, { borderColor: getStatusColor(item.status) }]}>
      <Text style={styles.jobId}>Job ID: {item.id}</Text>
      <Text style={styles.companyName}>Company: {item.companyName}</Text>
      <Text style={styles.designation}>Designation: {item.designation}</Text>
      <Text style={styles.applyDate}>Apply Date: {item.applyDate}</Text>
      <View style={[styles.statusContainer, { backgroundColor: getStatusColor(item.status) }]}>
        <Text style={styles.status}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <>
    <Header title={'Applies Jobs'} />
    <View style={styles.container}>
      <FlatList
        data={appliedJobsData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
    </>
  );
};

export default StudentAppliedJobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  jobCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  jobId: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  companyName: {
    fontSize: 16,
    marginBottom: 5,
  },
  designation: {
    fontSize: 16,
    marginBottom: 5,
  },
  applyDate: {
    fontSize: 16,
    marginBottom: 5,
  },
  statusContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  status: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
