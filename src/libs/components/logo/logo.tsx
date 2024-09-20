import logo from "../../../../public/logo.png";
import styles from "./logo.module.scss";

export const Logo: React.FC = () => {
	return <img src={logo} className={styles.logo} alt="Logo" />;
};
