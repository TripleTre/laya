/* tslint:disable */
export default function equals (a, b) {
  let typeA = typeof a
  let typeB = typeof b
  if (typeA !== typeB) {
    return false
  }
  if (typeA === 'object') {
    return objectHandler(a, b)
  }
  if (typeA === 'boolean' ||
      typeA === 'number' ||
      typeA === 'string') {
    return a === b
  }
  if (typeA === 'undefined') {
    return true
  }
  if (typeA === 'function') {
    console.warn('state 的属性仅用于存放状态，不要引用方法！', a)
  }
}

function objectHandler (a, b) {
  if (a === null && b === null) {
    return true
  }
  let isArrayA = Array.isArray(a)
  let isArrayB = Array.isArray(b)
  if (isArrayA !== isArrayB) {
    return false
  }
  if (isArrayA === true) {
    return arrayHandler(a, b)
  } else {
    if (a === null || b === null) {
      return false
    }
    let keyA = Object.keys(a)
    let keyB = Object.keys(b)
    let keys = keyA.length > keyB.length ? keyA : keyB
    return keys.every((v) => {
      return equals(a[v], b[v])
    })
  }
}

function arrayHandler (a, b) {
  if (a.length !== b.length) {
    return false
  }
  return a.every((v, index) => {
    return equals(v, b[index])
  })
}
