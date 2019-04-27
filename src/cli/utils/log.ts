import {
  blueBright, green, redBright, yellow, red,
} from 'colorette';

interface Options {
  messageColor?: string;
  titleColor?: string;
}

const color = (clr: string | undefined, message: string): string => {
  switch (clr) {
    case 'brightblue':
      return blueBright(message);
    case 'brightred':
      return redBright(message);
    case 'red':
      return red(message);
    case 'green':
      return green(message);
    case 'yellow':
      return yellow(message);
    default:
      return message;
  }
};

export default (title: string, message: string, opts: Options = {}): void => {
  let str = '';
  if (title) {
    str += `[ ${color(opts.titleColor, title)} ] `;
  }
  let i = title.length;
  while (i < 6) {
    str += ' ';
    i += 1;
  }

  str += color(opts.messageColor, message);
  console.log(str); // eslint-disable-line
};
