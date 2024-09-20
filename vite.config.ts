import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());

	return {
		plugins: [react()],
		base: "/converter-component/",
		define: {
			"process.env": {
				VITE_API_EXCHANGE_RATES_URL: env.VITE_API_EXCHANGE_RATES_URL,
			},
		},
	};
});
