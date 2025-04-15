// components/PublicRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ user_id, children }) => {
    const location = useLocation();
    if (user_id && user_id !== "null" && user_id !== "") {
        return <Navigate to="/" replace state={{ from: location }} />;
      }
  return children;
};

export default PublicRoute;
