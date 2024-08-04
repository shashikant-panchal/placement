import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Header from '../components/Header';

const AdminDashboard = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({
    studentsNumber: 0,
    hodsNumber: 0,
    companiesNumber: 0,
    selectedStudents: [],
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [studentsRes, hodsRes, companiesRes, selectedStudentsRes] =
        await Promise.all([
          axios.get('https://npb-lyart.vercel.app/api/students'),
          axios.get('https://npb-lyart.vercel.app/api/hods'),
          axios.get('https://npb-lyart.vercel.app/api/companies'),
          axios.get('https://npb-lyart.vercel.app/api/selectedStudents'),
        ]);

      setData({
        studentsNumber: studentsRes.data.length,
        hodsNumber: hodsRes.data.length,
        companiesNumber: companiesRes.data.length,
        selectedStudents: selectedStudentsRes.data,
      });
    } catch (error) {
      console.error('Network request failed:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <>
      <Header title={'Admin Dashboard'} />
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {error && <Text style={styles.errorText}>Error: {error}</Text>}

        {/* First Row */}
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.card, {backgroundColor: '#3498db'}]}
            onPress={() => navigateToScreen('Students')}>
            <Text style={styles.label}>Students</Text>
            <Text style={styles.number}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                data.studentsNumber
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.card, {backgroundColor: '#2ecc71'}]}
            onPress={() => navigateToScreen('HODs')}>
            <Text style={styles.label}>HOD's</Text>
            <Text style={styles.number}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                data.hodsNumber
              )}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Second Row */}
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.card, {backgroundColor: '#e74c3c'}]}
            onPress={() => navigateToScreen('Companies')}>
            <Text style={styles.label}>Company</Text>
            <Text style={styles.number}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                data.companiesNumber
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.card, {backgroundColor: '#87ceeb'}]}
            onPress={() => navigateToScreen('SelectedStudents')}>
            <Text style={styles.label}>Selected Students</Text>
            <Text style={styles.number}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                data.selectedStudents.length
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  card: {
    width: '40%',
    height: 150,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  number: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
});

export default AdminDashboard;
