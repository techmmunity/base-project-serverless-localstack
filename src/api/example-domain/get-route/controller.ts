import { service } from "./service";

import { makeController } from "helpers/make-controller";
import { ExampleEntity } from "database/example.entity";

export const controller = makeController([ExampleEntity], ({ connection }) =>
	service({
		exampleRepository: connection.getRepository<ExampleEntity>(ExampleEntity),
	}),
);
