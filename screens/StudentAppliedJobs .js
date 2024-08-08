import React, {useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet, FlatList, RefreshControl} from 'react-native';
import Header from '../components/Header';
import {AuthContext} from '../AuthContext';

const StudentAppliedJobs = () => {
  const {userData} = useContext(AuthContext);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAppliedJobs = async () => {
    try {
      const response = await fetch(
        `https://npb-lyart.vercel.app/api/appliedJobs/${userData._id}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jobs = await response.json();
      setAppliedJobs(jobs);
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAppliedJobs();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, [userData._id]);

  const renderJobItem = ({item}) => (
    <View style={styles.jobContainer}>
      <Text style={styles.title}>{item.designation}</Text>
      <Text style={styles.companyName}>{item.companyName}</Text>
      <Text style={styles.location}>Location: {item.location}</Text>
      <Text style={styles.salary}>Salary: ₹ {item.salaryPackage} LPA</Text>
    </View>
  );

  return (
    <>
      <Header title={'Applied Jobs'} />
      <View style={styles.container}>
        <FlatList
          data={appliedJobs}
          renderItem={renderJobItem}
          keyExtractor={item => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
        {appliedJobs.length === 0 && !refreshing && (
          <Text style={styles.noJobsText}>
            You have not applied to any jobs yet.
          </Text>
        )}
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
  jobContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginVertical: 4,
  },
  location: {
    fontSize: 14,
    color: '#777',
  },
  salary: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  noJobsText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default StudentAppliedJobs;
