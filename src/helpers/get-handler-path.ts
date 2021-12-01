/* eslint-disable @typescript-eslint/no-magic-numbers */

export const getHandlerPath = (dirName: string) => {
	return `${dirName.split(process.cwd())[1].substring(1).replace(/\\/g, "/")}`;
};
