import { useEffect, useReducer } from "react";
import type { CurrencyRate } from "../../api/api";
import {
	SET_FROM_AMOUNT,
	SET_FROM_CURRENCY,
	SET_RATE,
	SET_TO_AMOUNT,
	SET_TO_CURRENCY,
} from "../../constants/actions";
import {
	currencyConverterReducer,
	initialState,
} from "./currencyConverterReducer";

export const useCurrencyConverter = (
	exchangeRates: CurrencyRate[] | undefined,
) => {
	const [state, dispatch] = useReducer(currencyConverterReducer, initialState);

	const convertCurrency = (reverseConversion = false) => {
		if (!exchangeRates) return;

		const fromCurrencyRate = exchangeRates.find(
			(cc) => cc.cc === state.fromCurrency,
		);
		const toCurrencyRate = exchangeRates.find(
			(cc) => cc.cc === state.toCurrency,
		);

		if (!fromCurrencyRate || !toCurrencyRate) return;

		const calculatedRate = fromCurrencyRate.rate / toCurrencyRate.rate;
		dispatch({ type: SET_RATE, payload: calculatedRate });

		const convertedAmount = reverseConversion
			? (state.toAmount / calculatedRate).toFixed(2)
			: (state.fromAmount * calculatedRate).toFixed(2);

		const actionType = reverseConversion ? SET_FROM_AMOUNT : SET_TO_AMOUNT;
		dispatch({ type: actionType, payload: Number(convertedAmount) });
	};

	const handleSwap = () => {
		dispatch({ type: SET_FROM_CURRENCY, payload: state.toCurrency });
		dispatch({ type: SET_TO_CURRENCY, payload: state.fromCurrency });
		convertCurrency(false);
	};

	useEffect(() => {
		convertCurrency(false);
	}, [state.fromCurrency, state.toCurrency, state.fromAmount, exchangeRates]);

	return {
		state,
		dispatch,
		convertCurrency,
		handleSwap,
	};
};
