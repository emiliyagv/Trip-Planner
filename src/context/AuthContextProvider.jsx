import React, { useEffect, useState } from 'react'
import { useContext, createContext } from 'react'
import {auth} from '../config/firebase-config'
import {GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'

const AuthContext = createContext()


export const AuthContextProvider = ({children}) => {

  const [user, setUser] = useState({})
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if(currentUser) setUser(currentUser)
   else{setUser(null)}
  })
  return () => {
  unsubscribe();
  }
},[])
  
  return (
      <AuthContext.Provider value={{ user }}>
        { children}
      </AuthContext.Provider>
    );
}

export default AuthContextProvider
export { AuthContext };
export const UserAuth = () => {
    return useContext(AuthContext)
}