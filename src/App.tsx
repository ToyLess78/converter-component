import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { CurrencyField } from "./libs/components/components.ts";
import "./libs/styles/global.scss";

const App: React.FC = () => {
	const [currencyOne, setCurrencyOne] = useState<string>("USD");
	const [amountOne, setAmountOne] = useState<number>(100);
	const [currencyTwo, setCurrencyTwo] = useState<string>("UAH");
	const [amountTwo, setAmountTwo] = useState<number>(200);

	const currencyOptions: string[] = ["USD", "EUR", "UAH", "CAD", "CHF", "ILS", "JPY"];

	return (
		<div className="container">
			<div className="header">
				<div className="indent-right"></div>
				<b>Currency Converter</b>
			</div>
			<div>
				<a href="https://react.dev" target="_blank" rel="noreferrer">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<CurrencyField
				selectId="currency-one"
				inputId="amount-one"
				selectValue={currencyOne}
				inputValue={amountOne}
				onSelectChange={(e) => setCurrencyOne(e.target.value)}
				onInputChange={(e) => setAmountOne(Number(e.target.value))}
				options={currencyOptions}
			/>

			<div className="swap-rate-container">
				<button className="btn" id="swap">
					{/* Swap button with SVG */}
				</button>
				<div className="rate" id="rate"></div>
			</div>

			<CurrencyField
				selectId="currency-two"
				inputId="amount-two"
				selectValue={currencyTwo}
				inputValue={amountTwo}
				onSelectChange={(e) => setCurrencyTwo(e.target.value)}
				onInputChange={(e) => setAmountTwo(Number(e.target.value))}
				options={currencyOptions}
			/>
		</div>
	);
};

export default App;
