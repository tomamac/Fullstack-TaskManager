import { Navigate } from "react-router";

function ProtectedRoute({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/" replace/>;
}

export default ProtectedRoute;
