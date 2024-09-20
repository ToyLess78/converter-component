import styles from "./currency-field.module.scss";
import { Input } from "./input/input";
import { Select } from "./select/select";

interface CurrencyFieldProps {
	selectId: string;
	inputId: string;
	selectValue: string;
	inputValue: number;
	onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	options: string[];
}

export const CurrencyField: React.FC<CurrencyFieldProps> = ({
	selectId,
	inputId,
	selectValue,
	inputValue,
	onSelectChange,
	onInputChange,
	options,
}) => {
	return (
		<div className={styles.currency}>
			<Select
				id={selectId}
				value={selectValue}
				onChange={onSelectChange}
				options={options}
			/>
			<Input
				id={inputId}
				placeholder="200"
				value={inputValue}
				onChange={onInputChange}
			/>
		</div>
	);
};
