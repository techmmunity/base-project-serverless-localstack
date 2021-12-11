/* eslint-disable multiline-comment-style */
/* eslint-disable @typescript-eslint/naming-convention */

import type { AWS } from "@serverless/typescript";

export const resources: AWS["resources"] = {
	Resources: {
		ExampleTable: {
			Type: "AWS::DynamoDB::Table",
			Properties: {
				TableName: "${self:service}-example-${opt:stage, 'local'}",
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
