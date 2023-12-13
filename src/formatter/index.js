import stylish from './stylish.js';
import json from './json.js';
import plain from './plain.js';

const supportedFormatters = ['stylish', 'json', 'plain'];

const formatters = {
  stylish,
  json,
  plain,
};

export default (format, diff) => {
  if (!supportedFormatters.includes(format)) {
    throw new Error('Выбран неподдерживаемый формат вывода');
  }

  return formatters[format](diff);
};

// chto kogo
