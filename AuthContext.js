// // contexts/AuthContext.js

// import React, {useState} from 'react';

// // Create the context
// export const AuthContext = React.createContext();

// // Create a provider component
// export const AuthProvider = ({children}) => {
//   const [userRole, setUserRole] = useState(null);
//   const [userData, setUserData] = useState(null);

//   return (
//     <AuthContext.Provider
//       value={{userRole, setUserRole, userData, setUserData}}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// contexts/AuthContext.js

import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const storeUserData = async user => {
    try {
      await AsyncStorage.setItem('userRole', user.role);
      await AsyncStorage.setItem('userData', JSON.stringify(user.data));
      setUserRole(user.role);
      setUserData(user.data);
    } catch (error) {
      console.error('Error storing user data', error);
    }
  };
  const retrieveUserData = async () => {
    try {
      const storedRole = await AsyncStorage.getItem('userRole');
      const storedData = await AsyncStorage.getItem('userData');

      if (storedRole !== null) {
        setUserRole(storedRole);
      }
      if (storedData !== null) {
        setUserData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error retrieving user data', error);
    }
  };
  useEffect(() => {
    retrieveUserData();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userRole');
      await AsyncStorage.removeItem('userData');
      setUserRole(null);
      setUserData(null);
    } catch (error) {
      console.error('Error clearing user data', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userRole,
        setUserRole: role => {
          setUserRole(role);
          AsyncStorage.setItem('userRole', role);
        },
        userData,
        setUserData: data => {
          setUserData(data);
          AsyncStorage.setItem('userData', JSON.stringify(data));
        },
        storeUserData,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
