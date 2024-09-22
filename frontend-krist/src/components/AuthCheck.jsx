import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userAuthStore } from "@/store/store";
import { decodeToken } from "@/utils/decodeToken";

function AuthChecker() {
  const { login, setLoading, clearError, setError } = userAuthStore(
    (state) => ({
      login: state.login,
      setLoading: state.setLoading,
      clearError: state.clearError,
      setError: state.setError,
    })
  );
  const navigate = useNavigate();

  useEffect(() => {
    clearError();
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const user = decodeToken(token);
        console.log("User: ", user);
        login(user);

        if (user?.role === "admin") {
          navigate("/dashboard-admin");
        } else {
          navigate("/");
        }
      } catch (e) {
        setError("Token invalido");
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }

    setLoading(false);
  }, [login, setLoading, clearError, setError, navigate]);

  return null;
}

export default AuthChecker;
