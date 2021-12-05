/* eslint-disable @typescript-eslint/naming-convention */

import type { AWS } from "@serverless/typescript";

export const resources: AWS["resources"] = {
	Resources: {
		Example: {
			Type: "AWS::DynamoDB::Table",
			DeletionPolicy: "Retain",
			Properties: {
				TableName:
					"${self:service}-example-${opt:stage, 'dev'}",
				AttributeDefinitions: [
					{
						AttributeName: "id",
						AttributeType: "S",
					},
				],
				KeySchema: [
					{
						AttributeName: "id",
						KeyType: "HASH",
					},
				],
				BillingMode: "PAY_PER_REQUEST",
			},
		},
	},
};
