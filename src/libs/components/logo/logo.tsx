import styles from "./logo.module.scss";

export const Logo: React.FC = () => {
	return <img src="/logo.png" className={styles.logo} alt="Logo" />;
};
