import { FiLoader } from "react-icons/fi";
import styles from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={styles.container}>
      <FiLoader className={styles.loader} />
    </div>
  );
};
