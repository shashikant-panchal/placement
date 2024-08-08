import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Button,
  TextInput,
  Menu,
  Provider,
  Title,
  Text,
} from 'react-native-paper';
import {AuthContext} from '../AuthContext';
import axios from 'axios';

const roles = ['admin', 'hod', 'student', 'company'];

const roleCredentials = {
  admin: {userId: 'admin@gmail.com', password: 'admin@123'},
};

const LoginScreen = () => {
  const {setUserRole, setUserData} = useContext(AuthContext);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [students, setStudents] = useState([]);
  const [hods, setHods] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsResponse, hodsResponse, companiesResponse] =
          await Promise.all([
            axios.get('https://npb-lyart.vercel.app/api/students'),
            axios.get('https://npb-lyart.vercel.app/api/hods'),
            axios.get('https://npb-lyart.vercel.app/api/companies'),
          ]);
        setStudents(studentsResponse.data);
        setHods(hodsResponse.data);
        setCompanies(companiesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setErrorMessage(
          'Network Error: Unable to fetch data. Please check your connection.',
        );
      }
    };

    fetchData();
  }, []);

  const handleLogin = () => {
    if (!userId || !password || !role) {
      setErrorMessage('Please fill all details.');
      return;
    }

    if (role === 'student') {
      const student = students.find(
        student => student.email === userId && student.password === password,
      );
      if (!student) {
        setErrorMessage('Invalid credentials.');
        return;
      }
      setUserRole(role);
      setUserData(student);
    } else if (role === 'hod') {
      const hod = hods.find(
        hod => hod.email === userId && hod.password === password,
      );
      if (!hod) {
        setErrorMessage('Invalid credentials.');
        return;
      }
      setUserRole(role);
      setUserData(hod);
    } else if (role === 'company') {
      const company = companies.find(
        company => company.email === userId && company.password === password,
      );
      if (!company) {
        setErrorMessage('Invalid credentials.');
        return;
      }
      setUserRole(role);
      setUserData(company);
    } else {
      const credentials = roleCredentials[role];
      if (userId !== credentials.userId || password !== credentials.password) {
        setErrorMessage('Invalid credentials.');
        return;
      }
      setUserRole(role);
      setUserData({userId, role});
    }
    setErrorMessage('');
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Title style={styles.title}>Welcome To College Placement System</Title>
        <Title style={styles.title2}>Training & Placement Cell</Title>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={styles.subTitle}>Login</Text>
          {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : null}
          <TextInput
            label="User ID"
            value={userId}
            onChangeText={setUserId}
            style={styles.input}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button onPress={() => setMenuVisible(true)} style={styles.input}>
                {role ? role : 'Select Role'}
              </Button>
            }>
            {roles.map(r => (
              <Menu.Item
                key={r}
                onPress={() => {
                  setRole(r);
                  setMenuVisible(false);
                }}
                title={r}
              />
            ))}
          </Menu>
          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            disabled={!role}>
            Login
          </Button>
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  title2: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 25,
  },
  subTitle: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
