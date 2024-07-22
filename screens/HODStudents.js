import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';

const HODStudents = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    address: '',
    gender: '',
    dob: '',
    phone: '',
    branch: '',
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true); // Show loader
      const response = await fetch('https://npb-lyart.vercel.app/api/students');
      const data = await response.json();
      setStudentsData(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleAddStudent = async () => {
    try {
      setLoading(true); // Show loader
      const response = await fetch(
        'https://npb-lyart.vercel.app/api/students',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newStudent),
        },
      );
      const data = await response.json();
      setStudentsData([...studentsData, data]);
      setModalVisible(false);
      setNewStudent({
        name: '',
        address: '',
        gender: '',
        dob: '',
        phone: '',
        branch: '',
      });
    } catch (error) {
      console.error('Error adding student:', error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <>
      <Header title={'All Students'} />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Add New</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.studentsContainer}>
          {studentsData.map(student => (
            <View key={student._id} style={styles.card}>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.label}>ID:</Text>
                  <Text>{student._id}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>Name:</Text>
                  <Text>{student.name}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>Address:</Text>
                  <Text>{student.address}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.label}>Gender:</Text>
                  <Text>{student.gender}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>DOB:</Text>
                  <Text>{student.dob}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>Phone:</Text>
                  <Text>{student.phone}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.label}>Branch:</Text>
                  <Text>{student.branch}</Text>
                </View>
                {/* <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.viewButton]}
                    onPress={() => handleView(student)}>
                    <Text style={styles.actionButtonText}>View</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => handleEdit(student)}>
                    <Text style={styles.actionButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDelete(student)}>
                    <Text style={styles.actionButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View> */}
              </View>
            </View>
          ))}
        </ScrollView>

        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}

        {/* Modal for adding new student */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Inputs for new student */}
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={newStudent.name}
                onChangeText={text =>
                  setNewStudent({...newStudent, name: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={newStudent.address}
                onChangeText={text =>
                  setNewStudent({...newStudent, address: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Gender"
                value={newStudent.gender}
                onChangeText={text =>
                  setNewStudent({...newStudent, gender: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Date of Birth"
                value={newStudent.dob}
                onChangeText={text => setNewStudent({...newStudent, dob: text})}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone"
                value={newStudent.phone}
                onChangeText={text =>
                  setNewStudent({...newStudent, phone: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Branch"
                value={newStudent.branch}
                onChangeText={text =>
                  setNewStudent({...newStudent, branch: text})
                }
              />
              {/* Add Student Button */}
              <TouchableOpacity
                style={styles.addStudentButton}
                onPress={handleAddStudent}>
                <Text style={styles.addStudentButtonText}>Add Student</Text>
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
  studentsContainer: {
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
  viewButton: {
    backgroundColor: '#2196F3',
  },
  editButton: {
    backgroundColor: '#FF9800',
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
  addStudentButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addStudentButtonText: {
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

export default HODStudents;
