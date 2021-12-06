/* eslint-disable @typescript-eslint/naming-convention */

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "dev" | "homolog" | "production" | "test";
			LOCALSTACK_HOSTNAME?: string;
			DYNAMODB_REGION: string;
			DYNAMODB_ACCESS_KEY_ID: string;
			DYNAMODB_SECRET_KEY_ID: string;
		}
	}
}

/*
 * If this file has no import/export statements (i.e. is a script)
 * convert it into a module by adding an empty export statement.
 */
export {};
