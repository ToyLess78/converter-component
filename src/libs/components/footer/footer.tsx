import styles from "./footer.module.scss";

export const Footer: React.FC = () => {
	return (
		<footer className={styles.footer}>
			<a href="https://github.com/ToyLess78" target="_blank" rel="noreferrer">
				© {new Date().getFullYear()} ToyLess78
			</a>
		</footer>
	);
};
