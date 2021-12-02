import { Entity, PrimaryGeneratedColumn } from "@techmmunity/symbiosis";
import { Repository } from "@techmmunity/symbiosis-dynamodb";
import { SERVICE_NAME } from "config";

const { NODE_ENV } = process.env;

const isPrd = NODE_ENV === "production";

@Entity(
	`${SERVICE_NAME}-authoring-activities-${isPrd ? "production" : "local"}`,
)
export class ExampleEntity {
	@PrimaryGeneratedColumn()
	public id: string;
}

export type ExampleRepository = Repository<ExampleEntity>;
