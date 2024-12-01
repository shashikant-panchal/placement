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
  Alert,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import Header from '../components/Header';

const AdminStudents = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    address: '',
    gender: '',
    dob: '',
    phone: '',
    branch: '',
    batch: '',
    email: '',
    password: '',
  });
  const [editStudent, setEditStudent] = useState({
    name: '',
    address: '',
    gender: '',
    dob: '',
    phone: '',
    branch: '',
    batch: '',
    email: '',
    password: '',
  });
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://npb-lyart.vercel.app/api/students',
      );
      setStudentsData(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectStudent = async studentId => {
    try {
      setLoading(true);
      await axios.post(
        `https://npb-lyart.vercel.app/api/selectStudent/${studentId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      Alert.alert('Success', 'Student placement added successfully');
      setStudentsData(prevStudents =>
        prevStudents.filter(student => student._id !== studentId),
      );
    } catch (error) {
      console.error('Error selecting student:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateInputs = studentData => {
    if (!/^\d{10}$/.test(studentData.phone)) {
      Alert.alert('Error', 'Phone number should contain exactly 10 digits');
      return false;
    }
    const textFields = [
      'name',
      'address',
      'gender',
      'branch',
      'batch',
      'email',
    ];
    for (let field of textFields) {
      if (!/[a-zA-Z]/.test(studentData[field])) {
        Alert.alert(
          'Error',
          `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } should contain at least one letter`,
        );
        return false;
      }
    }
    return true;
  };

  const handleAddStudent = async () => {
    if (!validateInputs(newStudent)) return;

    try {
      setLoading(true);
      const response = await axios.post(
        'https://npb-lyart.vercel.app/api/students',
        newStudent,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setStudentsData([...studentsData, response.data]);
      setModalVisible(false);
      setNewStudent({
        name: '',
        address: '',
        gender: '',
        dob: '',
        phone: '',
        branch: '',
        batch: '',
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Error adding student:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStudent = async () => {
    if (!validateInputs(editStudent)) return;

    try {
      setLoading(true);
      const response = await axios.put(
        `https://npb-lyart.vercel.app/api/students/${editStudent._id}`,
        editStudent,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setStudentsData(prevStudents =>
        prevStudents.map(student =>
          student._id === response.data._id ? response.data : student,
        ),
      );
      setEditModalVisible(false);
      setEditStudent(null);
      alert('Student details updated successfully!');
    } catch (error) {
      console.error('Error updating student:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchStudents().finally(() => setRefreshing(false));
  };

  const openEditModal = student => {
    setEditStudent(student);
    setEditModalVisible(true);
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

        <ScrollView
          contentContainerStyle={styles.studentsContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {studentsData.map(student => (
            <View key={student._id} style={styles.card}>
              <Text
                onPress={() => handleSelectStudent(student._id)}
                style={styles.markAsPlacedText}>
                Mark as Placed
              </Text>
              <TouchableOpacity onPress={() => openEditModal(student)}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>ID:</Text>
                <Text style={styles.infoText}>{student._id}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Name:</Text>
                <Text style={styles.infoText}>{student.name}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Address:</Text>
                <Text style={styles.infoText}>{student.address}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Gender:</Text>
                <Text style={styles.infoText}>{student.gender}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>DOB:</Text>
                <Text style={styles.infoText}>{student.dob}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Phone:</Text>
                <Text style={styles.infoText}>{student.phone}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Branch:</Text>
                <Text style={styles.infoText}>{student.branch}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}

        {/* Modal for adding student */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
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
                keyboardType="name-phone-pad"
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
              <TextInput
                style={styles.input}
                placeholder="Batch"
                value={newStudent.batch}
                onChangeText={text =>
                  setNewStudent({...newStudent, batch: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={newStudent.email}
                onChangeText={text =>
                  setNewStudent({...newStudent, email: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={newStudent.password}
                onChangeText={text =>
                  setNewStudent({...newStudent, password: text})
                }
                secureTextEntry
              />
              <TouchableOpacity
                style={styles.addStudentButton}
                onPress={handleAddStudent}>
                <Text style={styles.addStudentButtonText}>Add Student</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal for editing student */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={editModalVisible}
          onRequestClose={() => setEditModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={editStudent?.name || ''}
                onChangeText={text =>
                  setEditStudent({...editStudent, name: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={editStudent?.address || ''}
                onChangeText={text =>
                  setEditStudent({...editStudent, address: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Gender"
                value={editStudent?.gender || ''}
                onChangeText={text =>
                  setEditStudent({...editStudent, gender: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Date of Birth"
                value={editStudent?.dob || ''}
                onChangeText={text =>
                  setEditStudent({...editStudent, dob: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Phone"
                value={editStudent?.phone || ''}
                onChangeText={text =>
                  setEditStudent({...editStudent, phone: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Branch"
                value={editStudent?.branch || ''}
                onChangeText={text =>
                  setEditStudent({...editStudent, branch: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Batch"
                value={editStudent?.batch || ''}
                onChangeText={text =>
                  setEditStudent({...editStudent, batch: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={editStudent?.email || ''}
                onChangeText={text =>
                  setEditStudent({...editStudent, email: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={editStudent?.password || ''}
                onChangeText={text =>
                  setEditStudent({...editStudent, password: text})
                }
                secureTextEntry
              />
              <TouchableOpacity
                style={styles.addStudentButton}
                onPress={handleUpdateStudent}>
                <Text style={styles.addStudentButtonText}>Update Student</Text>
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
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 14,
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
  markAsPlacedText: {
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'right',
    fontSize: 16,
    padding: 10,
  },
  editButtonText: {
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'right',
    fontSize: 16,
    padding: 10,
  },
});

export default AdminStudents;
