export interface CreateDoc {
	id?: string;
	thisIsAnParam: string;
}

export const doc = ({ id, thisIsAnParam }: CreateDoc) => ({
	id: id || "123",
	thisIsAnParam,
});
