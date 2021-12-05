/* eslint-disable capitalized-comments */
/* eslint-disable multiline-comment-style */

import { Lambda } from "types/aws";

export const makeHandler = (handler: Lambda): Lambda => ({
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
});
