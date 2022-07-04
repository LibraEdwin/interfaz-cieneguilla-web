import React, { useState } from 'react'

export const OtrosDatosCtx = React.createContext(null)

const OtrosDatosProvider = ({ children }) => {
  const dataInicial = {
    paqueteTuristico: ''
  }

  const [datos, setDatos] = useState(dataInicial)

  return (
    <OtrosDatosCtx.Provider value={{ datos, setDatos }}>
      {children}
    </OtrosDatosCtx.Provider>
  )
}

export default OtrosDatosProvider