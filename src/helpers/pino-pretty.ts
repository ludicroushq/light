import chalk from 'chalk';

const isObject = (input: any): any => Object.prototype.toString.apply(input) === '[object Object]';

const isPinoLog = (log: any): any => log && (log.hasOwnProperty('v') && log.v === 1); // eslint-disable-line

const levels: any = {
  10: ['trace', chalk.gray],
  20: ['debug', chalk.magentaBright],
  30: ['info', chalk.yellow],
  40: ['warn', chalk.yellowBright],
  50: ['error', chalk.redBright],
  60: ['fatal', chalk.red],
};

export default (): any => (inputData: any): any => {
  let logObject;
  if (typeof inputData === 'string') {
    const parsedData = JSON.parse(inputData);
    logObject = (isPinoLog(parsedData)) ? parsedData : undefined;
  } else if (isObject(inputData) && isPinoLog(inputData)) {
    logObject = inputData;
  }
  if (!logObject) return inputData;

  const {
    level, req, res, responseTime, msg,
  } = logObject;

  const output = [];

  if (req) {
    if (req.method) {
      const text = ` ${chalk.black(req.method)} `;
      if (req.method === 'POST') {
        output.push(chalk.bgBlueBright(text));
      } else if (['PUT', 'PATCH'].includes(req.method)) {
        output.push(chalk.bgCyanBright(text));
      } else if (req.method === 'DELETE') {
        output.push(chalk.bgRedBright(text));
      } else {
        output.push(chalk.bgGreenBright(text));
      }
    }

    if (res) {
      if (res.statusCode) {
        const code = res.statusCode;
        if (code >= 500) {
          output.push(chalk.red(res.statusCode));
        } else if (code >= 400) {
          output.push(chalk.yellow(res.statusCode));
        } else {
          output.push(chalk.green(res.statusCode));
        }
      }
    }

    if (req.url) {
      output.push('to');
      output.push(`${chalk.magentaBright(`${req.url}`)},`);
    }

    if (msg) {
      output.push(msg);
    }

    if (responseTime) {
      output.push(chalk.cyan(`in ${responseTime} ms`));
    }
  } else {
    if (level) {
      const l = levels[level];
      output.push(l[1](l[0]));
    }

    if (msg) {
      output.push(msg);
    }
  }
  output.push('\n');
  return output.join(' ');
};
