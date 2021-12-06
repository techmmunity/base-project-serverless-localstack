/**
 * This file cannot use absolute paths!
 */
import { getHandlerPath } from "../../../helpers/get-handler-path";
import { makeHandler } from "../../../helpers/make-handler";

export const someRoute = makeHandler({
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
});
