function replaceErrors (key, value) {
  if (value instanceof Error) {
    const error = {};

    Object.getOwnPropertyNames(value).forEach(function (propName) {
      error[propName] = value[propName];
    });

    return error;
  }

  return value;
}

export default replaceErrors;
