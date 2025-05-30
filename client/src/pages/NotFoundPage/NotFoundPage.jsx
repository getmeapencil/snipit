import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export const NotFoundPage = () => {
  const [redirectTimer, setRedirectTimer] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setRedirectTimer((prev) => prev - 1);
    }, 1000);

    if (redirectTimer <= 0) {
      navigate("/");
    }

    return () => clearInterval(timer);
  }, [redirectTimer, navigate]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.subtitle}>
        Redirecting to home page in {redirectTimer} seconds
      </p>
    </div>
  );
};
