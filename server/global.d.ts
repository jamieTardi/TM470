declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT?: string;
			NODE_ENV: 'development' | 'production';
			MONGO_URI: string;
			TOKEN_SECRET: string;
		}
		interface Response {
			sendStatus: number;
		}
		interface Request {
			tokenData: any;
		}
	}
}

export {};
