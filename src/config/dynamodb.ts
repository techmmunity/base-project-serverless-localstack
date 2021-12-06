import { Connection } from "@techmmunity/symbiosis-dynamodb";
import { camelizeFirst } from "utils/string/camelize-first";
import { SERVICE_NAME } from "config";

const { NODE_ENV, LOCALSTACK_HOSTNAME, DYNAMODB_REGION } = process.env;
const isPrd = NODE_ENV === "production";

export const connect = async (entities: Array<any>) => {
	const connection = new Connection({
		entities,
		logging: "ALL_INTERNAL",
		namingStrategy: {
			entity: "kebab-case",
			column: "camelCase",
		},
		prefix: {
			entity: {
				add: camelizeFirst(SERVICE_NAME),
			},
		},
		suffix: {
			entity: {
				add: isPrd ? "Production" : "Local",
				remove: "Entity",
			},
		},
		databaseConfig: {
			region: DYNAMODB_REGION,
			endpoint: LOCALSTACK_HOSTNAME
				? `http://${LOCALSTACK_HOSTNAME}:4566`
				: undefined,
		},
	});

	await connection.load();

	if (process.env.NODE_ENV !== "production") {
		await connection.validate();
	}

	await connection.connect();

	return connection;
};
