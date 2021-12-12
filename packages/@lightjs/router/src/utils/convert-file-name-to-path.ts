export function convertFileNameToPath(fileName: string) {
  if (fileName.endsWith('/index')) {
    return fileName.substring(0, fileName.length - 6) || '/';
  }

  const splitFileName = fileName.split('/');

  return splitFileName
    .map((name) => {
      if (name.startsWith('[') && name.endsWith(']')) {
        const newName = name.split('');
        newName.pop();
        newName.shift();

        const joinedName = newName.join('');

        if (joinedName.startsWith('...')) {
          return '*';
        }
        return `:${joinedName}`;
      }

      return name;
    })
    .join('/');
}
