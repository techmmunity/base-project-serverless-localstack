export const kebabToCamel = (kebab: string) => {
	const arr = kebab.split("-");

	const capital = arr.map(
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		item => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase(),
	);

	return capital.join("");
};
