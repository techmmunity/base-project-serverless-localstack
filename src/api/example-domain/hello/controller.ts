import { makeController } from "helpers/make-controller";
import { StatusCodeEnum } from "enums/status-code";

export const controller = makeController([], () => ({
	statusCode: StatusCodeEnum.CREATED,
	body: "OK",
}));
