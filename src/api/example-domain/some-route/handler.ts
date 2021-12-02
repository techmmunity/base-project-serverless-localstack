import { getHandlerPath } from "../../../helpers/get-handler-path";

export const someRoute = {
	handler: `${getHandlerPath(__dirname)}/controller.controller`,
	events: [
		{
			http: {
				cors: true,
				method: "GET",
				path: "example-domain/some-route",
			},
		},
	],
};
