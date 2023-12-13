const checkValue = (value) => {
  if (typeof (value) === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  return value;
};

const formatPlain = (diff) => {
  const makeFlat = (object, prefix = '') => {
    const result = object
      .filter((node) => node.status !== 'equal')
      .map((node) => {
        const {
          key, status, value1, value2, children,
        } = node;
        const prefKey = prefix + key;
        switch (status) {
          case 'nested':
            return makeFlat(children, `${prefKey}.`);
          case 'added':
            return `Property '${prefKey}' was added with value: ${checkValue(value2)}`;
          case 'deleted':
            return `Property '${prefKey}' was removed`;
          case 'unequal':
            return `Property '${prefKey}' was updated. From ${checkValue(value1)} to ${checkValue(value2)}`;
          default:
            throw new Error(`Unknown type: ${status}`);
        }
      });

    return result.join('\n');
  };
  return makeFlat(diff);
};
export default formatPlain;

// chto kogo
