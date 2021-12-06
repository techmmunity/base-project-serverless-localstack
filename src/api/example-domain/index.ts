import { hello } from "./hello/handler";
import { someRoute } from "./some-route/handler";
import { getRoute } from "./get-route/handler";

export const exampleDomain = {
	exampleDomainHello: hello,
	exampleDomainSomeRoute: someRoute,
	exampleDomainGetRoute: getRoute,
};
