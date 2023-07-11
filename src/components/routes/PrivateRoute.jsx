import React from "react"
import { Route, Navigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

export default function PrivateRoute({ component: Component, to }) {
  const { currentUser } = useAuth()

  return currentUser ? <Component /> : <Navigate to={to}/>
}