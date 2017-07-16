export function path(...pathParts) {
  const SLASH = '/';
  return `${SLASH}${pathParts.join(SLASH)}`;
}
