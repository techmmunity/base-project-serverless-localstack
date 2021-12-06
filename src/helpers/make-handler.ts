/* eslint-disable capitalized-comments */
/* eslint-disable multiline-comment-style */

import { HttpEvent, Lambda } from "../types/aws";

interface Config {
	authorized?: boolean;
}

export const makeHandler = (handler: Lambda, config?: Config): Lambda => {
	handler.events?.forEach(event => {
		const httpEvent = event as HttpEvent;

		if (httpEvent.http) {
			// Set cors
			httpEvent.http.cors = true;

			// Set only-authenticated route
			if (config?.authorized) {
				httpEvent.http.authorizer = "aws_iam";
			}
		}
	});

	return {
		...handler,
		/**
		 * Only apply layers on production,
		 * because only LocalStack PRO supports layers
		 */
		layers: [
			{
				// eslint-disable-next-line @typescript-eslint/naming-convention
				Ref: "NodeModulesLambdaLayer",
			},
		],
	};
};
