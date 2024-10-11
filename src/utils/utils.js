const calculateDIMAndDTC = (calvingDate, dairyDateControl, expectedDate) => {
  const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000

  const calvingDateObj = new Date(calvingDate)
  const dairyDateControlObj = new Date(dairyDateControl)

  const dim = Math.floor((dairyDateControlObj - calvingDateObj) / ONE_DAY_IN_MS)

  if (expectedDate) {
    const expectedDateObj = new Date(expectedDate)

    const dtc = Math.floor((expectedDateObj - dairyDateControlObj) / ONE_DAY_IN_MS)

    return { dim, dtc }
  }

  return { dim, dtc: 0 }
}

const validateRequiredFields = (fields, body) => {
  for (const field of fields) {
    if (!body[field]) {
      throw new Error('Campos obrigatórios não preenchidos')
    }
  }
}

export default {
  calculateDIMAndDTC,
  validateRequiredFields
}
