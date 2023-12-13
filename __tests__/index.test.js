import fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const getPath = (iterfilename) => path.join(dirname, '..', '__fixtures__', iterfilename);

// -------------------- Получение данных из файлов для сверки результата -------------------
const reconciliationFile = ['expectFlatObj.txt', 'expectNestedObj.txt', 'expectPlainFormat.txt', 'expectJsonFormat.txt'];
const correctData = reconciliationFile.map((iterfilename) => fs.readFileSync(getPath(iterfilename), 'utf-8'));
// -----------------------------------------------------------------------------------------

// ----------- Переменные хранят правильные данные, использующиеся для проверки ------------
const extentions = ['json', 'yml'];
const [expectFlatObj, expectNestedObj, expectPlainFormat, expectJsonFormat] = correctData;
// -----------------------------------------------------------------------------------------

describe('Correct flat file comparison', () => {
  test.each(extentions)('flat test %s', (extension) => {
    const filepath1 = getPath(`file1.${extension}`);
    const filepath2 = getPath(`file2.${extension}`);

    expect(genDiff(filepath1, filepath2)).toEqual(expectFlatObj);
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectFlatObj);
  });
});

describe('Correct nested file comparison', () => {
  test.each(extentions)('nested test %s', (extension) => {
    const filepath1 = getPath(`file3.${extension}`);
    const filepath2 = getPath(`file4.${extension}`);

    expect(genDiff(filepath1, filepath2)).toEqual(expectNestedObj);
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectNestedObj);
  });
});

describe('Correct plain of formatters', () => {
  test.each(extentions)('extention %s', (extention) => {
    const filepath3 = getPath(`file3.${extention}`);
    const filepath4 = getPath(`file4.${extention}`);

    expect(genDiff(filepath3, filepath4, 'plain')).toEqual(expectPlainFormat);
  });
});

describe('Correct json of formatters', () => {
  test.each(extentions)('extention %s', (extention) => {
    const filepath3 = getPath(`file3.${extention}`);
    const filepath4 = getPath(`file4.${extention}`);

    expect(genDiff(filepath3, filepath4, 'json')).toEqual(expectJsonFormat);
  });
});

describe('Correct handling of parser errors', () => {
  test('flase extension', () => {
    const errFilepath1 = getPath('file1.false');
    const errFilepath2 = getPath('file2.false');

    expect(() => genDiff(errFilepath1, errFilepath2)).toThrow('Неподдерживаемый формат файла');
  });
});

describe('Working on an unsupported format', () => {
  test('false format', () => {
    const errFormat = 'road';

    const filepath1 = getPath('file1.json');
    const filepath2 = getPath('file2.json');

    expect(() => genDiff(filepath1, filepath2, errFormat)).toThrow('Выбран неподдерживаемый формат вывода');
  });
});

// chto kogo
