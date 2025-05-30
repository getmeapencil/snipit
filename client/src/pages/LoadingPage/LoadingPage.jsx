import { Loader } from "@/components/Loader/Loader";
import styles from "./LoadingPage.module.css";

export const LoadingPage = () => {
  return (
    <div className={styles.container}>
      <Loader />
    </div>
  );
};
