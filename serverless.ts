/* eslint-disable @typescript-eslint/naming-convention */

import { exampleDomain } from "./src/api/example-domain";

import { SERVICE_NAME } from "./src/config/index";

import { resources } from "./resources";

import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
	service: SERVICE_NAME,
	frameworkVersion: "2",
	useDotenv: true,
	package: {
		individually: true,
	},
	custom: {
		localstack: {
			host: "http://localstack",
			stages: ["local"]
		},
		ncc: {
			minify: true,
			excludeDependencies: true,
		}
	},
	plugins: ["serverless-vercel-ncc", "serverless-offline", "serverless-localstack"],
	provider: {
		name: "aws",
		runtime: "nodejs14.x",
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true,
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
			NODE_PATH: "./:/opt/node_modules",
			NODE_ENV: process.env.NODE_ENV!,
			DYNAMODB_REGION: process.env.DYNAMODB_REGION!,
			DYNAMODB_ENDPOINT: process.env.DYNAMODB_ENDPOINT!,
			DYNAMODB_ACCESS_KEY_ID: process.env.DYNAMODB_ACCESS_KEY_ID!,
			DYNAMODB_SECRET_ACCESS_KEY: process.env.DYNAMODB_SECRET_ACCESS_KEY!,
		},
		lambdaHashingVersion: "20201221",
		iamRoleStatements: [
			{
				Effect: "Allow",
				Action: [
					"dynamodb:*",
					"s3:*",
					"lambda:*",
				],
				Resource: "*"
			}
		],
	},
	layers: {
		NodeModules: {
			path: "layers/modules",
			name: "${self:service}-node-modules-${opt:stage, 'local'}",
			description: "Shared node modules",
			compatibleRuntimes: ["nodejs14.x"],
			package: {
				include: ["node_modules/**"]
			}
		}
	},
	resources,
	functions: {
		...exampleDomain
	} as any,
};

export = serverlessConfiguration;
