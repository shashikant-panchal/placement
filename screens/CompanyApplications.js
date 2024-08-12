import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  Text,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import Header from '../components/Header';
import JobCard2 from '../components/JobCard2';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../AuthContext';

const CompanyApplications = () => {
  const {userData} = useContext(AuthContext);
  console.log('userData', JSON.stringify(userData));

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

      const userCompanyName = userData?.companyName?.toLowerCase() || '';
      const filteredJobs = jobsResponse.data.filter(
        job =>
          typeof job.companyName === 'string' &&
          job.companyName.toLowerCase() === userCompanyName,
      );

      // Fetch applicants for each job
      const jobsWithApplicants = await Promise.all(
        filteredJobs.map(async job => {
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
            return job; // Return job without applicants if there's an error
          }
        }),
      );

      setJobs(jobsWithApplicants);
      console.log('=======>', JSON.stringify(jobsWithApplicants));
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchJobs().then(() => {
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
      <Header title={'Jobs Listing'} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0000ff']}
            tintColor="#0000ff"
          />
        }>
        <View style={styles.container}>
          {jobs.length > 0 ? (
            <FlatList
              data={jobs}
              renderItem={({item}) => (
                <JobCard2 job={item} navigation={navigation} />
              )}
              keyExtractor={item => item._id}
            />
          ) : (
            <View style={styles.noJobsContainer}>
              <Text style={styles.noJobsText}>No Job Listings</Text>
            </View>
          )}
        </View>
      </ScrollView>
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
  noJobsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noJobsText: {
    fontSize: 18,
    color: '#888',
  },
});

export default CompanyApplications;
