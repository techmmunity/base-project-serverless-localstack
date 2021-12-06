/* eslint-disable @typescript-eslint/naming-convention */

import { exampleDomain } from "./src/api/example-domain";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { resources } from "./resources";

import { SERVICE_NAME } from "./src/config/index";

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
			stages: ["local"],
		},
		ncc: {
			minify: true,
			excludeDependencies: true,
		},
	},
	plugins: ["serverless-vercel-ncc", "serverless-localstack"],
	provider: {
		name: "aws",
		region: "us-east-1",
		runtime: "nodejs14.x",
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true,
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
			NODE_PATH: "./:/opt/node_modules",
			NODE_ENV: "${opt:stage, 'local'}",
			DYNAMODB_REGION: "${self:provider.region}",
		},
		lambdaHashingVersion: "20201221",
		iamRoleStatements: [
			{
				Effect: "Allow",
				Action: ["dynamodb:*", "s3:*", "lambda:*"],
				Resource: "*",
			},
		],
	},
	layers: {
		NodeModules: {
			path: "layers/modules",
			name: "${self:service}-node-modules-${opt:stage, 'local'}",
			description: "Shared node modules",
			compatibleRuntimes: ["nodejs14.x"],
			package: {
				include: ["node_modules/**"],
			},
		},
	},
	resources,
	functions: {
		...exampleDomain,
	} as any,
};

export = serverlessConfiguration;
