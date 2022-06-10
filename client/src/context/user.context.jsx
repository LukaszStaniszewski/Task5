import { createContext, useState, useContext } from "react";
import * as api from "../api/axios-Instance.api"

const logInUser = async () => {
  try {
    const loggedUser = await api.fetchAuthUser()
    return loggedUser.data
  } catch (error) {
    console.error(error)
  }
}

export const UserContext = createContext({
    user: null,
    setUser: () => null,
    setMessage: () => {},
    authenticateAndSetUser: () => null,
    isLoading: false,
    setLoading: () => null,
});

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(false)
    
    const authenticateAndSetUser = async () => {
      let token = localStorage.getItem("token")
      if(!token) return setUser(null)
      
      const user = await logInUser()
      setUser(user)
    }
    
    const value = {user, setUser, isLoading , authenticateAndSetUser, setLoading}
    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
} 

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("UserContext was used outside of its Provider");
  }
  return context;
};