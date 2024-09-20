import { ExceptionMessage } from "../../enums/enums";

export interface CurrencyRate {
	txt: string;
	rate: number;
	cc: string;
}

interface ExchangeRateApiResponse {
	txt: string;
	rate: number;
	cc: string;
	r030?: number;
	exchangedate?: string;
}

export const getExchangeRates = async (): Promise<CurrencyRate[]> => {
	const response = await fetch(
		"https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json",
	);
	if (!response.ok) {
		throw new Error(ExceptionMessage.FailedToFetchExchangeRates);
	}

	const data: ExchangeRateApiResponse[] = await response.json();
	return [
		{ txt: "гривна", rate: 1, cc: "UAH" },
		...data.map((rate) => ({
			txt: rate.txt,
			rate: rate.rate,
			cc: rate.cc,
		})),
	];
};
