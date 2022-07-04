import React, { useState } from 'react'
import Input from '@/components/common/Input'
import Link from 'next/link'
import Button from '@/components/common/Button'
import ModalCrearCuenta from '../NuevaCuenta/CrearCuenta'
import { useGlobalContext } from '@/context/GlobalContext'
import { useRouter } from 'next/router'

export default function ModalSignIn({ closeModalSignIn }) {
  const [openModalCrearCuenta, setOpenModalCrearCuenta] = useState(false)
  const { handleKeyEnter, handleOnChangeInput, loginErrors, signIn } = useGlobalContext()
  const router = useRouter()

  function closeModal () {
    const slug = router.query.slug
    router.push(`${process.env.URI_WEB}/paquetes-y-full-days/${slug}`)
  }

  return (
    <>
      <div className="modal__signIn modal__container" onKeyPress={handleKeyEnter}>
        <div className="btn-close">
          <img
            src="/images/close.svg"
            width="19px"
            height="19px"
            alt="cerrar"
            onClick={() => closeModal()}
          />
        </div>

        <h1 className="signIn__title">Iniciar Sesión</h1>
        <p className="signIn__note">
          Para poder continuar con tu compra, es necesario que ingreses a tu cuenta.
        </p>
        <div className="signIn__inputs">
          <Input
            type="email"
            placeholder="Correo electrónico"
            onChange={handleOnChangeInput}
            fontWeight="normal"
            name="email"
            height={{
              xs: 40,
              md: 48
            }}
          />
          {loginErrors.emailError && (
            <span className="login__error-email">{loginErrors.emailError}</span>
          )}
          <div className="password">
            <Input
              type="password"
              onChange={handleOnChangeInput}
              placeholder="Contraseña"
              fontWeight="normal"
              name="password"
              height={{
                xs: 40,
                md: 48
              }}
            />
            {loginErrors.passwordError && (
              <span className="login__error-password">{loginErrors.passwordError}</span>
            )}
            {/* <Link href="/">
              <a>No recuerdo mi contraseña</a>
            </Link> */}
          </div>

          <Button
            label="Continuar"
            onClick={() => {
              signIn()
            }} />
          <Button
            label="Crear cuenta"
            variant="outline"
            height={{ xs: 40, md: 40 }}
            font="18px"
            onClick={() => {
              setOpenModalCrearCuenta(true)
            }}
          />
          {openModalCrearCuenta && (
            <ModalCrearCuenta closeModal={setOpenModalCrearCuenta} />
          )}
        </div>
      </div>
      <div className="overlay" onClick={() => closeModal()}></div>
      <style jsx>{
        /* css */ `
          .modal__signIn {
            width: 339px;
            height: 493px;
            margin: auto;
            display: flex;
            flex-direction: column;
            background: #ffffff;
            border-radius: 8px;
            color: var(--fourth-color);
            padding: 30px;
            box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
          }

          .btn-close {
            display: flex;
            justify-content: flex-end;
            cursor: pointer;
          }

          .signIn__title {
            font-size: 18px;
            text-align: center;
            text-transform: uppercase;
            padding-top: 30px;
          }

          .signIn__note {
            font-size: 18px;
            font-weight: 400;
            text-align: center;
          }

          .signIn__inputs {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .password {
            display: flex;
            flex-direction: column;
          }

          a {
            text-decoration-line: underline;
            color: var(--fourth-color);
            font-size: 12px;
            align-self: flex-end;
            padding-top: 5px;
          }
          

          .login__error-email {
            color: red;
            font-size: 13px;
            margin-top: -0.8rem;
          }

          .login__error-password{
            color: red;
            font-size: 13px;
            margin-top: 5px
          }

          @media screen and (min-width: 920px) {
            .modal__signIn {
              width: 680px;
              height: 475px;
              margin: auto;
              box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.3);
            }

            .signIn__title {
              font-size: 18px;
              text-decoration-line: underline;
              padding-top: 20px;
            }

            .signIn__note {
              padding-bottom: 1.5rem;
              padding: 0px 120px;
            }

            .signIn__inputs {
              padding: 10px 160px;
              gap: 16px;
            }

            .overlay {
              top: 130px !important;
            }

            .modal__container {
              top: 52% !important;
            }
          }
        `
      }</style>
    </>
  )
}
