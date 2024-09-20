import styles from "./logo.module.scss";

export const Logo: React.FC = () => {
	const logoPath = `${import.meta.env.VITE_BASE_URL || "/"}logo.png`;
	return <img src={logoPath} className={styles.logo} alt="Logo" />;
};
