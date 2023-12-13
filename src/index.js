import path from 'path';
import parse from './parser.js';
import getDiff from './getDiff.js';
import formatter from './formatter/index.js';

const buldpath = (filepath) => path.resolve(process.cwd(), filepath).trim();
const getExtension = (filepath) => path.extname(filepath).slice(1);

const genDiff = (file1, file2, format = 'stylish') => {
  const filepath1 = buldpath(file1);
  const filepath2 = buldpath(file2);

  const [data1, data2] = [filepath1, filepath2]
    .map((filepath) => parse(getExtension(filepath), filepath));

  const diff = getDiff(data1, data2);
  return formatter(format, diff);
};

export default genDiff;

// chto kogo
