import Image from 'next/image'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import { useState } from 'react'
import { errorAlert } from '@/lib/alerts'
import router from 'next/router'

const Login = () => {
  const [formData, setFormData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleOnChangeInput = (e) => {
    const value = e.target.value
    const inputName = e.target.name

    setFormData({ ...formData, [inputName]: value })
    setErrors({})
  }

  const validateEmptyInputs = () => {
    const errors = {}
    let haveError = false

    if (!formData.email) {
      errors.emailError = '* Campo requerido'
      haveError = true
    }

    if (!formData.password) {
      errors.passwordError = '* Campo requerido'
      haveError = true
    }

    setErrors(errors)

    return haveError
  }
  const signIn = async () => {
    if (!validateEmptyInputs()) {
      const base64 = Buffer.from(`${formData.email}:${formData.password}`).toString('Base64')
      const urlLogin = `${process.env.URI_API}/api-cieneguilla-service/usuarios/login`

      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', `Basic ${base64}`)

      const req = new Request(urlLogin, {
        method: 'POST',
        headers: headers
      })

      setIsLoading(true)

      setTimeout(() => {
        fetch(req)
          .then(res => res.json())
          .then(res => {
            if (res.status === 401 || res.code === 401) {
              errorAlert('Autenticación inválida')
              setIsLoading(false)
            } else {
              const jwt = res.body.access_token
              localStorage.setItem('token', jwt)

              router.push('/admin')
            }
          })
          .catch(e => {
            errorAlert('Hubo un error con el servidor, intentalo más tarde')
            setIsLoading(false)
          })
      }, 1500)
    }
  }

  const handleKeyEnter = (e) => {
    if (e.key === 'Enter') {
      signIn()
    }
  }

  return (
		<>
			<div className="login-container">
				<div className="login">
					<div onKeyPress={handleKeyEnter}>
            {isLoading && (
              <div className="login__send">
                <div className="login__loading"></div>
                <p>Iniciando sesión</p>
              </div>
            )}
						<div className="login-header">
							<img className="" src="/images/logo-black.webp" alt="a" width="100" />
						</div>
						<div className="login__inputs">
              <Input
                type="email"
                placeholder="Usuario"
                fontWeight="normal"
                name="email"
                onChange={handleOnChangeInput}
                error={errors.emailError}
              />
              {errors.emailError && (
                <span className="login__error">{errors.emailError}</span>
              )}
              <Input
                type="password"
                placeholder="Password"
                fontWeight="normal"
                name="password"
                onChange={handleOnChangeInput}
                error={errors.passwordError}
              />
              {errors.passwordError && (
                <span className="login__error">{errors.passwordError}</span>
              )}
							<Button
								label="Ingresar a plataforma"
                onClick={signIn}
							/>
						</div>
					</div>
				</div>
			</div>
			<style jsx>{`
		  .login-container {
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .login {  
        width:441px;
        height:475px;
        box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        padding: 0 75px;
        position: relative;
        overflow: hidden;
      }

      .login__loading {
        width: 100%;
        height: 5px;
        background: linear-gradient(90deg, rgba(242,185,6,1) 0%, rgba(6,147,221,1) 35%, rgba(0,212,255,1) 100%);
        position: absolute;
        top: 0;
        left: 0;
        animation: animationSlide 2s linear infinite;
      }

      .login__send {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255,255,255, 0.7);
        display: flex;
        justify-content: center;
        z-index: 4;
      }

      .login__send p {
        color: #0693dd;
        font-weight: 600;
      }

      .login-header{
        text-align:center;
        padding: 25px 0;
      }

      .login__inputs{
        display: flex;
        flex-direction: column;
        gap: 20px
      }

      .login__error {
        color: red;
        font-size: 13px;
        margin-top: -0.8rem;
      }

      .login-recordar{
        font-family: Quicksand;
        font-size: 12px;
        text-decoration-line: underline;
        cursor: pointer;
        text-align: center;
        margin: 0;
      }

      @keyframes animationSlide {
        0%, 100% {
         transform: translateX(-100%);
        }

        25%, 75% {
          transform: translateX(0);
        }

        50% {
          transform: translateX(100%);
        }
      }
      `}</style>
		</>

  )
}

Login.layout = 'Auth'

export default Login
