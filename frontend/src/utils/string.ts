export function truncateIntegerToString(num: number): string {
  if (num >= 1000) {
    const suffixes = ['k', 'm', 'b', 't']
    const suffixNum = Math.floor((num.toFixed(0).length - 1) / 3)
    let shortValue
    for (let precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat((suffixNum !== 0 ? num / Math.pow(1000, suffixNum) : num).toPrecision(precision))
      const dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '')
      if (dotLessShortValue.length <= 3) {
        break
      }
    }
    if (shortValue % 1 !== 0) {
      shortValue = shortValue.toFixed(1)
    }
    return shortValue + suffixes[suffixNum - 1]
  }
  return num.toString()
}

export function sanitizeContentEditableInput(str: string) {
  return str.replace(/(\r\n|\n|\r)/gm, '')
}

export function sanitizeContentEditableInputBeforeSubmit(str: string) {
  return str.replace(/&nbsp;|\u202F|\u00A0/g, ' ').trim()
}
