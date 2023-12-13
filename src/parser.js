import fs from 'fs';
import yaml from 'js-yaml';

const supportedExtensions = ['json', 'yml', 'yaml'];

const parse = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

export default (extension, filepath) => {
  if (!supportedExtensions.includes(extension)) {
    throw new Error('Неподдерживаемый формат файла');
  }

  const content = fs.readFileSync(filepath, 'utf-8');
  return parse[extension](content);
};

// chto kogo
