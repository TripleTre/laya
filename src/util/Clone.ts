/* tslint:disable */
export default function clone (obj) {
  console.log(obj)
  // Handle the 3 simple types, and null or undefined
  if (obj === null || typeof obj !== 'object') return obj

  if (obj instanceof Map) {
    let copy = new Map();
    let keys = obj.keys();
    let next;
    while (next = keys.next(), !next.done) {
      copy.set(clone(next.value), clone(obj.get(next.value)))
    }
    return copy;
  }

  if (Object.keys(obj).length === 0) return {}

  // Handle Date
  if (obj instanceof Date) {
    let copy = new Date()
    copy.setTime(obj.getTime())
    return copy
  }

  // Handle Array
  if (Array.isArray(obj)) {
    let copy = []
    for (let i = 0, len = obj.length; i < len; ++i) {
      copy[i] = clone(obj[i])
    }
    return copy
  }

  // Handle Object
  if (obj instanceof Object) {
    let copy = {}
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr])
    }
    return copy
  }

  throw new Error("Unable to copy obj! Its type isn't supported.")
}
