import Swal from 'sweetalert2'

export const successAlert = (text, title = null) => {
  return Swal.fire({
    icon: 'success',
    text,
    confirmButtonColor: '#08bc62'
  })
}

export const errorAlert = (text, title = null, html) => {
  return Swal.fire({
    icon: 'error',
    text,
    title,
    confirmButtonColor: '#f27474',
    html
  })
}

export const questionAlert = (text, title = null) => {
  return Swal.fire({
    icon: 'warning',
    title,
    text,
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    denyButtonText: 'No',
    confirmButtonColor: '#0693dd'
  })
}

export const infoAlert = () => {

}
