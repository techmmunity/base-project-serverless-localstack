import { ExampleRepository } from "database/example.entity";
import { StatusCodeEnum } from "enums/status-code";

interface Injectables {
	exampleRepository: ExampleRepository;
}

export const service = async ({ exampleRepository }: Injectables) => {
	const result = await exampleRepository.find({});

	return {
		statusCode: StatusCodeEnum.CREATED,
		body: JSON.stringify(result),
	};
};
