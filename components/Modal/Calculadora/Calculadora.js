import React, { useState } from 'react'
import Image from 'next/image'
import { formatToCurrency } from '@/lib/util'

const ModalCalculadora = ({ closeModal, price, noIncluyeModal, title, fotoPrincipal }) => {
  const [imgError, setImgError] = useState(false)
  const [montoTotal, setMontoTotal] = useState(price)

  const calcularCostoTotal = (numeroPasajeros) => {
    const total = numeroPasajeros * price
    setMontoTotal(total)
  }

  const handleOnChangeNumber = (e) => {
    const { value } = e.target
    const num = Number(value)

    calcularCostoTotal(num)
  }

  return (
    <>
      <div className="modal__calculadora modal__container">
        <span className="btn_close">
          <img
            src="/images/close.svg"
            width="19px"
            height="19px"
            alt="cerrar"
            onClick={() => closeModal(false)}
          />
        </span>
        <h1 className="calculadora__title">Calcula cuánto saldría tu boleto</h1>
        <h1 className="info__tour">{title}</h1>
        <figure>
          <Image
            src={imgError ? '/images/empty.jpg' : process.env.DOMAIN_IMAGES + fotoPrincipal}
            width={353}
            height={352}
            onError={(e) => setImgError(true)}
          />
        </figure>

        <div className="calculadora__pack">
          <div className="calculadora__info">
            <div className="calcu__pasajeros">
              <h4>Cantidad de pasajeros:</h4>
              <input type="number" placeholder="1" min="1" onChange={handleOnChangeNumber} />
            </div>
            <h4 className="exeption">No incluye:</h4>
            <div className="info__impuestos">
              {noIncluyeModal?.descriptions.map((description, index) => {
                return (
                  <h4 key={index}>{description}</h4>
                )
              })}
            </div>
            <div className="info__price">
              <h3 className="title__price">Costo boleto (s):</h3>
              <h3 className="price">S/{formatToCurrency(montoTotal)}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="overlay" onClick={() => closeModal(false)}></div>

      <style jsx>{
        /* css */ `
          .modal__calculadora {
            width: 339px;
            height: 493px;
            margin: auto;
            display: grid;
            grid-template-columns: auto;
            background: #ffffff;
            border-radius: 8px;
            color: var(--fourth-color);
            padding: 24px 20px 81px 20px;
            box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
            position: fixed;
            z-index: 1000;
          }

          .modal__calculadora figure {
            display: none;
          }

          .calculadora__title {
            font-size: 14px;
            font-weight: 700;
            text-align: center;
          }

          .calculadora__pack {
            display: flex;
          }

          .calculadora__info {
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .info__tour {
            grid-row: 2/3;
            font-size: 18px;
            margin-top:37px;
            margin-bottom:14px;
            text-align: center;
            text-transform: uppercase;
            text-decoration-line: underline;
          }

          .calcu__pasajeros {
            display: flex;
            margin-top: 60px;
            margin-bottom: 33px;
            align-items: center;
            justify-content: center;
          }

          .calcu__pasajeros h4 {
            font-size: 18px !important;
            font-weight: 500;
          }

          .calcu__pasajeros input {
            border: 1px solid #c4c4c4;
            border-radius: 8px;
            width: 54px;
            height: 33px;
            margin-left: 0.5rem;
            font-weight: 700;
            font-size: 18px;
            padding-left: 12px;
          }

          .calculadora__info h4 {
            font-size: 14px;
            font-weight: 500;
          }

          .exeption {
            display: flex;
            justify-content: center;
          }

          .info__impuestos {
            background: #ededed;
            border: 1px solid #c4c4c4;
            box-sizing: border-box;
            border-radius: 8px;
            padding: 1rem 0 1rem 1.5rem;
            width: 299px;
            display: grid;
            row-gap: 0.7rem;
            align-items: center;
            margin-top: 0.9rem;
            margin-bottom: 2.1rem;
          }

          .info__price {
            display: flex;
            align-items: center;
            justify-content:center;
          }

          .title__price {
            font-size: 18px;
          }

          .price {
            font-size: 24px;
            padding-left: 0.7rem;
          }

          img {
            display: flex;
            margin-left: 275px;
            cursor: pointer;
          }


          @media screen and (min-width:920px) {
            .modal__calculadora {
              width: 891px;
              height: 528px;
              margin: auto;
              display: grid;
              grid-template-columns: repeat(2, auto);
              padding: 25px 25px 65px 49px;
              box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.3);
            }

            .modal__calculadora figure {
              display: block;
              grid-row: 3/5;
              grid-column: 1/2;
            }
  
            .calculadora__title {
              grid-row: 2/3;
              grid-column: 1/3;
              font-size: 24px;
              text-decoration-line: underline;
              padding: 1rem 0;
              margin-bottom: 25px;
            }
  
            .calculadora__pack {
              display: flex;
              grid-row: 3/4;
              grid-column: 2/3;
              margin-top: 40px
            }
  
            .calculadora__info {
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding-left: 20px;
            }
  
            .info__tour {
              grid-row: 3/4;
              grid-column: 2/3;
              font-size: 18px;
              margin-top:20px;
              margin-bottom:0px;
              text-align: start;
              text-decoration-line: none;
              padding-left: 20px;
            }
  
            .calcu__pasajeros {
              display: flex;
              justify-content: start;
              align-items: center;
              margin-top: 41px;
              margin-bottom: 33px;
            }
  
            .calcu__pasajeros input {
              border: 1px solid #c4c4c4;
              border-radius: 8px;
              width: 54px;
              height: 33px;
              margin-left: 2rem;
              font-weight: 700;
              font-size: 18px;
              padding-left: 12px;
            }
  
            .calculadora__info h4 {
              font-size: 18px;
              font-weight: 500;
            }

            .exeption {
              justify-content: start;
            }
  
            .info__impuestos {
              padding: 1rem 0 1rem 1.5rem;
              width: 378px;
              display: grid;
              row-gap: 0.7rem;
              align-items: center;
              margin-top: 0.7rem;
              margin-bottom: 2.4rem;
            }
  
            .info__price {
              display: flex;
              align-items: center;
              justify-content: start;
            }
  
            .title__price {
              font-size: 24px;
            }
  
            .price {
              font-size: 36px;
              padding-left: 1rem;
            }

            .btn_close {
              grid-column: 1/3;
            }
  
            img {
              margin-left: 800px;
            }

            .overlay {
              top: 130px!important;
            }

            .modal__container{
              top: 54%!important;
            }
          }
        `
      }</style>
    </>
  )
}

export default ModalCalculadora
