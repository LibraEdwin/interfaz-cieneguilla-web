import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const NotaVentaCtx = createContext(null)

export const informacionAdicional = [
  {
    codigo: 1,
    name: 'Llevo infante menor a 4 años',
    checked: false
  },
  {
    codigo: 2,
    name: 'Llevo una persona con discapacidad (consultarnos previamente)',
    checked: false
  },
  {
    codigo: 3,
    name: 'No tengo nada que declarar',
    checked: false
  }
]

export const TIPO_COBRO = {
  tarjeta: '8763338402',
  efectivo: '1671600398'
}

export const dataInicial = {
  cliente: '',
  paqueteTuristico: '',
  tipoCobro: '',
  fechaPago: '',
  fechaRegistro: '',
  pasajeros: [],
  masInfo: informacionAdicional,
  salidaProgramada: '',
}

export const NotaVentaProvider = ({ children }) => {
  const [notaVenta, setNotaVenta] = useState(dataInicial)

  return <NotaVentaCtx.Provider value={{
    informacionAdicional,
    dataInicial,
    notaVenta,
    setNotaVenta,
    TIPO_COBRO
  }}>
    {children}
  </NotaVentaCtx.Provider>
}

NotaVentaProvider.propTypes = {
  children: PropTypes.node.isRequired
}
