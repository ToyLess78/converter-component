interface InputProps {
	id: string;
	placeholder: string;
	value: number;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
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
			min="0"
		/>
	);
};
