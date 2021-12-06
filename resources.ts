/* eslint-disable multiline-comment-style */
/* eslint-disable @typescript-eslint/naming-convention */

import type { AWS } from "@serverless/typescript";

/**
 *
 * Should be transferred to another project,
 * because the resources created here can be shared
 * between projects.
 *
 */
const globalResources: AWS["resources"] = {
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
				UserPoolName: "${self:service}-userPool-${opt:stage, 'local'}",
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
				// DeviceConfiguration: {
				// 	ChallengeRequiredOnNewDevice: true,
				// },
				// EmailConfiguration: {
				// 	// TODO
				// 	// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cognito-userpool-emailconfiguration.html
				// },
				// Schema: {
				// 	// TODO
				// 	// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cognito-userpool-schemaattribute.html
				// },
				// VerificationMessageTemplate: {
				// 	// TODO
				// 	// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cognito-userpool-verificationmessagetemplate.html
				// },
			},
		},
		// Public pool, so the user can login
		CognitoUserPoolClient: {
			Type: "AWS::Cognito::UserPoolClient",
			Properties: {
				UserPoolId: {
					Ref: "CognitoUserPool",
				},
				ClientName: "${self:service}-userPoolClient-${opt:stage, 'local'}",
				GenerateSecret: false,
				AllowedOAuthFlows: ["code"],
				AllowedOAuthScopes: ["phone", "email"],
				SupportedIdentityProviders: ["COGNITO"],
			},
		},
		// Identity pool, to control user permissions
		// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-identitypool.html
		CognitoIdentityPool: {
			Type: "AWS::Cognito::IdentityPool",
			Properties: {
				IdentityPoolName: "${self:service}-identityPool-${opt:stage, 'local'}",
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
		// Cognito Roles
		// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-identitypoolroleattachment.html
		CognitoIdentityPoolRoles: {
			Type: "AWS::Cognito::IdentityPoolRoleAttachment",
			Properties: {
				IdentityPoolId: {
					Ref: "CognitoIdentityPool",
				},
				Roles: {
					authenticated: {
						"Fn::GetAtt": ["CognitoAuthRole", "Arn"],
					},
					unauthenticated: {
						"Fn::GetAtt": ["CognitoUnauthRole", "Arn"],
					},
				},
			},
		},

		/**
		 *
		 * IAM
		 *
		 */

		CognitoAuthRole: {
			Type: "AWS::IAM::Role",
			Properties: {
				RoleName: "${self:service}-cognitoAuthRole-${opt:stage, 'local'}",
				Path: "/",
				AssumeRolePolicyDocument: {
					Version: "2012-10-17",
					Statement: [
						{
							Effect: "Allow",
							Principal: {
								Federated: "cognito-identity.amazonaws.com",
							},
							Action: "sts:AssumeRoleWithWebIdentity",
							Condition: {
								"StringEquals": {
									"cognito-identity.amazonaws.com:aud": {
										Ref: "CognitoIdentityPool",
									},
								},
								"ForAnyValue:StringLike": {
									"cognito-identity.amazonaws.com:amr": "authenticated",
								},
							},
						},
					],
				},
				Policies: [
					{
						PolicyName: "CognitoAuthorizedPolicy",
						PolicyDocument: {
							Version: "2012-10-07",
							Statement: [
								{
									Effect: "Allow",
									Action: [
										"mobileanalytics:PutEvents",
										"cognito-sync:*",
										"cognito-identity:*",
									],
									Resource: "*",
								},
								{
									Effect: "Allow",
									Action: ["execute-api:Invoke"],
									Resource: "*",
								},
							],
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
		UserPoolClientId: {
			Value: {
				Ref: "CognitoUserPoolClient",
			},
		},
	},
};

/**
 *
 * Project-specific config, this should stay here
 *
 */
const localResources: AWS["resources"] = {
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
	Outputs: {},
};

export const resources: AWS["resources"] = {
	Resources: {
		...globalResources.Resources,
		...localResources.Resources,
	},
	Outputs: {
		...globalResources.Outputs,
		...localResources.Outputs,
	},
};
