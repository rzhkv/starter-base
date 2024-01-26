import plumber from "gulp-plumber";
import notify from "gulp-notify";
import chalk from "chalk";

class Logger {
  handleError(taskName) {
    return plumber({
      errorHandler: notify.onError({
        title: taskName,
        message: "Ошибка: <%= error.message %>",
      }),
    });
  }

  warning(message) {
    console.log(chalk.bold.white.bgGreenBright(message));
  }

  error(message, errors = []) {
    console.log(chalk.bold.white.bgRed(message), errors);
  }
}

export const logger = new Logger();
