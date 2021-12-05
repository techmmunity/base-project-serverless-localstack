import { Entity, PrimaryGeneratedColumn } from "@techmmunity/symbiosis";
import { Repository } from "@techmmunity/symbiosis-dynamodb";

@Entity()
export class ExampleEntity {
	@PrimaryGeneratedColumn()
	public id: string;
}

export type ExampleRepository = Repository<ExampleEntity>;
