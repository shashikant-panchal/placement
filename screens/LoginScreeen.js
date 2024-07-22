import React, {useState, useContext} from 'react';
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

const roles = ['admin', 'hod', 'student', 'company'];

const roleCredentials = {
  admin: {userId: 'admin@gmail.com', password: 'admin@123'},
  hod: {userId: 'hod@gmail.com', password: 'hod@123'},
  student: {userId: 'student@gmail.com', password: 'student@123'},
  company: {userId: 'company@gmail.com', password: 'company@123'},
};

const LoginScreen = () => {
  const {setUserRole} = useContext(AuthContext);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (!userId || !password || !role) {
      setErrorMessage('Please fill all details.');
      return;
    }

    const credentials = roleCredentials[role];
    if (userId !== credentials.userId || password !== credentials.password) {
      setErrorMessage('Invalid credentials.');
      return;
    }

    setUserRole(role);
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
