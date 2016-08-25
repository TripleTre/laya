function warning(message: string) {
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message)
  }
}
