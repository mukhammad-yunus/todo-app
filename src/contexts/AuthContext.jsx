import React, { createContext, useContext, useEffect, useState } from "react";
import db, { auth } from "../../firebase.config";
import { doc, collection, setDoc, getDocs } from "@firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentUser, setCurrentUser] = useState();
  const [UserName, setUserName] = useState(false)
  const userDRef = collection(db, "users")

  async function addName(data) {
    try {
      if (currentUserId) {
        const nameRef = doc(userDRef, currentUserId);
        await setDoc(nameRef, data);
      } else {
        throw new Error("User not logged in");
      }
    } catch (error) {
      console.error("Error adding document:", error);
    }
  }

  async function logout() {
    await signOut(auth);
    setCurrentUser("")
    setCurrentUserId("")
  }
  
  // function resetPassword(email) {
  //   return auth.sendPasswordResetEmail(email);
  // }

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        setCurrentUserId(user.uid);
        setCurrentUser(user)
        localStorage.setItem("data", JSON.stringify(user))
      } else{
        setCurrentUserId("")
        localStorage.clear()
        setCurrentUser(false)
        setUserName("")
      }
    });
    
    return unsubscribe;
  }, []);
  
  useEffect(() => {
    async function getNameFromDB(){
      const data = await getDocs(userDRef)
      const names = data.docs.map(doc=>({
        ...doc.data(), id: doc.id
      }))
      const user = names.find(name=> name.id == currentUserId)
      setUserName(user)
    }
    if(currentUserId){
      getNameFromDB()
    }
  }, [currentUserId])
  
  const value = {
    currentUserId,
    addName,
    currentUser,
    logout,
    UserName
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
