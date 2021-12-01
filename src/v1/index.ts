import { getHandlerPath } from "../helpers/get-handler-path";

export const v1 = {
	handler: `${getHandlerPath(__dirname)}/handler.handler`,
	events: [
		{
			http: {
				cors: true,
				method: "any",
				path: "/",
			},
		},
		{
			http: {
				cors: true,
				method: "any",
				path: "{proxy+}",
			},
		},
	],
};
