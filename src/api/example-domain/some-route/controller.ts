import { someRoute } from "./service";

import { makeController } from "helpers/make-controller";
import { ExampleEntity } from "database/example.entity";

export const controller = makeController([ExampleEntity], ({ connection }) =>
	someRoute({
		exampleRepository: connection.getRepository<ExampleEntity>(ExampleEntity),
	}),
);
