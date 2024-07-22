import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';

const AdminSelectedStudents = () => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSelectedStudents();
  }, []);

  const fetchSelectedStudents = async () => {
    try {
      const response = await fetch(
        'https://npb-lyart.vercel.app/api/selectedStudents',
      );
      const data = await response.json();
      setSelectedStudents(data);
    } catch (error) {
      console.error('Error fetching selected students:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loaderContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Branch:</Text>
        <Text style={styles.infoText}>{item.branch}</Text>
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

  return (
    <View style={styles.container}>
      <Header title="Selected Students" />
      <FlatList
        data={selectedStudents}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.studentsContainer}
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
