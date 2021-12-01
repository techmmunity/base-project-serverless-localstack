import { Injectable } from "@nestjs/common";

import { InjectRepository } from "@techmmunity/symbiosis-nestjs";
import { create } from "./service/create";
import { V1CreateExampleInputSchema } from "./service/create/schemas/input.schema";

import { ExampleEntity, ExampleRepository } from "./example.entity";

@Injectable()
export class ExampleService {
	public constructor(
		@InjectRepository(ExampleEntity)
		private readonly exampleRepository: ExampleRepository,
	) {}

	public create(params: V1CreateExampleInputSchema) {
		return create(
			{
				exampleRepository: this.exampleRepository,
			},
			params,
		);
	}
}
