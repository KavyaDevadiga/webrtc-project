import React, { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const useUserData = () => {
  const userData = useContext(UserContext);
  return userData;
};

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
