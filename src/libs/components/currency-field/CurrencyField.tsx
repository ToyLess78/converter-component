import { CurrencyInput } from "../currency-input/CurrencyInput";
import { CurrencySelect } from "../currency-select/CurrencySelect";

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
		<div className="currency">
			<CurrencySelect
				id={selectId}
				value={selectValue}
				onChange={onSelectChange}
				options={options}
			/>
			<CurrencyInput
				id={inputId}
				placeholder="200"
				value={inputValue}
				onChange={onInputChange}
			/>
		</div>
	);
};
