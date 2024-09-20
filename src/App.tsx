import { useQuery } from "@tanstack/react-query";
import { type CurrencyRate, getExchangeRates } from "./libs/api/api";
import {
	CurrencyField,
	Footer,
	Header,
	Logo,
	SwapButton,
} from "./libs/components/components";
import {
	SET_FROM_AMOUNT,
	SET_FROM_CURRENCY,
	SET_TO_AMOUNT,
	SET_TO_CURRENCY,
} from "./libs/constants/actions";
import { currencyOptions } from "./libs/constants/currency-options";
import type { CurrencyCode } from "./libs/enums/enums";
import { useCurrencyConverter } from "./libs/hooks/hooks";
import "./libs/styles/global.scss";

const App: React.FC = () => {
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

	const { state, dispatch, convertCurrency, handleSwap } =
		useCurrencyConverter(exchangeRates);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error fetching exchange rates</div>;

	return (
		<>
			<Header
				rateText={`1 ${state.fromCurrency} = ${state.rate.toFixed(2)} ${state.toCurrency}`}
			/>
			<Logo />
			<CurrencyField
				selectId="from-currency"
				inputId="from-amount"
				selectValue={state.fromCurrency}
				inputValue={state.fromAmount}
				onSelectChange={(e) =>
					dispatch({
						type: SET_FROM_CURRENCY,
						payload: e.target.value as CurrencyCode,
					})
				}
				onInputChange={(e) => {
					dispatch({ type: SET_FROM_AMOUNT, payload: Number(e.target.value) });
					convertCurrency(false);
				}}
				options={currencyOptions}
			/>

			<SwapButton onClick={handleSwap} />

			<CurrencyField
				selectId="to-currency"
				inputId="to-amount"
				selectValue={state.toCurrency}
				inputValue={state.toAmount}
				onSelectChange={(e) =>
					dispatch({
						type: SET_TO_CURRENCY,
						payload: e.target.value as CurrencyCode,
					})
				}
				onInputChange={(e) => {
					dispatch({ type: SET_TO_AMOUNT, payload: Number(e.target.value) });
					convertCurrency(true);
				}}
				options={currencyOptions}
			/>
			<Footer />
		</>
	);
};

export default App;
