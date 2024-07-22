import React, {useState, useEffect} from 'react';
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
import Header from '../components/Header';

const AdminDashboard = () => {
  const navigation = useNavigation();
  const [studentsNumber, setStudentsNumber] = useState(0);
  const [hodsNumber, setHODsNumber] = useState(0);
  const [companiesNumber, setCompaniesNumber] = useState(0);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchStudents(),
        fetchHODs(),
        fetchCompanies(),
        fetchSelectedStudents(),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        'https://placement-backend-navy.vercel.app/api/students',
      );
      const data = await response.json();
      setStudentsNumber(data.length);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchHODs = async () => {
    try {
      const response = await fetch(
        'https://placement-backend-navy.vercel.app/api/hods',
      );
      const data = await response.json();
      setHODsNumber(data.length);
    } catch (error) {
      console.error('Error fetching HODs:', error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await fetch(
        'https://placement-backend-navy.vercel.app/api/companies',
      );
      const data = await response.json();
      setCompaniesNumber(data.length);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const fetchSelectedStudents = async () => {
    try {
      const response = await fetch(
        'https://placement-backend-navy.vercel.app/api/selectedStudents',
      );
      const data = await response.json();
      setSelectedStudents(data);
    } catch (error) {
      console.error('Error fetching selected students:', error);
    }
  };

  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  };

  return (
    <>
      <Header title={'Admin Dashboard'} />
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
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
                studentsNumber
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
                hodsNumber
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
                companiesNumber
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
                selectedStudents.length
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
});

export default AdminDashboard;
