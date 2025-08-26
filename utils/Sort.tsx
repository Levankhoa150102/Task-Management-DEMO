export const mapOrder = <T, K extends keyof T>(
  originalArray: Array<T>,
  orderArray: Array<T[K]>,
  key: K
): Array<T> => {
  if (!originalArray || !orderArray || !key) return []

  const clonedArray = [...originalArray]
  const orderedArray = clonedArray.sort((a, b) => {
    return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key])
  })

  return orderedArray
}