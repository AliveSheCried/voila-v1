//Convert data to flat structure for database - perhaps put this in a seperate directory and import - same issue will exist for other data elements (credit: ChatGPT!)

////flattens array of objects concatenating key and index into an object.  To be used when number of nested objects is predictable.
// const flattenObject = (obj) => {
//   const flattened = {};

//   Object.keys(obj).forEach((key) => {
//     const value = obj[key];

//     if (Array.isArray(value)) {
//       value.forEach((item, index) => {
//         flattened[`${key}_${index}`] = flattenObject(item);
//       });
//     } else if (typeof value === "object" && value !== null) {
//       Object.assign(flattened, flattenObject(value));
//     } else {
//       flattened[key] = value;
//     }
//   });

//   return flattened;
// };

//doesn't flatten to the same degree - still leaves array of obects but that is easier to map through than the completely flattened one above (> 1 identifier)
const flattenObject = (obj) => {
  const flattened = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (Array.isArray(value)) {
      flattened[key] = value.map((element) => flattenObject(element));
    } else if (typeof value === "object" && value !== null) {
      Object.assign(flattened, flattenObject(value));
    } else {
      flattened[key] = value;
    }
  });

  return flattened;
};

export default flattenObject;
