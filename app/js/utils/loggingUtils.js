export const logError = message => error => {
  console.error(message, error); // eslint-disable-line
};

export default {
  logError,
};
