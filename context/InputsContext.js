import React, { useState } from 'react'

export const InputsCtx = React.createContext(null)

export const InputsProvider = ({ children }) => {
  const dataInicial = {
    salidaProgramadaId: 0,
    salidaProgramada: null,
    horaSalida: {},
    lugarEmbarqueId: 0,
    lugarEmbarque: 0,
    flag: false,
    quitModalA: false,
    quitModalB: false,
    quitModalC: false,
    embarques: [],
    isPasajerosSaved: false
  }

  const [inputs, setInputs] = useState(dataInicial)

  return (
    <InputsCtx.Provider value={{ inputs, setInputs }}>
      {children}
    </InputsCtx.Provider>
  )
}
