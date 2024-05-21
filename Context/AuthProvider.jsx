import React, { createContext, useContext, useState } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState([]);
    const [userID, setUserID] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const loginUser = async (apiKey, token) => {
      try {
        setUserInfo({apiKey, token});
        const response = await fetch(`https://api.trello.com/1/tokens/${token}?key=${apiKey}&token=${token}`);
        const data = await response.json();
        setUserID(data.idMember);
        setLoggedIn(true);
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <AuthContext.Provider
        value={{
            userInfo,
            setUserInfo,
            userID,
            setUserID,
            loggedIn,
            setLoggedIn,
            loginUser
              }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const AuthState = () => {
    return useContext(AuthContext);
  };
  
  export default AuthProvider;