const parseArrayInputs = ({ obj, type, sep }) => {
  if (type === 'value') {
    return parseArrayValues({ obj, sep });
  }
  if (type === 'key') {
    return parseArrayKeys({ obj, sep });
  }

  return {};
};

export { parseArrayInputs };

function parseArrayKeys({ obj, sep }) {
  let groupKey = '';
  const phaseOne = Object.keys(obj).reduce((prev, key) => {
    const value = obj[key];

    if (!key.includes(sep)) {
      return {
        ...prev,
        [key]: value,
      };
    }
    groupKey = groupKey === '' ? key : groupKey;

    const [idx, nestedKey] = key.split(sep);

    return {
      ...prev,
      [idx]: {
        ...prev[idx],
        [nestedKey]: value,
      },
    };
  }, {});
  const item = [];

  const phaseTwo = Object.keys(phaseOne).reduce((prev, key: string) => {
    // @ts-ignore
    if (Number.isNaN(key))
      return {
        ...prev,
        [key]: phaseOne[key],
      };

    item[key] = { ...phaseOne[key] };

    return {
      ...prev,
      [groupKey]: [...item],
    };
  }, {});

  return phaseTwo;
}

function parseArrayValues({ obj, sep }) {
  return Object.keys(obj).reduce((prev, key) => {
    const value = obj[key];

    if (!value.includes(sep)) {
      return {
        ...prev,
        [key]: value,
      };
    }
    if (key === 'content') {
      return {
        ...prev,
        [key]: value,
      };
    }
    const values = value.split(sep);

    return {
      ...prev,
      [key]: values,
    };
  }, {});
}
