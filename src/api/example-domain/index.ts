import { hello } from "./hello/handler";
import { someRoute } from "./some-route/handler";
import { getRoute } from "./get-route/handler";

import type { AWS } from "@serverless/typescript";

export const exampleDomain: AWS["functions"] = {
	exampleDomainHello: hello,
	exampleDomainSomeRoute: someRoute,
	exampleDomainGetRoute: getRoute,
};
