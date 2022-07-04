import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const useValidationToken = () => {
  const router = useRouter()
  const [shouldLogin, setShouldLogin] = useState(true)

  const decodeToken = (token) => {
    const deco = window.atob(token.split('.')[1])

    return JSON.parse(deco)
  }

  const validateExpToken = () => {
    const token = localStorage.getItem('token')

    if (token) {
      setShouldLogin(false)
    } else {
      setShouldLogin(true)
      router.push('/login')
      return null
    }

    const decodeJWT = decodeToken(token)

    if (decodeJWT.exp * 1000 < Date.now()) {
      localStorage.removeItem('token')
      setShouldLogin(true)
      router.push('/login')
    }
  }

  useEffect(() => {
    validateExpToken()
  }, [shouldLogin])

  return shouldLogin
}

export default useValidationToken
