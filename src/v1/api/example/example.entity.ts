import {
	Column,
	Entity,
	PrimaryColumn,
	Repository,
} from "@techmmunity/symbiosis";

@Entity()
export class ExampleEntity {
	@PrimaryColumn()
	public id: string;

	@Column()
	public thisIsAnParam: string;
}

export type ExampleRepository = Repository<ExampleEntity>;
