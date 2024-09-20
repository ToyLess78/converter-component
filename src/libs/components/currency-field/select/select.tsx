interface CurrencySelectProps {
	id: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	options: string[];
}

export const Select: React.FC<CurrencySelectProps> = ({
	id,
	value,
	onChange,
	options,
}) => {
	return (
		<select id={id} value={value} onChange={onChange}>
			<option className="select-placeholder" disabled>
				Select currency
			</option>
			{options.map((currency) => (
				<option key={currency} value={currency}>
					{currency}
				</option>
			))}
		</select>
	);
};
