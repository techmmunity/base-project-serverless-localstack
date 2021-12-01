import { Module } from "@nestjs/common";
import { SymbiosisModule } from "@techmmunity/symbiosis-nestjs";

import { ExampleService } from "./example.service";

import { ExampleController } from "./example.controller";
import { ExampleEntity } from "./example.entity";

@Module({
	imports: [SymbiosisModule.forFeature([ExampleEntity])],
	providers: [ExampleService],
	controllers: [ExampleController],
})
export class ExampleModule {}
