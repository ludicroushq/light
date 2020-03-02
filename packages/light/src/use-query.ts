import { URL } from 'url';

export default async (url: string): Promise<any> => {
  const { searchParams } = new URL(url, 'http://localhost');

  const params = {};
  Array.from(searchParams.keys()).forEach((key): void => {
    let value: string | string[] = searchParams.getAll(key);
    if (value.length === 1) {
      [value] = value;
    }
    (params as any)[key] = value;
  });
  return params;
};
