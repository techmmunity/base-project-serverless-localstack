/* eslint-disable @typescript-eslint/no-magic-numbers */

export const camelizeFirst = (str: string) =>
	str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
