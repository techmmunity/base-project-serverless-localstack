import { hello } from "./hello/handler";
import { someRoute } from "./some-route/handler";
import { getRoute } from "./get-route/handler";
import { makeHandler } from "../../helpers/make-handler";

export const exampleDomain = Object.fromEntries(
	Object.entries({
		exampleDomainHello: hello,
		exampleDomainSomeRoute: someRoute,
		exampleDomainGetRoute: getRoute,
	}).map(([key, value]) => [key, makeHandler(value)]),
);
