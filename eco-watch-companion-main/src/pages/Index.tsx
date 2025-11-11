import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if no token, or dashboard if logged in
    const token = localStorage.getItem('token');
    navigate(token ? '/' : '/login');
  }, [navigate]);

  return null;
};

export default Index;
