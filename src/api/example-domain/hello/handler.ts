import { getHandlerPath } from "../../../helpers/get-handler-path";

export const hello = {
	handler: `${getHandlerPath(__dirname)}/controller.controller`,
	events: [
		{
			http: {
				cors: true,
				method: "GET",
				path: "hello",
			},
		},
	],
};
