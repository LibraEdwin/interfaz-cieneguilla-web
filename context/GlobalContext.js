import React, { useState, useEffect, useContext } from 'react'
import { errorAlert } from '@/lib/alerts'
import jwt from 'jsonwebtoken'
import moment from 'moment'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [ofertas, setOfertas] = useState([])
  const [nuevos, setNuevos] = useState([])
  const [codigosPopulares, setCodigosPopulares] = useState([])
  const [populares, setPopulares] = useState([])
  const [login, setLogin] = useState({ email: '', password: '' })
  const [isToken, setIsToken] = useState(false)
  const [token, setToken] = useState(null)
  const [loginErrors, setLoginErrors] = useState({})
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [loggedInClient, setLoggedInClient] = useState({})
  const [tipoDocs, setTipoDocs] = useState()

  async function fetchData (url) {
    try {
      const response = await fetch(url)
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData(`${process.env.URI_API}/api-cieneguilla-service/tipos-documento`)
      .then((data) => setTipoDocs(data.body))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    fetchData(
      `${process.env.URI_API}/api-cieneguilla-service/paquetes-turisticos/search?estadoPaquete=1&limit=40&page=1`
    )
      .then((data) => setOfertas(data.body.docs))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    fetchData(
      `${process.env.URI_API}/api-cieneguilla-service/paquetes-turisticos/search?estadoPaquete=3&limit=40&page=1`
    )
      .then((data) => setNuevos(data.body.docs))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    fetchData(
      `${process.env.URI_API}/api-cieneguilla-service/notas-venta/mas-vendidos`
    )
      .then((data) => setCodigosPopulares(data.body.slice(0, 4))) // para cambiar el número de paquetes populares // slice(0, num)
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    const [codigo1, codigo2, codigo3, codigo4] = codigosPopulares
    fetchData(
      `${process.env.URI_API}/api-cieneguilla-service/paquetes-turisticos/search?_id=${codigo1}&_id=${codigo2}&_id=${codigo3}&_id=${codigo4}`
    )
      .then((data) => {
        console.log(data)
        setPopulares(data.body.docs)
      })
      .catch((err) => console.log(err))
  }, [codigosPopulares])

  const handleOnChangeInput = (e) => {
    const value = e.target.value
    const inputName = e.target.name
    setLogin({ ...login, [inputName]: value })
    setLoginErrors({})
  }

  const validateEmptyInputs = () => {
    const errors = {}
    let haveError = false

    if (!login.email) {
      errors.emailError = '* Campo requerido'
      haveError = true
    }

    if (!login.password) {
      errors.passwordError = '* Campo requerido'
      haveError = true
    }

    setLoginErrors(errors)

    return haveError
  }

  const signIn = async () => {
    if (!validateEmptyInputs()) {
      const base64 = Buffer.from(`${login.email}:${login.password}`).toString(
        'Base64'
      )
      const urlLogin = `${process.env.URI_API}/api-cieneguilla-service/clientes/login`

      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', `Basic ${base64}`)

      const req = new Request(urlLogin, {
        method: 'POST',
        headers: headers
      })

      setIsLoginLoading(true)

      setTimeout(() => {
        fetch(req)
          .then((res) => res.json())
          .then((res) => {
            if (res.status === 401 || res.code === 401) {
              errorAlert('Autenticación inválida')
              setIsLoginLoading(false)
            } else {
              const jwt = res.body.access_token
              localStorage.setItem('token_cliente', jwt)
              setIsToken(true)
            }
          })
          .catch((e) => {
            errorAlert('Hubo un error con el servidor, intentalo más tarde')
            setIsLoginLoading(false)
          })
      }, 1500)
    }
  }

  const handleKeyEnter = (e) => {
    if (e.key === 'Enter') {
      signIn()
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token_cliente')
    if (token) {
      const payload = jwt.decode(token)
      setLoggedInClient(payload.user)
      localStorage.setItem('user', JSON.stringify(payload.user))
      setToken(token)
      setIsToken(true)
    }
  }, [token, isToken])

  return (
    <AppContext.Provider
      value={{
        ofertas,
        nuevos,
        populares,
        tipoDocs,
        handleOnChangeInput,
        validateEmptyInputs,
        handleKeyEnter,
        signIn,
        isLoginLoading,
        loginErrors,
        token,
        isToken,
        loggedInClient
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
