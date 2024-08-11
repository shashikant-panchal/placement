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

  // const fetchJobs = async () => {
  //   try {
  //     const response = await axios.get('https://npb-lyart.vercel.app/api/jobs');
  //     const filteredJobs = response.data.filter(
  //       job =>
  //         job.companyName.toLowerCase() === userData.companyName.toLowerCase(),
  //     );
  //     setJobs(filteredJobs);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching jobs:', error);
  //     setLoading(false);
  //   }
  // };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://npb-lyart.vercel.app/api/jobs');
      if (!Array.isArray(response.data)) {
        throw new Error('Unexpected response data format');
      }
      const userCompanyName =
        userData && userData.companyName
          ? userData.companyName.toLowerCase()
          : '';
      const filteredJobs = response.data.filter(job => {
        return (
          typeof job.companyName === 'string' &&
          job.companyName.toLowerCase() === userCompanyName
        );
      });

      setJobs(filteredJobs);
      console.log('=======>', JSON.stringify(jobs));
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
