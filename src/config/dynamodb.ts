import { Connection } from "@techmmunity/symbiosis-dynamodb";

const {
	LOCALSTACK_HOSTNAME,
	DYNAMODB_REGION,
	DYNAMODB_ENDPOINT,
	DYNAMODB_ACCESS_KEY_ID,
	DYNAMODB_SECRET_KEY_ID,
} = process.env;

export const connect = async (entities: Array<any>) => {
	const connection = new Connection({
		entities,
		logging: "ALL_INTERNAL",
		namingStrategy: {
			entity: "kebab-case",
			column: "camelCase",
		},
		databaseConfig: {
			region: DYNAMODB_REGION,
			endpoint: LOCALSTACK_HOSTNAME
				? `http://${LOCALSTACK_HOSTNAME}:4566`
				: DYNAMODB_ENDPOINT,
			credentials: {
				accessKeyId: DYNAMODB_ACCESS_KEY_ID,
				secretAccessKey: DYNAMODB_SECRET_KEY_ID,
			},
		},
	});

	await connection.load();
	await connection.connect();

	return connection;
};
