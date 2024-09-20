import styles from "./header.module.scss";

interface HeaderProps {
	rateText: string;
}

export const Header: React.FC<HeaderProps> = ({ rateText }) => {
	return (
		<header className={styles.header}>
			<h2>{rateText}</h2>
		</header>
	);
};
