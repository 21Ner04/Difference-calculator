import _ from 'lodash';

const getDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const keys = _.sortBy(_.uniq(keys1.concat(keys2)));

  const diff = keys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return { key, value2: data2[key], status: 'added' };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, value1: data1[key], status: 'deleted' };
    }
    if (typeof data1[key] !== 'object' || typeof data2[key] !== 'object') {
      if (data1[key] !== data2[key]) {
        return {
          key, value1: data1[key], value2: data2[key], status: 'unequal',
        };
      }
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, children: getDiff(data1[key], data2[key]), status: 'nested' };
    }

    return { key, value1: data1[key], status: 'equal' };
  });

  return diff;
};

export default getDiff;

// chto kogo
