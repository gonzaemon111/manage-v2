import * as winston from "winston";

// @link {https://github.com/winstonjs/winston}
export class Logger {
  private readonly logger: winston.Logger;
  private readonly environment = process.env.NODE_ENV ?? "development";

  constructor() {
    this.logger = winston.createLogger({
      level: this.environment === "development" ? "debug" : "info",
      format: winston.format.combine(
        winston.format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        winston.format.colorize(),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
      ),
      transports:
        this.environment === "production"
          ? new winston.transports.Console()
          : new winston.transports.File({
              filename: `log/${this.environment}.log`,
            }),
    });
  }

  public error(error: unknown) {
    this.logger.error(error);
  }

  public info(message: unknown) {
    this.logger.info(message);
  }

  public debug(message: unknown) {
    this.logger.debug(message);
  }

  public warn(message: unknown) {
    this.logger.warn(message);
  }
}

export const logger = new Logger();
