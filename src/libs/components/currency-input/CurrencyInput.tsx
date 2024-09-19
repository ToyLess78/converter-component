interface CurrencyInputProps {
	id: string;
	placeholder: string;
	value: number;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
	id,
	placeholder,
	value,
	onChange,
}) => {
	return (
		<input
			type="number"
			id={id}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	);
};
