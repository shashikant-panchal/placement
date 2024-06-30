import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const AdminDashboard = () => {
  const navigation = useNavigation();

  // Data for the cards
  const cardsData = [
    { label: "Students", number: 7, color: "#3498db", screen: "Students" },
    { label: "HOD's", number: 4, color: "#2ecc71", screen: "HODs" },
    { label: "Company", number: 4, color: "#e74c3c", screen: "Companies" },
    { label: "Selected Students", number: 7, color: "#87ceeb", screen: "SelectedStudents" }
  ];

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <>
      <Header title={'Admin Dashboard'} />
      <View style={styles.container}>
        {/* First Row */}
        <View style={styles.row}>
          {cardsData.slice(0, 2).map((card, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.card, { backgroundColor: card.color }]}
              onPress={() => navigateToScreen(card.screen)}
            >
              <Text style={styles.label}>{card.label}</Text>
              <Text style={styles.number}>{card.number}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Second Row */}
        <View style={styles.row}>
          {cardsData.slice(2, 4).map((card, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.card, { backgroundColor: card.color }]}
              onPress={() => navigateToScreen(card.screen)}
            >
              <Text style={styles.label}>{card.label}</Text>
              <Text style={styles.number}>{card.number}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
