import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, TextInput, Alert, ActivityIndicator } from 'react-native';
import Header from '../components/Header';

const AdminHODs = () => {
  const [hodsData, setHODsData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newHOD, setNewHOD] = useState({
    name: '',
    address: '',
    gender: '',
    department: '',
    phone: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHODs();
  }, []);

  const fetchHODs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://192.168.1.45:5000/api/hods');
      const data = await response.json();
      setHODsData(data);
    } catch (error) {
      console.error('Error fetching HODs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddHOD = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://192.168.1.45:5000/api/hods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHOD),
      });
      const data = await response.json();
      setHODsData([...hodsData, data]);
      setModalVisible(false);
      setNewHOD({
        name: '',
        address: '',
        gender: '',
        department: '',
        phone: '',
        email: '',
      });
    } catch (error) {
      console.error('Error adding HOD:', error);
      Alert.alert('Error', 'Failed to add HOD. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHOD = async (id) => {
    try {
      setLoading(true);
      await fetch(`http://192.168.1.45:5000/api/hods/${id}`, {
        method: 'DELETE',
      });
      setHODsData(hodsData.filter((hod) => hod._id !== id));
    } catch (error) {
      console.error('Error deleting HOD:', error);
      Alert.alert('Error', 'Failed to delete HOD. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header title={'All HODs'} />
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add New HOD</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.hodsContainer}>
        {hodsData.map((hod) => (
          <View key={hod._id} style={styles.card}>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>ID:</Text>
                <Text>{hod._id}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Name:</Text>
                <Text>{hod.name}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Address:</Text>
                <Text>{hod.address}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Gender:</Text>
                <Text>{hod.gender}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Department:</Text>
                <Text>{hod.department}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Phone:</Text>
                <Text>{hod.phone}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Email:</Text>
                <Text>{hod.email}</Text>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => handleDeleteHOD(hod._id)}
                >
                  <Text style={styles.actionButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Loader */}
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {/* Modal for adding new HOD */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Inputs for new HOD */}
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newHOD.name}
              onChangeText={(text) => setNewHOD({ ...newHOD, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={newHOD.address}
              onChangeText={(text) => setNewHOD({ ...newHOD, address: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Gender"
              value={newHOD.gender}
              onChangeText={(text) => setNewHOD({ ...newHOD, gender: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Department"
              value={newHOD.department}
              onChangeText={(text) => setNewHOD({ ...newHOD, department: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={newHOD.phone}
              onChangeText={(text) => setNewHOD({ ...newHOD, phone: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={newHOD.email}
              onChangeText={(text) => setNewHOD({ ...newHOD, email: text })}
            />
            {/* Add HOD Button */}
            <TouchableOpacity style={styles.addHODButton} onPress={handleAddHOD}>
              <Text style={styles.addHODButtonText}>Add HOD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hodsContainer: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  addHODButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addHODButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AdminHODs;
