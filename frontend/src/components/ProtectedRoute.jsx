import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, redirectPath = "/", children }) => {
  if (!isAdmin) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
