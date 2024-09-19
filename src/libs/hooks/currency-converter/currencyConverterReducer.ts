import {
	SET_FROM_AMOUNT,
	SET_FROM_CURRENCY,
	SET_RATE,
	SET_TO_AMOUNT,
	SET_TO_CURRENCY,
} from "../../constants/actions";
import { CurrencyCode } from "../../enums/enums";

interface State {
	fromCurrency: CurrencyCode;
	fromAmount: number;
	toCurrency: CurrencyCode;
	toAmount: number;
	rate: number;
}

type Action =
	| { type: typeof SET_FROM_CURRENCY; payload: CurrencyCode }
	| { type: typeof SET_TO_CURRENCY; payload: CurrencyCode }
	| { type: typeof SET_FROM_AMOUNT; payload: number }
	| { type: typeof SET_TO_AMOUNT; payload: number }
	| { type: typeof SET_RATE; payload: number };

export const initialState: State = {
	fromCurrency: CurrencyCode.USD,
	fromAmount: 100,
	toCurrency: CurrencyCode.UAH,
	toAmount: 200,
	rate: 1,
};

export const currencyConverterReducer = (
	state: State,
	action: Action,
): State => {
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
