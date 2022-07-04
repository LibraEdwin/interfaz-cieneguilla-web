// Preview file
import moment from 'moment'

const previewFile = (file, refImg) => {
  const filePreview = URL.createObjectURL(file)
  refImg.current.src = ''
  return filePreview
}

// Changing filename

const changeFileName = (file, newName) => {
  const blob = file.slice(0, file.size, file.type)
  const newFileName = new File([blob], newName, { type: file.type })
  return newFileName
}

const formatDate = (date) => {
  const [d] = date.split('T')
  const [year, month, day] = d.split('-')
  return `${day}/${month}/${year}`
}

const formatToCurrency = (amount) => {
  return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

// ------------------------- FORMATO HORAS ----------------------
function formatHour(obj) {
  return `${obj.hora}:${obj.minutos.toString().padStart(2, '0')} ${obj.meridiano
    }`
}

function isInvalidDate(fechaDesde, fechaHasta) {
  const desde = moment(fechaDesde, 'YYYY-MM-DD')
  const hasta = moment(fechaHasta, 'YYYY-MM-DD')

  return hasta.isBefore(desde)
}

function removeDuplicates(originalArray, prop) {
  const newArray = []
  const lookupObject = {}

  for (const i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i]
  }

  for (const i in lookupObject) {
    newArray.push(lookupObject[i])
  }
  return newArray
}

function formatWithHour(date) {
  const momentDate = moment(new Date(date))
  const dateFormat = momentDate.format('DD/MM/YYYY') // date
  const time = momentDate.format('LTS') // hour
  return dateFormat + ' ' + time
}

/**
 * Función para generar nombres de url
 * @param {any} id - id
 * @param {string} text - texto a parsear
 *
 * @returns {string}
 */
function generateUrlName(id, text) {
  let str = text.toLowerCase()
  str = str.replace(/[-[\]{}()´`*+?.,\\^$|#\s]/g, ' ').trim()

  const characters = 'àáãäâèéëêìíïîòóöôùúüûñç·/_,:;'
  const replace = 'aaaaaeeeeiiiioooouuuunc------'

  for (let i = 0; i < characters.length; i++) {
    str = str.replace(new RegExp(characters.charAt(i), 'g'), replace.charAt(i))
  }

  str = str.replace(/[^a-zA-Z0-9]/g, '-')
  str = str.replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

  return `${id}-${str}`
}


export {
  formatToCurrency,
  previewFile,
  changeFileName,
  formatDate,
  formatHour,
  isInvalidDate,
  removeDuplicates,
  formatWithHour,
  generateUrlName
}
