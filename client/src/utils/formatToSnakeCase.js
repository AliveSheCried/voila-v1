/**
 * Converts object keys from camelCase to snake_case.
 * @param {Object} obj - The object to convert.
 * @return {Object} The new object with snake_case keys.
 */
export function formatToSnakeCase(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    const modifiedKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
    acc[modifiedKey] = obj[key];
    return acc;
  }, {});
}
