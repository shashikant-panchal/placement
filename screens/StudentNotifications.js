import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import Header from '../components/Header';

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://npb-lyart.vercel.app/api/notifications',
      );
      setNotifications(response.data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchNotifications().finally(() => setRefreshing(false));
  };

  // Render each notification item
  const renderNotification = ({item}) => (
    <View style={styles.notification}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.message}</Text>
    </View>
  );

  return (
    <>
      <Header title={'Notifications'} />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#007bff"
            style={styles.loader}
          />
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={item => item._id}
            renderItem={renderNotification}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#007bff']}
              />
            }
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  notification: {
    backgroundColor: '#ffff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 10,
    borderWidth: 0.3,
    borderColor: 'blue',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    fontWeight: '300',
  },
});

export default StudentNotifications;
