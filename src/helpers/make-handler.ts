import { NestFactory } from "@nestjs/core";
import serverlessExpress from "@vendia/serverless-express";
import type { Handler } from "aws-lambda";

let cachedServer: Handler;

const isWarmUp = (event: any) => event.source === "serverless-plugin-warmup";

const bootstrap = async (module: any, version: string): Promise<Handler> => {
	const nestApp = await NestFactory.create(module);

	nestApp.enableCors();

	await nestApp.init();

	const expressApp = nestApp.getHttpAdapter().getInstance();

	return serverlessExpress({ app: expressApp });
};

export const makeHandler =
	(module: any, version: string): Handler =>
	async (event, context, callback) => {
		// https://github.com/vendia/serverless-express/issues/86
		event.path = event.pathParameters.proxy;

		if (isWarmUp(event)) {
			/**
			 * If it's an event to keep the lambda warm,
			 * return here to stop the lambda execution
			 * as soon as possible
			 */
			return;
		}

		if (!cachedServer) {
			// eslint-disable-next-line require-atomic-updates
			cachedServer = await bootstrap(module, version);
		}

		return cachedServer(event, context, callback);
	};
