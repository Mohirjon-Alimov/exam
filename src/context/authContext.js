import { createContext, useState } from "react";

export const AuthContext = createContext();

export const Auth = ({children})=> {
  const localData = window.localStorage.getItem('token');
  const [token, setToken] = useState(localData || '');
  return (
    <AuthContext.Provider value={{token, setToken}}>
    {children}
    </AuthContext.Provider>
  )
}