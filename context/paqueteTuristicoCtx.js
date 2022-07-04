import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { successAlert, errorAlert, questionAlert } from '@/lib/alerts'
import { getData } from '@/lib/Api'

export const PaqueteTuristicoCtx = React.createContext(null)

export const PaqueteTuristicoProvider = ({ children }) => {
  const dataInicial = {
    id: null,
    nombrePaquete: '',
    precio: '',
    fotoPrincipal: {
      objectFile: null,
      url: ''
    },
    archivoItinerario: {
      nombre: '',
      objectFile: null
    },
    fotosAnexas: [
      {
        id: 'anexa1',
        objectFile: null,
        url: ''
      },
      {
        id: 'anexa2',
        objectFile: null,
        url: ''
      },
      {
        id: 'anexa3',
        objectFile: null,
        url: ''
      },
      {
        id: 'anexa4',
        objectFile: null,
        url: ''
      }
    ],
    nombreURL: '',
    zonaGeografica: '',
    estadoPaquete: '',
    campaniaId: '',
    salidasProgramadas: []
  }

  const [paqueteTuristico, setPaqueteTuristico] = useState(dataInicial)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingLoader, setIsLoadingLoader] = useState(false)

  const validarDatosRequeridos = () => {
    if (paqueteTuristico.nombrePaquete === '' ||
      paqueteTuristico.precio === '' ||
      paqueteTuristico.fotoPrincipal.objectFile === null ||
      paqueteTuristico.zonaGeografica === '' ||
      paqueteTuristico.estadoPaquete === '') {
      errorAlert('Por favor verifique que los campos estén llenados correctamente')

      return false
    }

    if (paqueteTuristico.archivoItinerario.objectFile === null) {
      errorAlert('El paquete turístico debe tener un archivo itinerario')

      return false
    }

    return true
  }

  const prepararFormData = () => {
    const formData = new FormData()
    formData.append('nombrePaquete', paqueteTuristico.nombrePaquete)
    formData.append('precio', paqueteTuristico.precio)
    formData.append('fotoPrincipal', paqueteTuristico.fotoPrincipal.objectFile)
    formData.append('zonaGeografica', paqueteTuristico.zonaGeografica)
    formData.append('estadoPaquete', paqueteTuristico.estadoPaquete)
    formData.append('campaniaId', paqueteTuristico.campaniaId)
    formData.append('archivoItinerario', paqueteTuristico.archivoItinerario.objectFile)

    paqueteTuristico.fotosAnexas.forEach(anexa => {
      if (anexa.objectFile !== null) {
        formData.append(anexa.id, anexa.objectFile)
      }
    })

    for (const pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }

    return formData
  }

  const obtenerNombreArchivo = (archivoUrl) => {
    const archivoUrlArray = archivoUrl.split('/')
    return archivoUrlArray[archivoUrlArray.length - 1]
  }

  const setData = (datosFetch) => {
    setPaqueteTuristico({
      id: datosFetch._id,
      nombrePaquete: datosFetch.nombrePaquete,
      precio: datosFetch.precio,
      fotoPrincipal: {
        objectFile: null,
        url: process.env.DOMAIN_IMAGES + datosFetch.fotoPrincipal
      },
      archivoItinerario: {
        nombre: obtenerNombreArchivo(datosFetch.archivoItinerario),
        objectFile: null
      },
      fotosAnexas: [
        {
          id: 'anexa1',
          objectFile: null,
          url: datosFetch.fotosAnexas.anexa1 ? process.env.DOMAIN_IMAGES + datosFetch.fotosAnexas.anexa1 : ''
        },
        {
          id: 'anexa2',
          objectFile: null,
          url: datosFetch.fotosAnexas.anexa2 ? process.env.DOMAIN_IMAGES + datosFetch.fotosAnexas.anexa2 : ''
        },
        {
          id: 'anexa3',
          objectFile: null,
          url: datosFetch.fotosAnexas.anexa3 ? process.env.DOMAIN_IMAGES + datosFetch.fotosAnexas.anexa3 : ''
        },
        {
          id: 'anexa4',
          objectFile: null,
          url: datosFetch.fotosAnexas.anexa4 ? process.env.DOMAIN_IMAGES + datosFetch.fotosAnexas.anexa4 : ''
        }
      ],
      nombreURL: datosFetch.nombreURL,
      zonaGeografica: datosFetch.zonaGeografica._id ? datosFetch.zonaGeografica._id : `${datosFetch.zonaGeografica}`,
      estadoPaquete: datosFetch.estadoPaquete._id ? datosFetch.estadoPaquete._id : `${datosFetch.estadoPaquete}`,
      campaniaId: datosFetch.campaniaId ? datosFetch.campaniaId : `${datosFetch.campaniaId}`,
      salidasProgramadas: datosFetch.salidaProgramada
    })
  }

  const registrarPaquete = () => {
    if (validarDatosRequeridos()) {
      const formData = prepararFormData()

      setIsLoading(true)

      fetch(`${process.env.URI_API}/api-cieneguilla-service/paquetes-turisticos`, {
        method: 'POST',
        body: formData
      }).then(res => res.json())
        .then(res => {
          setIsLoading(false)
          setTimeout(() => {
            if (res.codigo === 400) {
              errorAlert(res.mensaje)
            } else {
              successAlert('Se registró el paquete correctamente')
              setData(res.body)
            }
          }, 1000)
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }

  const editarPaquete = () => {
    const formData = new FormData()

    if (paqueteTuristico.nombrePaquete) {
      formData.append('nombrePaquete', paqueteTuristico.nombrePaquete)
    } else {
      return errorAlert('No te olvides del nombre')
    }

    if (paqueteTuristico.precio) {
      formData.append('precio', paqueteTuristico.precio)
    } else {
      return errorAlert('No te olvides del precio')
    }

    if (paqueteTuristico.fotoPrincipal.objectFile && paqueteTuristico.fotoPrincipal.url) {
      formData.set('fotoPrincipal', paqueteTuristico.fotoPrincipal.objectFile)
    } else if (!paqueteTuristico.fotoPrincipal.url) {
      return errorAlert('Te olvidaste de la imagen destacada')
    }

    if (paqueteTuristico.archivoItinerario.objectFile && paqueteTuristico.archivoItinerario.nombre) {
      formData.append('archivoItinerario', paqueteTuristico.archivoItinerario.objectFile)
    } else if (!paqueteTuristico.archivoItinerario.nombre) {
      return errorAlert('Te olvidaste del archivo itinerario')
    }

    if (paqueteTuristico.zonaGeografica) {
      formData.append('zonaGeografica', paqueteTuristico.zonaGeografica)
    } else {
      return errorAlert('No te olvides de la zona geográfica')
    }

    if (paqueteTuristico.estadoPaquete) {
      formData.append('estadoPaquete', paqueteTuristico.estadoPaquete)
    } else {
      return errorAlert('No te olvides del estado del paquete')
    }

    if (paqueteTuristico.campaniaId) {
      formData.append('campaniaId', paqueteTuristico.campaniaId)
    }

    paqueteTuristico.fotosAnexas.forEach(anexa => {
      const { id, objectFile, url } = anexa

      if (objectFile && url) {
        formData.append(id, objectFile)
      }

      if (!objectFile && !url) {
        formData.append('removeAnexa', id)
      }
    })

    setIsLoading(true)

    fetch(`${process.env.URI_API}/api-cieneguilla-service/paquetes-turisticos/${paqueteTuristico.id}`, {
      method: 'PATCH',
      body: formData
    }).then(res => res.json())
      .then(res => {
        setIsLoading(false)
        setTimeout(() => {
          if (res.codigo === 400) {
            errorAlert(res.mensaje)
          } else {
            // setData(res.body)
            successAlert('Se actualizó el paquete correctamente')
          }
        }, 1000)
      })
      .catch(err => console.log(err))
  }

  const eliminarPaquete = () => {
    questionAlert('Estás apunto de eliminar la competencia', '¿Estás seguro?').then(result => {
      if (result.isConfirmed) {
        setIsLoading(true)

        limpiarPaquete()

        setTimeout(() => {
          setIsLoading(false)
          successAlert('Se eliminó el paquete')
        }, 1000)

        fetch(`${process.env.URI_API}/api-cieneguilla-service/paquetes-turisticos/${paqueteTuristico.id}`, {
          method: 'DELETE'
        })
      }
    })
  }

  const limpiarPaquete = () => {
    setPaqueteTuristico(dataInicial)
  }

  const obtenerPaquete = async (id) => {
    setIsLoadingLoader(true)
    const datosFetch = await getData(`${process.env.URI_API}/api-cieneguilla-service/paquetes-turisticos/${id}`)
    setData(datosFetch)
    setIsLoadingLoader(false)
  }

  const buscarPaquete = async (searchTerm, limit = 10, page = 1) => {

    const r = await fetch(`${process.env.URI_API}/api-cieneguilla-service/paquetes-turisticos/search?nombrePaquete=${searchTerm}&limit=${limit}&page=${page}`)
    const jsonData = await r.json()

    console.log(`${process.env.URI_API}/api-cieneguilla-service/paquetes-turisticos/search?nombrePaquete=${searchTerm}&limit=${limit}&page=${page}`)

    const resultados = await getData(`${process.env.URI_API}/api-cieneguilla-service/paquetes-turisticos/search?nombrePaquete=${searchTerm}&limit=${limit}&page=${page}`)

    return resultados
  }

  const registrarSalidaProgramada = async (idSalidaProgramada) => {
    const res2 = await fetch(`${process.env.URI_API}/api-cieneguilla-service/paquetes-turisticos/${paqueteTuristico.id}/salidas-programadas`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ salidaProgramada: idSalidaProgramada })
    })

    const paqueteTuristicoActualizado = await res2.json()
    if (paqueteTuristicoActualizado.code === 500) {
      errorAlert('Ocurrió un error al cargar la salida programada')
    } else {
      const { salidaProgramada } = paqueteTuristicoActualizado.body
      setPaqueteTuristico({ ...paqueteTuristico, salidasProgramadas: salidaProgramada })
      successAlert('Se actualizó la salida correctamente')
    }
  }

  return (
    <PaqueteTuristicoCtx.Provider value={{
      paqueteTuristico,
      setPaqueteTuristico,
      limpiarPaquete,
      eliminarPaquete,
      obtenerPaquete,
      editarPaquete,
      registrarPaquete,
      buscarPaquete,
      setData,
      isLoading,
      registrarSalidaProgramada,
      isLoadingLoader,
      setIsLoadingLoader
    }}>
      {children}
    </PaqueteTuristicoCtx.Provider>
  )
}

PaqueteTuristicoProvider.propTypes = {
  children: PropTypes.node.isRequired
}
