import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { LoadingPage } from "@/pages/LoadingPage/LoadingPage";

export const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setToken, setError } = useAuthStore();

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    const errorFromUrl = searchParams.get("error");

    if (errorFromUrl) {
      setError(`Login failed: ${errorFromUrl.replace(/_/g, " ")}`);
      navigate("/auth");
      return;
    }

    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      navigate("/");
    } else {
      setError("Authentication token not found in callback.");
      navigate("/auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <LoadingPage />;
};
