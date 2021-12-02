import { getHandlerPath } from "../../../helpers/get-handler-path";

export const getRoute = {
	handler: `${getHandlerPath(__dirname)}/controller.controller`,
	events: [
		{
			http: {
				cors: true,
				method: "GET",
				path: "example-domain/get-route",
			},
		},
	],
};
