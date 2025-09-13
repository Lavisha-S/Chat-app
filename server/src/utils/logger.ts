
import pino from "pino";
import dayjs from "dayjs";

const loggerOptions = {
	base: { pid: false },
	timestamp: () => `,"time":"${dayjs().format()}"`,
};

const log = pino({
	...loggerOptions,
	transport: {
		target: "pino-pretty",
		options: { colorize: true },
	},
});

export default log;
