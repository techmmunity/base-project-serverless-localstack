/* eslint-disable @typescript-eslint/naming-convention */

import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
	service: "globals-${opt:stage, 'local'}",
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
	},
	plugins: ["serverless-localstack"],
	provider: {
		name: "aws",
		region: "us-east-1",
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
			DYNAMODB_REGION: "${self:provider.region}",
		},
	},
	resources: {
		Resources: {
			/**
			 * Cognito
			 *
			 * https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/AWS_Cognito.html
			 * https://developandgo.com/configure-aws-cognito-with-serverless-framework
			 * http://www.andyfrench.info/2018/10/aws-cognito-integration-with-lambda.html
			 * https://www.serverless.com/framework/docs/providers/aws/events/apigateway/#share-api-gateway-and-api-resources
			 * https://www.serverless.com/framework/docs/providers/aws/events/apigateway#http-endpoints-with-operationid
			 * https://www.youtube.com/watch?v=4QwWY9Fg4p4
			 * https://www.youtube.com/watch?v=r1P_glQGvfo
			 * https://www.youtube.com/watch?v=oFSU6rhFETk
			 */

			CognitoUserPool: {
				Type: "AWS::Cognito::UserPool",
				Properties: {
					UserPoolName: "userPool-${opt:stage, 'local'}",
					EnabledMfas: ["SOFTWARE_TOKEN_MFA"],
					MfaConfiguration: "OPTIONAL",
					UsernameAttributes: ["email", "phone_number"],
					AutoVerifiedAttributes: ["email", "phone_number"],
					AccountRecoverySetting: {
						RecoveryMechanisms: [
							{
								Name: "verified_email",
								Priority: 1,
							},
							{
								Name: "verified_phone_number",
								Priority: 2,
							},
						],
					},
					/*
					 * DeviceConfiguration: {
					 * 	ChallengeRequiredOnNewDevice: true,
					 * },
					 * EmailConfiguration: {
					 * 	// TODO
					 * 	// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cognito-userpool-emailconfiguration.html
					 * },
					 * Schema: {
					 * 	// TODO
					 * 	// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cognito-userpool-schemaattribute.html
					 * },
					 * VerificationMessageTemplate: {
					 * 	// TODO
					 * 	// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cognito-userpool-verificationmessagetemplate.html
					 * },
					 */
				},
			},
			// Public pool, so the user can login
			CognitoUserPoolClient: {
				Type: "AWS::Cognito::UserPoolClient",
				Properties: {
					UserPoolId: {
						Ref: "CognitoUserPool",
					},
					ClientName: "userPoolClient-${opt:stage, 'local'}",
					GenerateSecret: false,
					AllowedOAuthFlows: ["code"],
					AllowedOAuthScopes: ["phone", "email"],
					SupportedIdentityProviders: ["COGNITO"],
				},
			},
			/*
			 * Identity pool, to control user permissions
			 * https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-identitypool.html
			 */
			CognitoIdentityPool: {
				Type: "AWS::Cognito::IdentityPool",
				Properties: {
					IdentityPoolName: "identityPool-${opt:stage, 'local'}",
					AllowUnauthenticatedIdentities: false,
					CognitoIdentityProviders: [
						{
							ClientId: {
								Ref: "CognitoUserPoolClient",
							},
							ProviderName: {
								"Fn::GetAtt": ["CognitoUserPool", "ProviderName"],
							},
						},
					],
				},
			},
		},
		Outputs: {
			UserPoolId: {
				Value: {
					Ref: "CognitoUserPool",
				},
			},
			UserPoolArn: {
				Value: {
					"Fn:GetAtt": ["CognitoUserPool", "Arn"],
				},
				Export: {
					Name: "CognitoUserPool:Arn",
				},
			},
			UserPoolClientId: {
				Value: {
					Ref: "CognitoUserPoolClient",
				},
			},
		},
	},
};

export = serverlessConfiguration;
