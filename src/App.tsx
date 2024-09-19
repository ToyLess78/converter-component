import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { type CurrencyRate, getExchangeRates } from "./libs/api/api";
import { CurrencyField } from "./libs/components/components";
import "./libs/styles/global.scss";
import { CurrencyCode } from "./libs/enums/enums";

const App: React.FC = () => {
	const [fromCurrency, setFromCurrency] = useState<string>(CurrencyCode.USD);
	const [fromAmount, setFromAmount] = useState<number>(100);
	const [toCurrency, setToCurrency] = useState<string>(CurrencyCode.UAH);
	const [toAmount, setToAmount] = useState<number>(200);
	const [rate, setRate] = useState<number>(1);

	const currencyOptions: CurrencyCode[] = [
		CurrencyCode.USD,
		CurrencyCode.EUR,
		CurrencyCode.UAH,
		CurrencyCode.CAD,
		CurrencyCode.CHF,
		CurrencyCode.ILS,
		CurrencyCode.JPY,
	];

	const {
		data: exchangeRates,
		isLoading,
		error,
	} = useQuery<CurrencyRate[]>({
		queryKey: ["exchangeRates"],
		queryFn: getExchangeRates,
		select: (data) => {
			const currencySet = new Set(currencyOptions);
			return data.filter((rate) => currencySet.has(rate.cc as CurrencyCode));
		},
	});

	const converter = (isReversed = false) => {
		if (!exchangeRates) return;

		const fromCurrencyRate = exchangeRates.find((cc) => cc.cc === fromCurrency);
		const toCurrencyRate = exchangeRates.find((cc) => cc.cc === toCurrency);

		if (!fromCurrencyRate || !toCurrencyRate) return;

		const currentRate = fromCurrencyRate.rate / toCurrencyRate.rate;
		setRate(currentRate);

		if (isReversed) {
			setFromAmount((toAmount / currentRate).toFixed(2) as unknown as number);
		} else {
			setToAmount((fromAmount * currentRate).toFixed(2) as unknown as number);
		}
	};

	useEffect(() => {
		converter(false);
	}, [fromCurrency, toCurrency, fromAmount, exchangeRates]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error fetching exchange rates</div>;
	}

	const handleSwap = () => {
		const tempCurrency = fromCurrency;
		setFromCurrency(toCurrency);
		setToCurrency(tempCurrency);
		converter(false);
	};

	return (
		<div className="container">
			<div className="header">
				<div className="indent-right" />
				<b>Currency Converter</b>
			</div>
			<div>
				<a href="https://react.dev" target="_blank" rel="noreferrer">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<CurrencyField
				selectId="from-currency"
				inputId="from-amount"
				selectValue={fromCurrency}
				inputValue={fromAmount}
				onSelectChange={(e) => setFromCurrency(e.target.value)}
				onInputChange={(e) => {
					setFromAmount(Number(e.target.value));
					converter(false);
				}}
				options={currencyOptions}
			/>

			<div className="swap-rate-container">
				<button className="btn" id="swap" onClick={handleSwap}>
					Swap
				</button>
				<div className="rate" id="rate">
					{`1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`}
				</div>
			</div>

			<CurrencyField
				selectId="to-currency"
				inputId="to-amount"
				selectValue={toCurrency}
				inputValue={toAmount}
				onSelectChange={(e) => setToCurrency(e.target.value)}
				onInputChange={(e) => {
					setToAmount(Number(e.target.value));
					converter(true);
				}}
				options={currencyOptions}
			/>
		</div>
	);
};

export default App;
