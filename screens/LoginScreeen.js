import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Menu, Provider, Title, Text } from 'react-native-paper';
import { AuthContext } from '../AuthContext';

const roles = ['admin', 'hod', 'student', 'company'];

const LoginScreen = () => {
  const { setUserRole } = useContext(AuthContext);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null); // Initialize with null
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogin = () => {
    // Check if role is selected
    if (role) {
      // Add actual login logic here
      setUserRole(role);
    } else {
      // Handle case where role is not selected
      alert('Please select a role before logging in.');
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Title style={styles.title}>Welcome To College Placement System</Title>
        <Title style={styles.title2}>Training & Placement Cell</Title>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.subTitle}>Login</Text>
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
              <Menu.Item key={r} onPress={() => { setRole(r); setMenuVisible(false); }} title={r} />
            ))}
          </Menu>
          <Button mode="contained" onPress={handleLogin} style={styles.button} disabled={!role}>
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
});

export default LoginScreen;
