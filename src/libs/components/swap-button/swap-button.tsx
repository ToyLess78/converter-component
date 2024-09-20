import styles from "./swap-button.module.scss";

interface SwapProps {
	onClick: () => void;
}

export const SwapButton: React.FC<SwapProps> = ({ onClick }) => {
	return (
		<button className={styles.swap} onClick={onClick}>
			&#10554;
			<br />
			&#10555;
		</button>
	);
};
