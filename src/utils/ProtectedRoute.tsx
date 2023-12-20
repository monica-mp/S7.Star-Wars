import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({
  canActivate,
  redirectPath = '/'
}: {
  canActivate: boolean
  redirectPath?: string | undefined
}): JSX.Element => {
  // If the user cannot access the route, redirect to the specified path
  if (!canActivate) {
    return <Navigate to={redirectPath} replace />
  }
  // If the user can access the route, render the route's content
  return <Outlet />
}

export default ProtectedRoute
