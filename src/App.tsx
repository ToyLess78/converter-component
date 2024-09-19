import { useQuery } from "@tanstack/react-query";
import { useEffect, useReducer } from "react";
import reactLogo from "./assets/react.svg";
import { type CurrencyRate, getExchangeRates } from "./libs/api/api";
import { CurrencyField } from "./libs/components/components";
import { CurrencyCode } from "./libs/enums/enums";
import "./libs/styles/global.scss";

const SET_FROM_CURRENCY = "SET_FROM_CURRENCY";
const SET_TO_CURRENCY = "SET_TO_CURRENCY";
const SET_FROM_AMOUNT = "SET_FROM_AMOUNT";
const SET_TO_AMOUNT = "SET_TO_AMOUNT";
const SET_RATE = "SET_RATE";

interface State {
	fromCurrency: CurrencyCode;
	fromAmount: number;
	toCurrency: CurrencyCode;
	toAmount: number;
	rate: number;
}

const initialState: State = {
	fromCurrency: CurrencyCode.USD,
	fromAmount: 100,
	toCurrency: CurrencyCode.UAH,
	toAmount: 200,
	rate: 1,
};

type Action =
	| { type: typeof SET_FROM_CURRENCY; payload: CurrencyCode }
	| { type: typeof SET_TO_CURRENCY; payload: CurrencyCode }
	| { type: typeof SET_FROM_AMOUNT; payload: number }
	| { type: typeof SET_TO_AMOUNT; payload: number }
	| { type: typeof SET_RATE; payload: number };

const currencyConverterReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case SET_FROM_CURRENCY:
			return { ...state, fromCurrency: action.payload };
		case SET_TO_CURRENCY:
			return { ...state, toCurrency: action.payload };
		case SET_FROM_AMOUNT:
			return { ...state, fromAmount: action.payload };
		case SET_TO_AMOUNT:
			return { ...state, toAmount: action.payload };
		case SET_RATE:
			return { ...state, rate: action.payload };
		default:
			return state;
	}
};

const App: React.FC = () => {
	const [state, dispatch] = useReducer(currencyConverterReducer, initialState);

	const currencyOptions: CurrencyCode[] = [
		CurrencyCode.USD,
		CurrencyCode.EUR,
		CurrencyCode.UAH,
		CurrencyCode.CAD,
		CurrencyCode.CHF,
		CurrencyCode.ILS,
		CurrencyCode.JPY,
	];

	const { data: exchangeRates, isLoading, error } = useQuery<CurrencyRate[]>({
		queryKey: ["exchangeRates"],
		queryFn: getExchangeRates,
		select: (data) => {
			const currencySet = new Set(currencyOptions);
			return data.filter((rate) => currencySet.has(rate.cc as CurrencyCode));
		},
	});

	const convertCurrency = (reverseConversion: boolean = false) => {
		if (!exchangeRates) return;

		const fromCurrencyRate = exchangeRates.find((cc) => cc.cc === state.fromCurrency);
		const toCurrencyRate = exchangeRates.find((cc) => cc.cc === state.toCurrency);

		if (!fromCurrencyRate || !toCurrencyRate) return;

		const calculatedRate = fromCurrencyRate.rate / toCurrencyRate.rate;
		dispatch({ type: SET_RATE, payload: calculatedRate });

		const convertedAmount = reverseConversion
			? (state.toAmount / calculatedRate).toFixed(2)
			: (state.fromAmount * calculatedRate).toFixed(2);

		const actionType = reverseConversion ? SET_FROM_AMOUNT : SET_TO_AMOUNT;
		dispatch({ type: actionType, payload: Number(convertedAmount) });
	};

	useEffect(() => {
		convertCurrency(false);
	}, [state.fromCurrency, state.toCurrency, state.fromAmount, exchangeRates]);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error fetching exchange rates</div>;

	const handleSwap = () => {
		dispatch({ type: SET_FROM_CURRENCY, payload: state.toCurrency });
		dispatch({ type: SET_TO_CURRENCY, payload: state.fromCurrency });
		convertCurrency(false);
	};

	return (
		<div className="container">
			<div className="header">
				<div className="indent-right" />
				<b>Currency Converter</b>
			</div>
			<div>
				<a href="" target="_blank" rel="noreferrer">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<CurrencyField
				selectId="from-currency"
				inputId="from-amount"
				selectValue={state.fromCurrency}
				inputValue={state.fromAmount}
				onSelectChange={(e) =>
					dispatch({ type: SET_FROM_CURRENCY, payload: e.target.value as CurrencyCode })
				}
				onInputChange={(e) => {
					dispatch({ type: SET_FROM_AMOUNT, payload: Number(e.target.value) });
					convertCurrency(false);
				}}
				options={currencyOptions}
			/>

			<div className="swap-rate-container">
				<button className="btn" id="swap" onClick={handleSwap}>
					Swap
				</button>
				<div className="rate" id="rate">
					{`1 ${state.fromCurrency} = ${state.rate.toFixed(4)} ${state.toCurrency}`}
				</div>
			</div>

			<CurrencyField
				selectId="to-currency"
				inputId="to-amount"
				selectValue={state.toCurrency}
				inputValue={state.toAmount}
				onSelectChange={(e) =>
					dispatch({ type: SET_TO_CURRENCY, payload: e.target.value as CurrencyCode })
				}
				onInputChange={(e) => {
					dispatch({ type: SET_TO_AMOUNT, payload: Number(e.target.value) });
					convertCurrency(true);
				}}
				options={currencyOptions}
			/>
		</div>
	);
};

export default App;
