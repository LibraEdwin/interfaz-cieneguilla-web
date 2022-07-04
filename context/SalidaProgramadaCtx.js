import PropTypes from 'prop-types'
import React, { useState } from 'react'

export const SalidaProgramadaCtx = React.createContext(null)

export const SalidaProgramadaProvider = ({ children }) => {
  const initialState = {
    fechaSalida: '',
    fechaRetorno: '',
    horaRetorno: {},
    paqueteTuristico: 0
  }

  const [salidaProgramada, setSalidaProgramada] = useState(initialState)

  return (
    <SalidaProgramadaCtx.Provider value={{ salidaProgramada, setSalidaProgramada }}>
      {children}
    </SalidaProgramadaCtx.Provider>
  )
}
