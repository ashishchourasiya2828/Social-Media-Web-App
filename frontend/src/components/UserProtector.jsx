import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserProtector = () => {
  const { user } = useSelector((state) => state.auth); // 🔹 Redux se user state le rahe hain

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default UserProtector;
