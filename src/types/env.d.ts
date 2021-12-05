/* eslint-disable @typescript-eslint/naming-convention */

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "dev" | "homolog" | "production" | "test";
			LOCALSTACK_HOSTNAME?: string;
			AWS_DEFAULT_REGION: string;
			AWS_ACCESS_KEY_ID: string;
			AWS_SECRET_ACCESS_KEY: string;
		}
	}
}

/*
 * If this file has no import/export statements (i.e. is a script)
 * convert it into a module by adding an empty export statement.
 */
export {};
