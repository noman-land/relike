export function path(pathPart) {
  const SLASH = '/';
  return !pathPart ? SLASH : `${SLASH}${pathPart}`;
};
