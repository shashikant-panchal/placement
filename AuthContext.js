// contexts/AuthContext.js

import React, { useState } from 'react';

// Create the context
export const AuthContext = React.createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  return (
    <AuthContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};
