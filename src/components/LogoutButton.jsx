import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log("Error logging out:", error.message);
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleLogout}>
      تسجيل الخروج
    </button>
  );
};

export default LogoutButton;
