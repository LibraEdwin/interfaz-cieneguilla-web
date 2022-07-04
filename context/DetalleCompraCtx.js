import PropTypes from 'prop-types'
import { createContext, useState } from 'react'

export const estadoInicial = []

export const DetalleCompraCtx = createContext(null)

export const DetalleCompraProvider = ({ children }) => {
  const [listaDetalle, setListaDetalle] = useState(estadoInicial)
  const [paqueteTuristico, setPaqueteTuristico] = useState(null)
  const [fechas, setFechas] = useState({
    salida: null,
    retorno: null
  })
  const [totalPasajeros, setTotalPasajeros] = useState(0)

  return <DetalleCompraCtx.Provider value={{ listaDetalle, setListaDetalle, paqueteTuristico, setPaqueteTuristico, fechas, setFechas, totalPasajeros, setTotalPasajeros }}>
    {children}
  </DetalleCompraCtx.Provider>
}

DetalleCompraProvider.propTypes = {
  children: PropTypes.node.isRequired
}
