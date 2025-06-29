import  { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  const navigate = useNavigate();
  const { isAuthenticated, screenLoading } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if ( !screenLoading && !isAuthenticated) navigate("/login");
  }, [isAuthenticated,screenLoading]);

  return children;
};

export default ProtectedRoute;
