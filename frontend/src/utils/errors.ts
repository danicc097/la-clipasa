import type { HTTPValidationError, ValidationError } from 'types'

const fieldLabel = {}

export const parseErrorDetail = (errorDetail: ValidationError): string => {
  let errorMessage = ''

  if (Array.isArray(errorDetail?.loc)) {
    if (errorDetail.loc[0] === 'path') return errorMessage

    if (errorDetail.loc[0] === 'query') return `Invalid ${errorDetail.loc[1]}: ${errorDetail.msg}`

    if (errorDetail.loc[0] === 'body') {
      let invalidField: string = errorDetail.loc[2]
      if (!invalidField) invalidField = errorDetail.loc[1] // main object

      errorMessage = `Invalid ${fieldLabel[invalidField] ?? invalidField}: ${errorDetail?.msg}`
    }
  } else {
    errorMessage = 'Something unknown went wrong. Contact support.\n'
  }

  return errorMessage
}

export const extractErrorMessages = (error: HTTPValidationError): unknown[] => {
  const errorList: unknown[] = []

  if (typeof error === 'string') {
    errorList.push(error)
    return
  }

  if (typeof error?.detail === 'string') {
    errorList.push(error.detail)
    return
  }

  if (Array.isArray(error?.detail)) {
    error.detail.forEach((errorDetail) => {
      const errorMessage = parseErrorDetail(errorDetail)
      errorList.push(errorMessage)
    })
  }

  return errorList
}
