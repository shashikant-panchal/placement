import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Header from '../components/Header';

const AdminCompanies = () => {
  const [companiesData, setCompaniesData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCompany, setNewCompany] = useState({
    companyName: '',
    address: '',
    website: '',
    phone: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://npb-lyart.vercel.app/api/companies',
      );
      setCompaniesData(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCompany = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://npb-lyart.vercel.app/api/companies',
        newCompany,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setCompaniesData([...companiesData, response.data]);
      setModalVisible(false);
      setNewCompany({
        companyName: '',
        address: '',
        website: '',
        phone: '',
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Error adding company:', error);
      Alert.alert('Error', 'Failed to add company. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCompany = async id => {
    try {
      setLoading(true);
      await axios.delete(`https://npb-lyart.vercel.app/api/companies/${id}`);
      setCompaniesData(companiesData.filter(company => company._id !== id));
    } catch (error) {
      console.error('Error deleting company:', error);
      Alert.alert('Error', 'Failed to delete company. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header title={'All Companies'} />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Add New Company</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.companiesContainer}>
          {companiesData.map(company => (
            <View key={company._id} style={styles.card}>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.label}>ID:</Text>
                  <Text>{company._id}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>Company Name:</Text>
                  <Text>{company.companyName}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>Address:</Text>
                  <Text>{company.address}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.label}>Website:</Text>
                  <Text>{company.website}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>Phone:</Text>
                  <Text>{company.phone}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>Email:</Text>
                  <Text>{company.email}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDeleteCompany(company._id)}>
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

        {/* Modal for adding new company */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Inputs for new company */}
              <TextInput
                style={styles.input}
                placeholder="Company Name"
                value={newCompany.companyName}
                onChangeText={text =>
                  setNewCompany({...newCompany, companyName: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={newCompany.address}
                onChangeText={text =>
                  setNewCompany({...newCompany, address: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Website"
                value={newCompany.website}
                onChangeText={text =>
                  setNewCompany({...newCompany, website: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Phone"
                value={newCompany.phone}
                onChangeText={text =>
                  setNewCompany({...newCompany, phone: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={newCompany.email}
                onChangeText={text =>
                  setNewCompany({...newCompany, email: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={newCompany.password}
                onChangeText={text =>
                  setNewCompany({...newCompany, password: text})
                }
              />
              {/* Add Company Button */}
              <TouchableOpacity
                style={styles.addCompanyButton}
                onPress={handleAddCompany}>
                <Text style={styles.addCompanyButtonText}>Add Company</Text>
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
  companiesContainer: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
    shadowOffset: {width: 0, height: 2},
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
  addCompanyButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addCompanyButtonText: {
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

export default AdminCompanies;
