import type { Connection } from "@techmmunity/symbiosis-dynamodb";
import { APIGatewayProxyEvent, Context } from "aws-lambda";

import { StatusCodeEnum } from "../enums/status-code";
import { connect } from "../config/dynamodb";

import { Route, RouteOutput } from "../types/route";

const DEFAULT_HEADERS = {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	"Access-Control-Allow-Origin": "*",
};

export const makeController =
	(entities: Array<any>, func: Route) =>
	async (
		event: APIGatewayProxyEvent,
		context: Context,
	): Promise<RouteOutput> => {
		// Needs to have a default value, or TypeScript cries
		let connection = {} as Connection;

		try {
			connection = await connect(entities);

			const result = await func({
				event,
				context,
				connection,
			});

			await connection.close();

			return {
				...result,
				headers: {
					...DEFAULT_HEADERS,
					...(result.headers || {}),
				},
			};
		} catch (err: any) {
			if (connection.close) {
				await connection.close();
			}

			return {
				headers: DEFAULT_HEADERS,
				statusCode: err.statusCode || StatusCodeEnum.INTERNAL,
				body: JSON.stringify({
					error: err.message,
				}),
			};
		}
	};
