import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  user?: string
  children: ReactNode
}

const ProtectedRoute = ({ user = undefined, children }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to="/sign-in" replace />
  }

  return children
}

export default ProtectedRoute
