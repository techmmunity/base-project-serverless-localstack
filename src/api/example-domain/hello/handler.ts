/**
 * This file cannot use absolute paths!
 */
import { makeHandler } from "../../../helpers/make-handler";
import { getHandlerPath } from "../../../helpers/get-handler-path";

export const hello = makeHandler({
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
});
