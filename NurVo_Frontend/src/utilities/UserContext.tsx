import React, { createContext, useState, useContext } from 'react';

interface UserContextType {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
}

const UserContext = createContext<UserContextType>({
  isLogged: false,
  setIsLogged: () => {},
});

export const UserProvider = ({ children }: any) => {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <UserContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
