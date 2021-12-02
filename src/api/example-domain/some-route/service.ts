import { ExampleRepository } from "database/example.entity";
import { StatusCodeEnum } from "enums/status-code";

interface Injectables {
	exampleRepository: ExampleRepository;
}

export const someRoute = async ({ exampleRepository }: Injectables) => {
	await exampleRepository.save({});

	return {
		statusCode: StatusCodeEnum.CREATED,
		headers: {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			"Access-Control-Allow-Origin": "*",
		},
	};
};
