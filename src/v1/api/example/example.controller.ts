import { Body, Controller, Post } from "@nestjs/common";
import { ExampleService } from "./example.service";
import { V1CreateExampleInputSchema } from "./service/create/schemas/input.schema";
import { API_VERSION } from "v1/config";

@Controller(`${API_VERSION}/example`)
export class ExampleController {
	public constructor(private readonly exampleService: ExampleService) {}

	@Post()
	public create(@Body() data: V1CreateExampleInputSchema) {
		return this.exampleService.create(data);
	}
}
