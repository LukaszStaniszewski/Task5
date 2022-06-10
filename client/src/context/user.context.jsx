import { createContext, useState, useContext, useEffect } from "react";
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
    setUsersNames: () => {},
    usersNames: []
});

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [usersNames, setUsersNames] = useState([null]);
    const [isLoading, setLoading] = useState(true)
    
    const authenticateAndSetUser = async () => {
      let token = localStorage.getItem("token")
      if(!token) return setUser(null)
      
      const user = await logInUser()
      setUser(user)
    }

    useEffect(() => {
      (async () => {
        try {
          setLoading(true)
          const names = await api.fetchUserNames()
          setUsersNames(names.data)
          console.log(names)
          setLoading(false)  
        } catch (error) {
          setLoading(false)
          console.error(error)
        }
      })()
    }, [])
    
    const value = {user, setUser, isLoading , authenticateAndSetUser, setLoading, usersNames}
    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
} 

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("UserContext was used outside of its Provider");
  }
  return context;
};