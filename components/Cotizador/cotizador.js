import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Button from '@/components/common/Button'

import ModalSignIn from '../Modal/IniciarSecion/SignIn'
import ModalCalculadora from '../Modal/Calculadora/Calculadora'
import { useGlobalContext } from '@/context/GlobalContext'
import { formatToCurrency } from '@/lib/util'

const Cotizador = (props) => {
  const { title, price, info, linkTo } = props

  const [openModalCalculadora, setOpenModalCalculadora] = useState(false)
  const [openModalSignIn, setOpenModalSignIn] = useState(false)
  const { isToken } = useGlobalContext()

  return (
    <>
      <article className="container__cotizador">
        <div className="cotizador">
          <div className="cotizador__tour">
            <h3 className="cotizador__title">{title}</h3>
            <span className="detalle_info">{info}</span>
          </div>
          <div className="cotizador__detalle">
            <h3 className="cotizador__price">S/{formatToCurrency(price)}</h3>
            <span className="detalle_info">(por persona)</span>
          </div>
          <div className="cotizador__cta">
            <div className="cotizador__cta--item">
              <Button
                label="Cotizar"
                variant="outline"
                height={{ xs: 40, md: 40 }}
                width={{ xs: 142, md: 160 }}
                font="18px"
                onClick={() => setOpenModalCalculadora(true)}
              />
              {openModalCalculadora && <ModalCalculadora closeModal={setOpenModalCalculadora} {...props} />}
            </div>
            <div className="cotizador__cta--item">
              <Button
                label="Comprar"
                height={{ xs: 40, md: 40 }}
                width={{ xs: 142, md: 160 }}
                font="18px"
                to={linkTo}
                onClick={() => {
                  if (!isToken)setOpenModalSignIn(true)
                }}
              />
              {openModalSignIn && <ModalSignIn closeModalSignIn={setOpenModalSignIn()} />}
            </div>
          </div>
        </div>
      </article>

      <style jsx>{
        /* css */ `
          .container__cotizador {
            display: flex;
            justify-content: center;
          }

          .cotizador {
            width: 339px;
            margin: auto;
            margin-top: 11px;
            margin-bottom: 6px;
            display: grid;
            column-gap: 4rem;
            background: #ffffff;
            border-radius: 8px;
            border: 1px solid #c4c4c4;
            color: var(--fourth-color);
            padding: 21px 20px 25px 20px;
            grid-template-columns: repeat(2, auto);
          }

          .cotizador__tour {
            display: grid;
            row-gap: 11px;
          }

          .cotizador__title {
            display: grid;
            font-size: 14px;
            text-transform: uppercase;
          }

          .cotizador__price {
            font-size: 24px;
          }

          .cotizador__detalle {
            font-size: 14px;
            text-align: center;
          }

          .cotizador__cta {
            display: grid;
            grid-column: 1/3;
            column-gap: 15px;
            margin-top: 20px;
            justify-items: center;
            grid-template-columns: repeat(2, auto);
          }

          @media screen and (min-width: 768px) {
            .cotizador {
              width: 90%;
              display: grid;
              grid-template-columns: repeat(2, auto);
              grid-template-rows: repeat(2, auto);
            }

            .cotizador__tour {
              display: grid;
              grid-row: 1/3;
              row-gap: 1rem;
              align-content: center;
            }

            .cotizador__detalle {
              display: flex;
              column-gap: 0.5rem;
              justify-self: end;
              flex-direction: row;
              align-items: center;
            }

            .cotizador__title,
            .cotizador__price {
              font-size: 20px;
            }

            .detalle_info {
              font-size: 16px;
            }

            .cotizador__cta {
              width: 350px;
              display: grid;
              grid-column: 2/3;
              column-gap: 5px;
              margin-top: 10px;
              justify-self: end;
              justify-items: right;
            }
          }

          @media screen and (min-width: 992px) {
            .cotizador__cta {
              column-gap: 0;
              justify-self: end;
            }
          }

          @media screen and (min-width: 1200px) {
            .cotizador {
              padding: 18px 26px 16px 24px;
            }

            .cotizador__detalle {
              width: ;
            }

            .cotizador__title,
            .cotizador__price {
              font-size: 24px;
            }

            .detalle_info {
              font-size: 18px;
            }
          }

          @media screen and (min-width: 1400px) {
            .cotizador {
              width: 1221px;
            }
          }
        `
      }</style>
    </>
  )
}

Cotizador.prototypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  info: PropTypes.string.isRequired
}

export default Cotizador
