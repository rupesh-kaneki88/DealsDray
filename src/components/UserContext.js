import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
export const UserContext = createContext (null);

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error ("useUserContext must be within a UserProvider")
    }

    return context
}
