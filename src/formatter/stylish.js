import _ from 'lodash';

const indent = (depth) => ' '.repeat(depth * 4 - 2);

const stringify = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => `${indent(depth + 1)}  ${key}: ${stringify(value[key], depth + 1)}`);
  return `{\n${result.join('\n')}\n  ${indent(depth)}}`;
};

const iter = (tree, depth = 1) => {
  const result = tree.flatMap((node) => {
    const {
      key, status, value1, value2, children,
    } = node;
    switch (status) {
      case 'nested':
        return `${indent(depth)}  ${key}: {\n${iter(children, depth + 1)}\n${indent(depth)}  }`;
      case 'added':
        return `${indent(depth)}+ ${key}: ${stringify(value2, depth)}`;
      case 'deleted':
        return `${indent(depth)}- ${key}: ${stringify(value1, depth)}`;
      case 'unequal':
        return [
          `${indent(depth)}- ${key}: ${stringify(value1, depth)}`,
          `${indent(depth)}+ ${key}: ${stringify(value2, depth)}`,
        ];
      case 'equal':
        return `${indent(depth)}  ${key}: ${stringify(value1, depth)}`;
      default:
        throw new Error(`Unknown type: ${status}`);
    }
  });
  return result.join('\n');
};
const formatStylish = (data) => `{\n${iter(data)}\n}`;

export default formatStylish;

// chto kogo
