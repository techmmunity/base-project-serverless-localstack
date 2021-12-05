/* eslint-disable @typescript-eslint/naming-convention */

import { exampleDomain } from "./src/api/example-domain";

import { SERVICE_NAME } from "./src/config/index";

import { resources } from "./resources";

import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
	service: SERVICE_NAME,
	frameworkVersion: "2",
	variablesResolutionMode: "20210326",
	useDotenv: true,
	package: {
		individually: true,
	},
	custom: {
		localstack: {
			host: "http://localstack:4566",
			stages: ["dev"]
		},
		ncc: {
			minify: true,
			excludeDependencies: true,
		}
	},
	plugins: ["serverless-vercel-ncc", "serverless-localstack"],
	provider: {
		name: "aws",
		runtime: "nodejs14.x",
		lambdaHashingVersion: "20201221",
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true,
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
			NODE_PATH: "./:/opt/node_modules",
			NODE_ENV: "${opt:stage, 'dev'}}",
			AWS_DEFAULT_REGION: "${ssm:${self:service}-region-${opt:stage, 'dev'}}",
			AWS_ACCESS_KEY_ID: "${ssm:${self:service}-accessKey-${opt:stage, 'dev'}}",
			AWS_SECRET_ACCESS_KEY: "${ssm:${self:service}-secretKey-${opt:stage, 'dev'}}",
		},
		iamRoleStatements: [
			{
				Effect: "Allow",
				Action: [
					"dynamodb:*",
					"s3:*",
					"lambda:*",
					"ssm:GetParameter",
				],
				Resource: "*"
			}
		],
	},
	layers: {
		NodeModules: {
			path: "layers/modules",
			name: "${self:service}-node-modules-${opt:stage, 'dev'}",
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
