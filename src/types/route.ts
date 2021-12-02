import type { Connection } from "@techmmunity/symbiosis-dynamodb";
import type { APIGatewayProxyEvent, Context } from "aws-lambda";
import { StatusCodeEnum } from "../enums/status-code";

interface RouteInput {
	event: APIGatewayProxyEvent;
	context: Context;
	connection: Connection;
}

export interface RouteOutput {
	headers?: Record<string, any>;
	statusCode: StatusCodeEnum;
	body?: string;
}

export type Route = (p: RouteInput) => Promise<RouteOutput> | RouteOutput;
