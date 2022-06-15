export const mapValuesToObject = (fields) => {
  let result = {};

  fields.forEach(item => {
    result[item.id] = item.value
  })

  return result
}