import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import Header from '../components/Header';
import {useNavigation} from '@react-navigation/native';
import JobCard2 from '../components/JobCard2';

const AdminOpenings = () => {
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const jobsResponse = await axios.get(
        'https://npb-lyart.vercel.app/api/jobs',
      );

      if (!Array.isArray(jobsResponse.data)) {
        throw new Error('Unexpected response data format');
      }

      const jobsData = jobsResponse.data;
      const jobsWithApplicants = await Promise.all(
        jobsData.map(async job => {
          try {
            const applicantsResponse = await axios.get(
              `https://npb-lyart.vercel.app/api/jobApplicants/${job._id}`,
            );
            return {
              ...job,
              applicants: applicantsResponse.data,
            };
          } catch (error) {
            console.error('Error fetching applicants for job:', error);
            return {
              ...job,
              applicants: [], // return an empty array if there's an error fetching applicants
            };
          }
        }),
      );

      setJobs(jobsWithApplicants);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchJobs().finally(() => {
      setRefreshing(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <Header title="Jobs Listing" />
      <View style={styles.container}>
        <FlatList
          data={jobs}
          renderItem={({item}) => (
            <JobCard2 job={item} navigation={navigation} />
          )}
          keyExtractor={item => item._id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#0000ff']}
              tintColor="#0000ff"
            />
          }
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AdminOpenings;
