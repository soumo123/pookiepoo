import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ user_id, children }) => {
  if (!user_id || user_id === "null" || user_id === "") {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default ProtectedRoute;