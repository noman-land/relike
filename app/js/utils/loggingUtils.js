const logError = message => (error) => {
  console.error(message, error); // eslint-disable-line
};

const logActiveAccountError = (() => logError('Failed getting active account'))();

export default {
  logActiveAccountError,
  logError,
};
