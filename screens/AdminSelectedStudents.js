import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import Header from '../components/Header';

const AdminSelectedStudents = () => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [activeBatch, setActiveBatch] = useState(null);

  useEffect(() => {
    fetchSelectedStudents();
  }, []);

  const fetchSelectedStudents = async () => {
    try {
      const response = await axios.get(
        'https://npb-lyart.vercel.app/api/selectedStudents',
      );
      setSelectedStudents(response.data);
      setFilteredStudents(response.data); // Initial population of filtered students
    } catch (error) {
      console.error('Error fetching selected students:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchSelectedStudents();
  }, []);

  const filterByBatch = batch => {
    setActiveBatch(batch);
    if (batch === null) {
      setFilteredStudents(selectedStudents); // Show all students if no batch is selected
    } else {
      const filtered = selectedStudents.filter(
        student => student.batch === batch,
      );
      setFilteredStudents(filtered);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Branch:</Text>
        <Text style={styles.infoText}>{item.branch}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Batch:</Text>
        <Text style={styles.infoText}>{item.batch}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Address:</Text>
        <Text style={styles.infoText}>{item.address}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Gender:</Text>
        <Text style={styles.infoText}>{item.gender}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Date of Birth:</Text>
        <Text style={styles.infoText}>{item.dob}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Phone:</Text>
        <Text style={styles.infoText}>{item.phone}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loaderContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Placed Students" />
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            activeBatch === null && styles.activeFilterButton,
          ]}
          onPress={() => filterByBatch(null)}>
          <Text style={styles.filterButtonText}>All Batches</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            activeBatch === '2022' && styles.activeFilterButton,
          ]}
          onPress={() => filterByBatch('2022')}>
          <Text style={styles.filterButtonText}>2022</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            activeBatch === '2023' && styles.activeFilterButton,
          ]}
          onPress={() => filterByBatch('2023')}>
          <Text style={styles.filterButtonText}>2023</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            activeBatch === '2024' && styles.activeFilterButton,
          ]}
          onPress={() => filterByBatch('2024')}>
          <Text style={styles.filterButtonText}>2024</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredStudents}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.studentsContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  studentsContainer: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    backgroundColor: '#fff',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  activeFilterButton: {
    backgroundColor: '#4CAF50',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#000',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  infoLabel: {
    fontWeight: 'bold',
    width: 100,
  },
  infoText: {
    flex: 1,
  },
});

export default AdminSelectedStudents;
